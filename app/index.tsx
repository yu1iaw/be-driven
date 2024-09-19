import tw from '@/lib/tailwind';
import { ActivityIndicator, View } from 'react-native';


export default function Index() {  
    return (
        <View style={tw`flex-1 flex-center`}>
            <ActivityIndicator size="large" />
        </View>
    )
}