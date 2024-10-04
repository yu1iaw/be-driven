import { images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { createRide, createTicket } from '@/lib/prisma';
import tw from '@/lib/tailwind';
import { PaymentProps } from '@/lib/types';
import { useDriverStore } from '@/store/driver-store';
import { setLight } from '@/store/light-store';
import { useLocationStore } from '@/store/location-store';
import { Decimal } from '@prisma/client/runtime/react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { Result } from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentMethod';
import { IntentCreationCallbackParams } from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Modal from "react-native-modal";
import { CustomButton } from './custom-button';


const API_URL = __DEV__
    ? 'http://192.168.1.105:8080'
    : 'https://stripe-server-tv87.onrender.com';

export const Payment = ({ userId, fullName, amount, driverId, rideTime }: PaymentProps) => {
    const [success, setSuccess] = useState(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const userAddress = useLocationStore(store => store.userAddress);
    const userLatitude = useLocationStore(store => store.userLatitude);
    const userLongitude = useLocationStore(store => store.userLongitude);
    const destinationAddress = useLocationStore(store => store.destinationAddress);
    const destinationLatitude = useLocationStore(store => store.destinationLatitude);
    const destinationLongitude = useLocationStore(store => store.destinationLongitude);
    const clearSelectedDriver = useDriverStore(store => store.clearSelectedDriver);


    const openPaymentSheet = async () => {
        await initializePaymentSheet();
        const { error } = await presentPaymentSheet();

        if (!error) {
            setSuccess(true);
        }
    }


    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            intentConfiguration: {
                mode: {
                    amount: parseInt(amount ?? '0') * 100,
                    currencyCode: 'USD',
                },
                confirmHandler: confirmHandler
            },
            returnURL: "myapp://book-ride"
        });
        if (error) {
            console.log(error);
        }
    };

    const confirmHandler = async (paymentMethod: Result, shouldSavePaymentMethod: boolean, intentCreationCallback: (result: IntentCreationCallbackParams) => void) => {
        try {
            const { paymentIntent, customer } = await fetchAPI(`https://stripe-server-tv87.onrender.com/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: fullName,
                    email: `example${userId}@gmail.com`,
                    amount,
                    paymentMethodId: paymentMethod.id
                })
            });

            if (paymentIntent.client_secret) {
                const { result } = await fetchAPI(`https://stripe-server-tv87.onrender.com/pay`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        payment_method_id: paymentMethod.id,
                        payment_intent_id: paymentIntent.id,
                        customer_id: customer
                    })
                })
                
                if (result.client_secret) {
                    const newRideId = await createRide({
                        originAddress: `${userAddress}`,
                        destinationAddress: `${destinationAddress}`,
                        originLatitude: userLatitude as any as Decimal,
                        originLongitude: userLongitude as any as Decimal,
                        destinationLatitude: destinationLatitude as any as Decimal,
                        destinationLongitude: destinationLongitude as any as Decimal,
                        rideTime: Math.round(rideTime ?? 0),
                        farePrice: amount as any as Decimal,
                        paymentStatus: "paid",
                        driverId: Number(driverId),
                        userId: userId,
                    })

                    intentCreationCallback({ clientSecret: result.client_secret })

                    if (newRideId) {
                        await createTicket({
                            rideId: newRideId,
                            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Order%E2%80%A2${newRideId}`
                        })
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleBackHomePress = () => {
        setSuccess(false);
        clearSelectedDriver();
        setLight('on');
        router.navigate('/(root)/(tabs)/home');
    }


    return (
        <>
            <CustomButton
                title='Book Ride'
                className='my-10'
                onPress={openPaymentSheet}
            />
            <Modal isVisible={success}>
                <View style={tw`bg-white flex-center p-7 rounded-2xl`}>
                    <Image
                        source={images.check}
                        style={tw`w-28 h-28 mt-5`}
                    />
                    <Text style={tw`text-2xl text-center font-JakartaBold mt-5`}>Ride booked!</Text>
                    <Text style={tw`text-sm text-general-200 font-JakartaMedium text-center mt-3`}>
                        Your reservation has been successfully
                        placed. Please proceed with your trip!
                    </Text>
                    <CustomButton
                        title="Back Home"
                        onPress={handleBackHomePress}
                        className="mt-5"
                    />
                </View>
            </Modal>
        </>
    )
}