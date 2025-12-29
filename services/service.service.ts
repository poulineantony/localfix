/**
 * Service API Service
 * Handles all service-related API calls
 */

import apiClient, { ApiResponse } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';

export interface Service {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    image?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateServiceData {
    name: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    image?: string;
}

export interface UpdateServiceData extends Partial<CreateServiceData> {
    isActive?: boolean;
}

export interface ServiceQueryParams {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
}

class ServiceService {
    /**
     * Get all services with optional filters
     */
    async getAllServices(params?: ServiceQueryParams): Promise<ApiResponse<Service[]>> {
        const queryString = params ? this.buildQueryString(params) : '';
        return await apiClient.get<Service[]>(`${API_ENDPOINTS.SERVICES.GET_ALL}${queryString}`);
    }

    /**
     * Get service by ID
     */
    async getServiceById(id: string): Promise<ApiResponse<Service>> {
        return await apiClient.get<Service>(API_ENDPOINTS.SERVICES.GET_BY_ID(id));
    }

    /**
     * Get services by category
     */
    async getServicesByCategory(category: string): Promise<ApiResponse<Service[]>> {
        return await apiClient.get<Service[]>(API_ENDPOINTS.SERVICES.GET_BY_CATEGORY(category));
    }

    /**
     * Create new service (admin/provider only)
     */
    async createService(data: CreateServiceData): Promise<ApiResponse<Service>> {
        return await apiClient.post<Service>(API_ENDPOINTS.SERVICES.CREATE, data);
    }

    /**
     * Update service
     */
    async updateService(id: string, data: UpdateServiceData): Promise<ApiResponse<Service>> {
        return await apiClient.put<Service>(API_ENDPOINTS.SERVICES.UPDATE(id), data);
    }

    /**
     * Delete service
     */
    async deleteService(id: string): Promise<ApiResponse> {
        return await apiClient.delete(API_ENDPOINTS.SERVICES.DELETE(id));
    }

    /**
     * Build query string from params
     */
    private buildQueryString(params: ServiceQueryParams): string {
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

export default new ServiceService();
