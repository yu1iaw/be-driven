import { EmptyList } from "@/components/empty-list";
import { TicketCard } from "@/components/ticket-card";
import { getUserTickets, getUserTicketsQuantity, TicketInfo } from "@/lib/prisma";
import tw from "@/lib/tailwind";
import { useUserStore } from "@/store/user-store";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Tickets() {
    const [tickets, setTickets] = useState<TicketInfo[]>([]);
    const [multiplier, setMultiplier] = useState(1);
    const [loading, setLoading] = useState(false);
    const userId = useUserStore(store => store.userId);


    useFocusEffect(
        useCallback(() => {
            if (!userId) return;

            (async () => {
                setLoading(true);

                try {
                    const userTickets = await getUserTickets(userId, 0);
                    setTickets(userTickets);

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
            const ticketsLength = await getUserTicketsQuantity(userId);
            const hasRemainingTickets = ticketsLength / 5 > multiplier;
            if (hasRemainingTickets) {
                const sliceOfTickets = await getUserTickets(userId, multiplier);

                setTickets(prev => [...prev, ...sliceOfTickets]);
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
                data={tickets}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`gap-y-4 p-4 pb-38`}
                renderItem={({ item, index }) => <TicketCard item={item} renderLoader={index === tickets.length - 1 && loading} />}
                ListEmptyComponent={<EmptyList loading={loading} />}
                ListHeaderComponent={(
                    <Text style={tw`text-2xl font-JakartaExtraBold mt-6 mb-2`}>All Tickets</Text>
                )}
                onEndReached={handleOnEndReached}
            />
        </SafeAreaView>
    )
}