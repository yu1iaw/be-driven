import { TLightStore } from "@/lib/types";
import { create } from "zustand";



export const useLightStore = create<TLightStore>()(() => ({
    light: "off",
}))

export const setLight = (text: 'off' | 'on') => useLightStore.setState({ light: text })