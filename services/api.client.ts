/**
 * API Client
 * Core HTTP client for making API requests with authentication and error handling
 */

import { ToastAndroid, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_TIMEOUT, HTTP_STATUS, ERROR_MESSAGES } from '../config/api.config';

// Storage keys
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface ApiError {
    message: string;
    status?: number;
    errors?: any;
}

class ApiClient {
    private baseURL: string;
    private timeout: number;

    constructor() {
        this.baseURL = API_BASE_URL;
        this.timeout = API_TIMEOUT;
    }

    /**
     * Get stored auth token
     */
    private async getToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }

    /**
     * Store auth token
     */
    async setToken(token: string): Promise<void> {
        try {
            console.log('🔐 Saving token:', token?.substring(0, 20) + '...');
            await AsyncStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            console.error('Error setting token:', error);
        }
    }

    /**
     * Store refresh token
     */
    async setRefreshToken(refreshToken: string): Promise<void> {
        try {
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        } catch (error) {
            console.error('Error setting refresh token:', error);
        }
    }

    /**
     * Clear all tokens
     */
    async clearTokens(): Promise<void> {
        try {
            await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY]);
        } catch (error) {
            console.error('Error clearing tokens:', error);
        }
    }

    /**
     * Build headers for request
     */
    private async buildHeaders(customHeaders?: HeadersInit): Promise<HeadersInit> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...customHeaders,
        };

        const token = await this.getToken();
        console.log('📤 Request token:', token ? token.substring(0, 20) + '...' : 'NO TOKEN');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    /**
     * Handle API response
     */
    private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');

        let data;
        if (isJson) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            throw {
                message: data.message || ERROR_MESSAGES.SERVER_ERROR,
                status: response.status,
                errors: data.errors,
            } as ApiError;
        }

        return {
            success: true,
            data: data.data || data,
            message: data.message,
        };
    }

    /**
     * Handle API errors
     */
    private handleError(error: any): ApiResponse {
        console.error('API Error:', error);

        if (error.name === 'AbortError') {
            return {
                success: false,
                error: ERROR_MESSAGES.TIMEOUT_ERROR,
            };
        }

        if (!error.status) {
            const msg = ERROR_MESSAGES.NETWORK_ERROR;
            if (Platform.OS === 'android') {
                ToastAndroid.show(msg, ToastAndroid.LONG);
            } else {
                // Determine if we should alert on iOS or just log, for now alert
                // Alert.alert('Network Error', msg);
            }

            return {
                success: false,
                error: msg,
            };
        }

        switch (error.status) {
            case HTTP_STATUS.UNAUTHORIZED:
                return {
                    success: false,
                    error: ERROR_MESSAGES.UNAUTHORIZED,
                };
            case HTTP_STATUS.FORBIDDEN:
                return {
                    success: false,
                    error: ERROR_MESSAGES.FORBIDDEN,
                };
            case HTTP_STATUS.NOT_FOUND:
                return {
                    success: false,
                    error: ERROR_MESSAGES.NOT_FOUND,
                };
            case HTTP_STATUS.UNPROCESSABLE_ENTITY:
                return {
                    success: false,
                    error: error.message || ERROR_MESSAGES.VALIDATION_ERROR,
                };
            default:
                return {
                    success: false,
                    error: error.message || ERROR_MESSAGES.SERVER_ERROR,
                };
        }
    }

    /**
     * Make GET request
     */
    async get<T = any>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        try {
            const headers = await this.buildHeaders(options?.headers);
            console.log(`🚀 GET Request to ${endpoint}`);
            const startTime = Date.now();

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'GET',
                headers,
                ...options,
            });

            console.log(`✅ GET ${endpoint} completed in ${Date.now() - startTime}ms`);
            return await this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Make POST request
     */
    async post<T = any>(
        endpoint: string,
        body?: any,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        try {
            console.log(`🚀 POST Request to ${endpoint}`);

            const headers = await this.buildHeaders(options?.headers);
            const startTime = Date.now();

            // Native fetch with no manual abort controller for now to fix 'Aborted' error
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
                ...options,
            });

            console.log(`✅ POST ${endpoint} completed in ${Date.now() - startTime}ms`);
            return await this.handleResponse<T>(response);
        } catch (error) {
            console.error(`❌ POST ${endpoint} failed:`, error);
            return this.handleError(error);
        }
    }

    /**
     * Make PUT request
     */
    async put<T = any>(
        endpoint: string,
        body?: any,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        try {
            const headers = await this.buildHeaders(options?.headers);
            console.log(`🚀 PUT Request to ${endpoint}`);
            const startTime = Date.now();

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body),
                ...options,
            });

            console.log(`✅ PUT ${endpoint} completed in ${Date.now() - startTime}ms`);
            return await this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Make PATCH request
     */
    async patch<T = any>(
        endpoint: string,
        body?: any,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        try {
            const headers = await this.buildHeaders(options?.headers);
            console.log(`🚀 PATCH Request to ${endpoint}`);
            const startTime = Date.now();

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(body),
                ...options,
            });

            console.log(`✅ PATCH ${endpoint} completed in ${Date.now() - startTime}ms`);
            return await this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Make DELETE request
     */
    async delete<T = any>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        try {
            const headers = await this.buildHeaders(options?.headers);
            console.log(`🚀 DELETE Request to ${endpoint}`);
            const startTime = Date.now();

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'DELETE',
                headers,
                ...options,
            });

            console.log(`✅ DELETE ${endpoint} completed in ${Date.now() - startTime}ms`);
            return await this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Upload file with multipart/form-data
     */
    async uploadFile<T = any>(
        endpoint: string,
        formData: FormData,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        try {
            const token = await this.getToken();
            const headers: HeadersInit = {
                ...options?.headers,
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            console.log(`🚀 UPLOAD Request to ${endpoint}`);
            const startTime = Date.now();

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers,
                body: formData,
                ...options,
            });

            console.log(`✅ UPLOAD ${endpoint} completed in ${Date.now() - startTime}ms`);
            return await this.handleResponse<T>(response);
        } catch (error) {
            return this.handleError(error);
        }
    }
}

// Export singleton instance
export default new ApiClient();
