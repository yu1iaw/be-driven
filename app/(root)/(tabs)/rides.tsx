import { EmptyList } from "@/components/empty-list";
import { RideCard } from "@/components/ride-card";
import { getUserRides, getUserRidesQuantity, RecentRide } from "@/lib/prisma";
import tw from "@/lib/tailwind";
import { useUserStore } from "@/store/user-store";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, SafeAreaView, Text } from "react-native";


export default function Rides() {
    const [rides, setRides] = useState<RecentRide[]>([]);
    const [multiplier, setMultiplier] = useState(1);
    const [loading, setLoading] = useState(false);
    const userId = useUserStore(store => store.userId);

    
    useFocusEffect(
        useCallback(() => {
            if (!userId) return;

            (async () => {
                setLoading(true);
                try {
                    const sliceOfRides = await getUserRides(userId, 0);
                    setRides(sliceOfRides);

                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    setMultiplier(1);
                }
            })()
        }, [userId])
    )


    const handleOnEndReached = async () => {
        if (!userId) return; 

        setLoading(true);
        try {
            const ridesLength = await getUserRidesQuantity(userId);
            const hasRemainingRides = ridesLength / 5 > multiplier;
            if (hasRemainingRides) {
                const sliceOfRides = await getUserRides(userId, multiplier);
                
                setRides(prev => [...prev, ...sliceOfRides]);
                setMultiplier(prev => prev + 1);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }


    return (
        <SafeAreaView style={tw`flex-1 bg-general-500`}>
            <FlatList
                data={rides}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <RideCard ride={item} renderLoader={index === rides.length - 1 && loading} />
                )}
                contentContainerStyle={tw`p-4 pb-34`}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={<EmptyList loading={loading} />}
                ListHeaderComponent={(
                    <Text style={tw`text-2xl font-JakartaExtraBold mt-10 mb-6`}>All Rides</Text>
                )}
                onEndReached={handleOnEndReached}
            />
        </SafeAreaView>
    )
}