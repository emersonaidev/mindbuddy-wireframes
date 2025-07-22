# MindBuddy Wireframes - Figma Export Package

## 🎯 Export Instructions

### HTML Files Method (Recommended)
1. All HTML source files are in `v1/screens/` directory
2. 47 HTML files organized by category
3. Each file is a complete wireframe with embedded styles
4. Files can be opened directly in browser (393×852px viewport)

### Alternative: SVG Export Method
1. Open `index.html` in your browser
2. Login with password: `MindBuddy2024!`
3. Click "All Screens" to view all wireframes
4. Click the **📦** button (Export all screens to SVG)
5. Wait for the ZIP file to download

### What You'll Get
- **HTML Files**: 47 source HTML files with full styling
- **SVG Export**: Optional vector export via 📦 button
- **Consistent dimensions**: 393×852px (iPhone 14)
- **Organized structure**: Files grouped by category

## 📱 Complete Screen Inventory (47 Screens)

### Onboarding (4 screens)
1. Welcome - `v1/screens/onboarding/welcome.html`
2. Data Categories - `v1/screens/onboarding/data-categories.html`
3. Privacy & Security - `v1/screens/onboarding/privacy-security.html`
4. Get Started - `v1/screens/onboarding/get-started.html`

### Authentication (7 screens)
1. Login - `v1/screens/auth/login.html`
2. Create Account - `v1/screens/auth/create-account.html`
3. Privacy Terms - `v1/screens/auth/privacy-terms.html`
4. Set Up Data Sharing - `v1/screens/auth/data-sharing-setup.html`
5. Choose What to Share - `v1/screens/auth/choose-data.html`
6. Email Verification - `v1/screens/auth/email-verification.html`
7. Sign in with Google - `v1/screens/auth/sso-google.html`
8. Sign in with Apple - `v1/screens/auth/sso-apple.html`

### Dashboard (6 screens) ⭐ NEW
1. Dashboard - `v1/screens/dashboard/main.html`
2. Dashboard with Menu - `v1/screens/dashboard/dashboard-menu-open.html` ⭐ NEW
3. Resilience Score - `v1/screens/dashboard/resilience-score.html`
4. Data Reputation Score - `v1/screens/dashboard/data-reputation-score.html`
5. $MNDY Tokens - `v1/screens/rewards/main.html`
6. Profile - `v1/screens/profile/main.html`

### Health Data (1 screen)
1. Resilience Score - `v1/screens/health/resilience-score.html`

### Rewards (5 screens)
1. Rewards Dashboard - `v1/screens/rewards/dashboard.html`
2. Achievements - `v1/screens/rewards/achievements.html`
3. Earn More $MNDY - `v1/screens/rewards/earn-more.html` ⭐ UPDATED
4. Transaction History - `v1/screens/rewards/transaction-history.html`
5. Leaderboard - `v1/screens/rewards/leaderboard.html`

### Profile & Settings (9 screens)
1. Personal Information - `v1/screens/profile/personal-info.html`
2. Security - `v1/screens/profile/security.html`
3. Connected Devices - `v1/screens/profile/connected-devices.html`
4. Data Permissions - `v1/screens/profile/data-permissions.html`
5. Notifications - `v1/screens/profile/notifications.html`
6. Subscription Plans - `v1/screens/profile/subscription.html`
7. Wallet Connection - `v1/screens/profile/wallet-connection.html`
8. Help Center - `v1/screens/profile/help-center.html`
9. ~~Data Reputation Score~~ - REMOVED (exists only in Dashboard)

### Error States (5 screens)
1. No Connection - `v1/screens/errors/no-connection.html`
2. Server Error - `v1/screens/errors/server-error.html`
3. Generic Error - `v1/screens/errors/generic-error.html`
4. Session Expired - `v1/screens/errors/session-expired.html`
5. Permission Denied - `v1/screens/errors/permission-denied.html`

### Legal (10 screens)
1. Terms of Service - `v1/screens/legal/terms-of-service.html`
2. Privacy Policy - `v1/screens/legal/privacy-policy.html`
3. Data Processing Agreement - `v1/screens/legal/data-processing.html`
4. Cookie Policy - `v1/screens/legal/cookie-policy.html`
5. GDPR Rights - `v1/screens/legal/gdpr-rights.html`
6. California Privacy Rights - `v1/screens/legal/ccpa-rights.html`
7. Third Party Services - `v1/screens/legal/third-party.html`
8. Security Compliance - `v1/screens/legal/security-compliance.html`
9. Help Center Content - `v1/screens/legal/help-center.html`
10. Data Deletion - `v1/screens/legal/data-deletion.html`

