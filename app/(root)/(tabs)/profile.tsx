import { CustomButton } from "@/components/custom-button";
import { FormField } from "@/components/form-field";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { requestLocation } from "@/lib/map-utils";
import tw from "@/lib/tailwind";
import { TUser } from "@/lib/types";
import { hashPassword, verifyPassword } from "@/lib/utils";
import { setLight } from "@/store/light-store";
import { useUserStore } from "@/store/user-store";
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import { SafeAreaView } from "react-native-safe-area-context";



export default function Profile() {
    const [user, setUser] = useState<TUser | null>(null);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [activeBtn, setActiveBtn] = useState(0);
    const [locationChanged, setLocationChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const userId = useUserStore(store => store.userId);
    const hashedPassword = useUserStore(store => store.hashedPassword);
    const setHashedPassword = useUserStore(store => store.setHashedPassword);
    const setInitialCoords = useUserStore(store => store.setInitialCoords);
    const logout = useUserStore(store => store.logout);
    const deleteAccount = useUserStore(store => store.deleteAccount);


    useEffect(() => {
        (async () => {
            try {
                const user = await fetchAPI(`/user/${userId}`);
                setUser(user.data);

            } catch (error) {
                console.log(error);
            }
        })()
    }, [])


    const handleLogout = async () => {
        logout();
    }

    const handleDeleteAccount = async () => {
        try {
            await fetchAPI(`/user/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: userId })
            })
            deleteAccount();
        } catch (error) {
            console.log(error);
        }
    }


    const handleCalibratePress = () => {
        setActiveBtn(0);
        setPasswordChanged(false);
        setLocationChanged(false);
        setShowModal(true);
    }

    const handleChangePasswordPress = () => {
        setActiveBtn(1);
        setPasswordChanged(false);
        setLocationChanged(false);
        setShowModal(true);
    }

    const handleBackdropPress = () => {
        setShowModal(false);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError(null);
        setIsAuthenticated(false);
    }


    const handleChangeLocationPress = async (isAuth = false) => {
        setError(null);
        setIsLoading(true);
        try {
            if (!isAuth) {
                const verifiedPassword = await verifyPassword(password, `${hashedPassword}`);
                if (!verifiedPassword) return setError('Wrong password');
            }

            const response = await requestLocation();
            if (!response) return;

            const { location } = response;
            setLight("on");
            setInitialCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
            setLocationChanged(true);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    const handleSubmitChangedPasswordPress = async () => {
        setError(null);
        setIsLoading(true);

        try {
            if (!isAuthenticated) {
                const verifiedPassword = await verifyPassword(password, `${hashedPassword}`);
                if (!verifiedPassword) return setError('Wrong password');
            }

            if (newPassword.length < 6) return setError('Too short. At least 6 characters long');
            if (newPassword !== confirmPassword) return setError('Make sure your passwords are identical');

            const newHashedPassword = await hashPassword(newPassword);
            setHashedPassword(newHashedPassword);
            setPasswordChanged(true);
            setNewPassword('');
            setConfirmPassword('');
            setIsAuthenticated(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleForgotPasswordChangingLocationPress = async () => {
        try {
            const { success } = await LocalAuthentication.authenticateAsync();
            if (!success) return;

            setError(null);
            setPassword('123456');
            await handleChangeLocationPress(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleForgotPasswordChangingPasswordPress = async () => {
        try {
            const { success } = await LocalAuthentication.authenticateAsync();
            if (!success) return;

            setPassword('123456');
            setError(null);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    }


    if (!user) {
        return (
            <View style={tw`flex-1 flex-center`}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-general-500`}>
            <ScrollView
                contentContainerStyle={tw`p-4 pb-32`}
                showsVerticalScrollIndicator={false}
            >
                <View style={tw`flex-row items-center justify-between my-5`}>
                    <Text style={tw`text-2xl font-JakartaExtraBold`}>Your Profile</Text>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={tw`p-2 bg-white rounded-full shadow-sm`}
                    >
                        <Image source={icons.out} style={tw`w-6 h-6`} />
                    </TouchableOpacity>
                </View>
                <Pressable style={tw`self-center p-1 bg-slate-200 shadow rounded-full mb-8`}>
                    <Image
                        source={{ uri: user.picture_url }}
                        resizeMode="contain"
                        style={tw`w-24 h-24 rounded-full`}
                    />
                </Pressable>
                <View style={tw`bg-white rounded-2xl shadow-md shadow-gray-400 p-4 gap-y-4`}>
                    <FormField
                        label="Username"
                        value={user.name}
                        icon={icons.account}
                        iconStyle="w-5 h-5 mt-[3px]"
                        tintColor="#C0C0C0"
                        inputStyle="font-JakartaSemiBold text-base tracking-wide"
                        editable={false}
                    />
                    <View style={tw`gap-y-3 mb-7`}>
                        <Text style={tw`text-lg font-JakartaSemiBold`}>Status</Text>
                        <Pressable style={tw`flex-row self-start gap-x-1 items-center p-2 px-4 ml-5 bg-green-300 border border-emerald-400 rounded-full`}>
                            <Image
                                source={icons.checkmark}
                                style={tw`w-6 h-6`}
                                tintColor="#2F4F4F"
                            />
                            <Text style={tw`font-JakartaMedium text-sm tracking-wide`}>Verified</Text>
                        </Pressable>
                    </View>
                    <CustomButton
                        title="Calibrate Initial Location"
                        IconLeft={() => (
                            <Image
                                source={icons.target}
                                resizeMode='contain'
                                tintColor="white"
                                style={tw`w-5 h-5 mx-2`}
                            />
                        )}
                        onPress={handleCalibratePress}
                    />
                    <CustomButton
                        title="Change Password"
                        IconLeft={() => (
                            <Image
                                source={icons.lock}
                                resizeMode='contain'
                                tintColor="white"
                                style={tw`w-5 h-5 mx-2`}
                            />
                        )}
                        onPress={handleChangePasswordPress}
                        className="mt-40 mb-2"
                    />
                    <CustomButton
                        title="Delete Account"
                        bgVariant="outline"
                        textVariant="danger"
                        className="shadow-transparent"
                        onPress={handleDeleteAccount}
                    />
                </View>
            </ScrollView>
            <Modal
                isVisible={showModal}
                onBackdropPress={handleBackdropPress}
            >
                <View style={tw`bg-white flex-center p-7 rounded-2xl gap-y-4`}>
                    {locationChanged || passwordChanged ? (
                        <>
                            <TouchableOpacity onPress={handleBackdropPress}>
                                <Image
                                    source={images.check}
                                    style={tw`w-28 h-28`}
                                />
                            </TouchableOpacity>
                            <Text style={tw`text-2xl text-center font-JakartaBold mt-5`}>Changed successfully!</Text>
                        </>
                    ) : activeBtn === 0 ? (
                        <>
                            <Text style={tw`text-xl text-center font-JakartaBold`}>To make changes, the following action is required</Text>
                            <FormField
                                label='Please enter your password'
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                            <View style={tw`w-full relative`}>
                                {error && <Text style={tw`text-danger-600 absolute -top-5 left-6`}>{error}</Text>}
                                <TouchableOpacity
                                    style={tw`self-end`}
                                    onPress={handleForgotPasswordChangingLocationPress}
                                >
                                    <Text style={tw`font-Jakarta mr-1`}>Forgot password</Text>
                                </TouchableOpacity>
                                <CustomButton
                                    title="Submit"
                                    IconLeft={() => !isLoading ? (
                                        <Image
                                            source={icons.target}
                                            resizeMode='contain'
                                            tintColor="white"
                                            style={tw`w-5 h-5 mx-2`}
                                        />
                                    ) : (
                                        <View style={tw`w-5 h-5 mx-2`}>
                                            <ActivityIndicator size="small" />
                                        </View>
                                    )}
                                    onPress={() => handleChangeLocationPress()}
                                    className="mt-6"
                                />
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={tw`w-full`}>
                                <FormField
                                    label='Current password'
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                                {error && error.startsWith('Wrong') && <Text style={tw`text-danger-600 absolute bottom-2 left-3`}>{error}</Text>}
                                <TouchableOpacity
                                    style={tw`self-end`}
                                    onPress={handleForgotPasswordChangingPasswordPress}
                                >
                                    <Text style={tw`font-Jakarta mr-1`}>Forgot password</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={tw`w-full`}>
                                <FormField
                                    label='New password'
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                                {error && error.startsWith('Too') && <Text style={tw`text-danger-600 absolute -bottom-3 left-3`}>{error}</Text>}
                            </View>
                            <View style={tw`w-full`}>
                                <FormField
                                    label='Confirm password'
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                                {error && error.startsWith('Make') && <Text style={tw`text-danger-600 absolute -bottom-3 left-3`}>{error}</Text>}
                            </View>
                            <CustomButton
                                title="Submit"
                                IconLeft={() => !isLoading ? (
                                    <Image
                                        source={icons.lock}
                                        resizeMode='contain'
                                        tintColor="white"
                                        style={tw`w-5 h-5 mx-2`}
                                    />
                                ) : (
                                    <View style={tw`w-5 h-5 mx-2`}>
                                        <ActivityIndicator size="small" />
                                    </View>
                                )}
                                onPress={handleSubmitChangedPasswordPress}
                                className="mt-6"
                            />
                        </>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    )
}
