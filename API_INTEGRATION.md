# LocalFix API Integration Guide

## Overview
This document provides a comprehensive guide for integrating the LocalFix frontend with the backend API.

## Architecture

### Directory Structure
```
localfixFE/
├── config/
│   └── api.config.ts          # API configuration and endpoints
├── services/
│   ├── api.client.ts          # Core HTTP client
│   ├── auth.service.ts        # Authentication services
│   ├── user.service.ts        # User management services
│   ├── service.service.ts     # Service catalog services
│   ├── booking.service.ts     # Booking management services
│   ├── provider.service.ts    # Provider management services
│   ├── review.service.ts      # Review services
│   └── index.ts               # Service exports
└── screens/
    ├── auth/                  # Authentication screens
    └── app/                   # Main app screens
```

## Configuration

### API Base URL
The API base URL is configured in `config/api.config.ts`:

- **Development**: `http://localhost:5000/api/v1`
- **Production**: Update `API_BASE_URL` in `api.config.ts`

### Environment Variables
For production, you should use environment variables:

```typescript
// In api.config.ts
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
```

## Services

### 1. Authentication Service (`auth.service.ts`)

#### Methods:
- `register(data)` - Register a new user
- `login(data)` - Login user
- `logout()` - Logout user
- `getMe()` - Get current user profile
- `refreshToken()` - Refresh authentication token
- `updatePassword(data)` - Update user password
- `sendOTP(phone)` - Send OTP for phone verification
- `verifyOTP(phone, otp)` - Verify OTP

#### Example Usage:
```typescript
import { authService } from '../services';

// Register
const response = await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  password: 'password123',
  role: 'user'
});

// Login
const loginResponse = await authService.login({
  email: 'john@example.com',
  password: 'password123'
});

// Get current user
const userResponse = await authService.getMe();
```

### 2. Service Service (`service.service.ts`)

#### Methods:
- `getAllServices(params?)` - Get all services with filters
- `getServiceById(id)` - Get service by ID
- `getServicesByCategory(category)` - Get services by category
- `createService(data)` - Create new service
- `updateService(id, data)` - Update service
- `deleteService(id)` - Delete service

#### Example Usage:
```typescript
import { serviceService } from '../services';

// Get all services
const services = await serviceService.getAllServices({
  category: 'plumbing',
  minPrice: 100,
  maxPrice: 500
});

// Get service by ID
const service = await serviceService.getServiceById('service-id');
```

### 3. Booking Service (`booking.service.ts`)

#### Methods:
- `getAllBookings(params?)` - Get all bookings (admin)
- `getMyBookings(params?)` - Get current user's bookings
- `getBookingById(id)` - Get booking by ID
- `createBooking(data)` - Create new booking
- `updateBooking(id, data)` - Update booking
- `updateBookingStatus(id, status)` - Update booking status
- `cancelBooking(id, reason?)` - Cancel booking

#### Example Usage:
```typescript
import { bookingService } from '../services';

// Create booking
const booking = await bookingService.createBooking({
  service: 'service-id',
  provider: 'provider-id',
  scheduledDate: '2024-01-15',
  scheduledTime: '10:00 AM',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  },
  notes: 'Please call before arriving'
});

// Get my bookings
const myBookings = await bookingService.getMyBookings({
  status: 'confirmed'
});

// Cancel booking
await bookingService.cancelBooking('booking-id', 'Changed plans');
```

### 4. Provider Service (`provider.service.ts`)

#### Methods:
- `getAllProviders(params?)` - Get all providers with filters
- `getProviderById(id)` - Get provider by ID
- `getProvidersByService(serviceId)` - Get providers by service
- `createProvider(data)` - Create provider profile
- `updateProvider(id, data)` - Update provider profile
- `updateAvailability(id, availability)` - Update provider availability
- `deleteProvider(id)` - Delete provider profile

#### Example Usage:
```typescript
import { providerService } from '../services';

// Get providers for a service
const providers = await providerService.getProvidersByService('service-id');

// Get provider details
const provider = await providerService.getProviderById('provider-id');
```

### 5. Review Service (`review.service.ts`)

#### Methods:
- `getAllReviews(params?)` - Get all reviews
- `getReviewById(id)` - Get review by ID
- `getReviewsByProvider(providerId)` - Get reviews by provider
- `getReviewByBooking(bookingId)` - Get review by booking
- `createReview(data)` - Create new review
- `updateReview(id, data)` - Update review
- `deleteReview(id)` - Delete review

#### Example Usage:
```typescript
import { reviewService } from '../services';

// Create review
const review = await reviewService.createReview({
  provider: 'provider-id',
  booking: 'booking-id',
  rating: 5,
  comment: 'Excellent service!'
});

// Get provider reviews
const reviews = await reviewService.getReviewsByProvider('provider-id');
```

### 6. User Service (`user.service.ts`)

