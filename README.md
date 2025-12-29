# LocalFix - Service Booking Mobile App

A modern React Native mobile application for booking trusted local services in India. Built with Expo, React Navigation, and TypeScript.

## 📱 Features

### 10 Complete Screens with Dummy Data

#### 1. **Welcome Screen** 
- Beautiful gradient background with service icons (Plumber, Electrician, Cleaner)
- Headline: "Find trusted services near you"
- Feature highlights with icons
- Call-to-action "Get Started" button with shadow effects

#### 2. **Phone Number Screen**
- Centered input with India flag + +91 country code
- OTP animation placeholder
- Helpful messaging about SMS verification
- Dynamic button enabled/disabled state

#### 3. **OTP Verification Screen**
- 4-digit OTP input boxes with auto-spacing
- Countdown timer for resend functionality
- Message arrival illustration
- Resend OTP link with timer

#### 4. **Home Screen**
- Location bar with GPS icon
- Search functionality for services
- Hero banner carousel with promotional offers
- 8-category grid (Plumber, Electrician, AC, Carpenter, Cleaning, Painter, Tutor, Beauty)
- "Popular Near You" service cards with ratings and prices

#### 5. **Category Listing Screen**
- Sub-services display (Tap Leaking, Motor Installation, etc.)
- Card-based layout with icons and descriptions
- Starting price display
- Sort/filter options

#### 6. **Provider Selection Screen**
- List of service providers with:
  - Profile photos/avatars with verification badges
  - Star ratings and review counts
  - Experience level
  - Distance from user
  - Price estimates
- Sort by: Rating, Price, Distance
- "Book Now" buttons with visual feedback

#### 7. **Booking Summary Screen**
- Service and provider details
- Date & Time selection
- Delivery address card
- Price breakdown (service charge, taxes, fees)
- Coupon code entry
- Sticky bottom bar with total amount and "Confirm Booking"
- Glassmorphism design elements

#### 8. **Live Tracking Screen**
- ETA display bar at top
- Map background with provider pin
- Provider contact information (Call/Chat buttons)
- Timeline indicator showing:
  - Requested
  - Accepted
  - On the way
  - Arrived
  - Completed
- Service details summary
- Address display

#### 9. **My Bookings Screen**
- Tabbed interface (Upcoming, Ongoing, Completed)
- Booking cards with:
  - Service icon and name
  - Provider name
  - Date and time
  - Status badges with color coding
  - View Details button
- Empty states for each tab
- Rating display for completed bookings

#### 10. **Profile Screen**
- User profile header with avatar edit button
- Quick stats (Bookings, Rating, Saved amount)
- Phone number display with edit option
- Menu items:
  - Saved Addresses
  - Payment Methods
  - Wallet
  - Help & Support
  - Privacy Policy
  - About LocalFix
- Preference toggles (Notifications, Dark Mode)
- Logout button
- App version and footer

## 🎨 Design Features

- **Blue Accent Theme**: #1A73E8 primary color
- **Clean White Backgrounds**: Professional minimal design
- **Soft Shadows**: Depth and glassmorphism effects
- **Rounded Corners**: Modern card-based UI
- **Material Icons**: Comprehensive icon library
- **Smooth Animations**: Navigation transitions
- **Responsive Layout**: Works on various screen sizes
- **Dummy Data**: Pre-populated with realistic Indian context

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack & Bottom Tab)
- **State Management**: React Hooks (useState, useContext)
- **Styling**: StyleSheet API
- **Icons**: React Native Vector Icons (Material Icons)
- **TypeScript**: Type-safe development
- **Language**: TypeScript/JavaScript

## 📦 Project Structure

```
localfix/
├── App.tsx                          # Main navigation setup
├── screens/
│   ├── auth/
│   │   ├── WelcomeScreen.tsx
│   │   ├── PhoneNumberScreen.tsx
│   │   └── OTPVerificationScreen.tsx
│   └── app/
│       ├── HomeScreen.tsx
│       ├── CategoryListingScreen.tsx
│       ├── ProviderSelectionScreen.tsx
│       ├── BookingSummaryScreen.tsx
│       ├── LiveTrackingScreen.tsx
│       ├── MyBookingsScreen.tsx
│       └── ProfileScreen.tsx
├── app.json
├── package.json
├── tsconfig.json
└── index.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14
- npm or yarn
- Expo CLI (optional but recommended)

### Installation

1. **Install dependencies**:
```bash
npm install
```

Or with yarn:
```bash
yarn install
```

### Running the App

#### Using Expo Go (Recommended for Development)
```bash
npm start
```

This will start the Expo development server. Then:
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator
- Scan QR code with Expo Go app on your phone

#### Build for Android
```bash
npm run android
```

#### Build for iOS
```bash
npm run ios
```

#### Web Preview
```bash
npm run web
```

## 🎯 Navigation Flow

```
Welcome Screen
    ↓
Phone Number Screen
    ↓
OTP Verification Screen
    ↓
Home Screen (Tab: Home)
    ├── Category Listing
    ├── Provider Selection
    ├── Booking Summary
    └── Live Tracking
    
Home Screen (Tab: Bookings) → My Bookings Screen

Home Screen (Tab: Profile) → Profile Screen
```

## 📊 Dummy Data

The app includes pre-populated data for:
- **Services**: 8 categories with sub-services
- **Providers**: 4 service providers per category
- **Bookings**: Examples for Upcoming, Ongoing, and Completed states
- **User Profile**: Sample user information

## 🔑 Key Components

### Color Palette
- **Primary Blue**: #1A73E8
- **Success Green**: #2ECC71
- **Warning Orange**: #FFA500
- **Error Red**: #FF6B6B
- **Background Gray**: #F8F9FA, #F0F7FF

### Typography
- **Headlines**: 28-32px, Bold (900)
- **Subheadings**: 16-20px, Bold (700)
- **Body**: 12-16px, Regular (400-600)

### Spacing
- Standard padding: 16-20px
- Card margin: 12px
- Icon gaps: 8-12px

## 🔒 Authentication

Currently using dummy authentication flow. To integrate real authentication:
1. Replace OTP verification logic in `OTPVerificationScreen.tsx`
2. Add API calls for phone verification
3. Implement token storage with AsyncStorage
4. Add refresh token logic

## 📡 API Integration

To connect with a backend:
1. Install `axios` or `fetch` for API calls
2. Create a services folder for API endpoints
3. Update screen components to call real APIs instead of using dummy data
4. Add loading and error states

## 🎓 Learning Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

## 💡 Future Enhancements

- [ ] Real-time notifications with Firebase
- [ ] Payment integration (Razorpay, Stripe)
- [ ] Live chat feature
- [ ] Review and rating system
- [ ] Booking history with filters
- [ ] Push notifications
- [ ] Dark mode support
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Referral system
- [ ] Loyalty rewards

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Support

For questions or issues, refer to the screen components' inline comments or the React Native documentation.

---

**LocalFix** - Find trusted services near you! 🔧⚡🧹
