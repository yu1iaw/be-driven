import * as Crypto from 'expo-crypto';
import { Linking } from "react-native";
import { ButtonProps } from "./types";



export const getBGVariantStyle = (variant: ButtonProps["bgVariant"]) => {
    switch (variant) {
        case "secondary":
            return 'bg-gray-500';
        case "danger":
            return 'bg-red-500';
        case "success":
            return 'bg-green-500';
        case "outline":
            return 'bg-transparent border-neutral-300 border-[0.5px]';
        default:
            return 'bg-[#004d7a]';
    }
}

export const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
        case "primary":
            return 'text-black';
        case "secondary":
            return 'text-gray-100';
        case "danger":
            return 'text-red-500';
        case "success":
            return 'text-green-500';
        default:
            return 'text-white';
    }
}

export const formatDate = (param: string) => {
    return new Date(param).toLocaleDateString("default", {
        // dateStyle: "medium",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}

export function formatTime(minutes: number): string {
    const formattedMinutes = +minutes?.toFixed(0) || 0;

    if (formattedMinutes < 60) {
        return `${formattedMinutes} min`;
    } else {
        const hours = Math.floor(formattedMinutes / 60);
        const remainingMinutes = formattedMinutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    }
}

export const hashPassword = async (password: string) => {
    try {
        const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyPassword = async (password: string, hashedPassword: string) => {    
    try {
        const hashedPasswordClone = await hashPassword(password);
        
        return hashedPassword === hashedPasswordClone;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const call = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
}