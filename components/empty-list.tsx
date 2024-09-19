import { images } from '@/constants';
import tw from '@/lib/tailwind';
import { ActivityIndicator, Image, Text, View } from 'react-native';



export const EmptyList = ({ loading }: { loading?: boolean }) => {
    return (
        <View style={tw`flex-center h-screen`}>
            {!loading ? (
                <>
                    <Image
                        source={images.noResult}
                        resizeMode='contain'
                        style={tw`w-46 h-46`}
                    />
                    <Text style={tw`text-sm`}>No recent rides found</Text>
                </>
            ) : (
                <ActivityIndicator size="large" />
            )}
        </View>
    )
}