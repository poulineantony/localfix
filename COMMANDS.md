# 🚀 LocalFix - Pure React Native CLI Commands

## ✅ Expo Removed - Pure CLI Ready

**Status:** Fully converted to React Native CLI
**Dependencies:** 700 packages installed
**Configuration:** metro.config.js + .babelrc ready

---

## 🎯 Essential Commands

### Start Development
```powershell
npm start
```

**This starts Metro Bundler on port 8081**

### Run on Android
```powershell
npm run android
```

**Requirements:**
- Android SDK installed
- Android emulator running OR Android device connected via USB

### Run on iOS (Mac only)
```powershell
npm run ios
```

**Requirements:**
- Mac with Xcode
- iOS simulator running OR iOS device

---

## 🏗️ Build Commands

### Build Android Debug APK
```powershell
npm run build:android
```

**Output:** `android/app/build/outputs/apk/debug/app-debug.apk`

### Build iOS App (Mac only)
```bash
npm run build:ios
```

**Output:** Built iOS app bundle

---

## 📊 Check & Verify

### Check Dependencies
```powershell
npm list --depth=0
```

### Check npm Version
```powershell
npm --version
```

### Check Node Version
```powershell
node --version
```

### Audit Security
```powershell
npm audit
```

---

## 🔧 Configuration Files

### metro.config.js
- Metro bundler configuration
- Asset file extensions
- Integration with React Native

### .babelrc
- Babel transpiler presets
- Handles TypeScript
- Preset environment setup

### .watchmanconfig
- File watcher configuration
- Optimizes hot reload
- Ignored directories

### tsconfig.json
- TypeScript compiler options
- Path aliases
- Target ES2020

### index.ts
- App entry point
- Uses React Native AppRegistry
- Imports App component

---

## 🌐 Development Workflow

### Typical Session

**Terminal 1: Start Bundler**
```powershell
npm start
```

**Terminal 2: Run App**
```powershell
npm run android
```

Or in IDE:
```powershell
npm run ios
```

### Hot Reload
- Edit any .tsx file
- Save the file
- App updates automatically
- No restart needed

---

## 🐛 Troubleshooting

### Metro Bundler Won't Start
```powershell
# Clear cache
npm start -- --reset-cache

# Or kill existing processes
Get-Process node | Stop-Process -Force
npm start
```

### Module Not Found
```powershell
# Reinstall packages
Remove-Item -Recurse -Force node_modules
npm cache clean --force
npm install
```

### Android Build Failed
```powershell
# Clean Android build
cd android
./gradlew clean

# Rebuild
cd ..
npm run android
```

### Port 8081 Already in Use
```powershell
# Find and kill process
Get-NetTCPConnection -LocalPort 8081 | Stop-Process -Force

# Restart
npm start
```

### TypeScript Errors
```powershell
# Reinstall TypeScript
npm install --save-dev typescript@^5.3.0

# Clear cache
npm start -- --reset-cache
```

---

## 📱 Testing Platforms

### Android Emulator
```powershell
# Start Metro
npm start

# In another terminal
npm run android
```

### iOS Simulator (Mac)
```bash
# Start Metro
npm start

# In another terminal
npm run ios
```

### Physical Android Device
1. Enable USB Debugging
2. Connect via USB
3. Run `npm run android`

### Physical iOS Device (Mac)
1. Connect via USB
2. Run `npm run ios`
3. Select device when prompted

---

## 🎮 While App is Running

### Reload Commands (Android/Metro)
```
r     - Reload app
R     - Hard reload
d     - Open debugger
i     - Toggle inspector
j     - Open Flipper debugger
m     - Toggle menu
q     - Quit Metro
```

---

## 📊 Project Structure

```
localfix/
├── android/                    (Android native code)
├── ios/                        (iOS native code)
├── node_modules/               (700 packages)
├── screens/                    (10 screens)
├── App.tsx                     (Main component)
├── index.ts                    (Entry point - React Native)
├── metro.config.js             (Metro config) ✨
├── .babelrc                    (Babel config) ✨
├── .watchmanconfig             (Watchman config) ✨
├── package.json                (Dependencies - UPDATED)
├── app.json                    (App config - SIMPLIFIED)
├── tsconfig.json               (TypeScript config)
├── .gitignore                  (Git rules)
└── Documentation/              (13 guides)
```

---

## 🚀 Complete Command Reference

| Command | What It Does |
|---------|------------|
| `npm start` | Start Metro bundler on port 8081 |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS (Mac) |
| `npm run build:android` | Build Android APK only |
| `npm run build:ios` | Build iOS app only (Mac) |
| `npm install` | Install dependencies |
| `npm list` | Show all dependencies |
| `npm list --depth=0` | Show top-level deps only |
| `npm audit` | Check security issues |
| `npm update` | Update all packages |
| `npm cache clean --force` | Clear npm cache |

---

## 💡 Development Tips

### Use Hot Reload
- Save file → App updates automatically
- Perfect for UI/UX development

### Check Metro Output
- Watch for bundle progress
- Look for error messages
- Bundling should complete in seconds

### Use TypeScript
- Get IntelliSense in VS Code
- Catch errors before runtime
- Better code quality

### Test on Physical Device
- Final UI testing
- Performance testing
- Real-world testing

### Debug with Inspector
- Press 'i' in Metro terminal (Android)
- Use Xcode debugger (iOS)
- View component hierarchy

---

## 🎯 Quick Workflows

### Fast Development
```powershell
# Terminal 1
npm start

# Terminal 2
npm run android

# Make changes - they auto-reload!
```

### Android Testing
```powershell
npm start
npm run android
# Test app, make changes, hot reload
```

### iOS Testing (Mac)
```bash
npm start
npm run ios
# Test app, make changes, hot reload
```

### Production Build
```powershell
npm run build:android
npm run build:ios    # Mac only
```

---

## 🔍 Debugging

### Check Config Files
```powershell
# View Metro config
type metro.config.js

# View Babel config
type .babelrc

# View TypeScript config
type tsconfig.json

# View app config
type app.json
```

### View Dependencies
```powershell
# Show all deps
npm list

# Show top-level only
npm list --depth=0

# Check specific package
npm list react-native
npm list @react-navigation/native
```

### Check Node/npm
```powershell
node --version
npm --version
npm config get prefix
```

---

## 📚 Related Documentation

- `EXPO_REMOVED.md` - What was changed
- `PURE_CLI_SETUP.md` - Detailed setup guide
- `README.md` - Full documentation
- `PURE_CLI_SETUP.md` - Complete guide

---

## 🎓 Learning Resources

- **React Native Docs**: https://reactnative.dev/docs/getting-started
- **Metro Bundler**: https://facebook.github.io/metro/
- **Babel Documentation**: https://babeljs.io/
- **React Navigation**: https://reactnavigation.org/

---

## ✨ Summary

**You have:**
- ✅ Pure React Native (no Expo)
- ✅ CLI-based development
- ✅ Metro bundler
- ✅ Babel transpilation
- ✅ 10 functional screens
- ✅ TypeScript support
- ✅ Full documentation

**Commands to remember:**
```powershell
npm start           # Start bundler
npm run android     # Run on Android
npm run ios         # Run on iOS (Mac)
npm run build:*     # Build for production
```

---

**Ready to develop! 🚀**

*Pure React Native CLI*
*No Expo*
*Full Control*
