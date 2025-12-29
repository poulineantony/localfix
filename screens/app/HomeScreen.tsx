import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface HomeScreenProps {
  navigation: any;
}

import { GOOGLE_MAPS_API_KEY } from '../../config/api.config';
import { serviceService } from '../../services';
import Geolocation from '@react-native-community/geolocation';
import { useTranslation } from '../../useTranslation';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [pressedCard, setPressedCard] = useState<string | null>(null);
  const [location, setLocation] = useState('Fetching location...');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [userCoordinates, setUserCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Fetch services when coordinates are available
  useEffect(() => {
    if (userCoordinates) {
      fetchServices(userCoordinates.latitude, userCoordinates.longitude);
    }
  }, [userCoordinates]);

  const fetchServices = async (latitude?: number, longitude?: number) => {
    try {
      const params: any = {};
      if (latitude && longitude) {
        params.latitude = latitude;
        params.longitude = longitude;
      }

      const response = await serviceService.getAllServices(params);
      if (response.success && response.data) {
        setServices(response.data);

        // Extract unique categories from services
        const uniqueCategories = Array.from(
          new Set(response.data.map((s: any) => s.category))
        ).map((cat: any) => ({
          id: cat,
          name: cat.charAt(0).toUpperCase() + cat.slice(1),
          icon: getCategoryIcon(cat),
          color: getCategoryColor(cat),
        }));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoadingServices(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: any = {
      plumbing: 'plumbing',
      electrical: 'electrical-services',
      'ac-repair': 'ac-unit',
      carpentry: 'build',
      cleaning: 'cleaning-services',
      painting: 'palette',
      tutoring: 'school',
      beauty: 'spa',
    };
    return icons[category] || 'build';
  };

  const getCategoryColor = (category: string) => {
    const colors: any = {
      plumbing: '#FF6B6B',
      electrical: '#FFD700',
      'ac-repair': '#00F5FF',
      carpentry: '#32CD32',
      cleaning: '#FF69B4',
      painting: '#8A2BE2',
      tutoring: '#00CED1',
      beauty: '#FF1493',
    };
    return colors[category] || '#00F5FF';
  };

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoordinates({ latitude, longitude }); // Save coordinates to state
        fetchAddress(latitude, longitude);
      },
      (error) => {
        console.log('Location error:', error);
        setLocation('Location unavailable');
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK' && data.results && data.results[0]) {
        // Try to get a shorter address (e.g., city/area)
        const addressComponents = data.results[0].address_components;
        const locality = addressComponents.find((c: any) => c.types.includes('locality'))?.long_name;
        const adminArea = addressComponents.find((c: any) => c.types.includes('administrative_area_level_1'))?.long_name;

        if (locality && adminArea) {
          // Avoid duplicates like "Puducherry, Puducherry"
          if (locality === adminArea) {
            setLocation(locality);
          } else {
            setLocation(`${locality}, ${adminArea}`);
          }
        } else if (locality) {
          setLocation(locality);
        } else if (adminArea) {
          setLocation(adminArea);
        } else {
          setLocation(data.results[0].formatted_address.split(',').slice(0, 2).join(', '));
        }
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleCategoryPress = (category: any) => {
    navigation.navigate('CategoryListing', { category });
  };

  const handleServicePress = (service: any) => {
    navigation.navigate('ProviderSelection', { service });
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground}>
        <View style={[styles.gradientCircle, styles.circle1]} />
        <View style={[styles.gradientCircle, styles.circle2]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={getCurrentLocation}>
              <Text style={styles.locationLabel}>{t('home.current_location')}</Text>
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={18} color="#00F5FF" />
                <Text style={styles.locationText}>
                  {loadingLocation ? 'Locating...' : location}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <MaterialIcons name="notifications" size={24} color="#00F5FF" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchGlow} />
            <MaterialIcons name="search" size={22} color="rgba(255, 255, 255, 0.6)" />
            <TextInput
              style={styles.searchInput}
              placeholder={t('home.search_services')}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.bannerContainer}
            contentContainerStyle={styles.bannerContent}
          >
            <View style={[styles.bannerCard, { backgroundColor: 'rgba(255, 107, 107, 0.15)' }]}>
              <View style={styles.bannerGlow} />
              <MaterialIcons name="local-offer" size={32} color="#FF6B6B" />
              <Text style={styles.bannerText}>{t('home.offers.30_off')}</Text>
              <Text style={styles.bannerSubText}>{t('home.deals.first_service')}</Text>
              <TouchableOpacity style={[styles.bannerButton, { backgroundColor: '#FF6B6B' }]}>
                <Text style={styles.bannerButtonText}>{t('home.deals.claim_now')}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.bannerCard, { backgroundColor: 'rgba(255, 215, 0, 0.15)' }]}>
              <View style={[styles.bannerGlow, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]} />
              <MaterialIcons name="stars" size={32} color="#FFD700" />
              <Text style={styles.bannerText}>{t('home.offers.100_off')}</Text>
              <Text style={styles.bannerSubText}>{t('home.deals.next_booking')}</Text>
              <TouchableOpacity style={[styles.bannerButton, { backgroundColor: '#FFD700' }]}>
                <Text style={[styles.bannerButtonText, { color: '#0A0E27' }]}>{t('home.deals.get_deal')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.services')}</Text>
            <MaterialIcons name="grid-view" size={20} color="rgba(255, 255, 255, 0.6)" />
          </View>

          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPressIn={() => setPressedCard(category.id)}
                onPressOut={() => setPressedCard(null)}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={1}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    {
                      backgroundColor: pressedCard === category.id ? category.color : category.color + '20',
                      transform: [{ scale: pressedCard === category.id ? 0.9 : 1 }],
                    }
                  ]}
                >
                  <View style={[styles.categoryGlow, { backgroundColor: category.color + '30' }]} />
                  <MaterialIcons
                    name={category.icon}
                    size={32}
                    color={pressedCard === category.id ? '#FFFFFF' : category.color}
                  />
                  {pressedCard === category.id && (
                    <View style={styles.effectBadge}>
                      <MaterialIcons name={category.effectIcon} size={14} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <Text style={styles.categoryName}>{t(`services.${category.id}`, category.name)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.popularHeader}>
            <Text style={styles.sectionTitle}>{t('home.popular_near_you')}</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>{t('home.see_all')} →</Text>
            </TouchableOpacity>
          </View>

          {services.slice(0, 5).map((service) => (
            <TouchableOpacity
              key={service.serviceId || service._id}
              style={styles.serviceCard}
              onPress={() => handleServicePress(service)}
              activeOpacity={0.85}
            >
              <View style={styles.serviceCardGlow} />
              <View style={[styles.serviceIcon, { backgroundColor: getCategoryColor(service.category) + '20' }]}>
                <MaterialIcons name={getCategoryIcon(service.category)} size={32} color={getCategoryColor(service.category)} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>
                  {language === 'ta' ? (service.nameTa || service.name) : service.name}
                </Text>
                <Text style={styles.providerName}>{service.serviceId || 'Service'}</Text>
                <View style={styles.serviceDetails}>
                  <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={14} color="#FFD700" />
                    <Text style={styles.rating}>{service.rating?.average?.toFixed(1) || '4.5'}</Text>
                  </View>
                  <Text style={styles.price}>₹{service.pricing?.basePrice || service.pricing?.min}-{service.pricing?.max || (service.pricing?.basePrice * 1.5)}</Text>
                  <View style={styles.distanceContainer}>
                    <MaterialIcons name="location-on" size={12} color="rgba(255, 255, 255, 0.5)" />
                    <Text style={styles.distance}>{t('home.nearby')}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <MaterialIcons name="arrow-forward" size={20} color="#0A0E27" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const { width: screenWidth } = Dimensions.get('window');
const CARD_PADDING = 20;
const CARD_GAP = 12;
const CARDS_PER_ROW = 4;
const CARD_WIDTH = (screenWidth - (CARD_PADDING * 2) - (CARD_GAP * (CARDS_PER_ROW - 1))) / CARDS_PER_ROW;

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
    width: 400,
    height: 400,
    backgroundColor: '#00F5FF',
    top: -150,
    right: -100,
  },
  circle2: {
    width: 350,
    height: 350,
    backgroundColor: '#8A2BE2',
    bottom: -100,
    left: -80,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  locationLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    gap: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  searchGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(0, 245, 255, 0.08)',
    borderRadius: 100,
    top: -100,
    left: -50,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bannerContainer: {
    marginBottom: 28,
  },
  bannerContent: {
    paddingHorizontal: 20,
    gap: 14,
  },
  bannerCard: {
    width: 180,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    position: 'relative',
    overflow: 'hidden',
  },
  bannerGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderRadius: 75,
    top: -50,
    right: -30,
  },
  bannerText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  bannerSubText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    marginBottom: 14,
  },
  bannerButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    // Removed flex: 1 to allow full width in column layout
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: CARD_PADDING,
    marginBottom: 28,
    gap: CARD_GAP,
  },
  categoryCard: {
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    position: 'relative',
    overflow: 'hidden',
  },
  categoryGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  effectBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  popularHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  seeAllButton: {
    alignSelf: 'flex-end',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00F5FF',
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    gap: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  serviceCardGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: 'rgba(0, 245, 255, 0.05)',
    borderRadius: 75,
    top: -50,
    right: -30,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
    marginBottom: 6,
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFD700',
  },
  price: {
    fontSize: 13,
    fontWeight: '800',
    color: '#00F5FF',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  distance: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
  },
  bookButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
