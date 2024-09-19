import { DriverStore, MarkerData } from "@/lib/types";
import { create } from "zustand";



export const useDriverStore = create<DriverStore>()((set) => ({
    drivers: [] as MarkerData[],
    selectedDriver: null,
    setSelectedDriver: (driverId) => {
        set({ selectedDriver: driverId })
    },
    setDrivers: (drivers: MarkerData[]) => {
        set({ drivers })
    },
    clearSelectedDriver: () => set({ selectedDriver: null })
}))