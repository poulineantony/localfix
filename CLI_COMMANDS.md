# 🛠️ LocalFix CLI Commands Reference

## 📊 Project Statistics (Generated Nov 25, 2025)

```
Total Files:              24
TypeScript Components:    11
Configuration Files:      4
Documentation Files:      8
Gitignore Files:          1

Code Metrics:
├── Total TSX Lines:      3,324 lines
├── Total Docs Lines:     2,967 lines
├── Total Project Lines:  6,291+ lines

File Breakdown:
├── .tsx files:          11 files (3,324 lines)
├── .md files:           8 files (2,967 lines)
├── .json files:         3 files (config)
├── .ts files:           1 file (index)
└── .gitignore:          1 file

Screen Components:
Auth Screens (3):
├── WelcomeScreen.tsx                (193 lines)
├── PhoneNumberScreen.tsx            (226 lines)
└── OTPVerificationScreen.tsx        (266 lines)

App Screens (7):
├── HomeScreen.tsx                   (409 lines)
├── CategoryListingScreen.tsx        (224 lines)
├── ProviderSelectionScreen.tsx      (337 lines)
├── BookingSummaryScreen.tsx         (414 lines)
├── LiveTrackingScreen.tsx           (441 lines)
├── MyBookingsScreen.tsx             (340 lines)
└── ProfileScreen.tsx                (385 lines)

Core Files:
├── App.tsx                          (89 lines)
└── index.ts                         (1 line)

Documentation:
├── ARCHITECTURE.md                  (11.14 KB)
├── DELIVERY_SUMMARY.md              (13.06 KB)
├── INDEX.md                         (11.14 KB)
├── PROJECT_SUMMARY.md               (10.74 KB)
├── QUICKSTART.md                    (8.79 KB)
├── README.md                        (7.54 KB)
├── START_HERE.md                    (12.10 KB)
└── STRUCTURE.md                     (14.82 KB)
```

---

## 🚀 Essential Setup Commands

### 1. **Install All Dependencies** (Run this first!)
```powershell
npm install
```
✅ Installs all 17 required packages
⏱️ Takes 2-5 minutes first time
💾 Creates node_modules folder

### 2. **Start Development Server**
```powershell
npm start
```
✅ Launches Expo development server
✅ Shows QR code for mobile app
✅ Watch mode for live reloading

### 3. **Run on Android**
```powershell
npm run android
```
✅ Requires Android emulator or device

### 4. **Run on iOS**
```powershell
npm run ios
```
✅ Requires Mac with Xcode

### 5. **Run on Web**
```powershell
npm run web
```
✅ Opens in browser (web version)

---

## 📋 Project Exploration Commands

### View Project Structure
```powershell
# List all files recursively
Get-ChildItem -Recurse -File

# Tree view of directories
tree /F

# Count all files
Get-ChildItem -Recurse -File | Measure-Object | Select-Object Count
```

### File Statistics
```powershell
# Count files by type
Get-ChildItem -Recurse -File | Group-Object -Property Extension | Select-Object Name, Count

# Show TypeScript files with line counts
Get-ChildItem -Filter "*.tsx" -Recurse | Select-Object Name, @{Name="Lines";Expression={(Get-Content $_.FullName | Measure-Object -Line).Lines}} | Format-Table

# Total code lines
Get-ChildItem -Filter "*.tsx" -Recurse | ForEach-Object { (Get-Content $_.FullName | Measure-Object -Line).Lines } | Measure-Object -Sum

# Total documentation lines
Get-ChildItem -Filter "*.md" | ForEach-Object { (Get-Content $_.FullName | Measure-Object -Line).Lines } | Measure-Object -Sum
```

### View Documentation Files
```powershell
# List all markdown files
Get-ChildItem -Filter "*.md"

# Show file sizes
Get-ChildItem -Filter "*.md" | Select-Object Name, @{Name="KB";Expression={[math]::Round($_.Length/1KB,2)}}

# View specific doc
type "README.md"
type "QUICKSTART.md"
type "START_HERE.md"
```

---

## 🔍 Code Exploration Commands

### View Screen Files
```powershell
# List all screens
Get-ChildItem -Path ".\screens" -Recurse -File | Select-Object FullName

# Auth screens only
Get-ChildItem -Path ".\screens\auth" -File

# App screens only
Get-ChildItem -Path ".\screens\app" -File

# Show relative paths
Get-ChildItem -Filter "*.tsx" -Recurse | ForEach-Object { $_.FullName -replace [regex]::Escape($PWD), '.' }
```

### View File Contents
```powershell
# Show full App.tsx
type "App.tsx"

# Show specific screen
type "screens\app\HomeScreen.tsx"

# First 30 lines of a file
Get-Content "App.tsx" -TotalCount 30

# Last 20 lines
Get-Content "App.tsx" | Select-Object -Last 20

# Show package.json
type "package.json"
```

### Search Code
```powershell
# Find all imports
Select-String -Path "screens/**/*.tsx" -Pattern "import" | Select-Object -First 20

# Find all exports
Select-String -Path "screens/**/*.tsx" -Pattern "export"

# Search for specific component
Select-String -Path "screens/**/*.tsx" -Pattern "HomeScreen"

# Find StyleSheet definitions
Select-String -Path "screens/**/*.tsx" -Pattern "StyleSheet.create"

# Search in specific file
Select-String -Path "App.tsx" -Pattern "NavigationContainer"
```

---

## 📦 Dependencies Management

### Check Installed Packages
```powershell
# Show top-level dependencies
npm list --depth=0

# Show all dependencies
npm list

# Check specific package version
npm list react-native
npm list expo
```

