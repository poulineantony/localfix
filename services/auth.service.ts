/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import apiClient, { ApiResponse } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'provider' | 'admin';
    avatar?: string;
    isVerified: boolean;
    language?: string;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: 'user' | 'provider';
}

export interface LoginData {
    email?: string;
    phone?: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: User;
}

export interface UpdatePasswordData {
    currentPassword: string;
    newPassword: string;
}

class AuthService {
    /**
     * Register a new user
     */
    async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
        const response = await apiClient.post<AuthResponse>(
            API_ENDPOINTS.AUTH.REGISTER,
            data
        );

        if (response.success && response.data) {
            // Store tokens
            await apiClient.setToken(response.data.token);
            await apiClient.setRefreshToken(response.data.refreshToken);
        }

        return response;
    }

    /**
     * Login user
     */
    async login(data: LoginData): Promise<ApiResponse<AuthResponse>> {
        const response = await apiClient.post<AuthResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            data
        );

        if (response.success && response.data) {
            // Store tokens
            await apiClient.setToken(response.data.token);
            await apiClient.setRefreshToken(response.data.refreshToken);
        }

        return response;
    }

    /**
     * Logout user
     */
    async logout(): Promise<ApiResponse> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);

        // Clear tokens regardless of response
        await apiClient.clearTokens();

        return response;
    }

    /**
     * Get current user profile
     */
    async getMe(): Promise<ApiResponse<User>> {
        return await apiClient.get<User>(API_ENDPOINTS.AUTH.GET_ME);
    }

    /**
     * Refresh authentication token
     */
    async refreshToken(): Promise<ApiResponse<AuthResponse>> {
        const response = await apiClient.post<AuthResponse>(
            API_ENDPOINTS.AUTH.REFRESH_TOKEN
        );

        if (response.success && response.data) {
            // Update stored token
            await apiClient.setToken(response.data.token);
        }

        return response;
    }

    /**
     * Update user password
     */
    async updatePassword(data: UpdatePasswordData): Promise<ApiResponse> {
        return await apiClient.put(API_ENDPOINTS.AUTH.UPDATE_PASSWORD, data);
    }

    /**
     * Send OTP for phone verification
     */
    async sendOTP(phone: string, deviceDetails: any): Promise<ApiResponse<{ otp: string }>> {
        // This endpoint needs to be added to backend
        return await apiClient.post('/auth/send-otp', { phone, ...deviceDetails });
    }

    /**
     * Verify OTP
     */
    async verifyOTP(phone: string, otp: string): Promise<ApiResponse<AuthResponse>> {
        // This endpoint needs to be added to backend
        const response = await apiClient.post<AuthResponse>('/auth/verify-otp', {
            phone,
            otp,
        });

        if (response.success && response.data) {
            // Store tokens
            await apiClient.setToken(response.data.token);
            await apiClient.setRefreshToken(response.data.refreshToken);
        }

        return response;
    }
}

export default new AuthService();
