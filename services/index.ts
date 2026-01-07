/**
 * Services Index
 * Central export point for all API services
 */

export { default as authService } from './auth.service';
export { default as userService } from './user.service';
export { default as serviceService } from './service.service';
export { default as bookingService } from './booking.service';
export { default as providerService } from './provider.service';
export { default as reviewService } from './review.service';
export { default as apiClient } from './api.client';
export { default as deviceService } from './device.service';
export { default as configService } from './config.service';

// Export types
export type { User, RegisterData, LoginData, AuthResponse } from './auth.service';
export type { Service, CreateServiceData, UpdateServiceData } from './service.service';
export type { Booking, CreateBookingData, UpdateBookingData } from './booking.service';
export type { Provider, CreateProviderData, UpdateProviderData } from './provider.service';
export type { Review, CreateReviewData, UpdateReviewData } from './review.service';
export type { UpdateProfileData } from './user.service';
export type { ApiResponse, ApiError } from './api.client';
