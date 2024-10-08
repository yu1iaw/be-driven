import { TUserStore } from '@/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



export const useUserStore = create<TUserStore>()(
    persist(
        (set, get) => ({
            userId: null,
            username: null,
            hashedPassword: null,
            picture: null,
            createdAt: null,
            initialCoords: null,
            setUserId: (userId: number) => set({ userId }),
            setUsername: (username: string) => set({ username }),
            setHashedPassword: (hashedPassword: string) => set({ hashedPassword }),
            setPicture: (url: string) => set({ picture: url }),
            setCreatedAt: (date: Date) => set({ createdAt: date }),
            setInitialCoords: ({ latitude, longitude }) => set({ initialCoords: { latitude, longitude } }),
            logout: () => set({ username: null, userId: null }),
            deleteAccount: () => set({
                userId: null,
                username: null,
                hashedPassword: null,
                picture: null,
                initialCoords: null,
            })
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)

