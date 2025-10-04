# StockCall React Native CLI - Product Requirements Document (PRD)

## Executive Summary

This PRD outlines the complete specifications for rebuilding the StockCall inventory management web application as a native mobile application using React Native CLI. The goal is to recreate the **exact same UI/UX design, functionality, and workflow principles** while utilizing React Native's native components and APIs.

---

## 1. Project Overview

### 1.1 Application Name
**StockCall** - Inventory & Budget Manager

### 1.2 Platform
- **Primary:** React Native CLI (iOS & Android)
- **Target Devices:** Smartphones (iPhone & Android)
- **Minimum OS:** iOS 13+, Android 8.0+

### 1.3 Core Purpose
A mobile-first inventory tracking and budget management application that allows users to:
- Add and manage inventory items with voice or keyboard input
- Track item prices, quantities, and total values
- Mark items as completed or move them to trash
- Export data in PDF and text formats
- Customize themes and appearance
- Monetize through AdMob advertisements

---

## 2. Technical Architecture

### 2.1 Technology Stack

#### Core Framework
- **React Native CLI** (NOT Expo)
- React Native version: 0.73+
- TypeScript for type safety

#### State Management
- React Context API + useReducer (maintain same pattern as web version)

#### Data Persistence
- **AsyncStorage** (`@react-native-async-storage/async-storage`)
- Replace localStorage with AsyncStorage

#### Navigation
- **React Navigation v6** (`@react-navigation/native`)
- Bottom Tab Navigator for main navigation
- Stack Navigator for modal screens

#### UI Components
- **React Native Paper** for Material Design components
- Custom styled components matching the web design
- React Native's built-in components (View, Text, TouchableOpacity, etc.)

#### Styling
- StyleSheet API
- React Native's Flexbox layout
- Dynamic theming system

#### Third-Party Libraries

##### Essential
```json
{
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@react-navigation/stack": "^6.3.20",
  "react-native-paper": "^5.11.3",
  "@react-native-async-storage/async-storage": "^1.21.0",
  "react-native-vector-icons": "^10.0.3",
  "react-native-safe-area-context": "^4.8.2",
  "react-native-screens": "^3.29.0"
}
```

##### Voice Input
```json
{
  "@react-native-voice/voice": "^3.2.4"
}
```

##### AdMob Integration
```json
{
  "react-native-google-mobile-ads": "^13.1.1"
}
```

##### PDF Generation
```json
{
  "react-native-pdf": "^6.7.3",
  "react-native-html-to-pdf": "^0.12.0",
  "react-native-share": "^10.0.2"
}
```

##### Additional
```json
{
  "react-native-gesture-handler": "^2.14.1",
  "react-native-reanimated": "^3.6.1",
  "date-fns": "^3.0.0"
}
```

---

## 3. Feature Requirements

### 3.1 Core Features (Must Have)

#### 3.1.1 Inventory Management
- **Add Items**
  - Via keyboard input (modal form)
  - Via voice input (speech-to-text)
  - Fields: Name, Price, Quantity, Notes (optional)

- **Edit Items**
  - Update any field
  - Maintain creation timestamp

- **Delete Items**
  - Soft delete (move to trash)
  - 60-day auto-deletion from trash
  - Permanent delete option

- **Complete Items**
  - Mark items as completed
  - Track completion timestamp
  - View in "Completed" tab

- **Restore Items**
  - Restore from trash to active

#### 3.1.2 Data Display
- **Active Items View**
  - List/Card layout
  - Show: Name, Price, Quantity, Total, Notes, Created date
  - Real-time search/filter
  - Total inventory value calculation

- **Completed Items View**
  - Separate tab for completed items
  - Same card layout as active items
  - Completion timestamp display

- **Trash View**
  - List of trashed items
  - Days until auto-deletion counter
  - Restore and permanent delete actions

#### 3.1.3 Voice Input
- Native speech recognition using `@react-native-voice/voice`
- Real-time transcript display
- Parse format: "Item name $price quantity number"
- Fallback to full transcript as item name if parsing fails
- Visual feedback during listening
- Error handling for unsupported devices

#### 3.1.4 Search Functionality
- Real-time search across all item names
- Works on active, completed, and trash screens
- Case-insensitive matching

#### 3.1.5 Theme System
- **Light/Dark Mode Toggle**
  - System follows device preference initially
  - Manual override available

- **8 Color Themes**
  - Classic (Default)
  - Ocean Blue
  - Sunset Orange
  - Forest Green
  - Purple Dream
  - Rose Gold
  - Midnight Blue
  - Emerald Mint

- **Theme Application**
  - Each theme has distinct light and dark variants
  - Dynamic color values for all UI components
  - Smooth transitions between themes
  - Persist theme selection

