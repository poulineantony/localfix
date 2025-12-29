import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../AuthContext';
import { authService, userService } from '../../services';
import { useTranslation } from '../../useTranslation';
import { useFocusEffect } from '@react-navigation/native';

interface ProfileScreenProps {
  navigation: any;
}

const MENU_ITEMS = [
  {
    id: '1',
    icon: 'location-on',
    labelKey: 'profile.saved_addresses',
    color: '#00F5FF',
  },
  {
    id: '2',
    icon: 'payment',
    labelKey: 'profile.payment_methods',
    color: '#FFD700',
  },
  {
    id: '3',
    icon: 'account-balance-wallet',
    labelKey: 'profile.wallet',
    color: '#32CD32',
  },
  {
    id: '4',
    icon: 'help',
    labelKey: 'profile.help_support',
    color: '#FF6B6B',
  },
  {
    id: '5',
    icon: 'privacy-tip',
    labelKey: 'profile.privacy_policy',
    color: '#8A2BE2',
  },
  {
    id: '6',
    icon: 'info',
    labelKey: 'profile.about_localfix',
    color: '#FF69B4',
  },
];



const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { logout } = useAuth();
  const { t, changeLanguage } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const fetchUserProfile = async () => {
    try {
      const response = await authService.getMe();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t('auth.logout'),
      t('auth.logout_intro', 'Are you sure you want to logout?'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('auth.logout'),
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleLanguageChange = async (lang: string) => {
    try {
      const response = await userService.updateProfile({
        language: lang
      });

      if (response.success) {
        setUser(response.data);
        await changeLanguage(lang);
        Alert.alert('Success', `Language changed to ${lang === 'en' ? 'English' : 'Tamil'}`);
      } else {
        Alert.alert('Error', 'Failed to update language');
      }
    } catch (error) {
      console.error('Error updating language:', error);
      Alert.alert('Error', 'An error occurred while updating language');
    }
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground}>
        <View style={[styles.gradientCircle, styles.circle1]} />
        <View style={[styles.gradientCircle, styles.circle2]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <View style={styles.profileGlow} />
                {user?.avatar ? (
                  <Image source={{ uri: user.avatar }} style={styles.profileImageImg} />
                ) : (
                  <Text style={styles.profileImageText}>
                    {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                  </Text>
                )}
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
                <MaterialIcons name="edit" size={16} color="#0A0E27" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || t('profile.guest_user')}</Text>
              <Text style={styles.profileEmail}>{user?.email || t('profile.no_email')}</Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statGlow} />
              <MaterialIcons name="shopping-bag" size={24} color="#00F5FF" />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>{t('nav.bookings')}</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statGlow, { backgroundColor: 'rgba(255, 215, 0, 0.15)' }]} />
              <MaterialIcons name="star" size={24} color="#FFD700" />
              <Text style={styles.statNumber}>--</Text>
              <Text style={styles.statLabel}>{t('profile.rating')}</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statGlow, { backgroundColor: 'rgba(50, 205, 50, 0.15)' }]} />
              <MaterialIcons name="savings" size={24} color="#32CD32" />
              <Text style={styles.statNumber}>₹0</Text>
              <Text style={styles.statLabel}>{t('profile.saved')}</Text>
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.phoneSection}>
            <View style={styles.phoneSectionGlow} />
            <View style={styles.phoneContent}>
              <View style={styles.preferenceIconContainer}>
                <MaterialIcons name="phone" size={20} color="#00F5FF" />
              </View>
              <View>
                <Text style={styles.phoneLabel}>{t('profile.phone')}</Text>
                <Text style={styles.phoneNumber}>
                  {user?.phone ? `+91 ${user.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}` : '--'}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editIconButton} onPress={() => navigation.navigate('EditProfile')}>
              <MaterialIcons name="edit" size={18} color="#00F5FF" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === MENU_ITEMS.length - 1 && styles.menuItemLast
                ]}
                activeOpacity={0.8}
              >
                <View style={styles.menuItemGlow} />
                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                  <MaterialIcons name={item.icon} size={22} color={item.color} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuLabel}>{t(item.labelKey)}</Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={16} color="rgba(255, 255, 255, 0.4)" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Preferences */}
          <View style={styles.preferencesSection}>
            <Text style={styles.sectionTitle}>{t('profile.preferences')}</Text>

            {/* Language Selector */}
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIconContainer}>
                <MaterialIcons name="language" size={20} color="#00F5FF" />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>{t('profile.language')}</Text>
                <View style={styles.languageOptions}>
                  <TouchableOpacity
                    style={[
                      styles.languageButton,
                      user?.language === 'en' && styles.languageButtonActive
                    ]}
                    onPress={() => handleLanguageChange('en')}
                  >
                    <Text style={[
                      styles.languageButtonText,
                      user?.language === 'en' && styles.languageButtonTextActive
                    ]}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.languageButton,
                      user?.language === 'ta' && styles.languageButtonActive
                    ]}
                    onPress={() => handleLanguageChange('ta')}
                  >
                    <Text style={[
                      styles.languageButtonText,
                      user?.language === 'ta' && styles.languageButtonTextActive
                    ]}>தமிழ்</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIconContainer}>
                <MaterialIcons name="notifications-active" size={20} color="#FFD700" />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>{t('profile.push_notifications')}</Text>
                <Text style={styles.preferenceDescription}>{t('profile.get_updates')}</Text>
              </View>
              <View style={styles.toggleSwitchActive}>
                <View style={styles.toggleActive} />
              </View>
            </View>
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIconContainer}>
                <MaterialIcons name="email" size={20} color="#8A2BE2" />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>{t('profile.email_updates')}</Text>
                <Text style={styles.preferenceDescription}>{t('profile.receive_offers')}</Text>
              </View>
              <View style={styles.toggleSwitchInactive}>
                <View style={styles.toggleInactive} />
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
            <View style={styles.logoutGlow} />
            <MaterialIcons name="logout" size={22} color="#FF6B6B" />
            <Text style={styles.logoutText}>{t('auth.logout')}</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.versionText}>LocalFix v1.0.0</Text>
            <Text style={styles.footerText}>© 2024 LocalFix. All rights reserved.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
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
    width: 350,
    height: 350,
    backgroundColor: '#00F5FF',
    top: -100,
    right: -80,
  },
  circle2: {
    width: 300,
    height: 300,
    backgroundColor: '#8A2BE2',
    bottom: -100,
    left: -60,
  },
  safeArea: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00F5FF',
    position: 'relative',
  },
  profileGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 245, 255, 0.3)',
    borderRadius: 50,
    zIndex: -1,
  },
  profileImageText: {
    fontSize: 48,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#0A0E27',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 6,
  },
  profileImageImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  statGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    borderRadius: 40,
    top: -20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    fontWeight: '600',
  },
  phoneSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  phoneSectionGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: 'rgba(0, 245, 255, 0.1)',
    borderRadius: 75,
    top: -50,
    left: -30,
  },
  phoneContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  phoneIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  phoneNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  editIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    gap: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 50,
    right: -30,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  preferencesSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  preferenceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preferenceContent: {
    flex: 1,
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  preferenceDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
  },
  toggleSwitchActive: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 245, 255, 0.3)',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleSwitchInactive: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#00F5FF',
    alignSelf: 'flex-end',
  },
  toggleInactive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  languageOptions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  languageButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  languageButtonActive: {
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    borderColor: '#00F5FF',
  },
  languageButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  languageButtonTextActive: {
    color: '#00F5FF',
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderWidth: 2,
    borderColor: '#FF6B6B',
    gap: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  logoutGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 100,
    top: -100,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF6B6B',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  footerText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 6,
  },
});

export default ProfileScreen;
