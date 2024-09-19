import { Stack } from "expo-router";


export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>
    )
}