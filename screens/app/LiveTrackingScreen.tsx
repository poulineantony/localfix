import React, { useState, useEffect } from 'react';
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

interface LiveTrackingScreenProps {
  navigation: any;
  route: any;
}

const { width } = Dimensions.get('window');

const TIMELINE_STEPS = [
  { id: 1, label: 'Booking Confirmed', time: '2:30 PM', completed: true },
  { id: 2, label: 'Provider Assigned', time: '2:35 PM', completed: true },
  { id: 3, label: 'On the Way', time: '2:45 PM', completed: true },
  { id: 4, label: 'Service Started', time: 'Arriving in 5 mins', completed: false },
  { id: 5, label: 'Service Completed', time: 'Pending', completed: false },
];

const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({ navigation, route }) => {
  const [eta, setEta] = useState(5);
  const provider = route?.params?.provider || { name: 'Ram Kumar' };
  const service = route?.params?.service || { name: 'Tap Leaking' };

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

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
            onPress={() => navigation.navigate('Home')}
          >
            <MaterialIcons name="arrow-back" size={24} color="#00F5FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Track Service</Text>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons name="more-vert" size={24} color="#00F5FF" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Map Placeholder */}
          <View style={styles.mapContainer}>
            <View style={styles.mapGlow} />
            <MaterialIcons name="location-on" size={80} color="#FF6B6B" />
            <Text style={styles.mapText}>Live Tracking</Text>
            <View style={styles.etaBadge}>
              <MaterialIcons name="schedule" size={18} color="#00F5FF" />
              <Text style={styles.etaText}>ETA: {eta} mins</Text>
            </View>
          </View>

          {/* Provider Card */}
          <View style={styles.providerCard}>
            <View style={styles.providerCardGlow} />
            <View style={styles.providerHeader}>
              <View style={styles.providerAvatar}>
                <Text style={styles.providerAvatarText}>{provider.name.charAt(0)}</Text>
                <View style={styles.onlineBadge} />
              </View>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerStatus}>On the way to your location</Text>
                <View style={styles.ratingRow}>
                  <MaterialIcons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>4.9</Text>
                  <Text style={styles.reviewsText}>(245 reviews)</Text>
                </View>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="phone" size={22} color="#00F5FF" />
                <Text style={styles.actionButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="chat" size={22} color="#FFD700" />
                <Text style={styles.actionButtonText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Service Details */}
          <View style={styles.serviceCard}>
            <View style={styles.serviceCardGlow} />
            <View style={styles.serviceHeader}>
              <MaterialIcons name="build" size={24} color="#8A2BE2" />
              <Text style={styles.serviceTitle}>Service Details</Text>
            </View>
            <View style={styles.serviceRow}>
              <Text style={styles.serviceLabel}>Service</Text>
              <Text style={styles.serviceValue}>{service.name}</Text>
            </View>
            <View style={styles.serviceRow}>
              <Text style={styles.serviceLabel}>Booking ID</Text>
              <Text style={styles.serviceValue}>#BK12345</Text>
            </View>
            <View style={styles.serviceRow}>
              <Text style={styles.serviceLabel}>Scheduled Time</Text>
              <Text style={styles.serviceValue}>Today, 3:00 PM</Text>
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.timelineSection}>
            <Text style={styles.timelineTitle}>Order Timeline</Text>
            <View style={styles.timeline}>
              {TIMELINE_STEPS.map((step, index) => (
                <View key={step.id} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View
                      style={[
                        styles.timelineDot,
                        step.completed && styles.timelineDotCompleted,
                      ]}
                    >
                      {step.completed && (
                        <MaterialIcons name="check" size={14} color="#0A0E27" />
                      )}
                    </View>
                    {index < TIMELINE_STEPS.length - 1 && (
                      <View
                        style={[
                          styles.timelineLine,
                          step.completed && styles.timelineLineCompleted,
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text
                      style={[
                        styles.timelineLabel,
                        step.completed && styles.timelineLabelCompleted,
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text style={styles.timelineTime}>{step.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Help Section */}
          <View style={styles.helpCard}>
            <View style={styles.helpGlow} />
            <MaterialIcons name="help-outline" size={24} color="#FF6B6B" />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Need Help?</Text>
              <Text style={styles.helpText}>Contact support for any issues</Text>
            </View>
            <TouchableOpacity style={styles.helpButton}>
              <MaterialIcons name="arrow-forward" size={20} color="#FF6B6B" />
            </TouchableOpacity>
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
    backgroundColor: '#FF6B6B',
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
  moreButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  mapContainer: {
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  mapGlow: {
    position: 'absolute',
    width: 250,
    height: 250,
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderRadius: 125,
  },
  mapText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
  },
  etaBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 245, 255, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  etaText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#00F5FF',
  },
  providerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  providerCardGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(0, 245, 255, 0.08)',
    borderRadius: 100,
    top: -80,
    right: -50,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  providerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#32CD32',
    borderWidth: 2,
    borderColor: '#0A0E27',
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  providerStatus: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 6,
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
  reviewsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
  },
  serviceCardGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: 'rgba(138, 43, 226, 0.08)',
    borderRadius: 75,
    top: -50,
    right: -30,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  serviceValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  timelineSection: {
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  timeline: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 14,
  },
  timelineLeft: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotCompleted: {
    backgroundColor: '#00F5FF',
    borderColor: '#00F5FF',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 4,
  },
  timelineLineCompleted: {
    backgroundColor: '#00F5FF',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 20,
  },
  timelineLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  timelineLabelCompleted: {
    color: '#FFFFFF',
  },
  timelineTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  helpGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 60,
    right: -30,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  helpText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  helpButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LiveTrackingScreen;
