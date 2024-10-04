import { CustomButton } from "@/components/custom-button";
import { DriverCard } from "@/components/driver-card";
import { RideLayout } from "@/components/ride-layout";
import { useDriverStore } from "@/store/driver-store";
import { router } from "expo-router";
import { FlatList } from "react-native";



export default function ConfirmRide() {
    const drivers = useDriverStore(store => store.drivers);
    const selectedDriver = useDriverStore(store => store.selectedDriver);
    const setSelectedDriver = useDriverStore(store => store.setSelectedDriver);

    return (
        <RideLayout title="Choose a Driver">
            <FlatList
                data={drivers}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <DriverCard item={item} selected={selectedDriver!} setSelected={() => setSelectedDriver(item.id)} />
                )}
                ListFooterComponent={(
                    <CustomButton
                        title="Select Ride"
                        onPress={() => {
                            if (!selectedDriver) return;
                            router.navigate('/(root)/book-ride');
                        }}
                        className="my-10"
                    />
                )}
            />
        </RideLayout>
    )
}