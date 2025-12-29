import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './config/api.config';
import { useAuth } from './AuthContext';

interface TranslationData {
    [key: string]: string;
}

interface TranslationContextType {
    t: (key: string, defaultValue?: string) => string;
    language: string;
    changeLanguage: (lang: string) => Promise<void>;
    loading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [translations, setTranslations] = useState<TranslationData>({});
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, user } = useAuth();

    // Load initial language and translations
    useEffect(() => {
        initTranslation();
    }, [isLoggedIn]); // Refresh if login state changes (might pull user profile lang)

    // Listen for language changes or login updates
    // Listen for language changes or login updates
    // useEffect(() => {
    //     if (user?.language && user.language !== language) {
    //         changeLanguage(user.language);
    //     }
    // }, [user?.language]);

    const initTranslation = async () => {
        try {
            setLoading(true);

            // 1. Determine local preference
            let currentLang = 'en';
            const storedLang = await AsyncStorage.getItem('user_language');
            if (storedLang) {
                currentLang = storedLang;
            } else if (user?.language) {
                currentLang = user.language;
            }
            setLanguage(currentLang);

            // 2. Load cached translations first (for speed)
            const cachedData = await AsyncStorage.getItem(`translations_${currentLang}`);
            const cachedVersion = await AsyncStorage.getItem('translation_version');

            if (cachedData) {
                setTranslations(JSON.parse(cachedData));
            }

            // 3. Check for updates from server
            await checkAndFetchTranslations(currentLang, cachedVersion);

        } catch (error) {
            console.error('Error initializing translation:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkAndFetchTranslations = async (lang: string, localVersion: string | null, force: boolean = false) => {
        try {
            const response = await fetch(`${API_BASE_URL}/translations/${lang}`);
            const result = await response.json();

            if (result.success) {
                const serverVersion = result.version?.toString();

                // If version changed or no local data, update
                if (serverVersion !== localVersion || !localVersion || force) {
                    console.log(`Updating translations for ${lang}: v${localVersion} -> v${serverVersion} (${Object.keys(result.data).length} keys)`);
                    setTranslations(result.data);
                    await AsyncStorage.setItem(`translations_${lang}`, JSON.stringify(result.data));
                    if (serverVersion) {
                        await AsyncStorage.setItem('translation_version', serverVersion);
                    }
                } else {
                    console.log(`Translations for ${lang} are up to date (v${serverVersion})`);
                }
            } else {
                console.error(`Fetch translations for ${lang} returned success: false`, result);
            }
        } catch (error) {
            console.error(`Failed to fetch translations for ${lang}:`, error);
        }
    };

    const changeLanguage = async (lang: string) => {
        try {
            setLanguage(lang);
            setLoading(true);

            await AsyncStorage.setItem('user_language', lang);

            // Load cached for new language if exists
            const cachedData = await AsyncStorage.getItem(`translations_${lang}`);
            if (cachedData) {
                setTranslations(JSON.parse(cachedData));
            } else {
                setTranslations({}); // Clear old lang if no cache
            }

            // Check server
            const cachedVersion = await AsyncStorage.getItem('translation_version');
            await checkAndFetchTranslations(lang, cachedVersion, !cachedData);

        } catch (error) {
            console.error('Error changing language:', error);
        } finally {
            setLoading(false);
        }
    };

    const t = useCallback((key: string, defaultValue?: string): string => {
        return translations[key] || defaultValue || key;
    }, [translations]);

    return (
        <TranslationContext.Provider value={{ t, language, changeLanguage, loading }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};
