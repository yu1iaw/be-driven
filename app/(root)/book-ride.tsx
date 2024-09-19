import { Payment } from "@/components/payment";
import { RideLayout } from "@/components/ride-layout";
import { icons } from "@/constants";
import tw from "@/lib/tailwind";
import { formatTime } from "@/lib/utils";
import { useDriverStore } from "@/store/driver-store";
import { useLocationStore } from "@/store/location-store";
import { useUserStore } from "@/store/user-store";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Image, Text, View } from "react-native";



export default function BookRide() {
    const userAddress = useLocationStore(store => store.userAddress);
    const destinationAddress = useLocationStore(store => store.destinationAddress);
    const drivers = useDriverStore(store => store.drivers);
    const selectedDriver = useDriverStore(store => store.selectedDriver);
    const userId = useUserStore(store => store.userId);
    const username = useUserStore(store => store.username);
    const driverDetails = drivers.find((driver) => driver.id === selectedDriver);

    if (!userId) return null;

    return (
        <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
            merchantIdentifier="merchant.com.stripe.react.native"
            urlScheme="myapp"
        >
            <RideLayout title="Book Ride">
                <Text style={tw`text-xl font-JakartaSemiBold`}>
                    Ride Information
                </Text>

                <View style={tw`flex-center mt-5`}>
                    <Image
                        source={{ uri: driverDetails?.profile_image_url }}
                        style={tw`w-22 h-22 rounded-full`}
                    />

                    <View style={tw`flex-center flex-row mt-4 gap-x-2`}>
                        <Text style={tw`text-lg font-JakartaBold`}>
                            {driverDetails?.title}
                        </Text>

                        <View style={tw`flex flex-row items-center gap-x-0.5`}>
                            <Image
                                source={icons.star}
                                style={tw`w-5 h-5`}
                                resizeMode="contain"
                            />
                            <Text style={tw`text-lg font-Jakarta`}>
                                {driverDetails?.rating}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={tw`py-3 px-5 rounded-3xl bg-general-600 mt-5`}>
                    <View style={tw`flex-row items-center justify-between w-full border-b border-white py-2`}>
                        <Text style={tw`text-base text-primary-500 font-JakartaMedium`}>Ride Price</Text>
                        <Text style={tw`text-base font-Jakarta text-[#0CC25F]`}>
                            ${driverDetails?.price}
                        </Text>
                    </View>

                    <View style={tw`flex flex-row items-center justify-between w-full border-b border-white py-2`}>
                        <Text style={tw`text-base text-primary-500 font-JakartaMedium`}>Pickup Time</Text>
                        <Text style={tw`text-base font-Jakarta`}>
                            {formatTime(driverDetails?.time || 5)}
                        </Text>
                    </View>

                    <View style={tw`flex flex-row items-center justify-between w-full py-2`}>
                        <Text style={tw`text-base text-primary-500 font-JakartaMedium`}>Car Seats</Text>
                        <Text style={tw`text-base font-Jakarta`}>
                            {driverDetails?.car_seats}
                        </Text>
                    </View>
                </View>

                <View style={tw`flex flex-col w-full items-start justify-center mt-5`}>
                    <View
                        style={tw`flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3`}>
                        <Image source={icons.to} style={tw`w-6 h-6`} />
                        <Text numberOfLines={1} style={tw`text-lg font-JakartaLight ml-2`}>
                            {userAddress}
                        </Text>
                    </View>

                    <View style={tw`flex flex-row items-center border-b border-general-700 w-full py-3`}>
                        <Image source={icons.point} style={tw`w-6 h-6`} />
                        <Text numberOfLines={1} style={tw`text-lg font-JakartaLight ml-2`}>
                            {destinationAddress}
                        </Text>
                    </View>
                </View>
                <Payment
                    userId={userId}
                    fullName={`${username}`}
                    driverId={driverDetails?.id}
                    amount={driverDetails?.price}
                    rideTime={driverDetails?.time}
                />
            </RideLayout>
        </StripeProvider>
    )
}

