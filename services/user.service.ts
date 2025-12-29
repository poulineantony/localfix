/**
 * User Service
 * Handles all user-related API calls
 */

import apiClient, { ApiResponse } from './api.client';
import { API_ENDPOINTS } from '../config/api.config';
import { User } from './auth.service';

export interface UpdateProfileData {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    language?: string;
}

export interface UserQueryParams {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
    isVerified?: boolean;
}

class UserService {
    /**
     * Get all users (admin only)
     */
    async getAllUsers(params?: UserQueryParams): Promise<ApiResponse<User[]>> {
        const queryString = params ? this.buildQueryString(params) : '';
        return await apiClient.get<User[]>(`${API_ENDPOINTS.USERS.GET_ALL}${queryString}`);
    }

    /**
     * Get user by ID
     */
    async getUserById(id: string): Promise<ApiResponse<User>> {
        return await apiClient.get<User>(API_ENDPOINTS.USERS.GET_BY_ID(id));
    }

    /**
     * Update user profile
     */
    async updateProfile(data: UpdateProfileData): Promise<ApiResponse<User>> {
        return await apiClient.put<User>(API_ENDPOINTS.USERS.UPDATE_PROFILE, data);
    }

    /**
     * Update user by ID (admin only)
     */
    async updateUser(id: string, data: UpdateProfileData): Promise<ApiResponse<User>> {
        return await apiClient.put<User>(API_ENDPOINTS.USERS.UPDATE(id), data);
    }

    /**
     * Delete user (admin only)
     */
    async deleteUser(id: string): Promise<ApiResponse> {
        return await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
    }

    /**
     * Upload avatar
     */
    async uploadAvatar(imageUri: string): Promise<ApiResponse<{ avatar: string }>> {
        const formData = new FormData();

        // Extract filename from URI
        const filename = imageUri.split('/').pop() || 'avatar.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('avatar', {
            uri: imageUri,
            name: filename,
            type,
        } as any);

        return await apiClient.uploadFile<{ avatar: string }>(
            API_ENDPOINTS.USERS.UPLOAD_AVATAR,
            formData
        );
    }

    /**
     * Build query string from params
     */
    private buildQueryString(params: UserQueryParams): string {
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

export default new UserService();
