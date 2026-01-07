import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface BlockingScreenProps {
    type: 'maintenance' | 'update';
    message?: string;
}

const BlockingScreen: React.FC<BlockingScreenProps> = ({ type, message }) => {
    // Disable back button
    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => backHandler.remove();
    }, []);

    const isMaintenance = type === 'maintenance';
    const iconName = isMaintenance ? 'build' : 'system-update';
    const title = isMaintenance ? 'Under Maintenance' : 'Update Required';
    const defaultMessage = isMaintenance
        ? 'We are improving our servers. Please try again later.'
        : 'Please update to the latest version to continue using LocalFix.';

    return (
        <View style={styles.container}>
            <View style={styles.gradientBackground}>
                <View style={[styles.gradientCircle, styles.circle1]} />
                <View style={[styles.gradientCircle, styles.circle2]} />
            </View>

            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name={iconName} size={80} color="#00F5FF" />
                </View>

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message || defaultMessage}</Text>

                {!isMaintenance && (
                    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Update Now</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0E27',
        justifyContent: 'center',
        padding: 24,
    },
    gradientBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    gradientCircle: {
        position: 'absolute',
        borderRadius: 1000,
        opacity: 0.1,
    },
    circle1: {
        width: 400,
        height: 400,
        backgroundColor: '#FFD700',
        top: -100,
        right: -100,
    },
    circle2: {
        width: 300,
        height: 300,
        backgroundColor: '#00F5FF',
        bottom: -50,
        left: -50,
    },
    content: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 140,
        height: 140,
        backgroundColor: 'rgba(0, 245, 255, 0.1)',
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        borderWidth: 1,
        borderColor: 'rgba(0, 245, 255, 0.3)',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#00F5FF',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#0A0E27',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BlockingScreen;
