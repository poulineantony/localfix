# React Native Debugging Guide - LocalFix

## 🔧 Quick Debug Menu Access

### Open Developer Menu:
- **Physical Device**: Shake your device
- **Command Line**: `adb shell input keyevent 82`
- **Emulator**: Press `Ctrl + M` (Windows) or `Cmd + M` (Mac)

---

## 🛠️ Debugging Tools

### 1. **Chrome DevTools** (Recommended for API Debugging)

**Setup:**
1. Open developer menu on device
2. Tap **"Debug"**
3. Chrome opens at `http://localhost:8081/debugger-ui`
4. Open Chrome DevTools: `F12` or `Ctrl+Shift+I`

**What you can do:**
- ✅ View `console.log()` output
- ✅ Monitor API calls in Network tab
- ✅ Set breakpoints in JavaScript code
- ✅ Inspect variables and state
- ✅ Debug async operations

**Example - Debug API Calls:**
```typescript
// In PhoneNumberScreen.tsx
const handleSendOTP = async () => {
  console.log('Sending OTP to:', phoneNumber);
  
  const response = await authService.sendOTP(phoneNumber);
  console.log('API Response:', response);
  
  if (response.success) {
    console.log('OTP sent successfully!', response.data);
  } else {
    console.error('Error:', response.error);
  }
};
```

---

### 2. **React DevTools** (Component Inspector)

**Setup:**
```bash
npx react-devtools
```

**What you can do:**
- ✅ Inspect React component tree
- ✅ View component props and state
- ✅ Edit props/state in real-time
- ✅ Track component re-renders
- ✅ Profile performance

---

### 3. **Element Inspector** (Layout Debugging)

**Setup:**
1. Open developer menu
2. Tap **"Show Inspector"**

**What you can do:**
- ✅ Inspect element layout
- ✅ View styles applied
- ✅ Check dimensions and positioning
- ✅ Debug layout issues

---

### 4. **Performance Monitor**

**Setup:**
1. Open developer menu
2. Tap **"Show Perf Monitor"**

**What you can monitor:**
- ✅ RAM usage
- ✅ JavaScript heap size
- ✅ Views count
- ✅ FPS (frames per second)

---

## 🐛 Debugging API Integration

### Monitor API Calls

Add logging to `api.client.ts`:

```typescript
async get<T = any>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  console.log('🔵 API GET:', endpoint);
  
  try {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers,
      ...options,
    });
    
    console.log('✅ Response:', response.status, response.statusText);
    const result = await this.handleResponse<T>(response);
    console.log('📦 Data:', result);
    
    return result;
  } catch (error) {
    console.error('❌ API Error:', error);
    return this.handleError(error);
  }
}
```

### Check Network Requests

In Chrome DevTools:
1. Go to **Network** tab
2. Filter by **Fetch/XHR**
3. See all API requests
4. Click on request to see:
   - Request headers
   - Request payload
   - Response data
   - Response time

---

## 🔍 Common Debugging Scenarios

### 1. **API Not Connecting**

**Debug Steps:**
```typescript
// Add to PhoneNumberScreen.tsx
const testConnection = async () => {
  console.log('Testing API connection...');
  console.log('API Base URL:', API_BASE_URL);
  
  try {
    const response = await fetch('http://localhost:5000/health');
    console.log('Health check response:', await response.json());
  } catch (error) {
    console.error('Connection failed:', error);
  }
};
```

**Check:**
- ✅ Backend is running
- ✅ Correct API URL for device type:
  - Emulator: `http://10.0.2.2:5000/api/v1`
  - Physical device: `http://YOUR_IP:5000/api/v1`
  - iOS Simulator: `http://localhost:5000/api/v1`

### 2. **OTP Not Working**

**Debug Steps:**
```typescript
const handleSendOTP = async () => {
  console.log('📱 Phone:', phoneNumber);
  console.log('📡 Sending to:', API_ENDPOINTS.AUTH.SEND_OTP);
  
  const response = await authService.sendOTP(phoneNumber);
  
  console.log('📨 Response:', {
    success: response.success,
    data: response.data,
    error: response.error
  });
  
  // Check backend console for OTP
  if (response.success && __DEV__) {
    console.log('🔑 OTP (dev mode):', response.data?.otp);
  }
};
```

