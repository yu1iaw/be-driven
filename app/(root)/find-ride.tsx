import { CustomButton } from "@/components/custom-button";
import { GoogleTextInput } from "@/components/google-text-input";
import { RideLayout } from "@/components/ride-layout";
import { icons } from "@/constants";
import tw from "@/lib/tailwind";
import { useLocationStore } from "@/store/location-store";
import { router } from "expo-router";
import { Text, View } from "react-native";



export default function FindRide() {
    const userAddress = useLocationStore(store => store.userAddress);
    const destinationAddress = useLocationStore(store => store.destinationAddress);
    const setUserLocation = useLocationStore(store => store.setUserLocation);
    const setDestinationLocation = useLocationStore(store => store.setDestinationLocation);
        
    
    return (
        <RideLayout title="Ride">
            <View style={tw`my-2`}>
                <Text style={tw`text-lg font-JakartaSemiBold mb-3`}>From:</Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={userAddress}
                    handlePress={(location) => setUserLocation(location)}
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="bg-transparent"
                />
            </View>
            <View style={tw`my-2`}>
                <Text style={tw`text-lg font-JakartaSemiBold mb-3`}>To:</Text>
                <GoogleTextInput
                    icon={icons.map}
                    initialLocation={destinationAddress}
                    handlePress={(location) => setDestinationLocation(location)}
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="bg-transparent"
                />
            </View>
            <CustomButton
                title="Find Now"
                onPress={() => router.navigate('/(root)/confirm-ride')}
                className="mt-2"
            />
        </RideLayout>
    )
}