/**
 * Provider Service
 * Handles all provider-related API calls
 */

import apiClient, { ApiResponse } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';

export interface Provider {
    _id: string;
    user: string;
    services: string[];
    bio?: string;
    experience: number;
    rating: number;
    totalReviews: number;
    availability: {
        monday: { start: string; end: string; available: boolean };
        tuesday: { start: string; end: string; available: boolean };
        wednesday: { start: string; end: string; available: boolean };
        thursday: { start: string; end: string; available: boolean };
        friday: { start: string; end: string; available: boolean };
        saturday: { start: string; end: string; available: boolean };
        sunday: { start: string; end: string; available: boolean };
    };
    location?: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
    certifications?: string[];
    isVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProviderData {
    services: string[];
    bio?: string;
    experience: number;
    availability?: Partial<Provider['availability']>;
    location?: Provider['location'];
    certifications?: string[];
}

export interface UpdateProviderData extends Partial<CreateProviderData> {
    isActive?: boolean;
}

export interface ProviderQueryParams {
    page?: number;
    limit?: number;
    service?: string;
    city?: string;
    minRating?: number;
    isVerified?: boolean;
    isActive?: boolean;
}

class ProviderService {
    /**
     * Get all providers with optional filters
     */
    async getAllProviders(params?: ProviderQueryParams): Promise<ApiResponse<Provider[]>> {
        const queryString = params ? this.buildQueryString(params) : '';
        return await apiClient.get<Provider[]>(`${API_ENDPOINTS.PROVIDERS.GET_ALL}${queryString}`);
    }

    /**
     * Get provider by ID
     */
    async getProviderById(id: string): Promise<ApiResponse<Provider>> {
        return await apiClient.get<Provider>(API_ENDPOINTS.PROVIDERS.GET_BY_ID(id));
    }

    /**
     * Get providers by service
     */
    async getProvidersByService(serviceId: string): Promise<ApiResponse<Provider[]>> {
        return await apiClient.get<Provider[]>(
            API_ENDPOINTS.PROVIDERS.GET_BY_SERVICE(serviceId)
        );
    }

    /**
     * Create provider profile
     */
    async createProvider(data: CreateProviderData): Promise<ApiResponse<Provider>> {
        return await apiClient.post<Provider>(API_ENDPOINTS.PROVIDERS.CREATE, data);
    }

    /**
     * Update provider profile
     */
    async updateProvider(id: string, data: UpdateProviderData): Promise<ApiResponse<Provider>> {
        return await apiClient.put<Provider>(API_ENDPOINTS.PROVIDERS.UPDATE(id), data);
    }

    /**
     * Update provider availability
     */
    async updateAvailability(
        id: string,
        availability: Partial<Provider['availability']>
    ): Promise<ApiResponse<Provider>> {
        return await apiClient.patch<Provider>(
            API_ENDPOINTS.PROVIDERS.UPDATE_AVAILABILITY(id),
            { availability }
        );
    }

    /**
     * Delete provider profile
     */
    async deleteProvider(id: string): Promise<ApiResponse> {
        return await apiClient.delete(API_ENDPOINTS.PROVIDERS.DELETE(id));
    }

    /**
     * Build query string from params
     */
    private buildQueryString(params: ProviderQueryParams): string {
        const query = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query.append(key, value.toString());
            }
        });

        const queryString = query.toString();
        return queryString ? `?${queryString}` : '';
    }
}

export default new ProviderService();