#### 3.1.6 Currency Support
- **Supported Currencies** (10 total)
  - USD ($), EUR (€), GBP (£), JPY (¥), CNY (¥)
  - INR (₹), AUD ($), CAD ($), CHF (CHF), BRL (R$)

- **Currency Selector**
  - Dropdown/modal selector
  - Display currency symbol throughout app
  - Format prices correctly per currency

#### 3.1.7 Export Functionality
- **PDF Export**
  - Professional receipt format
  - Includes app branding
  - Shows all active items with totals
  - Uses current color theme styling
  - Share via native share sheet

- **Text Export**
  - Plain text format
  - Tab-separated values
  - Easy to import into spreadsheets
  - Share via native share sheet

#### 3.1.8 Data Persistence
- **AsyncStorage Implementation**
  - Save all items automatically
  - Save theme preferences
  - Save currency selection
  - Load on app launch
  - Handle errors gracefully

#### 3.1.9 AdMob Integration
- **Banner Ads**
  - Top of main dashboard
  - Bottom of completed tasks screen
  - Inline after every 8 items
  - Adaptive sizing
  - Close button on some banners

- **Native Ads**
  - Feed integration after every 4 items
  - Card style matching UI
  - Compact mode

- **Interstitial Ads**
  - Every 5 item taps on main screen
  - Auto-close after 6 seconds
  - Skip button after 5 seconds

- **Rewarded Ads**
  - Gate access to "Completed Tasks" screen
  - One-time unlock per session
  - Reward: Premium access
  - Skip button option

- **Ad IDs Configuration**
  - Use test IDs during development
  - Easy switch to production IDs
  - Separate iOS and Android IDs

---

### 3.2 Navigation Structure

#### 3.2.1 Main Navigation (Bottom Tabs)
```
Bottom Tab Navigator:
├── Home (Main Dashboard)
├── Completed (Completed Tasks)
└── Hidden: Settings/Trash (accessed from Completed screen)
```

#### 3.2.2 Modal Screens (Stack Navigator)
```
Modal Stack:
├── Add/Edit Item Modal
├── Voice Input Modal
├── Action Sheet (Item Actions)
├── Currency Selector Modal
├── Color Theme Selector Modal
└── Alert Dialogs (Reset confirmation, etc.)
```

#### 3.2.3 Screen Flow
```
App Entry
    ↓
Main Dashboard (Active Items)
    ├→ Add Item Modal (Keyboard)
    ├→ Voice Input Modal
    ├→ Item Action Sheet → Edit Modal
    ├→ Search Bar (Inline)
    └→ Settings Icon → Settings Screen

Bottom Nav: Switch to Completed
    ↓
Completed Tasks Screen
    ├→ Completed Tab
    ├→ Pending Tab
    ├→ Trash Button → Settings/Trash Screen
    └→ Rewarded Ad Gate (First Time)

Settings/Trash Screen
    ├→ Trash Tab (Restore/Delete)
    ├→ Settings Tab
    │   ├→ Color Theme Selector
    │   ├→ Dark Mode Toggle
    │   ├→ Currency Selector
    │   ├→ Export PDF
    │   ├→ Export Text
    │   └→ Reset Data (with confirmation)
    └→ Back Button → Completed Screen
```

---

## 4. UI/UX Design Specifications

### 4.1 Design Principles
- **Mobile-First:** Optimized for touch interaction
- **Consistent:** Maintain visual hierarchy and spacing
- **Accessible:** Minimum touch target size of 44x44 pts
- **Responsive:** Adapt to different screen sizes
- **Premium Feel:** Polished animations and transitions

### 4.2 Typography System

#### Font Family
- **iOS:** San Francisco (System Default)
- **Android:** Roboto (System Default)

#### Type Scale
```javascript
{
  caption: 12,      // Small labels, timestamps
  small: 13,        // Secondary text
  body: 15,         // Body text, card content
  subhead: 16,      // Button text
  headline: 17,     // Card titles
  title: 20,        // Screen titles
  largeTitle: 28,   // Total values, hero text
}
```

#### Font Weights
```javascript
{
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}
```

### 4.3 Color System

#### Structure
Each theme defines the following colors for both light and dark modes:

```typescript
interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  inputBackground: string;
  switchBackground: string;
}
```

