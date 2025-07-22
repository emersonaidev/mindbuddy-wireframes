# MindBuddy HTML Files - Figma Import Guide

## 📁 HTML Files Package Overview

You have **47 HTML wireframe files** ready for Figma import. These are the actual HTML source files that render the wireframes, not SVG exports.

## 🚀 Quick Access Instructions

### Option 1: Direct HTML Viewing
1. Open `index.html` in your browser
2. Login with password: `MindBuddy2024!`
3. Click on any wireframe to view it full-screen
4. Use browser tools to capture/export individual screens

### Option 2: Access HTML Files Directly
All HTML files are located in the `v1/screens/` directory, organized by category.

## 📋 Complete HTML File Inventory (47 Files)

### Onboarding (4 files)
Located in `v1/screens/auth/`:
- `welcome.html` - Welcome screen
- `how-it-works.html` - How It Works
- `connect-data.html` - Connect Your Data
- `success.html` - Account Created

### Authentication (7 files)
Located in `v1/screens/auth/`:
- `login.html` - Login screen
- `create-account.html` - Create Account
- `choose-data.html` - Choose What to Share
- `forgot-password.html` - Forgot Password
- `email-verification.html` - Email Verification
- `sso-google.html` - Sign in with Google
- `sso-apple.html` - Sign in with Apple

### Dashboard (6 files)
Located in `v1/screens/dashboard/` and others:
- `dashboard/main.html` - Dashboard main
- `dashboard/dashboard-menu-open.html` - Dashboard with Menu ⭐ NEW
- `dashboard/resilience-score.html` - Resilience Score
- `dashboard/data-reputation-score.html` - Data Reputation Score
- `rewards/main.html` - $MNDY Tokens (linked from dashboard)
- `profile/main.html` - Profile (linked from dashboard)

### Health Data (6 files)
Located in `v1/screens/health/`:
- `main.html` - Health Data main
- `resilience-score.html` - Resilience Score detail
- `heart-rate-detail.html` - Heart Rate Detail
- `hrv-detail.html` - HRV Detail
- `sleep-detail.html` - Sleep Detail
- `activity-detail.html` - Activity Detail

### Rewards (5 files)
Located in `v1/screens/rewards/`:
- `main.html` - $MNDY Tokens main ⭐ UPDATED
- `earn-more.html` - Earn More $MNDY ⭐ UPDATED
- `exchange.html` - Exchange
- `history.html` - Transaction History
- `withdraw.html` - Withdraw

### Profile & Settings (9 files)
Located in `v1/screens/profile/`:
- `main.html` - Profile main ⭐ UPDATED
- `personal-info.html` - Personal Information
- `security.html` - Security
- `connected-devices.html` - Connected Devices
- `data-permissions.html` - Data Permissions
- `notifications.html` - Notifications
- `subscription.html` - Subscription Plans
- `wallet-connection.html` - Wallet Connection
- `help-center.html` - Help Center

### Error States (5 files)
Located in `v1/screens/errors/`:
- `network-error.html` - Network Error
- `generic-error.html` - Generic Error
- `permission-denied.html` - Permission Denied
- `loading.html` - Loading State
- `empty-state.html` - Empty State

### Legal (3 files)
Located in `v1/screens/legal/`:
- `terms.html` - Terms of Service
- `privacy.html` - Privacy Policy
- `security-compliance.html` - Security & Compliance

### Insights (1 file)
Located in `v1/screens/insights/`:
- `main.html` - Insights main

## 🛠 HTML to Figma Conversion Methods

### Method 1: Browser Screenshot Tool
1. Open each HTML file in browser (393x852 viewport)
2. Use browser developer tools (F12)
3. Set device to iPhone 14
4. Take full-page screenshot
5. Import images to Figma

### Method 2: HTML to Figma Plugin
1. Install "HTML to Figma" plugin
2. Copy HTML code from each file
3. Paste into plugin
4. Convert to Figma layers

### Method 3: Design Mode Capture
1. Use browser extensions like:
   - Full Page Screen Capture
   - Awesome Screenshot
   - GoFullPage
2. Set viewport to 393x852px
3. Capture each screen
4. Import to Figma

### Method 4: Manual Recreation
1. Open HTML file in browser
2. Use as visual reference
3. Recreate in Figma using components
4. Match exact specifications from DESIGN_SYSTEM.md

## 📏 HTML File Structure

Each HTML file contains:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=393, initial-scale=1.0">
    <title>[Screen Name] - MindBuddy V1</title>
    <link rel="stylesheet" href="../../styles/base.css">
    <style>
        /* Screen-specific styles */
    </style>
</head>
<body>
    <div class="screen">
        <!-- Screen content -->
    </div>
</body>
</html>
```

## 🎨 Key Styling Information

### Base Styles Location
- Global styles: `v1/styles/base.css`
- Screen-specific styles: Inline in each HTML file

### Viewport
- Width: 393px (iPhone 14)
- Height: 852px
- Background: #F8F9FA

### Common Classes
- `.screen` - Main container
- `.nav-header` - Top navigation
- `.content` - Scrollable content area
- `.card` - Card containers
- `.button` - Button elements

## 📦 Bulk Processing Tips

### Batch Screenshot Script (Chrome DevTools)
```javascript
// Run in browser console
const screens = [
    'dashboard/main.html',
    'dashboard/dashboard-menu-open.html',
    // ... add all paths
];

screens.forEach(screen => {
    window.open(`v1/screens/${screen}`, '_blank');
});
```

### Automated Capture Tools
- **Puppeteer**: Node.js headless Chrome automation
- **Playwright**: Cross-browser automation
- **Selenium**: Web automation framework

## 🔄 File Organization for Figma

### Recommended Figma Structure
```
MindBuddy Wireframes
├── Cover
├── ✅ Onboarding (4 screens)
├── ✅ Authentication (7 screens)
├── ✅ Dashboard (6 screens)
├── ✅ Health Data (6 screens)
├── ✅ Rewards (5 screens)
├── ✅ Profile & Settings (9 screens)
├── ✅ Error States (5 screens)
├── ✅ Legal (3 screens)
└── ✅ Insights (1 screen)
```

## 📝 HTML File Access Checklist

- [ ] Locate `v1/screens/` directory
- [ ] Verify 47 HTML files present
- [ ] Set browser viewport to 393x852px
- [ ] Install capture tool/extension
- [ ] Create Figma file structure
- [ ] Begin screen capture/import process

## 💡 Pro Tips

1. **Maintain Consistency**: Use the same capture method for all screens
2. **Check Viewport**: Always verify 393x852px before capture
3. **Preserve Spacing**: Pay attention to 20px padding and 24px card gaps
4. **Font Rendering**: Ensure Inter font is loaded properly
5. **State Variations**: Some screens have hover/active states in CSS

## 🚨 Important Notes

- **Password Protected**: Main index.html requires password `MindBuddy2024!`
- **Individual HTML files**: Can be opened directly without password
- **CSS Dependencies**: Files reference `../../styles/base.css`
- **Font Loading**: Inter font loaded from system/web
- **JavaScript**: Minimal JS, mainly for prototyping interactions

---

## Quick File Path Reference

```bash
# All HTML files location
/v1/screens/

# Categories:
/v1/screens/auth/        # Onboarding + Authentication
/v1/screens/dashboard/   # Dashboard screens
/v1/screens/health/      # Health data screens
/v1/screens/rewards/     # Rewards screens
/v1/screens/profile/     # Profile screens
/v1/screens/errors/      # Error states
/v1/screens/legal/       # Legal screens
/v1/screens/insights/    # Insights screen
```

Total: **47 HTML files** ready for Figma import!