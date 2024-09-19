import { icons } from '@/constants';
import tw from '@/lib/tailwind';
import { Ride } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Image, Text, View } from 'react-native';



export const RideCard = ({ ride: { destination_latitude, destination_longitude, origin_address, destination_address, created_at, driver, payment_status } }: { ride: Ride }) => {
    return (
        <View style={tw`p-3 rounded-lg shadow-md shadow-gray-400 bg-white mb-4`}>
            <View style={tw`flex-row items-center`}>
                <Image
                    source={{ uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}` }}
                    style={tw`w-20 h-[90px] rounded-lg`}
                />
                <View style={tw`flex-1 gap-y-5 mx-4`}>
                    <View style={tw`flex-row items-center gap-x-2`}>
                        <Image source={icons.to} style={tw`w-5 h-5`} />
                        <Text numberOfLines={1} style={tw`text-[15px] font-JakartaMedium mb-1`}>{origin_address}</Text>
                    </View>
                    <View style={tw`flex-row items-center gap-x-2`}>
                        <Image source={icons.point} style={tw`w-5 h-5`} />
                        <Text numberOfLines={1} style={tw`text-[15px] font-JakartaMedium mb-1`}>{destination_address}</Text>
                    </View>
                </View>
            </View>

            <View style={tw`mt-5 bg-general-500 rounded-lg p-3 gap-y-5`}>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`text-[15px] font-JakartaSemiBold text-gray-500`}>Date & Time</Text>
                    <Text style={tw`text-[15px] font-JakartaLight text-gray-500`}>{formatDate(created_at)}</Text>
                </View>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`text-[15px] font-JakartaSemiBold text-gray-500`}>Driver</Text>
                    <Text style={tw`text-[15px] font-JakartaMedium text-gray-500`}>{driver.first_name} {driver.last_name}</Text>
                </View>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`text-[15px] font-JakartaSemiBold text-gray-500`}>Car Seats</Text>
                    <Text style={tw`text-[15px] font-Jakarta text-gray-500`}>{driver.car_seats}</Text>
                </View>
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`text-[15px] font-JakartaSemiBold text-gray-500`}>Payment Status</Text>
                    <Text style={tw.style(`text-[15px] font-JakartaMedium text-gray-500`, payment_status === "paid" ? "text-green-500" : "text-red-500")}>{payment_status}</Text>
                </View>
            </View>
        </View>
    )
}