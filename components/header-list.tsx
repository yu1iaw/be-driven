import { icons } from '@/constants';
import tw from '@/lib/tailwind';
import { useLocationStore } from '@/store/location-store';
import { useUserStore } from '@/store/user-store';
import { router } from 'expo-router';
import { memo } from 'react';
import { Text, View } from 'react-native';
import { GoogleTextInput } from './google-text-input';
import { Map } from './map';



export const HeaderList = memo(() => {
    const username = useUserStore(store => store.username);
    const setDestinationLocation = useLocationStore(store => store.setDestinationLocation);
    

    const handleDestinationPress = (location: { latitude: number, longitude: number, address: string }) => {
        setDestinationLocation(location);
        router.navigate('/(root)/find-ride');
    }

    return (
        <>
            <View style={tw`my-5`}>
                <Text numberOfLines={1} style={tw`text-2xl font-JakartaExtraBold`}>Welcome, {username} 👋🏼</Text>
            </View>
            <GoogleTextInput
                icon={icons.search}
                containerStyle="bg-white shadow-md shadow-neutral-300"
                handlePress={handleDestinationPress}
            />
            <Text style={tw`text-xl font-JakartaBold mt-5 mb-3`}>Your Current Location</Text>
            <View style={tw`bg-transparent h-[320px] mb-7 rounded-2xl overflow-hidden`}>
                <Map />
            </View>
            <Text style={tw`text-xl font-JakartaBold mt-5 mb-3`}>Recent Rides</Text>

        </>
    )
})