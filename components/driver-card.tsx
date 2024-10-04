import { icons } from '@/constants';
import tw from '@/lib/tailwind';
import { DriverCardProps } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import { Image, Text, TouchableOpacity, View } from 'react-native';



export const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {    
    return (
        <TouchableOpacity
            onPress={setSelected}
            style={tw.style(`bg-white flex-row items-center justify-between py-5 px-2 rounded-xl`, selected === item.id && "bg-general-600")}
        >
            <Image
                source={{ uri: item.profileImageUrl }}
                style={tw`w-14 h-14 rounded-full`}
            />

            <View style={tw`flex-1 mx-3`}>
                <View style={tw`flex-row items-center mb-1`}>
                    <Text style={tw`text-lg font-Jakarta`}>{item.title}</Text>

                    <View style={tw`flex-row items-center gap-x-1 ml-2`}>
                        <Image source={icons.star} style={tw`w-3.5 h-3.5`} />
                        <Text style={tw`text-sm font-Jakarta`}>{+item.rating}</Text>
                    </View>
                </View>

                <View style={tw`flex-1 flex-row items-center`}>
                    <View style={tw`flex-row items-center`}>
                        <Image source={icons.dollar} style={tw`w-4 h-4`} />
                        <Text style={tw`text-sm font-Jakarta ml-1`}>
                            {item.price}
                        </Text>
                    </View>

                    <Text style={tw`text-sm font-Jakarta text-general-800 mx-1`}>
                        |
                    </Text>

                    <Text style={tw`text-sm font-Jakarta text-general-800`}>
                        {formatTime(item.time ?? 5)}
                    </Text>

                    <Text style={tw`text-sm font-Jakarta text-general-800 mx-1`}>
                        |
                    </Text>

                    <Text style={tw`text-sm font-Jakarta text-general-800`}>
                        {item.carSeats} seats
                    </Text>
                </View>
            </View>

            <Image
                source={{ uri: item.carImageUrl }}
                style={tw`h-13 w-13`}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
}