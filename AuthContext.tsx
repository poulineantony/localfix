import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService, { User } from './services/auth.service';

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: () => void;
    logout: () => void;
    setUser: (user: User | null) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            if (token) {
                setIsLoggedIn(true);
                // Fetch user data
                try {
                    const response = await authService.getMe();
                    if (response.success && response.data) {
                        setUser(response.data);
                    }
                } catch (e) {
                    console.error('Error fetching user profile:', e);
                }
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = () => {
        setIsLoggedIn(true);
        // Fetch user data immediately on login
        authService.getMe().then(response => {
            if (response.success && response.data) {
                setUser(response.data);
            }
        });
    };

    const logout = async () => {
        try {
            await AsyncStorage.multiRemove(['auth_token', 'refresh_token']);
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
