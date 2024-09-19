import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export default function ErrorScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View style={styles.container}>
                <Text style={styles.title}>Some error occurred.</Text>
                <Text style={styles.title}>Try something else</Text>

                <Link href="/(root)/(tabs)/home" style={styles.link}>
                    <Text style={styles.linkText}>Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    link: {
        marginTop: 10,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
