import apiClient, { ApiResponse } from './api.client';
import { Platform } from 'react-native';

export interface AppConfig {
    androidVersion: string;
    iosVersion: string;
    minAndroidVersion: string;
    minIosVersion: string;
    maintenanceMode: boolean;
    languageVersion: number;
    forceUpdateMessage: string;
    maintenanceMessage: string;
}

class ConfigService {
    /**
     * Get App Configuration from Backend
     */
    async getAppConfig(): Promise<ApiResponse<AppConfig>> {
        return await apiClient.get<AppConfig>('/config');
    }

    /**
     * Check if update is required or if app is in maintenance mode
     */
    async checkAppStatus(currentVersion: string): Promise<{
        forceUpdate: boolean;
        maintenanceMode: boolean;
        message?: string;
    }> {
        const response = await this.getAppConfig();

        if (!response.success || !response.data) {
            // If offline or failed, we assume everything is fine for now
            // Or we could let the network error handler deal with it
            return { forceUpdate: false, maintenanceMode: false };
        }

        const config = response.data;

        // Check Maintenance Mode
        if (config.maintenanceMode) {
            return {
                forceUpdate: false,
                maintenanceMode: true,
                message: config.maintenanceMessage
            };
        }

        // Check Force Update
        const minVersion = Platform.OS === 'ios' ? config.minIosVersion : config.minAndroidVersion;

        if (this.isVersionLower(currentVersion, minVersion)) {
            return {
                forceUpdate: true,
                maintenanceMode: false,
                message: config.forceUpdateMessage
            };
        }

        return { forceUpdate: false, maintenanceMode: false };
    }

    /**
     * Compare semantic versions (e.g. "1.0.0" < "1.0.1")
     * Returns true if v1 < v2
     */
    private isVersionLower(v1: string, v2: string): boolean {
        const v1Parts = v1.split('.').map(Number);
        const v2Parts = v2.split('.').map(Number);

        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            const p1 = v1Parts[i] || 0;
            const p2 = v2Parts[i] || 0;
            if (p1 < p2) return true;
            if (p1 > p2) return false;
        }

        return false;
    }
}

export default new ConfigService();
