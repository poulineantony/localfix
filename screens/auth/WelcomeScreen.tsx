import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from '../../useTranslation';

interface WelcomeScreenProps {
  navigation: any;
}

const { width } = Dimensions.get('window');

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { t, language, changeLanguage } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Dark Gradient Background */}
      <View style={styles.gradientBackground}>
        <View style={[styles.gradientCircle, styles.circle1]} />
        <View style={[styles.gradientCircle, styles.circle2]} />
        <View style={[styles.gradientCircle, styles.circle3]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header with Glow Effect */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.headerText}>LocalFix</Text>
              <View style={styles.langContainer}>
                <TouchableOpacity
                  style={[styles.langButton, language === 'en' && styles.langButtonActive]}
                  onPress={() => changeLanguage('en')}
                >
                  <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.langButton, language === 'ta' && styles.langButtonActive]}
                  onPress={() => changeLanguage('ta')}
                >
                  <Text style={[styles.langText, language === 'ta' && styles.langTextActive]}>TA</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.headerGlow} />
          </View>

          {/* Floating Service Icons with Neon Glow */}
          <View style={styles.illustrationContainer}>
            <View style={[styles.iconCircle, styles.iconCenter]}>
              <View style={styles.iconGlow} />
              <MaterialIcons name="plumbing" size={50} color="#00F5FF" />
            </View>
            <View style={[styles.iconCircle, styles.iconTopLeft]}>
              <View style={[styles.iconGlow, { backgroundColor: 'rgba(255, 107, 107, 0.3)' }]} />
              <MaterialIcons name="electrical-services" size={45} color="#FF6B6B" />
            </View>
            <View style={[styles.iconCircle, styles.iconTopRight]}>
              <View style={[styles.iconGlow, { backgroundColor: 'rgba(138, 43, 226, 0.3)' }]} />
              <MaterialIcons name="cleaning-services" size={45} color="#8A2BE2" />
            </View>
            <View style={[styles.iconCircle, styles.iconBottomLeft]}>
              <View style={[styles.iconGlow, { backgroundColor: 'rgba(50, 205, 50, 0.3)' }]} />
              <MaterialIcons name="build" size={40} color="#32CD32" />
            </View>
            <View style={[styles.iconCircle, styles.iconBottomRight]}>
              <View style={[styles.iconGlow, { backgroundColor: 'rgba(255, 215, 0, 0.3)' }]} />
              <MaterialIcons name="ac-unit" size={40} color="#FFD700" />
            </View>
          </View>

          {/* Headline with Gradient Text Effect */}
          <Text style={styles.headline}>{t('welcome.headline')}</Text>

          {/* Subheadline */}
          <Text style={styles.subheadline}>
            {t('welcome.subheadline')}
          </Text>

          {/* Glassmorphism Feature Cards */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <MaterialIcons name="verified-user" size={24} color="#00F5FF" />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{t('welcome.verified_pros')}</Text>
                <Text style={styles.featureSubtitle}>{t('welcome.background_checked')}</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <MaterialIcons name="flash-on" size={24} color="#FFD700" />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{t('welcome.instant_booking')}</Text>
                <Text style={styles.featureSubtitle}>{t('welcome.book_in_60')}</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <MaterialIcons name="location-on" size={24} color="#FF6B6B" />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{t('welcome.near_you')}</Text>
                <Text style={styles.featureSubtitle}>{t('welcome.services_nearby')}</Text>
              </View>
            </View>
          </View>

          {/* Premium Info Card */}
          <View style={styles.bottomCard}>
            <View style={styles.cardGlow} />
            <MaterialIcons name="stars" size={24} color="#FFD700" />
            <Text style={styles.cardText}>{t('welcome.join_customers')}</Text>
          </View>
        </ScrollView>

        {/* Neon Get Started Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('PhoneNumber')}
            activeOpacity={0.85}
          >
            <View style={styles.buttonGlow} />
            <Text style={styles.buttonText}>{t('welcome.get_started')}</Text>
            <MaterialIcons name="arrow-forward" size={24} color="#0A0E27" />
          </TouchableOpacity>
        </View>
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
    opacity: 0.15,
  },
  circle1: {
    width: 400,
    height: 400,
    backgroundColor: '#00F5FF',
    top: -100,
    left: -100,
  },
  circle2: {
    width: 350,
    height: 350,
    backgroundColor: '#8A2BE2',
    bottom: -50,
    right: -80,
  },
  circle3: {
    width: 250,
    height: 250,
    backgroundColor: '#FF6B6B',
    top: '40%',
    right: -50,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 50,
    position: 'relative',
  },
  headerText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  langContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  langButtonActive: {
    backgroundColor: '#00F5FF',
  },
  langText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '700',
    fontSize: 12,
  },
  langTextActive: {
    color: '#0A0E27',
  },
  headerGlow: {
    position: 'absolute',
    width: 150,
    height: 40,
    backgroundColor: '#00F5FF',
    opacity: 0.3,
    borderRadius: 20,
    top: 10,
    left: 0,
    zIndex: -1,
  },
  illustrationContainer: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  iconCircle: {
    position: 'absolute',
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  iconCenter: {
    width: 110,
    height: 110,
    zIndex: 3,
  },
  iconTopLeft: {
    width: 90,
    height: 90,
    top: 20,
    left: 30,
    zIndex: 2,
  },
  iconTopRight: {
    width: 90,
    height: 90,
    top: 20,
    right: 30,
    zIndex: 2,
  },
  iconBottomLeft: {
    width: 75,
    height: 75,
    bottom: 30,
    left: 50,
    zIndex: 1,
  },
  iconBottomRight: {
    width: 75,
    height: 75,
    bottom: 30,
    right: 50,
    zIndex: 1,
  },
  iconGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 245, 255, 0.3)',
    borderRadius: 35,
    zIndex: -1,
  },
  headline: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subheadline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 30,
    gap: 14,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  bottomCard: {
    backgroundColor: 'rgba(255, 215, 0, 0.12)',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 100,
    top: -100,
    right: -50,
  },
  cardText: {
    fontSize: 15,
    color: '#FFD700',
    fontWeight: '700',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  getStartedButton: {
    backgroundColor: '#00F5FF',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },
  buttonText: {
    color: '#0A0E27',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});

export default WelcomeScreen;
