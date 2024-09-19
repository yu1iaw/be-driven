import tw from '@/lib/tailwind';
import { useUserStore } from '@/store/user-store';
import { useFonts } from 'expo-font';
import { router, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useDeviceContext } from 'twrnc';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';


SplashScreen.preventAutoHideAsync();


function InitialLayout() {
  const username = useUserStore(state => state.username);
  const hashedPassword = useUserStore(state => state.hashedPassword);
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
    if (!loaded) return;

    if (username) {
      router.replace('/home');
    } else if (hashedPassword) {
      router.replace('/sign-in');
    } else {
      router.replace('/register');
    }
  }, [username, loaded])


  if (!loaded) {
    return <Slot />;
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