#### Example: Classic Theme
```javascript
// Light Mode
{
  primary: '#030213',
  primaryForeground: '#ffffff',
  secondary: '#f1f1f5',
  secondaryForeground: '#030213',
  accent: '#e9ebef',
  accentForeground: '#030213',
  background: '#ffffff',
  foreground: '#030213',
  card: '#ffffff',
  cardForeground: '#030213',
  muted: '#ececf0',
  mutedForeground: '#717182',
  border: '#e9ebef',
  inputBackground: '#f3f3f5',
  switchBackground: '#cbced4',
}

// Dark Mode
{
  primary: '#ffffff',
  primaryForeground: '#0a0a0b',
  secondary: '#1f1f23',
  secondaryForeground: '#ffffff',
  accent: '#1f1f23',
  accentForeground: '#ffffff',
  background: '#0a0a0b',
  foreground: '#ffffff',
  card: '#18181b',
  cardForeground: '#ffffff',
  muted: '#1f1f23',
  mutedForeground: '#a1a1aa',
  border: '#27272a',
  inputBackground: '#1f1f23',
  switchBackground: '#3f3f46',
}
```

### 4.4 Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

```javascript
spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
}
```

### 4.5 Component Specifications

#### 4.5.1 Header
- **Height:** 56px
- **Elements:**
  - App Logo (40x40px circle, left)
  - Search Bar (flexible width, center)
  - Theme Toggle Button (44x44px, right)
- **Background:** `card` color
- **Border:** 1px bottom border with `border` color

#### 4.5.2 Item Card
- **Padding:** 16px
- **Border Radius:** 8px
- **Background:** `card` color
- **Border:** 1px solid `border` color
- **Layout:**
  ```
  [Item Name]
  [Price]  [Quantity]  [Total]   (3-column grid)
  [Notes] (if present)
  [Created/Completed Date]
  ```
- **Shadow:** Subtle elevation (elevation: 2 on Android)
- **Touch Feedback:** Scale down to 0.98 on press

#### 4.5.3 Bottom Navigation
- **Height:** 70px
- **Elements:**
  - Voice Button (80px width)
  - Main/Completed Toggle (140px width, centered)
  - Add Button (80px width)
- **Background:** `card` color
- **Border:** 1px top border with `border` color
- **Safe Area:** Respect bottom safe area insets

#### 4.5.4 Action Sheet
- **Position:** Bottom sheet modal
- **Border Radius:** 24px (top corners only)
- **Background:** `card` color
- **Backdrop:** Black with 50% opacity
- **Animation:** Slide up from bottom (300ms)
- **Handle:** 48x4px rounded bar at top
- **Buttons:** 56px height, full width, 12px spacing

#### 4.5.5 Input Modal
- **Position:** Bottom sheet on mobile, centered on tablet
- **Border Radius:** 24px (top corners) or 16px (all corners on tablet)
- **Background:** `card` color
- **Fields:**
  - Text Input: 48px height
  - TextArea: 96px height (3 rows)
- **Buttons:** 48px height, equal width in row

#### 4.5.6 Buttons
- **Heights:**
  - Small: 36px
  - Medium: 44px
  - Large: 48px
