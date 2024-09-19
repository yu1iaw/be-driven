import { CustomButton } from "@/components/custom-button";
import { FormField } from "@/components/form-field";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import tw from "@/lib/tailwind";
import { hashPassword } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";



export default function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setUserId = useUserStore(store => store.setUserId);
    const setUsername = useUserStore(store => store.setUsername);
    const setHashedPassword = useUserStore(store => store.setHashedPassword);


    const handleRegisterPress = async () => {
        setError(null);
        setIsLoading(true);

        try {
            if (!name) return setError('Empty value');
            if (password.length < 6) return setError('Too short. At least 6 characters long');
            if (password !== confirmPassword) return setError('Make sure your passwords are identical');
            
            const existingUser = await fetchAPI(`/username/${name}`);
            if (existingUser.length) {
                return setError('Username already exists');
            }

            const { id } = await fetchAPI('/user/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            })

            if (id) {
                const hashedPassword = await hashPassword(password);

                setUserId(id);
                setUsername(name);
                setHashedPassword(hashedPassword);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ScrollView
            style={tw`bg-white`}
        >
            <View style={tw`relative`}>
                <Image
                    source={images.signUpCar}
                    style={tw`aspect-video h-[400px] z-0`}
                />
                <Text style={tw`text-2xl text-black font-JakartaSemiBold absolute bottom-8 left-5`}>Welcome  👋</Text>
            </View>
            <View style={tw`px-5 py-6 gap-y-3`}>
                <View>
                    <FormField
                        label="Username"
                        placeholder="Your username"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {error && (error.startsWith('Username') || error.startsWith('Empty')) && <Text style={tw`text-danger-600 absolute -bottom-3 left-3`}>{error}</Text>}
                </View>
                <View>
                    <FormField
                        label="Password"
                        placeholder="Your strong password"
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        secureTextEntry
                    />
                    {error && error.startsWith('Too') && <Text style={tw`text-danger-600 absolute -bottom-3 left-3`}>{error}</Text>}
                </View>
                <View>
                    <FormField
                        label="Confirm Password"
                        placeholder="Your strong password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        autoCapitalize="none"
                        secureTextEntry
                    />
                    {error && error.startsWith('Make') && <Text style={tw`text-danger-600 absolute -bottom-3 left-3`}>{error}</Text>}
                </View>
                <CustomButton
                    title="Register"
                    onPress={handleRegisterPress}
                    className="my-7"
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
                    Already have an account?{"  "}
                    <Link style={tw`text-primary-500 font-JakartaSemiBold`} href='/(auth)/sign-in'>Login</Link>
                </Text>
            </View>
        </ScrollView>
    )
}