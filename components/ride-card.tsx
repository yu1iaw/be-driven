import { icons } from '@/constants';
import { RecentRide } from '@/lib/prisma';
import tw from '@/lib/tailwind';
import { formatDate } from '@/lib/utils';
import { memo } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';


type RideCardProps = {
    ride: RecentRide,
    renderLoader?: boolean;
}

export const RideCard = memo(({ ride: { destinationLatitude, destinationLongitude, originAddress, destinationAddress, createdAt, driver, paymentStatus }, renderLoader }: RideCardProps) => {
    return (
        <View>
            <View style={tw`p-3 rounded-lg shadow-md shadow-gray-400 bg-white mb-4`}>
                <View style={tw`flex-row items-center`}>
                    <Image
                        source={{ uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destinationLongitude},${destinationLatitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}` }}
                        style={tw`w-20 h-[90px] rounded-lg`}
                    />
                    <View style={tw`flex-1 gap-y-5 mx-4`}>
                        <View style={tw`flex-row items-center gap-x-2`}>
                            <Image source={icons.to} style={tw`w-5 h-5`} />
                            <Text numberOfLines={1} style={tw`text-[15px] font-JakartaMedium mb-1`}>{originAddress}</Text>
                        </View>
                        <View style={tw`flex-row items-center gap-x-2`}>
                            <Image source={icons.point} style={tw`w-5 h-5`} />
                            <Text numberOfLines={1} style={tw`text-[15px] font-JakartaMedium mb-1`}>{destinationAddress}</Text>
                        </View>
                    </View>
                </View>

                <View style={tw`mt-5 bg-general-500 rounded-lg p-3 gap-y-5`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-[15px] font-JakartaSemiBold text-gray-500`}>Date & Time</Text>
                        <Text style={tw`text-[15px] font-JakartaLight text-gray-500`}>{formatDate(createdAt)}</Text>
                    </View>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-[15px] font-JakartaSemiBold text-gray-500`}>Driver</Text>
                        <Text style={tw`text-[15px] font-JakartaMedium text-gray-500`}>{driver.firstName} {driver.lastName}</Text>
                    </View>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-[15px] font-JakartaSemiBold text-gray-500`}>Car Seats</Text>
                        <Text style={tw`text-[15px] font-Jakarta text-gray-500`}>{driver.carSeats}</Text>
                    </View>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-[15px] font-JakartaSemiBold text-gray-500`}>Payment Status</Text>
                        <Text style={tw.style(`text-[15px] font-JakartaMedium text-gray-500`, paymentStatus === "paid" ? "text-green-500" : "text-red-500")}>{paymentStatus}</Text>
                    </View>
                </View>
            </View>
            {renderLoader && (
                <View style={tw`w-full absolute -bottom-8 items-center`}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    )
})