**Check:**
- ✅ Backend console for OTP
- ✅ Phone number format (10 digits)
- ✅ Network tab for request/response

### 3. **Token Issues**

**Debug Steps:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const debugTokens = async () => {
  const token = await AsyncStorage.getItem('auth_token');
  const refreshToken = await AsyncStorage.getItem('refresh_token');
  
  console.log('🔐 Auth Token:', token ? 'Present' : 'Missing');
  console.log('🔄 Refresh Token:', refreshToken ? 'Present' : 'Missing');
  
  if (token) {
    // Decode JWT to check expiry
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Token expires:', new Date(payload.exp * 1000));
  }
};
```

---

## 📊 Logging Best Practices

### Use Descriptive Emojis:
```typescript
console.log('🔵 Starting API call...');
console.log('✅ Success!');
console.error('❌ Error occurred');
console.warn('⚠️ Warning');
console.log('📦 Data:', data);
console.log('🔑 Token:', token);
console.log('📱 Phone:', phone);
console.log('🔐 Auth:', isAuthenticated);
```

### Group Related Logs:
```typescript
console.group('🔵 Send OTP');
console.log('Phone:', phoneNumber);
console.log('Endpoint:', endpoint);
console.log('Timestamp:', new Date().toISOString());
console.groupEnd();
```

### Conditional Logging:
```typescript
if (__DEV__) {
  console.log('Development mode - showing sensitive data');
  console.log('OTP:', otp);
}
```

---

## 🚀 Advanced Debugging

### 1. **Reactotron** (Powerful Debugging Tool)

Install:
```bash
npm install --save-dev reactotron-react-native
```

Setup in `App.tsx`:
```typescript
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
```

### 2. **Flipper** (Meta's Official Debugger)

Download from: https://fbflipper.com/

Features:
- Network inspector
- Databases viewer
- Logs viewer
- Layout inspector
- Crash reporter

---

## 🎯 Quick Debug Checklist

When something doesn't work:

- [ ] Check Metro bundler is running
- [ ] Check backend server is running
- [ ] Check MongoDB is running
- [ ] Open Chrome DevTools and check Console
- [ ] Check Network tab for failed requests
- [ ] Check backend console for errors
- [ ] Verify API base URL is correct
- [ ] Check AsyncStorage for tokens
- [ ] Reload app (double tap R in dev menu)
- [ ] Clear cache and rebuild

---

## 🔧 Useful Commands

```bash
# Open dev menu
adb shell input keyevent 82

# Reload app
adb shell input text "RR"

# Clear app data
adb shell pm clear com.localfix

# View device logs
adb logcat

# View React Native logs only
adb logcat *:S ReactNative:V ReactNativeJS:V

# Reverse port (for physical device)
adb reverse tcp:5000 tcp:5000
adb reverse tcp:8081 tcp:8081
```

---

## 📱 Device-Specific API URLs

Update `config/api.config.ts` based on your setup:

```typescript
// For Android Emulator
export const API_BASE_URL = 'http://10.0.2.2:5000/api/v1';

// For iOS Simulator
export const API_BASE_URL = 'http://localhost:5000/api/v1';

// For Physical Device (replace with your computer's IP)
export const API_BASE_URL = 'http://192.168.1.100:5000/api/v1';

// Auto-detect (recommended)
export const API_BASE_URL = __DEV__ 
  ? Platform.select({
      android: 'http://10.0.2.2:5000/api/v1',
      ios: 'http://localhost:5000/api/v1',
    })
  : 'https://api.production.com/api/v1';
```

---

## 🎉 Happy Debugging!

Remember:
- Use console.log liberally in development
- Check both frontend and backend logs
- Use Chrome DevTools Network tab for API issues
- React DevTools for component issues
- Always check the Metro bundler console

**Need help? Check the logs first!** 📝
