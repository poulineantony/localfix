import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CategoryListingScreenProps {
  navigation: any;
  route: any;
}

const { width } = Dimensions.get('window');

const SERVICES = [
  { id: '1', name: 'Tap Leaking', price: '₹300-500', time: '30 mins', icon: 'plumbing' },
  { id: '2', name: 'Motor Installation', price: '₹800-1200', time: '2 hours', icon: 'build-circle' },
  { id: '3', name: 'Pipe Repair', price: '₹400-700', time: '1 hour', icon: 'handyman' },
  { id: '4', name: 'Bathroom Fitting', price: '₹1500-2500', time: '3 hours', icon: 'bathroom' },
  { id: '5', name: 'Kitchen Sink', price: '₹500-900', time: '1.5 hours', icon: 'kitchen' },
  { id: '6', name: 'Water Tank Cleaning', price: '₹1000-1500', time: '2 hours', icon: 'water-drop' },
];

const CategoryListingScreen: React.FC<CategoryListingScreenProps> = ({ navigation, route }) => {
  const category = route?.params?.category || { name: 'Plumber', icon: 'plumbing', color: '#FF6B6B' };

  const handleServicePress = (service: any) => {
    navigation.navigate('ProviderSelection', { service, category });
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground}>
        <View style={[styles.gradientCircle, { backgroundColor: category.color, opacity: 0.1 }]} />
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
            <View style={[styles.headerIcon, { backgroundColor: category.color + '20' }]}>
              <MaterialIcons name={category.icon} size={28} color={category.color} />
            </View>
            <View>
              <Text style={styles.headerTitle}>{category.name} Services</Text>
              <Text style={styles.headerSubtitle}>{SERVICES.length} services available</Text>
            </View>
          </View>
          <View style={{ width: 48 }} />
        </View>

        {/* Services List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.servicesContainer}>
            {SERVICES.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => handleServicePress(service)}
                activeOpacity={0.85}
              >
                <View style={styles.serviceCardGlow} />

                {/* Service Icon */}
                <View style={[styles.serviceIcon, { backgroundColor: category.color + '20' }]}>
                  <MaterialIcons name={service.icon} size={32} color={category.color} />
                </View>

                {/* Service Info */}
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.serviceDetails}>
                    <View style={styles.detailItem}>
                      <MaterialIcons name="access-time" size={14} color="rgba(255, 255, 255, 0.6)" />
                      <Text style={styles.detailText}>{service.time}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialIcons name="currency-rupee" size={14} color="#00F5FF" />
                      <Text style={styles.priceText}>{service.price}</Text>
                    </View>
                  </View>
                </View>

                {/* Arrow Button */}
                <View style={styles.arrowButton}>
                  <MaterialIcons name="arrow-forward" size={20} color={category.color} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Popular Add-ons */}
          <View style={styles.addonsSection}>
            <Text style={styles.sectionTitle}>Popular Add-ons</Text>
            <View style={styles.addonCard}>
              <View style={styles.addonGlow} />
              <MaterialIcons name="verified" size={24} color="#FFD700" />
              <View style={styles.addonContent}>
                <Text style={styles.addonTitle}>Premium Service</Text>
                <Text style={styles.addonDescription}>Get priority booking & 10% off</Text>
              </View>
              <Text style={styles.addonPrice}>+₹99</Text>
            </View>
            <View style={styles.addonCard}>
              <View style={styles.addonGlow} />
              <MaterialIcons name="schedule" size={24} color="#32CD32" />
              <View style={styles.addonContent}>
                <Text style={styles.addonTitle}>Same Day Service</Text>
                <Text style={styles.addonDescription}>Get service within 4 hours</Text>
              </View>
              <Text style={styles.addonPrice}>+₹149</Text>
            </View>
          </View>

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
    width: 350,
    height: 350,
    borderRadius: 1000,
    top: -100,
    right: -80,
  },
  circle2: {
    width: 300,
    height: 300,
    backgroundColor: '#8A2BE2',
    opacity: 0.1,
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
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 12,
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  servicesContainer: {
    gap: 14,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 13,
    color: '#00F5FF',
    fontWeight: '700',
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addonsSection: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  addonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 12,
    gap: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  addonGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    borderRadius: 60,
    top: -40,
    right: -20,
  },
  addonContent: {
    flex: 1,
  },
  addonTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  addonDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  addonPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFD700',
  },
});

export default CategoryListingScreen;
