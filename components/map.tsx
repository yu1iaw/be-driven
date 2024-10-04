import { icons } from '@/constants';
import { prisma } from '@/lib/db';
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from '@/lib/map-utils';
import tw from '@/lib/tailwind';
import { MarkerData } from '@/lib/types';
import { useDriverStore } from '@/store/driver-store';
import { useLocationStore } from '@/store/location-store';
import { router, usePathname } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';



export const Map = () => {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const userLatitude = useLocationStore(store => store.userLatitude);
    const userLongitude = useLocationStore(store => store.userLongitude);
    const destinationLatitude = useLocationStore(store => store.destinationLatitude);
    const destinationLongitude = useLocationStore(store => store.destinationLongitude);
    const selectedDriver = useDriverStore(store => store.selectedDriver);
    const setDrivers = useDriverStore(store => store.setDrivers);
    const drivers = prisma.driver.useFindMany();
    const pathname = usePathname();

    const region = useMemo(() => calculateRegion({
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
    }), [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);


    useEffect(() => {
        if (Array.isArray(drivers)) {
            if (!userLatitude || !userLongitude) return;

            const newMarkers = generateMarkersFromData({
                data: drivers,
                userLatitude,
                userLongitude
            })

            setMarkers(newMarkers);
        }
    }, [drivers, userLatitude, userLongitude])


    useEffect(() => {
        if (pathname === "/find-ride") {
            if (markers.length && destinationLatitude && destinationLongitude) {                 
                calculateDriverTimes({
                    markers,
                    userLatitude,
                    userLongitude,
                    destinationLatitude,
                    destinationLongitude,
                }).then((drivers) => {
                    setDrivers(drivers as MarkerData[]);
                });
            }
        }
    }, [markers, destinationLatitude, destinationLongitude]);


    if (!userLatitude && !userLongitude)
        return (
            <View style={tw`flex-1 flex-center`}>
                <ActivityIndicator size="small" color="#000" />
            </View>
        );


    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            mapType={"standard"}
            showsPointsOfInterest={false}
            showsUserLocation
            userInterfaceStyle="light"
            tintColor='black'
            initialRegion={region}
            style={tw`w-full h-full`}
        >
            {markers.map(marker => (
                <Marker
                    key={marker.id}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude
                    }}
                    title={marker.title}
                    image={selectedDriver === marker.id ? icons.selectedMarker : icons.marker}
                />
            ))}
            {destinationLatitude && destinationLongitude && (
                <>
                    <Marker
                        key="destination"
                        coordinate={{
                            latitude: destinationLatitude,
                            longitude: destinationLongitude
                        }}
                        title='Target'
                        image={icons.pin}
                    />
                    {userLatitude && userLongitude && (
                        <MapViewDirections
                            origin={{
                                latitude: userLatitude,
                                longitude: userLongitude
                            }}
                            destination={{
                                latitude: destinationLatitude,
                                longitude: destinationLongitude
                            }}
                            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
                            strokeWidth={3}
                            strokeColor='#0286FF'
                            onError={() => router.push('/error')}
                        />
                    )}
                </>
            )}
        </MapView>
    )
}

