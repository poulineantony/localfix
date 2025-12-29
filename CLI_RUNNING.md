# 🎯 LocalFix - Running with CLI (Non-Expo)

## ⚙️ Using Pure React Native CLI

If you want to run with pure React Native CLI instead of Expo, follow this guide:

---

## 🚀 Option 1: Run with Expo CLI (Current Setup)

Expo is already configured and works best for rapid development.

### Start Server
```powershell
npm start
```

### Then Choose Platform
- Press `a` → Android Emulator
- Press `i` → iOS Simulator
- Press `w` → Web
- Press `j` → Debugger

### Scan QR Code
Or install Expo Go app and scan the QR code shown.

---

## 🔧 Option 2: Run on Android (CLI Only)

### Prerequisites
- Android SDK installed
- Android emulator running OR Android device connected

### Steps
```powershell
# 1. Install React Native CLI
npm install -g react-native-cli

# 2. Build Android app
npx react-native build-android

# 3. Run on Android
npx react-native run-android
```

---

## 🍎 Option 3: Run on iOS (Mac Only)

### Prerequisites
- Mac with Xcode installed
- iOS simulator running

### Steps
```powershell
# 1. Install React Native CLI
npm install -g react-native-cli

# 2. Build iOS app
npx react-native build-ios

# 3. Run on iOS
npx react-native run-ios
```

---

## 🌐 Option 4: Run on Web

### Using Expo Web
```powershell
npm run web
```

This opens the app in your default browser at `http://localhost:19006`

---

## 📋 Available NPM Commands

```powershell
# Start development server (Expo)
npm start

# Start with Expo but clear cache
npm start -- --clear

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run on Web
npm run web

# Eject from Expo (optional, not reversible!)
npm run eject
```

---

## 🔌 Port Information

- **Expo Server**: Port 19000
- **Metro Bundler**: Port 8081
- **Web Server**: Port 19006

### If Port is Already in Use
```powershell
# Find process using port
Get-NetTCPConnection -LocalPort 19000 -ErrorAction SilentlyContinue

# Kill the process
Stop-Process -ID <processId> -Force

# Then try again
npm start
```

---

## 🛠️ CLI Tools Available

### React Native CLI
```powershell
# Install globally
npm install -g react-native-cli

# Check version
react-native --version

# Create new project
react-native init MyApp

# Link native modules
react-native link
```

### Expo CLI
```powershell
# Install globally
npm install -g expo-cli

# Check version
expo --version

# Start project
expo start

# Build for production
expo build:android
expo build:ios
```

### Metro Bundler (Included)
```powershell
# Reset cache
npm start -- --reset-cache

# Clear watchman cache
watchman watch-del-all

# Verbose output
npm start -- --verbose
```

---

## 🐛 Troubleshooting CLI Issues

### Issue: "Metro bundler failed"
**Solution:**
```powershell
# Clear cache
npm start -- --reset-cache

# Or remove and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: "Cannot find module"
**Solution:**
```powershell
# Reinstall packages
npm install

# Or reinstall specific package
npm install react-native
```

### Issue: "Port 19000 already in use"
**Solution:**
```powershell
# Find and kill process
Get-NetTCPConnection -LocalPort 19000 | Stop-Process -Force

# Try again
npm start
```

### Issue: "TypeScript errors"
**Solution:**
```powershell
# Reinstall TypeScript
npm install --save-dev typescript@~5.3.0

# Clear cache
npm start -- --clear
```

### Issue: "React Native version mismatch"
**Solution:**
```powershell
# Check versions
npm list react-native
npm list react

# Update if needed
npm install react-native@latest
npm install react@latest
```

---

## 📊 System Requirements

**Minimum:**
- Node.js 14+
- npm 6+
- 500 MB disk space

**Recommended:**
- Node.js 18+
- npm 9+
- 2+ GB disk space
- 4+ GB RAM

---

## 🎓 Development Workflow

### Typical Development Session

**Terminal 1: Run the app**
```powershell
npm start
```

**Terminal 2: Monitor files**
```powershell
Get-ChildItem -Recurse -File -Filter "*.tsx" | ForEach-Object { $_.FullName }
```

**Terminal 3: View logs**
```powershell
npm start -- --verbose
```

---

## 📱 Testing on Different Devices

### Physical Android Device
1. Enable USB Debugging on device
2. Connect via USB
3. Run: `npm run android`

### Physical iOS Device
1. Connect via USB
2. Run: `npm run ios`
3. Select device when prompted

### Emulator/Simulator
1. Start Android Emulator or iOS Simulator
2. Run: `npm start`
3. Press `a` or `i`

### Web Browser
1. Run: `npm run web`
2. Opens automatically in browser
3. Can also visit: `http://localhost:19006`

---

## 🎨 Live Reload & Hot Reload

**Hot Reload** (Reload only changed code):
- Press `r` in terminal running `npm start`

**Full Reload** (Reload everything):
- Press `R` (capital) in terminal

**Debugger**:
- Press `d` to open debugger
- Press `j` for Inspector

---

## 📦 Package.json Scripts

Your app has these npm scripts:

```json
"scripts": {
  "start": "expo start",           // Start dev server
  "android": "expo start --android", // Run on Android
  "ios": "expo start --ios",       // Run on iOS
  "web": "expo start --web",       // Run on Web
  "eject": "expo eject"            // Eject from Expo
}
```

Run any script with: `npm run scriptname`

---

## 🚀 Performance Tips

**Optimize Development:**
```powershell
# Clear cache before starting
npm start -- --reset-cache

# Use verbose mode for debugging
npm start -- --verbose

# Monitor specific files
npm start -- --watch-delay 1000
```

**Reduce Bundler Time:**
1. Close unnecessary apps
2. Use native code editor
3. Keep fewer files open
4. Clear node_modules periodically

---

## 📚 Resources

- **React Native Docs**: https://reactnative.dev/docs/getting-started
- **Expo Docs**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/docs/getting-started
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## ✨ Quick Commands Summary

| Command | Purpose |
|---------|---------|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run web` | Run in browser |
| `npm start -- --clear` | Start with cache clear |
| `npm install` | Install dependencies |
| `npm list` | Show dependencies |
| `npm audit` | Check security |
| `npm update` | Update packages |

---

## 🎯 Next Steps

1. **For Quick Testing**: Use `npm start` + Expo Go app
2. **For Emulator**: Use `npm run android` or `npm run ios`
3. **For Web**: Use `npm run web`
4. **For Production**: See deployment guide

---

## 💡 Pro Tips

✅ **Use Expo Go for fast iteration**
✅ **Keep metro bundler running in background**
✅ **Use device for final testing**
✅ **Clear cache if builds are slow**
✅ **Check console for helpful error messages**

---

**Ready to develop! 🚀**

*For Expo setup, see: STARTUP.md*
*For full docs, see: README.md*
