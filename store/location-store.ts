import { LocationStore } from "@/lib/types";
import { create } from "zustand";


export const useLocationStore = create<LocationStore>()((set) => ({
    userAddress: null,
    userLatitude: null,
    userLongitude: null,
    destinationAddress: null,
    destinationLatitude: null,
    destinationLongitude: null,
    setUserLocation: ({ latitude, longitude, address }: { latitude: number, longitude: number, address: string }) => {
        set({
            userAddress: address,
            userLatitude: latitude,
            userLongitude: longitude
        })   
    },
    setDestinationLocation: ({ latitude, longitude, address }: { latitude: number, longitude: number, address: string }) => {
        set({
            destinationAddress: address,
            destinationLatitude: latitude,
            destinationLongitude: longitude
        })
    },
}))