import { icons, images } from '@/constants';
import { TicketInfo } from '@/lib/prisma';
import tw from '@/lib/tailwind';
import { call, formatDate } from '@/lib/utils';
import { memo } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';


type TicketCardProps = {
    item: TicketInfo;
    renderLoader?: boolean;
}

export const TicketCard = memo(({ item, renderLoader }: TicketCardProps) => {
    return (
        <View>
            <View style={tw`p-3 bg-white gap-y-5 rounded-lg shadow-md shadow-gray-400`}>
                <View style={tw`flex-row gap-x-4 pb-5 border-b border-dashed`}>
                    <Image
                        source={{ uri: item.qrCodeUrl }}
                        resizeMode="contain"
                        style={tw`w-[150px] h-[150px]`}
                    />
                    <View style={tw`flex-1 justify-between`}>
                        <Text style={tw`font-JakartaSemiBold text-lg -mt-2`}>ORDER #{item.rideId}</Text>
                        <View style={tw`flex-row items-center mt-auto mb-2`}>
                            <View style={tw`flex-1 flex-row items-center`}>
                                <Image source={icons.dollar} style={tw`w-4 h-4`} />
                                <Text style={tw`text-sm font-Jakarta ml-1`}>{item.ride.farePrice.toFixed(2)}</Text>
                            </View>
                            <View style={tw`flex-row items-center`}>
                                <Image source={images.check} style={tw`w-4 h-4`} />
                                <Text style={tw`text-sm font-Jakarta ml-1`}>{item.ride.paymentStatus}</Text>
                            </View>
                        </View>
                        <Text style={tw`text-sm text-gray-400`}>{formatDate(item.ride.createdAt)}</Text>
                    </View>
                </View>
                <View style={tw`mb-2 gap-y-2 mr-2`}>
                    <View style={tw`flex-row items-center gap-x-2`}>
                        <Image source={icons.to} style={tw`w-5 h-5`} />
                        <Text numberOfLines={1} style={tw`text-[15px] font-JakartaMedium`}>{item.ride.originAddress}</Text>
                    </View>
                    <View style={tw`flex-row items-center gap-x-2`}>
                        <Image source={icons.point} style={tw`w-5 h-5`} />
                        <Text numberOfLines={1} style={tw`text-[15px] font-JakartaMedium`}>{item.ride.destinationAddress}</Text>
                    </View>
                </View>

                <View style={tw`flex-row items-center bg-general-500 rounded-lg p-3 gap-x-3`}>
                    <View style={tw`relative`}>
                        <Image
                            source={{ uri: item.ride.driver.profileImageUrl }}
                            style={tw`w-14 h-14 rounded-full`}
                        />
                        <Image
                            source={{ uri: item.ride.driver.carImageUrl }}
                            resizeMode="contain"
                            style={tw`w-8 h-8 absolute -bottom-[10px] -right-[14px]`}
                        />
                    </View>
                    <View style={tw`flex-1 ml-3 mr-1`}>
                        <Text style={tw`text-gray-500`}>Driver:</Text>
                        <Text numberOfLines={1} style={tw`text-base font-JakartaSemiBold`}>{item.ride.driver.firstName} {item.ride.driver.lastName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => call(item.ride.driver.phone)}>
                        <Image
                            source={icons.phone}
                            style={tw`w-8 h-8`}
                            tintColor="#0cc25f"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {renderLoader && (
                <View style={tw`w-full absolute -bottom-11 items-center`}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    )
})