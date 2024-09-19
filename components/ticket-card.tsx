import { icons, images } from '@/constants';
import tw from '@/lib/tailwind';
import { Ticket } from '@/lib/types';
import { call, formatDate } from '@/lib/utils';
import { Image, Text, TouchableOpacity, View } from 'react-native';



export const TicketCard = ({ item }: { item: Ticket }) => {
    return (
        <View style={tw`p-3 bg-white gap-y-5 rounded-lg shadow-md shadow-gray-400`}>
            <View style={tw`flex-row gap-x-4 pb-5 border-b border-dashed`}>
                <Image
                    source={{ uri: item.qr_code_url }}
                    resizeMode="contain"
                    style={tw`w-[150px] h-[150px]`}
                />
                <View style={tw`flex-1 justify-between`}>
                    <Text style={tw`font-JakartaSemiBold text-lg -mt-2`}>ORDER #{item.ride_id}</Text>
                    <View style={tw`flex-row items-center mt-auto mb-2`}>
                        <View style={tw`flex-1 flex-row items-center`}>
                            <Image source={icons.dollar} style={tw`w-4 h-4`} />
                            <Text style={tw`text-sm font-Jakarta ml-1`}>{item.fare_price}</Text>
                        </View>
                        <View style={tw`flex-row items-center`}>
                            <Image source={images.check} style={tw`w-4 h-4`} />
                            <Text style={tw`text-sm font-Jakarta ml-1`}>{item.payment_status}</Text>
                        </View>
                    </View>
                    <Text style={tw`text-sm text-gray-400`}>{formatDate(item.created_at)}</Text>
                </View>
            </View>
            <View style={tw`mb-2 gap-y-2 mr-2`}>
                <View style={tw`flex-row items-center gap-x-2`}>
                    <Image source={icons.to} style={tw`w-5 h-5`} />
                    <Text numberOfLines={1} style={tw`text-[15px] font-JakartaMedium`}>{item.origin_address}</Text>
                </View>
                <View style={tw`flex-row items-center gap-x-2`}>
                    <Image source={icons.point} style={tw`w-5 h-5`} />
                    <Text numberOfLines={1} style={tw`text-[15px] font-JakartaMedium`}>{item.destination_address}</Text>
                </View>
            </View>

            <View style={tw`flex-row items-center bg-general-500 rounded-lg p-3 gap-x-3`}>
                <View style={tw`relative`}>
                    <Image
                        source={{ uri: item.driver.profile_image_url }}
                        style={tw`w-14 h-14 rounded-full`}
                    />
                    <Image
                        source={{ uri: item.driver.car_image_url }}
                        resizeMode="contain"
                        style={tw`w-8 h-8 absolute -bottom-[10px] -right-[14px]`}
                    />
                </View>
                <View style={tw`flex-1 ml-3 mr-1`}>
                    <Text style={tw`text-gray-500`}>Driver:</Text>
                    <Text numberOfLines={1} style={tw`text-base font-JakartaSemiBold`}>{item.driver.first_name} {item.driver.last_name}</Text>
                </View>
                <TouchableOpacity onPress={() => call(item.driver.phone)}>
                    <Image
                        source={icons.phone}
                        style={tw`w-8 h-8`}
                        tintColor="#0cc25f"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}