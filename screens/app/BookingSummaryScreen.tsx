import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface BookingSummaryScreenProps {
  navigation: any;
  route: any;
}

const BookingSummaryScreen: React.FC<BookingSummaryScreenProps> = ({ navigation, route }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);

  const provider = route?.params?.provider || { name: 'Ram Kumar', price: '₹500' };
  const service = route?.params?.service || { name: 'Tap Leaking' };

  const basePrice = 500;
  const discount = appliedCoupon ? 50 : 0;
  const taxes = Math.round((basePrice - discount) * 0.18);
  const total = basePrice - discount + taxes;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRST50') {
      setAppliedCoupon(true);
      Alert.alert('Success!', 'Coupon applied successfully');
    } else {
      Alert.alert('Invalid Coupon', 'Please enter a valid coupon code');
    }
  };

  const handleConfirmBooking = () => {
    navigation.navigate('LiveTracking', { provider, service });
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground}>
        <View style={[styles.gradientCircle, styles.circle1]} />
        <View style={[styles.gradientCircle, styles.circle2]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#00F5FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Summary</Text>
          <View style={{ width: 48 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Service Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="build" size={20} color="#00F5FF" />
              <Text style={styles.sectionTitle}>Service Details</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.cardGlow} />
              <Text style={styles.serviceName}>{service.name}</Text>
              <View style={styles.serviceInfo}>
                <View style={styles.infoItem}>
                  <MaterialIcons name="access-time" size={16} color="rgba(255, 255, 255, 0.6)" />
                  <Text style={styles.infoText}>30-45 mins</Text>
                </View>
                <View style={styles.infoItem}>
                  <MaterialIcons name="event" size={16} color="rgba(255, 255, 255, 0.6)" />
                  <Text style={styles.infoText}>Today, 3:00 PM</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Provider Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="person" size={20} color="#FFD700" />
              <Text style={styles.sectionTitle}>Service Provider</Text>
            </View>
            <View style={styles.card}>
              <View style={[styles.cardGlow, { backgroundColor: 'rgba(255, 215, 0, 0.08)' }]} />
              <View style={styles.providerRow}>
                <View style={styles.providerAvatar}>
                  <Text style={styles.providerAvatarText}>{provider.name.charAt(0)}</Text>
                </View>
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <View style={styles.ratingRow}>
                    <MaterialIcons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>4.9</Text>
                    <Text style={styles.experienceText}>• 8 years exp</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <MaterialIcons name="phone" size={18} color="#00F5FF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Address */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="location-on" size={20} color="#FF6B6B" />
              <Text style={styles.sectionTitle}>Service Address</Text>
            </View>
            <View style={styles.card}>
              <View style={[styles.cardGlow, { backgroundColor: 'rgba(255, 107, 107, 0.08)' }]} />
              <Text style={styles.addressTitle}>Home</Text>
              <Text style={styles.addressText}>
                123, MG Road, Koramangala{'\n'}
                Bangalore, Karnataka - 560034
              </Text>
              <TouchableOpacity style={styles.changeButton}>
                <Text style={styles.changeButtonText}>Change Address</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Coupon Code */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="local-offer" size={20} color="#32CD32" />
              <Text style={styles.sectionTitle}>Apply Coupon</Text>
            </View>
            <View style={styles.couponCard}>
              <View style={[styles.cardGlow, { backgroundColor: 'rgba(50, 205, 50, 0.08)' }]} />
              <View style={styles.couponInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter coupon code"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={couponCode}
                  onChangeText={setCouponCode}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApplyCoupon}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
              {appliedCoupon && (
                <View style={styles.appliedCoupon}>
                  <MaterialIcons name="check-circle" size={16} color="#32CD32" />
                  <Text style={styles.appliedText}>FIRST50 applied! You saved ₹50</Text>
                </View>
              )}
            </View>
          </View>

          {/* Price Breakdown */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="receipt" size={20} color="#8A2BE2" />
              <Text style={styles.sectionTitle}>Price Details</Text>
            </View>
            <View style={styles.card}>
              <View style={[styles.cardGlow, { backgroundColor: 'rgba(138, 43, 226, 0.08)' }]} />
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Service Charge</Text>
                <Text style={styles.priceValue}>₹{basePrice}</Text>
              </View>
              {appliedCoupon && (
                <View style={styles.priceRow}>
                  <Text style={[styles.priceLabel, { color: '#32CD32' }]}>Discount</Text>
                  <Text style={[styles.priceValue, { color: '#32CD32' }]}>-₹{discount}</Text>
                </View>
              )}
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Taxes & Fees (18%)</Text>
                <Text style={styles.priceValue}>₹{taxes}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.priceRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>₹{total}</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>₹{total}</Text>
          </View>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmBooking}
            activeOpacity={0.85}
          >
            <View style={styles.buttonGlow} />
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            <MaterialIcons name="check-circle" size={24} color="#0A0E27" />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: 'rgba(0, 245, 255, 0.08)',
    borderRadius: 75,
    top: -50,
    right: -30,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    gap: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  providerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  providerAvatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFD700',
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFD700',
  },
  experienceText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 245, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
    marginBottom: 12,
  },
  changeButton: {
    alignSelf: 'flex-start',
  },
  changeButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00F5FF',
  },
  couponCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  couponInput: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  applyButton: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A0E27',
  },
  appliedCoupon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  appliedText: {
    fontSize: 13,
    color: '#32CD32',
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  totalValue: {
    fontSize: 18,
    color: '#00F5FF',
    fontWeight: '800',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: 'rgba(10, 14, 39, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 24,
    color: '#00F5FF',
    fontWeight: '900',
  },
  confirmButton: {
    backgroundColor: '#00F5FF',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0A0E27',
  },
});

export default BookingSummaryScreen;