### Update Dependencies
```powershell
# Update all packages
npm update

# Update specific package
npm install react-native@latest
npm install expo@latest

# Check for outdated packages
npm outdated
```

### Clean Installation
```powershell
# Remove node_modules
Remove-Item -Recurse -Force node_modules

# Clean npm cache
npm cache clean --force

# Reinstall everything
npm install
```

---

## 🧹 Project Cleanup Commands

### Remove Cache Files
```powershell
# Clear npm cache
npm cache clean --force

# Remove node_modules
Remove-Item -Recurse -Force node_modules

# Remove package-lock.json if needed
Remove-Item package-lock.json
```

### Check Project Health
```powershell
# Verify npm version
npm --version

# Check node version
node --version

# Verify TypeScript
npx tsc --version

# Check for issues
npm audit
```

---

## 📈 Useful Quick Commands

### Check Paths
```powershell
# Current location
Get-Location

# List current directory
Get-ChildItem

# Show file details
Get-ChildItem -Detailed
```

### File Operations
```powershell
# Create new file
New-Item -Path "test.tsx" -ItemType File -Value "// test"

# Copy file
Copy-Item "App.tsx" "App.backup.tsx"

# Move file
Move-Item "oldname.tsx" "newname.tsx"

# Delete file
Remove-Item "filename.tsx"

# Rename file
Rename-Item "oldname.tsx" "newname.tsx"
```

### Directory Operations
```powershell
# Create new folder
New-Item -Path "newfolder" -ItemType Directory

# Remove folder
Remove-Item -Recurse -Force "foldername"

# Change directory
cd "screens\app"

# Back to root
cd ..
```

---

## 💻 Development Workflow

### Standard Development Session
```powershell
# 1. Start in project directory
cd d:\Mitra-Projects\localfix

# 2. Install dependencies (first time)
npm install

# 3. Start development server
npm start

# 4. In another PowerShell window, explore code
Get-ChildItem -Recurse -File | Measure-Object

# 5. Edit files in VS Code
# (Files will auto-reload)

# 6. Stop server when done
# (Press Ctrl+C in terminal)
```

### Multiple Terminal Workflow
```powershell
# Terminal 1: Run the app
npm start

# Terminal 2: Monitor files
Get-ChildItem -Recurse -File | ForEach-Object { Write-Host $_.Name }

# Terminal 3: Search code
Select-String -Path "screens/**/*.tsx" -Pattern "your-search"
```

---

## 🐛 Debugging Commands

### Check Dependencies Status
```powershell
# Verify all dependencies
npm list

# Check for conflicts
npm audit

# Show security issues
npm audit --production
```

### File Integrity Check
```powershell
# Count files
Get-ChildItem -Recurse -File | Measure-Object

# Verify no duplicates
Get-ChildItem -Recurse -File | Group-Object -Property Name | Where-Object Count -gt 1

# Check file sizes
Get-ChildItem -Recurse -File | Select-Object Name, @{Name="Size_KB";Expression={[math]::Round($_.Length/1KB,2)}} | Sort-Object Name
```

### Code Statistics
```powershell
# Total lines by file type
@("*.tsx", "*.ts", "*.json", "*.md") | ForEach-Object {
    $pattern = $_
    $total = (Get-ChildItem -Filter $pattern -Recurse | ForEach-Object { (Get-Content $_.FullName | Measure-Object -Line).Lines } | Measure-Object -Sum).Sum
    Write-Host "$pattern : $total lines"
}
```

---

## 📚 Documentation Commands

### View Docs Quickly
```powershell
# Show all docs
Get-ChildItem -Filter "*.md" | Select-Object Name

# Size of each doc
Get-ChildItem -Filter "*.md" | Select-Object Name, @{Name="Size_KB";Expression={[math]::Round($_.Length/1KB,2)}}

# Search in docs
Select-String -Path "*.md" -Pattern "installation"
Select-String -Path "*.md" -Pattern "screen"
Select-String -Path "*.md" -Pattern "typescript"
```

### Reading Documentation
```powershell
# Start here
type "START_HERE.md"

# Quick start guide
type "QUICKSTART.md"

# Full readme
type "README.md"

# Architecture details
type "ARCHITECTURE.md"

# Project structure
type "STRUCTURE.md"
```

---

## ⚡ Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install all dependencies |
| `npm start` | Start development server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run web` | Run on web |
| `Get-ChildItem -Recurse` | List all files |
| `type filename` | View file contents |
| `Select-String -Path "*.tsx" -Pattern "search"` | Search code |
| `npm list` | Show dependencies |
| `npm audit` | Check for security issues |

---

## 🎯 Next Steps

1. **Install Dependencies**
   ```powershell
   npm install
   ```

2. **Start Development**
   ```powershell
   npm start
   ```

3. **Test All Screens**
   - Scan QR with Expo Go
   - Test auth flow
   - Explore all 10 screens

4. **Customize Project**
   - Edit colors in StyleSheet
   - Change dummy data
   - Add your branding

5. **Deploy When Ready**
   - Build for production
   - Submit to app stores

---

## 📞 Troubleshooting

### Dependencies Not Installing?
```powershell
# Clear cache and reinstall
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

### Port Already in Use?
```powershell
# Find process using port 19000
Get-NetTCPConnection -LocalPort 19000 -ErrorAction SilentlyContinue

# Kill the process
Stop-Process -ID <processId> -Force
```

### TypeScript Issues?
```powershell
# Check TypeScript version
npx tsc --version

# Reinstall TypeScript
npm install --save-dev typescript@~5.1.3
```

### Permission Denied?
```powershell
# Run PowerShell as Administrator
# Then retry npm commands
```

---

**Happy Coding! 🚀**

*Last Updated: November 25, 2025*
*Project: LocalFix v1.0.0*
