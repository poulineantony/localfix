import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ProviderSelectionScreenProps {
  navigation: any;
  route: any;
}

const PROVIDERS = [
  {
    id: '1',
    name: 'Ram Kumar',
    rating: 4.9,
    reviews: 245,
    experience: '8 years',
    distance: '1.2 km',
    price: '₹500',
    verified: true,
    skills: ['Plumbing', 'Pipe Fitting', 'Motor Repair'],
  },
  {
    id: '2',
    name: 'Ajay Singh',
    rating: 4.8,
    reviews: 189,
    experience: '6 years',
    distance: '2.5 km',
    price: '₹450',
    verified: true,
    skills: ['Plumbing', 'Bathroom Fitting'],
  },
  {
    id: '3',
    name: 'Vikram Sharma',
    rating: 4.7,
    reviews: 156,
    experience: '5 years',
    distance: '3.8 km',
    price: '₹400',
    verified: true,
    skills: ['Plumbing', 'Tap Repair'],
  },
  {
    id: '4',
    name: 'Suresh Patel',
    rating: 4.6,
    reviews: 98,
    experience: '4 years',
    distance: '4.2 km',
    price: '₹380',
    verified: false,
    skills: ['Plumbing', 'General Repair'],
  },
];

const SORT_OPTIONS = [
  { id: 'rating', label: 'Rating', icon: 'star' },
  { id: 'price', label: 'Price', icon: 'currency-rupee' },
  { id: 'distance', label: 'Distance', icon: 'location-on' },
];

const ProviderSelectionScreen: React.FC<ProviderSelectionScreenProps> = ({ navigation, route }) => {
  const [selectedSort, setSelectedSort] = useState('rating');
  const service = route?.params?.service || { name: 'Tap Leaking' };

  const handleBookNow = (provider: any) => {
    navigation.navigate('BookingSummary', { provider, service });
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
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Select Provider</Text>
            <Text style={styles.headerSubtitle}>{service.name}</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="tune" size={24} color="#00F5FF" />
          </TouchableOpacity>
        </View>

        {/* Sort Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortContainer}
        >
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortChip,
                selectedSort === option.id && styles.sortChipActive,
              ]}
              onPress={() => setSelectedSort(option.id)}
            >
              <MaterialIcons
                name={option.icon}
                size={16}
                color={selectedSort === option.id ? '#0A0E27' : 'rgba(255, 255, 255, 0.7)'}
              />
              <Text
                style={[
                  styles.sortChipText,
                  selectedSort === option.id && styles.sortChipTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Providers List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {PROVIDERS.map((provider, index) => (
            <View key={provider.id} style={styles.providerCard}>
              <View style={styles.providerCardGlow} />

              {/* Provider Header */}
              <View style={styles.providerHeader}>
                <View style={styles.providerAvatar}>
                  <Text style={styles.providerAvatarText}>
                    {provider.name.charAt(0)}
                  </Text>
                  {provider.verified && (
                    <View style={styles.verifiedBadge}>
                      <MaterialIcons name="verified" size={14} color="#00F5FF" />
                    </View>
                  )}
                </View>
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <View style={styles.providerMeta}>
                    <View style={styles.ratingContainer}>
                      <MaterialIcons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{provider.rating}</Text>
                      <Text style={styles.reviewsText}>({provider.reviews})</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <Text style={styles.experienceText}>{provider.experience}</Text>
                  </View>
                </View>
                {index === 0 && (
                  <View style={styles.topBadge}>
                    <MaterialIcons name="emoji-events" size={12} color="#FFD700" />
                    <Text style={styles.topBadgeText}>Top</Text>
                  </View>
                )}
              </View>

              {/* Skills */}
              <View style={styles.skillsContainer}>
                {provider.skills.map((skill, idx) => (
                  <View key={idx} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>

              {/* Provider Footer */}
              <View style={styles.providerFooter}>
                <View style={styles.footerLeft}>
                  <View style={styles.distanceContainer}>
                    <MaterialIcons name="location-on" size={14} color="rgba(255, 255, 255, 0.6)" />
                    <Text style={styles.distanceText}>{provider.distance}</Text>
                  </View>
                  <Text style={styles.priceText}>{provider.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookNow(provider)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                  <MaterialIcons name="arrow-forward" size={18} color="#0A0E27" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

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
    backgroundColor: '#FFD700',
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
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
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
    fontWeight: '600',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  sortContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  sortChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  sortChipActive: {
    backgroundColor: '#00F5FF',
    borderColor: '#00F5FF',
  },
  sortChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  sortChipTextActive: {
    color: '#0A0E27',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  providerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  providerCardGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(0, 245, 255, 0.05)',
    borderRadius: 100,
    top: -80,
    right: -50,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  providerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 245, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00F5FF',
    position: 'relative',
  },
  providerAvatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00F5FF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0A0E27',
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFD700',
  },
  reviewsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  metaDivider: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  experienceText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  topBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFD700',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  skillChip: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
  },
  skillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A2BE2',
  },
  providerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00F5FF',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00F5FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A0E27',
  },
});

export default ProviderSelectionScreen;