#### Methods:
- `getAllUsers(params?)` - Get all users (admin)
- `getUserById(id)` - Get user by ID
- `updateProfile(data)` - Update current user profile
- `updateUser(id, data)` - Update user by ID (admin)
- `deleteUser(id)` - Delete user (admin)
- `uploadAvatar(imageUri)` - Upload user avatar

#### Example Usage:
```typescript
import { userService } from '../services';

// Update profile
const user = await userService.updateProfile({
  name: 'John Updated',
  email: 'john.updated@example.com'
});

// Upload avatar
const avatarResponse = await userService.uploadAvatar('file:///path/to/image.jpg');
```

## API Client

### Core Features

#### 1. Authentication
The API client automatically handles authentication tokens:
- Stores tokens in AsyncStorage
- Automatically adds Authorization header to requests
- Provides token refresh functionality

#### 2. Error Handling
All API calls return a standardized response:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

#### 3. Request Timeout
All requests have a 30-second timeout by default.

#### 4. HTTP Methods
- `get(endpoint, options?)` - GET request
- `post(endpoint, body?, options?)` - POST request
- `put(endpoint, body?, options?)` - PUT request
- `patch(endpoint, body?, options?)` - PATCH request
- `delete(endpoint, options?)` - DELETE request
- `uploadFile(endpoint, formData, options?)` - File upload

## Usage in Screens

### Example: Phone Number Screen with OTP

```typescript
import React, { useState } from 'react';
import { authService } from '../../services';

const PhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.sendOTP(phoneNumber);

      if (response.success) {
        navigation.navigate('OTPVerification', { phoneNumber });
      } else {
        setError(response.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
};
```

## Backend Requirements

### Missing Endpoints
The following endpoints need to be added to the backend:

1. **OTP Endpoints**:
   - `POST /api/v1/auth/send-otp` - Send OTP to phone
   - `POST /api/v1/auth/verify-otp` - Verify OTP

### Recommended Backend Updates

#### 1. Add OTP Controller
```javascript
// controllers/auth.controller.js

// Send OTP
exports.sendOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;
    
    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in database with expiry (5 minutes)
    // Send OTP via SMS service
    
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: { otp: process.env.NODE_ENV === 'development' ? otp : undefined }
    });
  } catch (error) {
    next(error);
  }
};

// Verify OTP
exports.verifyOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    
    // Verify OTP from database
    // Create or get user
    // Generate JWT token
    
    res.status(200).json({
      success: true,
      data: {
        token: 'jwt-token',
        refreshToken: 'refresh-token',
        user: userObject
      }
    });
  } catch (error) {
    next(error);
  }
};
```

#### 2. Add OTP Routes
```javascript
// routes/auth.routes.js
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
```

## Testing

### Test the API Connection

1. **Start the backend server**:
```bash
cd localfixBE
npm start
```

2. **Test health endpoint**:
```bash
curl http://localhost:5000/health
```

3. **Test from frontend**:
```typescript
import { apiClient } from './services';

// Test health check
const testConnection = async () => {
  const response = await apiClient.get('/health');
  console.log('API Connection:', response);
};
```

## Best Practices

### 1. Error Handling
Always handle errors gracefully:
```typescript
try {
  const response = await authService.login(credentials);
  if (response.success) {
    // Handle success
  } else {
    // Show error to user
    Alert.alert('Error', response.error);
  }
} catch (error) {
  // Handle unexpected errors
  Alert.alert('Error', 'Something went wrong');
}
```

### 2. Loading States
Show loading indicators during API calls:
```typescript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await serviceService.getAllServices();
    // Handle response
  } finally {
    setLoading(false);
  }
};
```

### 3. Token Management
The API client handles tokens automatically, but you can manually manage them:
```typescript
import { apiClient } from './services';

// Set token
await apiClient.setToken('your-token');

// Clear tokens (logout)
await apiClient.clearTokens();
```

## Troubleshooting

### Common Issues

1. **Network Error**
   - Check if backend server is running
   - Verify API_BASE_URL is correct
   - Check network connectivity

2. **CORS Error**
   - Update CORS_ORIGIN in backend .env file
   - For React Native, CORS shouldn't be an issue

3. **401 Unauthorized**
   - Token might be expired
   - Call `authService.refreshToken()` or re-login

4. **Timeout Error**
   - Increase timeout in `api.config.ts`
   - Check backend performance

## Next Steps

1. ✅ Install AsyncStorage dependency
2. ⏳ Add OTP endpoints to backend
3. ⏳ Update remaining screens to use API services
4. ⏳ Implement proper error handling UI
5. ⏳ Add offline support with caching
6. ⏳ Implement token refresh logic
7. ⏳ Add request interceptors for logging

## Support

For issues or questions:
- Check backend logs: `localfixBE/logs`
- Check frontend console for errors
- Review API documentation: `localfixBE/README.md`
