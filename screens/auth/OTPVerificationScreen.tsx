import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../AuthContext';
import { authService, userService } from '../../services';
import { useTranslation } from '../../useTranslation';

interface OTPVerificationScreenProps {
  navigation: any;
  route: any;
}

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  navigation,
  route,
}) => {
  const { login } = useAuth();
  const { t, language } = useTranslation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Refs for OTP inputs
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOTPChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input when user types
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    // Move to previous input on backspace
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      Keyboard.dismiss();
      setLoading(true);

      try {
        // Get phone number from navigation params
        const phone = route.params?.phoneNumber;

        if (!phone) {
          Alert.alert('Error', 'Phone number not found. Please go back and try again.');
          return;
        }

        // Call the actual API
        const response = await authService.verifyOTP(phone, otpValue);

        if (response.success) {
          console.log('✅ OTP Verified, token saved');

          // Login first (sets token)
          // Note: login might not be async in AuthContext, but we can await it if potential
          await login(response.data.token, response.data.user);

          // Sync language to backend if different
          if (response.data.user.language !== language) {
            console.log('Syncing language to backend:', language);
            try {
              await userService.updateProfile({ language });
            } catch (err) {
              console.error('Failed to sync language:', err);
            }
          }
        } else {
          Alert.alert('Error', response.error || 'Invalid OTP');
        }
      } catch (error) {
        console.error('OTP Verification Error:', error);
        Alert.alert('Error', 'Failed to verify OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch device details on component mount for resend
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    import('../../services').then(({ deviceService }) => {
      deviceService.getDeviceDetails().then(setDeviceInfo);
    });
  }, []);

  const handleResendOTP = async () => {
    // 1. Reset state
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();

    // 2. Call API
    try {
      const phone = route.params?.phoneNumber;
      if (phone && deviceInfo) {
        console.log('Resending OTP to:', phone);
        // We reuse authService.sendOTP which now accepts device details
        await authService.sendOTP(phone, deviceInfo);
        Alert.alert(t('auth.success', 'Success'), t('auth.otp_sent', 'New OTP sent successfully'));
      }
    } catch (e) {
      console.error('Resend failed:', e);
      // Don't alert error to avoid annoying user if network is flaky, timer is already reset
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

            {/* Title */}
            <Text style={styles.title}>{t('auth.verify', 'Verify OTP')}</Text>
            <Text style={styles.subtitle}>
              {t('auth.enter_otp', 'Enter correct OTP')}
            </Text>

            {/* Message Illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.messageBox}>
                <View style={styles.iconGlow} />
                <MaterialIcons name="mail" size={40} color="#00F5FF" />
              </View>
            </View>

            {/* OTP Input Boxes */}
            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpBox,
                    value ? styles.otpBoxFilled : null,
                  ]}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={(text) => handleOTPChange(index, text)}
                  onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
                  placeholder="·"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  textAlign="center"
                  autoFocus={index === 0}
                />
              ))}
            </View>

            {/* Timer or Resend */}
            <View style={styles.timerContainer}>
              {!canResend ? (
                <Text style={styles.timerText}>
                  {t('auth.resend_otp', 'Resend OTP')} {timer}s
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendOTP}>
                  <Text style={styles.resendText}>{t('auth.resend_otp', 'Resend OTP')}</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Help Text */}
            <View style={styles.helpBox}>
              <MaterialIcons name="info" size={12} color="rgba(255, 255, 255, 0.6)" />
              <Text style={styles.helpText}>
                {t('auth.no_code', "Didn't receive? Check SMS")}
              </Text>
            </View>
          </ScrollView>

          {/* Verify Button - Fixed at bottom */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.verifyButton,
                { opacity: otp.join('').length === 4 && !loading ? 1 : 0.5 },
              ]}
              onPress={handleVerifyOTP}
              disabled={otp.join('').length !== 4 || loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#0A0E27" />
              ) : (
                <>
                  <Text style={styles.buttonText}>{t('auth.verify', 'Verify OTP')}</Text>
                  <MaterialIcons name="check-circle" size={22} color="#0A0E27" />
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
    backgroundColor: '#00F5FF',
    top: -100,
    right: -80,
  },
  circle2: {
    width: 300,
    height: 300,
    backgroundColor: '#8A2BE2',
    bottom: -80,
    left: -60,
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
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 40,
    lineHeight: 22,
  },
  illustrationContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  messageBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 245, 255, 0.3)',
    borderRadius: 50,
    zIndex: -1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  otpBox: {
    flex: 1,
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  otpBoxFilled: {
    borderColor: '#00F5FF',
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  resendText: {
    fontSize: 15,
    color: '#00F5FF',
    fontWeight: '700',
  },
  helpBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignSelf: 'flex-start',
  },
  helpText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: 'rgba(10, 14, 39, 0.95)',
  },
  verifyButton: {
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

export default OTPVerificationScreen;
