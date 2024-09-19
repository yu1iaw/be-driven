import { EmptyList } from "@/components/empty-list";
import { RideCard } from "@/components/ride-card";
import { useFetch } from "@/lib/fetch";
import tw from "@/lib/tailwind";
import { Ride } from "@/lib/types";
import { useUserStore } from "@/store/user-store";
import { FlatList, SafeAreaView, Text } from "react-native";


export default function Rides() {
    const userId = useUserStore(store => store.userId);
    const { data: rides, loading } = useFetch<Ride[]>(userId ? `/ride/${userId}`: undefined);


    return (
        <SafeAreaView style={tw`flex-1 bg-general-500`}>
            <FlatList
                data={rides}
                keyExtractor={item => item.ride_id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <RideCard ride={item} />
                )}
                contentContainerStyle={tw`p-4 pb-28`}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={<EmptyList loading={loading} />}
                ListHeaderComponent={(
                    <Text style={tw`text-2xl font-JakartaExtraBold mt-10 mb-6`}>All Rides</Text>
                )}
            />

        </SafeAreaView>
    )
}