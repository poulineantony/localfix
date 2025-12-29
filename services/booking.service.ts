/**
 * Booking Service
 * Handles all booking-related API calls
 */

import apiClient, { ApiResponse } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';

export interface Booking {
    _id: string;
    user: string;
    service: string;
    provider: string;
    scheduledDate: string;
    scheduledTime: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
    status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
    totalAmount: number;
    paymentStatus: 'pending' | 'paid' | 'refunded';
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBookingData {
    service: string;
    provider: string;
    scheduledDate: string;
    scheduledTime: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
    notes?: string;
}

export interface UpdateBookingData {
    scheduledDate?: string;
    scheduledTime?: string;
    address?: Partial<CreateBookingData['address']>;
    notes?: string;
}

export interface BookingQueryParams {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
}

class BookingService {
    /**
     * Get all bookings (admin only)
     */
    async getAllBookings(params?: BookingQueryParams): Promise<ApiResponse<Booking[]>> {
        const queryString = params ? this.buildQueryString(params) : '';
        return await apiClient.get<Booking[]>(`${API_ENDPOINTS.BOOKINGS.GET_ALL}${queryString}`);
    }

    /**
     * Get my bookings (current user)
     */
    async getMyBookings(params?: BookingQueryParams): Promise<ApiResponse<Booking[]>> {
        const queryString = params ? this.buildQueryString(params) : '';
        return await apiClient.get<Booking[]>(
            `${API_ENDPOINTS.BOOKINGS.GET_MY_BOOKINGS}${queryString}`
        );
    }

    /**
     * Get booking by ID
     */
    async getBookingById(id: string): Promise<ApiResponse<Booking>> {
        return await apiClient.get<Booking>(API_ENDPOINTS.BOOKINGS.GET_BY_ID(id));
    }

    /**
     * Create new booking
     */
    async createBooking(data: CreateBookingData): Promise<ApiResponse<Booking>> {
        return await apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.CREATE, data);
    }

    /**
     * Update booking
     */
    async updateBooking(id: string, data: UpdateBookingData): Promise<ApiResponse<Booking>> {
        return await apiClient.put<Booking>(API_ENDPOINTS.BOOKINGS.UPDATE(id), data);
    }

    /**
     * Update booking status
     */
    async updateBookingStatus(
        id: string,
        status: Booking['status']
    ): Promise<ApiResponse<Booking>> {
        return await apiClient.patch<Booking>(API_ENDPOINTS.BOOKINGS.UPDATE_STATUS(id), {
            status,
        });
    }

    /**
     * Cancel booking
     */
    async cancelBooking(id: string, reason?: string): Promise<ApiResponse<Booking>> {
        return await apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.CANCEL(id), {
            reason,
        });
    }

    /**
     * Build query string from params
     */
    private buildQueryString(params: BookingQueryParams): string {
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

export default new BookingService();
