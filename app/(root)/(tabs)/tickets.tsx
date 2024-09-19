import { EmptyList } from "@/components/empty-list";
import { TicketCard } from "@/components/ticket-card";
import { useFetch } from "@/lib/fetch";
import tw from "@/lib/tailwind";
import { Ticket } from "@/lib/types";
import { useUserStore } from "@/store/user-store";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Tickets() {
    const userId = useUserStore(store => store.userId);
    const { data: tickets, loading } = useFetch<Ticket[]>(userId ? `/ticket/${userId}`: undefined);
    

    return (
        <SafeAreaView style={tw`flex-1 bg-general-500`}>
            <FlatList
                data={tickets}
                keyExtractor={item => item.ticket_id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`gap-y-4 p-4 pb-32`}
                renderItem={({ item }) => <TicketCard item={item} />}
                ListEmptyComponent={<EmptyList loading={loading} />}
                ListHeaderComponent={(
                    <Text style={tw`text-2xl font-JakartaExtraBold mt-6 mb-2`}>All Tickets</Text>
                )}
            />
        </SafeAreaView>
    )
}