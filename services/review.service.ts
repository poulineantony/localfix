/**
 * Review Service
 * Handles all review-related API calls
 */

import apiClient, { ApiResponse } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';

export interface Review {
    _id: string;
    user: string;
    provider: string;
    booking: string;
    rating: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateReviewData {
    provider: string;
    booking: string;
    rating: number;
    comment?: string;
}

export interface UpdateReviewData {
    rating?: number;
    comment?: string;
}

export interface ReviewQueryParams {
    page?: number;
    limit?: number;
    provider?: string;
    minRating?: number;
    maxRating?: number;
}

class ReviewService {
    /**
     * Get all reviews with optional filters
     */
    async getAllReviews(params?: ReviewQueryParams): Promise<ApiResponse<Review[]>> {
        const queryString = params ? this.buildQueryString(params) : '';
        return await apiClient.get<Review[]>(`${API_ENDPOINTS.REVIEWS.GET_ALL}${queryString}`);
    }

    /**
     * Get review by ID
     */
    async getReviewById(id: string): Promise<ApiResponse<Review>> {
        return await apiClient.get<Review>(API_ENDPOINTS.REVIEWS.GET_BY_ID(id));
    }

    /**
     * Get reviews by provider
     */
    async getReviewsByProvider(providerId: string): Promise<ApiResponse<Review[]>> {
        return await apiClient.get<Review[]>(
            API_ENDPOINTS.REVIEWS.GET_BY_PROVIDER(providerId)
        );
    }

    /**
     * Get review by booking
     */
    async getReviewByBooking(bookingId: string): Promise<ApiResponse<Review>> {
        return await apiClient.get<Review>(API_ENDPOINTS.REVIEWS.GET_BY_BOOKING(bookingId));
    }

    /**
     * Create new review
     */
    async createReview(data: CreateReviewData): Promise<ApiResponse<Review>> {
        return await apiClient.post<Review>(API_ENDPOINTS.REVIEWS.CREATE, data);
    }

    /**
     * Update review
     */
    async updateReview(id: string, data: UpdateReviewData): Promise<ApiResponse<Review>> {
        return await apiClient.put<Review>(API_ENDPOINTS.REVIEWS.UPDATE(id), data);
    }

    /**
     * Delete review
     */
    async deleteReview(id: string): Promise<ApiResponse> {
        return await apiClient.delete(API_ENDPOINTS.REVIEWS.DELETE(id));
    }

    /**
     * Build query string from params
     */
    private buildQueryString(params: ReviewQueryParams): string {
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

export default new ReviewService();
