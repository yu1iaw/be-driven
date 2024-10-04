import { icons } from '@/constants';
import tw from '@/lib/tailwind';
import { InputFieldProps } from '@/lib/types';
import { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';



export const FormField = ({ label, labelStyle, icon, password, secureTextEntry = false, containerStyle, inputStyle, iconStyle, tintColor, className, ...props }: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <View style={tw`w-full my-2`}>
                    <Text style={tw.style(`text-lg font-JakartaSemiBold mb-3`, labelStyle)}>{label}</Text>
                    <View style={tw.style(`flex-row items-center bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500`, containerStyle)}>
                        {icon && (
                            <Image
                                source={icon}
                                style={tw.style(`w-6 h-6 ml-4`, iconStyle)}
                                tintColor={tintColor}
                            />
                        )}
                        <TextInput
                            style={tw.style(`flex-1 p-4 rounded-full text-left text-[15px] font-JakartaMedium`, inputStyle)}
                            secureTextEntry={password ? !showPassword : secureTextEntry}
                            {...props}
                        />
                        {password && (
                            <TouchableOpacity
                                style={tw`p-1`}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Image
                                    source={showPassword ? icons.eye : icons.invisible}
                                    style={tw`w-6 h-6 mr-3`}
                                    tintColor="#a9a9a9"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}