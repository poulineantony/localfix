/**
 * API Configuration
 * Central configuration for all API endpoints and settings
 */

// Base URL for the API
export const API_BASE_URL = __DEV__
    ? 'http://localhost:5000/api/v1'  // Development (ADB Reverse)
    : 'https://your-production-api.com/api/v1'; // Production

// API timeout in milliseconds
export const API_TIMEOUT = 30000;

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAkoADrG6gliF87nW8R1c6ICDNnuTYd8l8';

// API endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh',
        GET_ME: '/auth/me',
        UPDATE_PASSWORD: '/auth/updatepassword',
    },

    // User endpoints
    USERS: {
        GET_ALL: '/users',
        GET_BY_ID: (id: string) => `/users/${id}`,
        UPDATE: (id: string) => `/users/${id}`,
        DELETE: (id: string) => `/users/${id}`,
        UPDATE_PROFILE: '/users/profile',
        UPLOAD_AVATAR: '/users/profile/avatar',
    },

    // Service endpoints
    SERVICES: {
        GET_ALL: '/services',
        GET_BY_ID: (id: string) => `/services/${id}`,
        CREATE: '/services',
        UPDATE: (id: string) => `/services/${id}`,
        DELETE: (id: string) => `/services/${id}`,
        GET_BY_CATEGORY: (category: string) => `/services/category/${category}`,
    },

    // Booking endpoints
    BOOKINGS: {
        GET_ALL: '/bookings',
        GET_BY_ID: (id: string) => `/bookings/${id}`,
        CREATE: '/bookings',
        UPDATE: (id: string) => `/bookings/${id}`,
        CANCEL: (id: string) => `/bookings/${id}/cancel`,
        GET_MY_BOOKINGS: '/bookings/my-bookings',
        UPDATE_STATUS: (id: string) => `/bookings/${id}/status`,
    },

    // Provider endpoints
    PROVIDERS: {
        GET_ALL: '/providers',
        GET_BY_ID: (id: string) => `/providers/${id}`,
        CREATE: '/providers',
        UPDATE: (id: string) => `/providers/${id}`,
        DELETE: (id: string) => `/providers/${id}`,
        GET_BY_SERVICE: (serviceId: string) => `/providers/service/${serviceId}`,
        UPDATE_AVAILABILITY: (id: string) => `/providers/${id}/availability`,
    },

    // Review endpoints
    REVIEWS: {
        GET_ALL: '/reviews',
        GET_BY_ID: (id: string) => `/reviews/${id}`,
        CREATE: '/reviews',
        UPDATE: (id: string) => `/reviews/${id}`,
        DELETE: (id: string) => `/reviews/${id}`,
        GET_BY_PROVIDER: (providerId: string) => `/reviews/provider/${providerId}`,
        GET_BY_BOOKING: (bookingId: string) => `/reviews/booking/${bookingId}`,
    },
};

// HTTP Methods
export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
} as const;

// Response status codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
} as const;

// Error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timeout. Please try again.',
    UNAUTHORIZED: 'Please login to continue.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'Resource not found.',
    SERVER_ERROR: 'Something went wrong. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
};
