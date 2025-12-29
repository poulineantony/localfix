import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from '../../useTranslation';

interface MyBookingsScreenProps {
  navigation: any;
}

const TABS = ['Upcoming', 'Ongoing', 'Completed'];

const BOOKINGS = {
  Upcoming: [
    {
      id: '1',
      service: 'AC Service',
      serviceKey: 'services.ac-repair',
      provider: 'Vikram Sharma',
      date: 'Tomorrow, 10:00 AM',
      price: '₹800',
      status: 'Confirmed',
      icon: 'ac-unit',
      color: '#00F5FF',
    },
    {
      id: '2',
      service: 'Cleaning Service',
      serviceKey: 'services.cleaning',
      provider: 'Priya Singh',
      date: 'Dec 15, 2:00 PM',
      price: '₹600',
      status: 'Pending',
      icon: 'cleaning-services',
      color: '#FF69B4',
    },
  ],
  Ongoing: [
    {
      id: '3',
      service: 'Plumbing',
      serviceKey: 'services.plumbing',
      provider: 'Ram Kumar',
      date: 'Today, 3:00 PM',
      price: '₹500',
      status: 'In Progress',
      icon: 'plumbing',
      color: '#FF6B6B',
    },
  ],
  Completed: [
    {
      id: '4',
      service: 'Electrician',
      serviceKey: 'services.electrical',
      provider: 'Ajay Singh',
      date: 'Dec 8, 11:00 AM',
      price: '₹450',
      status: 'Completed',
      rating: 5,
      icon: 'electrical-services',
      color: '#FFD700',
    },
    {
      id: '5',
      service: 'Carpenter',
      serviceKey: 'services.carpenter',
      provider: 'Suresh Patel',
      date: 'Dec 5, 4:00 PM',
      price: '₹1200',
      status: 'Completed',
      rating: 4,
      icon: 'build',
      color: '#32CD32',
    },
  ],
};

const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('Upcoming');

  const getFormattedDate = (date: string) => {
    let formatted = date;
    if (date.includes('Today')) formatted = formatted.replace('Today', t('common.today'));
    if (date.includes('Tomorrow')) formatted = formatted.replace('Tomorrow', t('common.tomorrow'));
    if (date.includes('Dec')) formatted = formatted.replace('Dec', t('months.dec'));
    return formatted;
  };

  const handleCancel = () => {
    Alert.alert(
      t('common.confirm'),
      t('bookings.cancel_confirm'),
      [
        { text: t('common.no'), style: 'cancel' },
        { text: t('common.yes'), style: 'destructive' }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return '#00F5FF';
      case 'Pending':
        return '#FFD700';
      case 'In Progress':
        return '#32CD32';
      case 'Completed':
        return '#8A2BE2';
      default:
        return '#FFFFFF';
    }
  };

  const renderBookingCard = (booking: any) => (
    <TouchableOpacity
      key={booking.id}
      style={styles.bookingCard}
      activeOpacity={0.85}
      onPress={() => {
        if (booking.status === 'In Progress') {
          navigation.navigate('LiveTracking', { provider: { name: booking.provider }, service: { name: booking.service } });
        }
      }}
    >
      <View style={styles.bookingCardGlow} />

      {/* Header */}
      <View style={styles.bookingHeader}>
        <View style={[styles.serviceIcon, { backgroundColor: booking.color + '20' }]}>
          <MaterialIcons name={booking.icon} size={28} color={booking.color} />
        </View>
        <View style={styles.bookingInfo}>
          <Text style={styles.serviceName}>{t(booking.serviceKey || `services.${booking.service.toLowerCase().replace(' ', '-')}`, booking.service)}</Text>
          <Text style={styles.providerName}>{booking.provider}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {booking.status === 'In Progress' ? t('bookings.status.in_progress') :
              booking.status === 'Confirmed' ? t('bookings.status.confirmed') :
                booking.status === 'Pending' ? t('bookings.status.pending') :
                  booking.status === 'Completed' ? t('bookings.status.completed') :
                    t('bookings.status.cancelled')}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.bookingDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons name="event" size={16} color="rgba(255, 255, 255, 0.6)" />
          <Text style={styles.detailText}>{getFormattedDate(booking.date)}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="currency-rupee" size={16} color="#00F5FF" />
          <Text style={styles.priceText}>{booking.price}</Text>
        </View>
      </View>

      {/* Rating (for completed) */}
      {booking.rating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>{t('bookings.your_rating')}</Text>
          <View style={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <MaterialIcons
                key={index}
                name="star"
                size={16}
                color={index < booking.rating ? '#FFD700' : 'rgba(255, 255, 255, 0.2)'}
              />
            ))}
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.bookingActions}>
        {booking.status === 'In Progress' && (
          <TouchableOpacity style={styles.trackButton}>
            <MaterialIcons name="location-on" size={18} color="#00F5FF" />
            <Text style={styles.trackButtonText}>{t('bookings.track_live')}</Text>
          </TouchableOpacity>
        )}
        {booking.status === 'Upcoming' && (
          <>
            <TouchableOpacity style={styles.rescheduleButton}>
              <MaterialIcons name="schedule" size={18} color="rgba(255, 255, 255, 0.7)" />
              <Text style={styles.rescheduleButtonText}>{t('bookings.reschedule')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <MaterialIcons name="close" size={18} color="#FF6B6B" />
              <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          </>
        )}
        {booking.status === 'Completed' && (
          <TouchableOpacity style={styles.rebookButton}>
            <MaterialIcons name="refresh" size={18} color="#32CD32" />
            <Text style={styles.rebookButtonText}>{t('bookings.book_again')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const currentBookings = BOOKINGS[selectedTab as keyof typeof BOOKINGS] || [];

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
          <Text style={styles.headerTitle} numberOfLines={1} adjustsFontSizeToFit>{t('bookings.title')}</Text>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="filter-list" size={24} color="#00F5FF" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.tabActive]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                {t(`bookings.tabs.${tab.toLowerCase()}` as any)}
              </Text>
              {selectedTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Bookings List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {currentBookings.length > 0 ? (
            currentBookings.map(renderBookingCard)
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <MaterialIcons name="event-busy" size={60} color="rgba(255, 255, 255, 0.3)" />
              </View>
              <Text style={styles.emptyTitle}>{t('bookings.empty.title').replace('Bookings', '')} {t(`bookings.tabs.${selectedTab.toLowerCase()}`)}</Text>
              <Text style={styles.emptyText}>
                {t('bookings.empty.text')}
              </Text>
              <TouchableOpacity
                style={styles.browseButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.browseButtonText}>{t('bookings.browse_services')}</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#0A0E27" />
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 20 }} />
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
    backgroundColor: '#8A2BE2',
    top: -120,
    right: -100,
  },
  circle2: {
    width: 300,
    height: 300,
    backgroundColor: '#00F5FF',
    bottom: -80,
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
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 245, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.5)',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  tabActive: {
    // Active state handled by indicator
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#00F5FF',
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  bookingCardGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(0, 245, 255, 0.05)',
    borderRadius: 100,
    top: -80,
    right: -50,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  bookingInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  bookingDetails: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 14,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 15,
    color: '#00F5FF',
    fontWeight: '800',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  ratingLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  trackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 245, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  trackButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#00F5FF',
  },
  rescheduleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  rescheduleButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  cancelButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF6B6B',
  },
  rebookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(50, 205, 50, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(50, 205, 50, 0.3)',
  },
  rebookButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#32CD32',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00F5FF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  browseButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0A0E27',
  },
});

export default MyBookingsScreen;
