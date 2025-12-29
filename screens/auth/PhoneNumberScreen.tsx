import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { authService } from '../../services';
import { useTranslation } from '../../useTranslation';

interface PhoneNumberScreenProps {
  navigation: any;
}

const PhoneNumberScreen: React.FC<PhoneNumberScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.sendOTP(phoneNumber);

      if (response.success) {
        // Navigate to OTP verification screen with phone number
        navigation.navigate('OTPVerification', {
          phoneNumber,
          // In development, you might want to show the OTP
          otp: __DEV__ ? response.data?.otp : undefined
        });
      } else {
        setError(response.error || 'Failed to send OTP. Please try again.');
        Alert.alert('Error', response.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={24} color="#00F5FF" />
            </TouchableOpacity>

            {/* Header */}
            <Text style={styles.title}>{t('auth.enter_phone')}</Text>
            <Text style={styles.subtitle}>{t('auth.otp_intro', 'We will send an OTP to verify your number')}</Text>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.phoneIllustration}>
                <View style={styles.iconGlow} />
                <MaterialIcons name="smartphone" size={60} color="#00F5FF" />
                <View style={styles.otpBadge}>
                  <Text style={styles.otpBadgeText}>OTP</Text>
                </View>
              </View>
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputGlow} />
              <View style={styles.countryCodeBox}>
                <Text style={styles.flagText}>🇮🇳</Text>
                <Text style={styles.countryCode}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder={t('auth.phone_number')}
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoFocus
              />
            </View>

            {/* Info Text - Smaller */}
            <View style={styles.infoBox}>
              <MaterialIcons name="info" size={12} color="#FFD700" />
              <Text style={styles.infoText}>SMS charges may apply</Text>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorBox}>
                <MaterialIcons name="error" size={16} color="#FF6B6B" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
          </ScrollView>

          {/* Send OTP Button - Fixed at bottom */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.sendOTPButton,
                { opacity: phoneNumber.length === 10 && !loading ? 1 : 0.5 },
              ]}
              onPress={handleSendOTP}
              disabled={phoneNumber.length !== 10 || loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <>
                  <ActivityIndicator color="#0A0E27" size="small" />
                  <Text style={styles.buttonText}>Sending...</Text>
                </>
              ) : (
                <>
                  <Text style={styles.buttonText}>{t('auth.send_otp', 'Send OTP')}</Text>
                  <MaterialIcons name="arrow-forward" size={22} color="#0A0E27" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    opacity: 0.12,
  },
  circle1: {
    width: 350,
    height: 350,
    backgroundColor: '#FFD700',
    top: -120,
    left: -100,
  },
  circle2: {
    width: 300,
    height: 300,
    backgroundColor: '#00F5FF',
    bottom: -80,
    right: -60,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  title: {
    fontSize: 24, // Reduced from 28 to prevent wrapping in Tamil
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13, // Reduced from 15
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 40,
    lineHeight: 20,
  },
  illustrationContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  phoneIllustration: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 245, 255, 0.2)',
    borderRadius: 50,
    zIndex: -1,
  },
  otpBadge: {
    position: 'absolute',
    top: -8,
    right: -12,
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  otpBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  inputGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(0, 245, 255, 0.1)',
    borderRadius: 100,
    top: -100,
    left: -50,
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 14,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
    gap: 8,
  },
  flagText: {
    fontSize: 22,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.12)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.25)',
    alignSelf: 'flex-start',
  },
  infoText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 107, 107, 0.12)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
    marginTop: 12,
  },
  errorText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: 'rgba(10, 14, 39, 0.95)',
  },
  sendOTPButton: {
    backgroundColor: '#00F5FF',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#0A0E27',
    fontSize: 17,
    fontWeight: '900',
  },
});

export default PhoneNumberScreen;
