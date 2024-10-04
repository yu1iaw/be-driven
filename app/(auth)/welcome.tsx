import { CustomButton } from "@/components/custom-button";
import { onboarding } from "@/constants";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";



const isShovel = Dimensions.get("window").height > 592;

export default function Welcome() {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<Swiper>(null);
    const isLastSlide = activeIndex === onboarding.length - 1;

    
    return (
        <SafeAreaView style={tw`flex-1 items-center justify-between`}>
            <TouchableOpacity
                style={tw`self-end p-5`}
                onPress={() => router.replace('/register')}
            >
                <Text style={tw`text-black text-lg font-JakartaBold`}>Skip</Text>
            </TouchableOpacity>
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View style={tw`w-[32px] h-1 mx-1 bg-[#e2e8f0] rounded-full`} />}
                activeDot={<View style={tw`w-[32px] h-1 mx-1 bg-[#0286ff] rounded-full`} />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map(item => (
                    <View key={item.id} style={tw`flex-center p-5`}>
                        <Image
                            source={item.image}
                            resizeMode="contain"
                            style={tw.style(`w-full`, {
                                'h-[300px]': isShovel,
                                'h-[250px]': !isShovel
                            })}
                        />
                        <View
                            style={tw.style(`flex-center`, {
                                'mt-10': isShovel,
                                'mt-2': !isShovel
                            })}
                        >
                            <Text
                                style={tw.style(`text-black font-bold mx-1 text-center`, {
                                    'text-3xl': isShovel,
                                    'text-xl': !isShovel
                                })}
                            >
                                {item.title}
                            </Text>
                        </View>
                        <Text
                            style={tw.style(`text-[#858585] text-center mt-3 mx-1 font-JakartaSemiBold`, {
                                'text-lg': isShovel,
                                'text-base': !isShovel
                            })}
                        >
                            {item.description}
                        </Text>
                    </View>
                ))}
            </Swiper>
            <CustomButton
                title={isLastSlide ? "Get Started" : "Next"}
                className={`w-11/12 mb-2 ${isShovel ? 'mt-8' : 'mt-0'}`}
                onPress={() => isLastSlide
                    ? router.replace('/register')
                    : swiperRef.current?.scrollBy(1)
                }
            />
        </SafeAreaView>
    )
}