import { icons } from '@/constants';
import tw from '@/lib/tailwind';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useMemo, useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Map } from './map';



type RideLayoutProps = {
    children: React.ReactNode;
    title?: string;
}

export const RideLayout = ({ title, children }: RideLayoutProps) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["5%", "50%", "85%"], []);
    const BottomContainer = title === "Ride" ? BottomSheetView : BottomSheetScrollView;


    return (
        <GestureHandlerRootView>
            <View style={tw`flex-1 bg-transparent`}>
                <View style={tw`absolute flex-row items-center px-5 gap-x-5 top-16 z-10`}>
                    <TouchableOpacity onPress={router.back}>
                        <View style={tw`w-10 h-10 bg-white rounded-full justify-center items-center shadow`}>
                            <Image
                                source={icons.backArrow}
                                resizeMode='contain'
                                style={tw`w-6 h-6`}
                                tintColor='#333'
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={tw`text-xl font-JakartaSemiBold`}>{title ?? "Go Back"}</Text>
                </View>

                <Map />

                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    index={1}
                    handleIndicatorStyle={tw`bg-[#333]`}
                >
                    <BottomContainer
                        showsVerticalScrollIndicator={false}
                        style={tw.style(title === "Ride" && 'p-5 pb-8')}
                        contentContainerStyle={tw`p-5 pb-8`}
                    >
                        {children}
                    </BottomContainer>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )
}