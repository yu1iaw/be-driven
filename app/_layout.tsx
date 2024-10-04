import { driversPrisma } from '@/constants';
import { initializeDb } from '@/lib/db';
import { upsertDrivers } from '@/lib/prisma';
import tw from '@/lib/tailwind';
import { useUserStore } from '@/store/user-store';
import { useFonts } from 'expo-font';
import { router, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useDeviceContext } from 'twrnc';


export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router';


SplashScreen.preventAutoHideAsync();


function InitialLayout() {
    const [dbIsInitialized, setDbIsInitialized] = useState(false);
    const username = useUserStore(store => store.username);
    const hashedPassword = useUserStore(store => store.hashedPassword);
    const createdAt = useUserStore(store => store.createdAt);
    const [loaded, error] = useFonts({
        "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
        "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
        "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
        "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
        "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
        "Jakarta": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
        "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    });



    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        (async () => {
            try {
                await initializeDb();
                setDbIsInitialized(true);

                for (const driver of driversPrisma) {
                    await upsertDrivers(driver);
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])


    useEffect(() => {
        if (!loaded) return;

        if (username) {
            router.replace('/home');
        } else if (hashedPassword) {
            router.replace('/sign-in');
        } else if (createdAt) {
          router.replace('/register');
        } else {
            router.replace('/welcome');
        }
    }, [username, loaded])


    if (!loaded || !dbIsInitialized) {
        return <Slot />
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            <Stack.Screen name="error" options={{ headerTitleAlign: "center" }} />
        </Stack>
    );
}

export default function RootLayout() {
    useDeviceContext(tw);

    return <InitialLayout />
}