## 🎨 Design System

### Colors
```
Primary Colors:
- Background: #F8F9FA (Light Gray)
- White: #FFFFFF
- Black: #000000

Grays:
- Gray 900: #212529
- Gray 700: #495057
- Gray 600: #666666
- Gray 400: #CED4DA
- Gray 200: #E0E0E0
- Gray 100: #F8F9FB
- Gray 50: #FAFAFA

Functional:
- Success: #28A745
- Warning: #FFC107
- Error: #DC3545
- Info: #17A2B8
```

### Typography
```
Font Family: Inter, -apple-system, BlinkMacSystemFont, sans-serif

Font Sizes:
- 3xl: 32px
- 2xl: 28px
- xl: 24px
- lg: 20px
- md: 16px
- sm: 14px
- xs: 12px

Font Weights:
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700
```

### Spacing System
```
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px
- 3xl: 32px
```

### Components

#### Cards
```css
background: #FFFFFF;
border-radius: 16px;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
padding: 20px;
```

#### Buttons
```css
/* Primary */
background: #000000;
color: #FFFFFF;
border-radius: 12px;
padding: 16px 24px;
font-weight: 600;

/* Secondary */
background: transparent;
border: 1px solid #E0E0E0;
color: #000000;
```

#### Input Fields
```css
background: #FFFFFF;
border: 1px solid #E0E0E0;
border-radius: 12px;
padding: 16px;
font-size: 16px;
```

#### Navigation Headers
```css
height: 56px;
padding: 16px;
background: transparent;
```

### Layout Grid
- Screen width: 393px
- Screen height: 852px
- Padding: 20px
- Card spacing: 24px
- Safe area considerations for iPhone 14

## 📋 Recent Updates

### Latest Changes (July 2025)
1. **$MNDY Tokens Page** - Added action buttons grid (Withdraw, Exchange, Transaction History, Earn More)
2. **Profile Main** - Removed subscription section
3. **Data Reputation Score** - Removed from Profile folder
4. **Earn More $MNDY** - Added Data Reputation Score section with circular progress
5. **Dashboard with Menu** - New screen showing slide-out navigation drawer

### Design Decisions
- Password authentication (no Firebase/Gmail)
- Grayscale color scheme for clean, professional look
- Inter font throughout for consistency
- Card-based layout with subtle shadows
- Mobile-first design (393×852px)

## 🚀 Figma Import Guide

### Step 1: Import SVGs
1. Extract the ZIP file
2. In Figma, create a new file
3. Drag all SVG files onto the canvas
4. SVGs will maintain vector quality

### Step 2: Create Frames
1. Create iPhone 14 frames (393×852px)
2. Place each screen in its own frame
3. Name frames according to screen names

### Step 3: Organize Pages
1. Create pages for each category:
   - Onboarding
   - Authentication
   - Dashboard
   - Health Data
   - Rewards
   - Profile & Settings
   - Error States
   - Legal

### Step 4: Build Components
Extract common elements as components:
- Navigation headers
- Bottom navigation
- Cards
- Buttons
- Input fields
- List items

### Step 5: Apply Auto Layout
1. Convert cards to Auto Layout
2. Set proper spacing (use spacing system)
3. Make responsive where needed

## 📦 Additional Resources

### Export Formats Available
- **SVG** - Vector format, best for Figma (recommended)
- **PNG** - High resolution images
- **HTML** - Original source files

### Project Links
- GitHub Repository: https://github.com/emersonaidev/mindbuddy-wireframes
- Live Preview: Open index.html locally

### Contact
For questions or additional exports, please refer to the project documentation.

---

## ✅ Checklist Before Handoff

- [ ] All 47 screens exported
- [ ] Design system documented
- [ ] Component specifications included
- [ ] Screen inventory complete
- [ ] Recent updates noted
- [ ] Import instructions provided

---

*Export Date: July 2025*
*Total Screens: 47*
*Format: Wireframes*
*Device: iPhone 14 (393×852px)*