- **Border Radius:** 8px
- **Variants:**
  - Default: `primary` background, `primaryForeground` text
  - Outline: `border` color border, `foreground` text
  - Ghost: Transparent background, `foreground` text
  - Destructive: Red background (#ef4444), white text

### 4.6 Animations & Transitions

#### Screen Transitions
- **Tab Switch:** Fade (200ms)
- **Modal Open:** Slide up (300ms) with fade
- **Modal Close:** Slide down (250ms) with fade

#### Component Animations
- **Button Press:** Scale 0.95 (100ms)
- **Card Tap:** Scale 0.98 (100ms)
- **List Items:** Fade in with stagger (50ms delay each)
- **Theme Change:** Cross-fade (300ms)

#### Gestures
- **Swipe to Delete:** Swipe left on item card reveals delete button
- **Pull to Refresh:** On main dashboard (refresh ad state)
- **Dismiss Modals:** Swipe down gesture on bottom sheets

### 4.7 Accessibility
- **Touch Targets:** Minimum 44x44 pts
- **Color Contrast:** WCAG AA compliant (4.5:1 for text)
- **Screen Readers:** All interactive elements labeled
- **Dynamic Type:** Support system font size settings
- **Focus Indicators:** Visible focus states for keyboard navigation

---

## 5. Data Models

### 5.1 Inventory Item
```typescript
interface InventoryItem {
  id: string;                    // UUID v4
  name: string;                  // Item name
  price: number;                 // Unit price
  quantity: number;              // Quantity count
  notes?: string;                // Optional notes (max 120 chars)
  createdAt: Date;               // Creation timestamp
  completedAt?: Date;            // Completion timestamp
  trashedAt?: Date;              // Trash timestamp
  status: 'active' | 'completed' | 'trashed';
}
```

### 5.2 App State
```typescript
interface AppState {
  items: InventoryItem[];         // All items
  theme: 'light' | 'dark';        // Current theme mode
  colorTheme: string;             // Current color theme ID
  currentScreen: 'main' | 'completed' | 'trash';
  searchQuery: string;            // Current search text
  currency: string;               // Currency symbol
}
```

### 5.3 Color Theme
```typescript
interface ColorTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}
```

---

## 6. State Management

### 6.1 Context Providers

#### AppProvider
- Manages application state
- Provides dispatch for actions
- Handles data persistence to AsyncStorage
- Auto-cleanup of 60+ day old trashed items

#### AdMobProvider
- Manages ad loading states
- Tracks rewarded ad completion
- Provides ad display methods
- Handles ad error states

#### ThemeProvider
- Manages current theme
- Provides theme colors
- Handles theme switching animations

### 6.2 Actions
```typescript
type AppAction =
  | { type: 'ADD_ITEM'; payload: Omit<InventoryItem, 'id' | 'createdAt'> }
  | { type: 'EDIT_ITEM'; payload: { id: string; updates: Partial<InventoryItem> } }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'COMPLETE_ITEM'; payload: string }
  | { type: 'RESTORE_ITEM'; payload: string }
  | { type: 'PERMANENT_DELETE'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_COLOR_THEME'; payload: string }
  | { type: 'SET_SCREEN'; payload: 'main' | 'completed' | 'trash' }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'LOAD_DATA'; payload: InventoryItem[] }
  | { type: 'RESET_DATA' };
```

---

## 7. AdMob Implementation

### 7.1 Ad Unit IDs

#### Test IDs (Development)
```javascript
ADMOB_TEST_IDS = {
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
    rewarded: 'ca-app-pub-3940256099942544/1712485313',
    native: 'ca-app-pub-3940256099942544/3986624511',
  },
  android: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
    native: 'ca-app-pub-3940256099942544/2247696110',
  }
}
```

#### Production IDs
```javascript
// Replace with actual AdMob unit IDs before release
ADMOB_PROD_IDS = {
  ios: {
    banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    native: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  },
  android: {
    banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    native: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  }
}
```

### 7.2 Ad Placement Strategy

#### Banner Ads
- **Location 1:** Top of Main Dashboard
  - Size: Adaptive banner
  - Position: Below header
  - Always visible when scrolling

- **Location 2:** Inline in item feed
  - Frequency: Every 8 items
  - Size: Medium rectangle (300x250)
  - Close button enabled

- **Location 3:** Bottom of Completed screen
  - Size: Adaptive banner
  - Position: Above tab bar
  - Fixed position

#### Native Ads
- **Location 1:** Feed integration (Main Dashboard)
  - Frequency: Every 4 items
  - Style: Card matching item cards
  - Compact mode

- **Location 2:** Settings screen
  - Position: Top of settings tab
  - Style: Content format with media
  - Full width

#### Interstitial Ads
- **Trigger:** Every 5 item taps
- **Timing:** After action sheet closes
- **Behavior:**
  - Auto-show after trigger count
  - Auto-dismiss after 6 seconds
  - Skip button after 5 seconds
  - Reset counter after display

#### Rewarded Ads
- **Trigger:** Access to Completed Tasks screen (first time)
- **Reward:** Unlock premium access for session
- **Behavior:**
  - Show modal explaining reward
  - "Watch Ad" button
  - Skip button (still grants access)
  - One-time per session
  - Persist "watched" state

### 7.3 Ad Loading Strategy
- Pre-load ads on app launch
- Reload after display
- Handle failures gracefully (show content anyway)
- Track load times and success rates
- Implement 90% success rate simulation for development

---

## 8. Voice Input Implementation

### 8.1 Library
- Use: `@react-native-voice/voice`

### 8.2 Workflow
1. User taps "Voice" button
2. Modal opens with microphone icon
3. Request microphone permission (if needed)
4. Start listening on button press
5. Display live transcript
6. Stop listening on second press or timeout
7. Parse transcript for item data
8. Create item with parsed data

### 8.3 Parsing Logic
```javascript
// Expected format: "item name $price quantity number"
// Example: "Apples $3.50 quantity 5"

function parseVoiceTranscript(transcript) {
  const words = transcript.toLowerCase().split(' ');

  // Find price marker
  const priceIndex = words.findIndex(word =>
    word.includes('$') || word.includes('dollar')
  );

  // Find quantity marker
  const quantityIndex = words.findIndex(word =>
    word.includes('quantity') || word.includes('qty')
  );

  let name = '';
  let price = 0;
  let quantity = 1;

  if (priceIndex > 0) {
    name = words.slice(0, priceIndex).join(' ');
    const priceWord = words[priceIndex].replace(/[$dollar]/g, '');
    price = parseFloat(priceWord);
  }

  if (quantityIndex > 0 && quantityIndex < words.length - 1) {
    quantity = parseInt(words[quantityIndex + 1]);
  }

  // Fallback: use full transcript as name
  if (!name && !price && !quantity) {
    name = transcript;
  }

  return { name, price, quantity };
}
```

### 8.4 UI States
- **Idle:** "Tap to start speaking"
- **Listening:** Pulsing microphone icon, "Listening..."
- **Processing:** Loading spinner, "Processing..."
- **Result:** Show transcript, "Use This Text" button
- **Error:** Error message, "Try Again" button

### 8.5 Permissions
```javascript
// iOS: Info.plist
<key>NSMicrophoneUsageDescription</key>
<string>We need access to your microphone to add items by voice</string>

// Android: AndroidManifest.xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

---

## 9. Export Functionality

### 9.1 PDF Export

#### Implementation
- Use: `react-native-html-to-pdf`
- Generate HTML receipt template
- Convert to PDF
- Save to device storage
- Share via `react-native-share`

#### Receipt Structure
```
╔══════════════════════════════════╗
║     STOCKCALL INVENTORY         ║
║        RECEIPT                   ║
╠══════════════════════════════════╣
║ Date: [Current Date]             ║
║ Currency: [Selected Currency]    ║
║ Theme: [Current Theme Name]      ║
╠══════════════════════════════════╣
║ ACTIVE ITEMS                     ║
╠══════════════════════════════════╣
║ Item Name              Price  Qty║
║ [Name]                 [P]  [Q]  ║
║ ...                              ║
╠══════════════════════════════════╣
║ Total Items: [Count]             ║
║ Total Value: [Currency][Amount]  ║
╚══════════════════════════════════╝
```

#### Styling
- Use current color theme colors
- Professional layout with borders
- Responsive font sizes
- Company branding

### 9.2 Text Export

#### Format
```
StockCall Inventory Report
Date: [Current Date]
Currency: [Currency Symbol]

Active Items:
Name                    Price    Qty    Total
─────────────────────────────────────────────
[Item Name]             $XX.XX   XX     $XX.XX
...

Total Items: [Count]
Total Value: [Currency][Amount]
```

#### Implementation
- Generate formatted string
- Write to temporary file
- Share via native share sheet
- Option to copy to clipboard

---

## 10. Data Persistence

### 10.1 AsyncStorage Keys
```javascript
STORAGE_KEYS = {
  ITEMS: '@stockcall:items',
  THEME: '@stockcall:theme',
  COLOR_THEME: '@stockcall:colorTheme',
  CURRENCY: '@stockcall:currency',
  REWARDED_AD_WATCHED: '@stockcall:rewardedAdWatched',
}
```

### 10.2 Save Operations
- **Trigger:** On every state change (debounced)
- **Format:** JSON.stringify
- **Error Handling:** Log errors, show user notification

### 10.3 Load Operations
- **Trigger:** App initialization
- **Parsing:** JSON.parse with error handling
- **Date Conversion:** Convert ISO strings to Date objects
- **Migration:** Handle schema changes gracefully

### 10.4 Reset Operation
- **Confirmation:** Alert dialog
- **Action:** Clear all storage keys
- **Result:** App returns to initial state

---

## 11. Performance Requirements

### 11.1 App Launch
- **Target:** < 3 seconds to interactive
- **Splash Screen:** 1-2 seconds
- **Data Loading:** Async with loading states

### 11.2 Animations
- **Frame Rate:** 60 FPS
- **Use:** `react-native-reanimated` for complex animations
- **Avoid:** JS thread blocking

### 11.3 List Rendering
- **Use:** `FlatList` with optimizations
  - `removeClippedSubviews`
  - `maxToRenderPerBatch={10}`
  - `windowSize={21}`
  - `keyExtractor` optimization

### 11.4 Image Loading
- Use `FastImage` for better performance
- Implement placeholder/skeleton loading
- Cache images appropriately

### 11.5 Memory Management
- Avoid memory leaks in listeners
- Clean up timers and subscriptions
- Use `React.memo` for expensive components
- Implement proper list virtualization

---

## 12. Testing Requirements

### 12.1 Unit Tests
- State management (reducers)
- Utility functions (parsing, formatting)
- Data models
- **Coverage:** > 80%

### 12.2 Integration Tests
- Context providers
- Navigation flows
- AsyncStorage operations
- Ad loading logic

### 12.3 E2E Tests (Detox)
- User workflows:
  - Add item → Complete → Delete
  - Voice input flow
  - Export functionality
  - Theme switching
  - Search

### 12.4 Manual Testing Checklist
- [ ] Add item via keyboard
- [ ] Add item via voice
- [ ] Edit item
- [ ] Delete item
- [ ] Restore item
- [ ] Search items
- [ ] Switch themes (all 8)
- [ ] Toggle dark mode
- [ ] Change currency
- [ ] Export PDF
- [ ] Export text
- [ ] View all ad types
- [ ] Watch rewarded ad
- [ ] Reset data
- [ ] Test on iOS device
- [ ] Test on Android device
- [ ] Test on different screen sizes

---

## 13. Build & Deployment

### 13.1 Development Environment Setup

#### Prerequisites
```bash
# Node.js
node -v  # v18+

# React Native CLI
npm install -g react-native-cli

# iOS (macOS only)
# Install Xcode 14+
# Install CocoaPods
sudo gem install cocoapods

# Android
# Install Android Studio
# Install Android SDK 33+
# Setup ANDROID_HOME environment variable
```

#### Project Initialization
```bash
# Create new React Native project
npx react-native@latest init StockCall --template react-native-template-typescript

# Install dependencies
cd StockCall
npm install

# iOS setup
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

### 13.2 Build Configuration

#### iOS (Xcode)
- **Bundle Identifier:** com.yourcompany.stockcall
- **Display Name:** StockCall
- **Version:** 1.0.0
- **Build Number:** 1
- **Deployment Target:** iOS 13.0
- **Device Orientation:** Portrait only
- **Status Bar:** Dark content (light mode), Light content (dark mode)

#### Android (build.gradle)
- **Application ID:** com.yourcompany.stockcall
- **Version Name:** 1.0.0
- **Version Code:** 1
- **Min SDK:** 26 (Android 8.0)
- **Target SDK:** 33 (Android 13)
- **Compile SDK:** 33

### 13.3 App Icons & Splash Screen

#### iOS Icons
- Use asset catalog
- Required sizes: 20x20, 29x29, 40x40, 60x60, 76x76, 83.5x83.5, 1024x1024
- Use tool: https://appicon.co

#### Android Icons
- res/mipmap-{mdpi,hdpi,xhdpi,xxhdpi,xxxhdpi}
- Use adaptive icons (foreground + background)
- Use tool: https://romannurik.github.io/AndroidAssetStudio

#### Splash Screen
- Use `react-native-splash-screen`
- Match brand colors
- Simple logo centered
- Duration: 1-2 seconds

### 13.4 Release Builds

#### iOS Release
```bash
# 1. Update version in Xcode
# 2. Archive (Product → Archive)
# 3. Validate archive
# 4. Upload to App Store Connect
# 5. Submit for review

# OR use Fastlane
fastlane ios release
```

#### Android Release
```bash
# 1. Generate signing key (first time only)
keytool -genkeypair -v -storetype PKCS12 -keystore stockcall-release.keystore -alias stockcall -keyalg RSA -keysize 2048 -validity 10000

# 2. Configure gradle (android/gradle.properties)
# STOCKCALL_UPLOAD_STORE_FILE=stockcall-release.keystore
# STOCKCALL_UPLOAD_KEY_ALIAS=stockcall
# STOCKCALL_UPLOAD_STORE_PASSWORD=****
# STOCKCALL_UPLOAD_KEY_PASSWORD=****

# 3. Build APK
cd android && ./gradlew assembleRelease

# 4. Build AAB (for Play Store)
cd android && ./gradlew bundleRelease

# OR use Fastlane
fastlane android release
```

### 13.5 Continuous Integration

#### GitHub Actions Workflow
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test
      - run: npm run lint

  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: cd ios && pod install
      - run: npx react-native build-ios --mode Debug

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: cd android && ./gradlew assembleDebug
```

---

## 14. App Store Submission

### 14.1 iOS App Store

#### Requirements
- [ ] App Store Connect account
- [ ] App ID created
- [ ] Provisioning profiles configured
- [ ] App icons (all sizes)
- [ ] Screenshots (iPhone & iPad)
  - 6.7" Display (iPhone 14 Pro Max)
  - 6.5" Display (iPhone 11 Pro Max)
  - 5.5" Display (iPhone 8 Plus)
- [ ] App preview video (optional)
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] Marketing URL (optional)

#### App Information
- **Category:** Productivity
- **Keywords:** inventory, stock, budget, tracking, business
- **Description:** See Marketing section below
- **Age Rating:** 4+

#### App Store Review
- Review time: 1-3 days typically
- Provide test account if needed
- Explain ad implementations
- Respond to reviewer questions promptly

### 14.2 Google Play Store

#### Requirements
- [ ] Google Play Console account ($25 one-time fee)
- [ ] App signed with upload key
- [ ] Feature graphic (1024x500)
- [ ] App icon (512x512)
- [ ] Screenshots (phone & tablet)
  - At least 2 screenshots
  - Max 8 screenshots per device type
- [ ] Privacy policy URL
- [ ] Target audience & content rating

#### App Information
- **Category:** Business
- **Tags:** inventory, stock, management, business
- **Short Description:** (80 characters max)
- **Full Description:** See Marketing section below
- **Content Rating:** Everyone

#### Play Store Review
- Review time: Several hours to days
- Automated checks first
- Manual review if flagged
- Update policy compliance regularly

---

## 15. Marketing & App Store Optimization

### 15.1 App Name
**StockCall - Inventory Manager**

### 15.2 Subtitle (iOS) / Short Description (Android)
"Track inventory & manage your budget"

### 15.3 Description

#### Short Version (First 170 characters)
```
StockCall is your personal inventory tracking and budget management assistant.
Add items with voice or keyboard, track values, and export professional receipts.
```

#### Full Version
```
StockCall - Inventory & Budget Manager

Transform the way you track inventory and manage your budget with StockCall,
the elegant and powerful mobile app designed for individuals and small businesses.

KEY FEATURES:

📦 Smart Inventory Management
• Add items quickly via voice or keyboard
• Track prices, quantities, and total values
• Add notes for each item
• Real-time search and filtering

🎤 Voice Input
• Hands-free item entry with speech recognition
• Natural language parsing
• Fast and accurate transcription

✅ Task Tracking
• Mark items as completed
• Separate view for completed tasks
• Pending items overview

💰 Multi-Currency Support
• Support for 10 major currencies
• Automatic price formatting
• Easy currency switching

🎨 Beautiful Themes
• 8 professionally designed color themes
• Light and dark mode
• Smooth theme transitions
• Premium typography

📊 Export & Share
• Generate professional PDF receipts
• Export to text format
• Share via email, messages, or cloud
• Keep records organized

🗑️ Smart Trash Management
• Soft delete with 60-day grace period
• Restore deleted items anytime
• Automatic cleanup

🔒 Privacy First
• All data stored locally on your device
• No cloud sync (your data stays yours)
• No account required
• Export anytime

PERFECT FOR:
• Small business owners
• Freelancers
• Home inventory management
• Budget tracking
• Stock management
• Expense monitoring

PREMIUM EXPERIENCE:
• Clean, intuitive interface
• Fast and responsive
• No subscriptions
• One-time purchase

Download StockCall today and take control of your inventory!

SUPPORT:
Have questions or feedback? Contact us at support@stockcall.app
```

### 15.4 Keywords (iOS)
```
inventory, stock, budget, tracking, manager, business, items,
expense, receipt, voice input, organization, productivity, small business
```

### 15.5 Screenshots

#### Screenshot 1: Main Dashboard
- Caption: "Track all your inventory in one place"
- Show: List of items with total value

#### Screenshot 2: Add Item
- Caption: "Add items with voice or keyboard"
- Show: Input modal with filled fields

#### Screenshot 3: Voice Input
- Caption: "Hands-free voice entry"
- Show: Voice modal in listening state

#### Screenshot 4: Completed Tasks
- Caption: "Organize completed and pending items"
- Show: Completed tab with items

#### Screenshot 5: Themes
- Caption: "8 beautiful themes to choose from"
- Show: Theme selector with preview

#### Screenshot 6: Export
- Caption: "Export professional receipts"
- Show: PDF receipt preview

### 15.6 Privacy Policy

#### Required Information
```
StockCall Privacy Policy

Last Updated: [Date]

1. Data Collection
StockCall does NOT collect any personal information. All data is stored
locally on your device.

2. Data Storage
• All inventory items are stored in your device's local storage
• No data is sent to external servers
• No account or sign-up required

3. Permissions
• Microphone: Used only for voice input feature (optional)
• Storage: Used to save and retrieve your inventory data

4. Third-Party Services
• AdMob: Displays advertisements. Subject to Google's Privacy Policy.
  https://policies.google.com/privacy

5. Data Security
Your data is protected by your device's security features. We do not
have access to your data.

6. Children's Privacy
StockCall is suitable for all ages. We do not knowingly collect information
from children.

7. Changes to Privacy Policy
We may update this policy. Check this page for updates.

8. Contact
Questions? Email us at privacy@stockcall.app
```

---

## 16. Monetization Strategy

### 16.1 Ad Revenue
- **Primary:** Banner, Native, Interstitial ads
- **Expected eCPM:** $1-5 (varies by region)
- **Strategy:** Balance ads with user experience

### 16.2 Future Premium Features (Phase 2)
- Remove ads (one-time purchase)
- Cloud backup & sync
- Advanced export formats (Excel)
- Multiple inventory lists
- Barcode scanning
- Price history charts

### 16.3 Pricing Strategy (Future)
- **Ad-Free:** $4.99 one-time
- **Premium:** $2.99/month or $19.99/year
  - All premium features
  - Priority support

---

## 17. Success Metrics

### 17.1 Launch Goals (First 30 Days)
- **Downloads:** 1,000+
- **DAU/MAU Ratio:** > 20%
- **Session Length:** > 2 minutes average
- **Crash Rate:** < 1%
- **App Store Rating:** > 4.0 stars

### 17.2 Key Performance Indicators
- **User Retention:**
  - Day 1: > 40%
  - Day 7: > 20%
  - Day 30: > 10%

- **Engagement:**
  - Items Added per User: > 5
  - Sessions per User per Day: > 2

- **Ad Performance:**
  - Ad Fill Rate: > 90%
  - Ad Click-Through Rate: > 1%

- **Quality Metrics:**
  - App Store Rating: > 4.2
  - Review Response Time: < 24 hours
  - Crash-Free Sessions: > 99%

---

## 18. Development Timeline

### Phase 1: Foundation (Weeks 1-2)
- Project setup and configuration
- Navigation structure
- Basic UI components library
- Theme system implementation
- State management setup

### Phase 2: Core Features (Weeks 3-5)
- Item CRUD operations
- Main dashboard screen
- Add/Edit item modals
- Item card component
- Search functionality
- AsyncStorage integration

### Phase 3: Additional Screens (Weeks 6-7)
- Completed tasks screen
- Trash & settings screen
- Theme selector
- Currency selector
- Action sheet component

### Phase 4: Voice & Export (Week 8)
- Voice input integration
- Speech recognition
- PDF generation
- Text export
- Share functionality

### Phase 5: Advertisements (Week 9)
- AdMob SDK integration
- Banner ad component
- Native ad component
- Interstitial ad component
- Rewarded ad component
- Ad loading strategy

### Phase 6: Polish & Testing (Weeks 10-11)
- Animations and transitions
- Error handling
- Loading states
- Edge case handling
- Unit tests
- Integration tests
- E2E tests

### Phase 7: Beta Testing (Week 12)
- Internal testing
- TestFlight (iOS) / Internal Testing (Android)
- Bug fixes
- Performance optimization
- User feedback incorporation

### Phase 8: Launch Preparation (Week 13)
- App Store assets creation
- Screenshots and videos
- App descriptions
- Privacy policy
- Marketing materials
- Press kit

### Phase 9: Launch (Week 14)
- App Store submission
- Play Store submission
- Monitor reviews
- Quick response to issues

---

## 19. Risk Management

### 19.1 Technical Risks

#### Risk: React Native Version Incompatibilities
- **Impact:** High
- **Mitigation:** Pin dependency versions, thorough testing

#### Risk: Platform-Specific Bugs
- **Impact:** Medium
- **Mitigation:** Test on multiple devices, use platform checks

#### Risk: Performance Issues on Low-End Devices
- **Impact:** Medium
- **Mitigation:** Optimize lists, use performance monitoring

#### Risk: AdMob Integration Issues
- **Impact:** Medium
- **Mitigation:** Use test IDs during development, gradual rollout

### 19.2 Business Risks

#### Risk: App Store Rejection
- **Impact:** High
- **Mitigation:** Follow guidelines strictly, prepare detailed responses

#### Risk: Low User Adoption
- **Impact:** High
- **Mitigation:** ASO optimization, user feedback loops

#### Risk: Ad Revenue Below Expectations
- **Impact:** Medium
- **Mitigation:** Optimize ad placements, consider alternative models

---

## 20. Support & Maintenance

### 20.1 Bug Reporting
- **Channel:** In-app feedback form + email
- **Response Time:** < 24 hours
- **Resolution Target:** Critical bugs within 48 hours

### 20.2 Update Frequency
- **Major Updates:** Quarterly (new features)
- **Minor Updates:** Monthly (bug fixes, improvements)
- **Patches:** As needed (critical fixes)

### 20.3 User Feedback
- **Collection:** App Store reviews, in-app feedback
- **Analysis:** Weekly review of feedback
- **Implementation:** Prioritize based on impact and frequency

### 20.4 Analytics
- **Tool:** Firebase Analytics
- **Events:** Screen views, button clicks, feature usage
- **Privacy:** No PII collected, anonymized data only

---

## 21. Appendix

### 21.1 Glossary
- **eCPM:** Effective Cost Per Mille (thousand impressions)
- **DAU/MAU:** Daily Active Users / Monthly Active Users
- **ASO:** App Store Optimization
- **CRUD:** Create, Read, Update, Delete

### 21.2 References
- React Native Documentation: https://reactnative.dev
- React Navigation: https://reactnavigation.org
- React Native Paper: https://callstack.github.io/react-native-paper
- AdMob for React Native: https://rnfirebase.io
- App Store Guidelines: https://developer.apple.com/app-store/review/guidelines
- Play Store Guidelines: https://play.google.com/about/developer-content-policy

### 21.3 Contact Information
- **Project Manager:** [Name]
- **Lead Developer:** [Name]
- **Designer:** [Name]
- **QA Lead:** [Name]

---

## Document Revision History
- **v1.0** - [Date] - Initial PRD creation

---

**END OF DOCUMENT**
