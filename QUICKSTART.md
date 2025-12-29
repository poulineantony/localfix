# ⚡ Quick Start Guide - LocalFix

## 🎬 Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the App
```bash
npm start
```

### 3. View the App

**Option A: Using Expo Go (Easiest)**
- Download Expo Go from App Store/Google Play
- Scan the QR code from terminal
- App opens in Expo Go!

**Option B: Android Emulator**
```bash
# After starting with npm start
Press 'a'
```

**Option C: iOS Simulator**
```bash
# After starting with npm start
Press 'i'
```

## 📲 Testing the Complete Flow

### Auth Flow (Screens 1-3)
1. **Welcome Screen** - Tap "Get Started"
2. **Phone Number** - Enter any 10-digit number, tap "Send OTP"
3. **OTP Verification** - Enter any 4 digits, tap "Verify OTP"

### Main App (Screens 4-10)

#### Home Screen (Screen 4)
- View location, search bar, banners, categories
- Tap any service to explore
- Scroll to see "Popular Near You" services

#### Category Listing (Screen 5)
- After tapping a category from Home
- View sub-services (e.g., "Tap Leaking", "Motor Installation")
- Tap a service to select provider

#### Provider Selection (Screen 6)
- See 4 service providers
- Use Sort chips (Price, Rating, Distance)
- Tap "Book Now" on any provider

#### Booking Summary (Screen 7)
- Review service, provider, date, time, address
- Enter coupon code (optional)
- View price breakdown
- Tap "Confirm Booking"

#### Live Tracking (Screen 8)
- Track provider in real-time
- View order timeline
- Call or Chat with provider
- See ETA countdown

#### My Bookings Tab (Screen 9)
- Switch between Upcoming/Ongoing/Completed
- View booking cards with status badges
- See ratings for completed bookings

#### Profile Tab (Screen 10)
- View user profile & quick stats
- Browse menu items
- Toggle preferences
- Tap Logout (demo only)

## 🛠️ Project Structure Quick Reference

```
localfix/
├── App.tsx                    ← Main navigation logic
├── screens/
│   ├── auth/                  ← Authentication screens (3)
│   │   ├── WelcomeScreen.tsx
│   │   ├── PhoneNumberScreen.tsx
│   │   └── OTPVerificationScreen.tsx
│   └── app/                   ← App screens (7)
│       ├── HomeScreen.tsx
│       ├── CategoryListingScreen.tsx
│       ├── ProviderSelectionScreen.tsx
│       ├── BookingSummaryScreen.tsx
│       ├── LiveTrackingScreen.tsx
│       ├── MyBookingsScreen.tsx
│       └── ProfileScreen.tsx
├── package.json               ← Dependencies
├── app.json                   ← Expo config
├── tsconfig.json              ← TypeScript config
└── README.md                  ← Full documentation
```

## 🎨 Design Highlights

### Color Theme
- **Primary**: Blue (#1A73E8) - Buttons, links, highlights
- **Backgrounds**: White, light gray, sky blue
- **Accents**: Green (success), Orange (warning), Red (error)

### UI Patterns
- ✨ **Glassmorphism**: Translucent cards with borders
- 🎯 **Rounded Corners**: Modern smooth edges (8-16px)
- 👤 **Avatar Rings**: Colored circular borders on images
- 🔵 **Status Badges**: Color-coded status indicators
- ⭐ **Star Ratings**: Visual 5-star system

## 📊 Dummy Data Overview

### Services
- 8 categories: Plumber, Electrician, AC, Carpenter, Cleaning, Painter, Tutor, Beauty
- 6 sub-services per category
- 3-4 popular services on home

### Providers
- 4 sample providers per category
- Ratings: 4.6-4.9 ⭐
- Experience: 3-8 years
- Distance: 1.2-3.8 km
- Verified badges ✓

### Bookings
- Upcoming: 2 bookings
- Ongoing: 1 booking
- Completed: 2 bookings with ratings

### User Profile
- Sample user: John Doe
- 12 total bookings
- 4.8 rating
- ₹2,450 saved

## 🔧 Common Customizations

### Change Primary Color
Edit in each screen's `styles.ts`:
```javascript
// Find: color: '#1A73E8'
// Replace with: color: '#YOUR_COLOR'
```

### Change App Name
```json
// In app.json
"name": "LocalFix",
"slug": "localfix"
```

### Update User Info
Edit `ProfileScreen.tsx`:
```javascript
// Line ~60-70: Update user details
profileName: 'Your Name',
profileEmail: 'your.email@example.com',
```

### Add More Services
Edit `HomeScreen.tsx`:
```javascript
// In CATEGORIES array (line ~32)
// Add: { id: '9', name: 'Your Service', ... }
```

## 📱 Screen-by-Screen Navigation

```
┌─────────────────┐
│  Welcome        │
│  "Get Started"  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Phone Number   │
│  "Send OTP"     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  OTP Verify     │
│  "Verify OTP"   │
└────────┬────────┘
         │
         ▼
┌──────────────────────────────────────┐
│       HOME SCREEN (Tab 1)            │
├──────────────────────────────────────┤
│ Location │ Search │ Banner │ Grid    │
│ 8 Categories │ Popular Services      │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ MY BOOKINGS (Tab 2)              │ │
│ │ Upcoming │ Ongoing │ Completed   │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ PROFILE (Tab 3)                  │ │
│ │ Avatar │ Stats │ Menu │ Settings │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
         │
         ├─→ Category Listing
         │   └─→ Provider Selection
         │       └─→ Booking Summary
         │           └─→ Live Tracking
         │
         └─→ My Bookings (Tab)
         └─→ Profile (Tab)
```

## ✨ Cool Features to Try

1. **Countdown Timer** (OTP Screen)
   - Watch the 60-second timer count down
   - See "Resend OTP" button appear when time expires

2. **Tab Navigation** (My Bookings)
   - Swipe or tap tabs to see different booking states
   - Notice empty states and animations

3. **Status Badges** (My Bookings)
   - Different colors for different statuses
   - Pending (Orange), Confirmed (Teal), Completed (Green)

4. **Star Ratings** (Provider Selection)
   - Visual star display for each provider
   - Rating text with review count

5. **Price Breakdown** (Booking Summary)
   - Service charge + Taxes calculation
   - Dynamic total amount display

6. **Timeline** (Live Tracking)
   - Visual progression of order status
   - Connected timeline with checkmarks

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port 19000 already in use
```bash
# Expo will automatically use another port
# Or manually specify: npm start -- -p 3000
```

### Emulator won't connect
- Make sure Expo Go is installed on device/emulator
- Scan QR code again
- Check if phone and computer are on same WiFi

### TypeScript errors
- Most errors are development-time only
- App should still run in Expo
- All types are properly set to avoid runtime errors

## 📚 Additional Resources

- **Expo Docs**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/
- **React Native**: https://reactnative.dev/
- **Material Icons**: https://fonts.google.com/icons

## 🚀 Next: Building Real Features

Ready to add real functionality? Check:
1. `README.md` - Full feature documentation
2. `ARCHITECTURE.md` - Technical deep dive
3. Individual screen files - Inline code comments

## 💡 Pro Tips

1. **Use Search**: Ctrl+F to find any component
2. **Quick Navigation**: Press 'r' in terminal to reload
3. **Device Testing**: Test on actual phone in Expo Go
4. **Performance**: Monitor frame rate in Expo devtools
5. **Hot Reload**: Changes auto-update while app is running

---

**You're all set! 🎉 Start exploring LocalFix now!**

Questions? Check the comments in screen files or refer to full documentation.
