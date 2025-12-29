// Main App file - Navigation setup
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthProvider, useAuth } from './AuthContext';
import { useTranslation, TranslationProvider } from './useTranslation';

// Auth Screens
import WelcomeScreen from './screens/auth/WelcomeScreen';
import PhoneNumberScreen from './screens/auth/PhoneNumberScreen';
import OTPVerificationScreen from './screens/auth/OTPVerificationScreen';

// Main App Screens
import HomeScreen from './screens/app/HomeScreen';
import CategoryListingScreen from './screens/app/CategoryListingScreen';
import ProviderSelectionScreen from './screens/app/ProviderSelectionScreen';
import BookingSummaryScreen from './screens/app/BookingSummaryScreen';
import LiveTrackingScreen from './screens/app/LiveTrackingScreen';
import MyBookingsScreen from './screens/app/MyBookingsScreen';
import ProfileScreen from './screens/app/ProfileScreen';
import EditProfileScreen from './screens/app/EditProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="CategoryListing" component={CategoryListingScreen} />
      <Stack.Screen name="ProviderSelection" component={ProviderSelectionScreen} />
      <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
      <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'help';
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'BookingsTab') {
            iconName = focused ? 'event-note' : 'event-note';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: '#00F5FF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarStyle: {
          backgroundColor: '#0A0E27',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: t('nav.home') }} />
      <Tab.Screen name="BookingsTab" component={MyBookingsScreen} options={{ title: t('nav.bookings') }} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: t('nav.profile') }} />
    </Tab.Navigator>
  );
};

function AppContent() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0A0E27', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00F5FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TranslationProvider>
        <AppContent />
      </TranslationProvider>
    </AuthProvider>
  );
}
