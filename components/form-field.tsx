import tw from '@/lib/tailwind';
import { InputFieldProps } from '@/lib/types';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';



export const FormField = ({ label, labelStyle, icon, secureTextEntry = false, containerStyle, inputStyle, iconStyle, tintColor, className, ...props }: InputFieldProps) => {
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
                            secureTextEntry={secureTextEntry}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}