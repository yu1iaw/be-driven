import { CustomButton } from "@/components/custom-button";
import { FormField } from "@/components/form-field";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import tw from "@/lib/tailwind";
import { useUserStore } from "@/store/user-store";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";



export default function SignIn() {
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setUsername = useUserStore(store => store.setUsername);
    const setUserId = useUserStore(store => store.setUserId);



    const handleSignInPress = async () => {
        setError(null);
        setIsLoading(true);

        try {
            if (!name) return setError('Empty value');

            const existingUser = await fetchAPI(`/username/${name}`);

            if (!existingUser.length) {
                return setError('User does not exist');
            } else {
                const { id, name } = existingUser[0];
                setUserId(id);
                setUsername(name);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={tw`bg-white flex-1`}>
            <View style={tw`relative`}>
                <Image
                    source={images.signUpCar}
                    style={tw`aspect-video h-[400px] z-0`}
                />
                <Text style={tw`text-2xl text-black font-JakartaSemiBold absolute bottom-8 left-5`}>Welcome  👋</Text>
            </View>
            <View style={tw`px-5 py-6`}>
                <View>
                    <FormField
                        label="Username"
                        placeholder="Your username"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {error && <Text style={tw`text-danger-600 absolute -bottom-3 left-3`}>{error}</Text>}
                </View>
                <CustomButton
                    title="Login"
                    onPress={handleSignInPress}
                    className="my-10"
                    IconLeft={() => !isLoading ? (
                        <Image
                            source={icons.person}
                            resizeMode='contain'
                            tintColor="white"
                            style={tw`w-5 h-5 mx-2`}
                        />
                    ) : (
                        <View style={tw`w-5 h-5 mx-2`}>
                            <ActivityIndicator size="small" />
                        </View>
                    )}
                />
                <Text style={tw`font-Jakarta text-center -mt-3`}>
                    Don't have an account?{"  "}
                    <Link style={tw`text-primary-500 font-JakartaSemiBold`} href='/(auth)/register'>Register</Link>
                </Text>
            </View>
        </View>
    )
}