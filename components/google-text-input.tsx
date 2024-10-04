import { icons } from "@/constants";
import tw from "@/lib/tailwind";
import { GoogleInputProps } from "@/lib/types";
import { Image, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";



export const GoogleTextInput = ({icon, initialLocation, containerStyle, textInputBackgroundColor, handlePress}: GoogleInputProps) => {
    return (
        <View style={tw.style(`relative flex-row flex-center mb-5 z-50 rounded-xl overflow-hidden`, containerStyle)}>
            <GooglePlacesAutocomplete
                placeholder="Where do you want to go?"
                debounce={400}
                minLength={2}
                fetchDetails
                enablePoweredByContainer={false}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                    language: "en"
                }}
                onPress={(data, detail = null) => {
                    handlePress({
                        latitude: detail?.geometry.location.lat!,
                        longitude: detail?.geometry.location.lng!,
                        address: data.description
                    })
                }}
                textInputProps={{
                    placeholderTextColor: "gray",
                    placeholder: initialLocation ?? "Where do you wanna go?"
                }}
                renderLeftButton={() => (
                    <View style={tw`w-6 h-6 flex-center`}>
                        <Image
                            source={icon ?? icons.search}
                            resizeMode="contain"
                            style={tw`w-6 h-6`}
                        />
                    </View>
                )} 
                styles={{
                    textInputContainer: tw`relative flex-center mx-4`,
                    textInput: tw.style(`bg-white text-base rounded-xl mt-1`, textInputBackgroundColor),
                    listView: tw.style(`relative top-0 z-50`),
                    row: tw.style(`bg-white`, textInputBackgroundColor),
                }}
            />
        </View>
    )
}