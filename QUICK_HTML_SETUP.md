# Quick HTML Files Setup for Figma

## 🚀 Fastest Way to Access HTML Files

### Step 1: Locate the HTML Files
```bash
cd v1/screens/
```

All 47 HTML wireframe files are here, organized in folders:
- `auth/` - 11 files (includes onboarding)
- `dashboard/` - 4 files
- `health/` - 6 files
- `rewards/` - 5 files
- `profile/` - 9 files
- `errors/` - 5 files
- `legal/` - 3 files
- `insights/` - 1 file

### Step 2: Open Files in Browser

#### Option A: Open Individual Files
```bash
# Example: Open dashboard
open v1/screens/dashboard/main.html

# Open all dashboard screens
open v1/screens/dashboard/*.html
```

#### Option B: Use Python Simple Server
```bash
# From project root
python3 -m http.server 8000

# Then visit: http://localhost:8000/v1/screens/
```

#### Option C: Batch Open Script
Create `open-all-screens.sh`:
```bash
#!/bin/bash
# Opens all HTML files in browser tabs

find v1/screens -name "*.html" | while read file; do
    open "$file"
    sleep 0.5  # Prevent browser overload
done
```

### Step 3: Capture for Figma

#### Browser Method:
1. Open Chrome/Safari Developer Tools (F12)
2. Toggle device toolbar
3. Select iPhone 14 (393×852px)
4. Take screenshot (Cmd+Shift+P → "Capture screenshot")

#### Extension Method:
Use Chrome extensions:
- GoFullPage
- Awesome Screenshot
- Full Page Screen Capture

## 📋 Complete File List for Copy/Paste

```
v1/screens/auth/welcome.html
v1/screens/auth/how-it-works.html
v1/screens/auth/connect-data.html
v1/screens/auth/success.html
v1/screens/auth/login.html
v1/screens/auth/create-account.html
v1/screens/auth/choose-data.html
v1/screens/auth/forgot-password.html
v1/screens/auth/email-verification.html
v1/screens/auth/sso-google.html
v1/screens/auth/sso-apple.html
v1/screens/dashboard/main.html
v1/screens/dashboard/dashboard-menu-open.html
v1/screens/dashboard/resilience-score.html
v1/screens/dashboard/data-reputation-score.html
v1/screens/health/main.html
v1/screens/health/resilience-score.html
v1/screens/health/heart-rate-detail.html
v1/screens/health/hrv-detail.html
v1/screens/health/sleep-detail.html
v1/screens/health/activity-detail.html
v1/screens/rewards/main.html
v1/screens/rewards/earn-more.html
v1/screens/rewards/exchange.html
v1/screens/rewards/history.html
v1/screens/rewards/withdraw.html
v1/screens/profile/main.html
v1/screens/profile/personal-info.html
v1/screens/profile/security.html
v1/screens/profile/connected-devices.html
v1/screens/profile/data-permissions.html
v1/screens/profile/notifications.html
v1/screens/profile/subscription.html
v1/screens/profile/wallet-connection.html
v1/screens/profile/help-center.html
v1/screens/errors/network-error.html
v1/screens/errors/generic-error.html
v1/screens/errors/permission-denied.html
v1/screens/errors/loading.html
v1/screens/errors/empty-state.html
v1/screens/legal/terms.html
v1/screens/legal/privacy.html
v1/screens/legal/security-compliance.html
v1/screens/insights/main.html
```

## 🎯 Quick Figma Import Process

1. **Set up browser**:
   - Viewport: 393×852px
   - Device: iPhone 14
   - Zoom: 100%

2. **Capture each screen**:
   - Use consistent method
   - Save as PNG or copy directly

3. **Import to Figma**:
   - Create frames for each category
   - Paste/import captures
   - Name according to file names

## 💡 Pro Tip: Automation Script

```javascript
// Browser console script to open all files
const files = [
    'auth/welcome.html',
    'auth/how-it-works.html',
    // ... paste all file paths
];

files.forEach((file, index) => {
    setTimeout(() => {
        window.open(`v1/screens/${file}`, `screen_${index}`);
    }, index * 1000);
});
```

## ✅ Ready!

All 47 HTML files are ready for:
- Direct browser viewing
- Screenshot capture
- Figma import
- Design reference

No SVG export needed - work directly with the HTML source files!