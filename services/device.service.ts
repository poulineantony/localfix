import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export interface DeviceDetails {
    deviceId: string;
    deviceModel: string;
    platform: string;
    osVersion: string;
    manufacturer: string;
    isEmulator: boolean;
}

class DeviceService {
    /**
     * Get comprehensive device details for security verification
     */
    async getDeviceDetails(): Promise<DeviceDetails> {
        try {
            const [
                uniqueId,
                model,
                systemVersion,
                manufacturer,
                isEmulator
            ] = await Promise.all([
                DeviceInfo.getUniqueId(),
                DeviceInfo.getModel(),
                DeviceInfo.getSystemVersion(),
                DeviceInfo.getManufacturer(),
                DeviceInfo.isEmulator()
            ]);

            const details: DeviceDetails = {
                deviceId: uniqueId,
                deviceModel: model,
                platform: Platform.OS,
                osVersion: systemVersion,
                manufacturer: manufacturer,
                isEmulator: isEmulator
            };

            console.log('📱 Device Details fetched:', details);
            return details;
        } catch (error) {
            console.error('Error getting device details:', error);
            // Fallback for dev/error cases
            return {
                deviceId: 'unknown-device-' + Date.now(),
                deviceModel: 'Unknown',
                platform: Platform.OS,
                osVersion: '0.0.0',
                manufacturer: 'Unknown',
                isEmulator: false
            };
        }
    }
}

export default new DeviceService();
