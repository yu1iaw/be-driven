import { icons } from '@/constants';
import tw from '@/lib/tailwind';
import { Image, Text, View } from 'react-native';
import { CustomButton } from './custom-button';



export const Oath = () => {
    const handleGoogleSignIn = () => {}
    
    return (
        <View>
            <View style={tw`flex-row items-center mt-8 gap-x-3`}>
                <View style={tw`flex-1 h-[1px] bg-general-100`} />
                <Text>or</Text>
                <View style={tw`flex-1 h-[1px] bg-general-100`} />
            </View>
            <CustomButton
                title='Log In with Google'
                className='mt-5 shadow-none'
                IconLeft={() => (
                    <Image
                        source={icons.google}
                        resizeMode='contain'
                        style={tw`w-5 h-5 mx-2`}
                    />
                )}
                bgVariant='outline'
                textVariant='primary'
                onPress={handleGoogleSignIn}
            />
        </View>
    )
}