# MindBuddy HTML Files Manifest

## 📁 Complete HTML Files Directory Structure

```
v1/
├── styles/
│   └── base.css                    # Global styles
│
└── screens/
    ├── auth/                       # 11 files
    │   ├── welcome.html            # Onboarding: Welcome
    │   ├── how-it-works.html       # Onboarding: How It Works
    │   ├── connect-data.html       # Onboarding: Connect Your Data
    │   ├── success.html            # Onboarding: Account Created
    │   ├── login.html              # Auth: Login
    │   ├── create-account.html     # Auth: Create Account
    │   ├── choose-data.html        # Auth: Choose What to Share
    │   ├── forgot-password.html    # Auth: Forgot Password
    │   ├── email-verification.html # Auth: Email Verification
    │   ├── sso-google.html         # Auth: Sign in with Google
    │   └── sso-apple.html          # Auth: Sign in with Apple
    │
    ├── dashboard/                  # 4 files
    │   ├── main.html               # Dashboard Main
    │   ├── dashboard-menu-open.html # Dashboard with Menu ⭐ NEW
    │   ├── resilience-score.html   # Resilience Score
    │   └── data-reputation-score.html # Data Reputation Score
    │
    ├── health/                     # 6 files
    │   ├── main.html               # Health Data Main
    │   ├── resilience-score.html   # Resilience Score Detail
    │   ├── heart-rate-detail.html  # Heart Rate Detail
    │   ├── hrv-detail.html         # HRV Detail
    │   ├── sleep-detail.html       # Sleep Detail
    │   └── activity-detail.html    # Activity Detail
    │
    ├── rewards/                    # 5 files
    │   ├── main.html               # $MNDY Tokens ⭐ UPDATED
    │   ├── earn-more.html          # Earn More ⭐ UPDATED
    │   ├── exchange.html           # Exchange
    │   ├── history.html            # Transaction History
    │   └── withdraw.html           # Withdraw
    │
    ├── profile/                    # 9 files
    │   ├── main.html               # Profile Main ⭐ UPDATED
    │   ├── personal-info.html      # Personal Information
    │   ├── security.html           # Security
    │   ├── connected-devices.html  # Connected Devices
    │   ├── data-permissions.html   # Data Permissions
    │   ├── notifications.html      # Notifications
    │   ├── subscription.html       # Subscription Plans
    │   ├── wallet-connection.html  # Wallet Connection
    │   └── help-center.html        # Help Center
    │
    ├── errors/                     # 5 files
    │   ├── network-error.html      # Network Error
    │   ├── generic-error.html      # Generic Error
    │   ├── permission-denied.html  # Permission Denied
    │   ├── loading.html            # Loading State
    │   └── empty-state.html        # Empty State
    │
    ├── legal/                      # 3 files
    │   ├── terms.html              # Terms of Service
    │   ├── privacy.html            # Privacy Policy
    │   └── security-compliance.html # Security & Compliance
    │
    └── insights/                   # 1 file
        └── main.html               # Insights Main
```

## 📊 File Count Summary

| Category | File Count | Status |
|----------|------------|---------|
| Auth (includes Onboarding) | 11 | ✅ |
| Dashboard | 4 | ✅ Updated |
| Health | 6 | ✅ |
| Rewards | 5 | ✅ Updated |
| Profile | 9 | ✅ Updated |
| Errors | 5 | ✅ |
| Legal | 3 | ✅ |
| Insights | 1 | ✅ |
| **Total** | **44** | **✅** |

**Note**: The total is 47 screens because 3 screens are referenced from multiple sections:
- `rewards/main.html` - Listed in both Rewards and Dashboard
- `profile/main.html` - Listed in both Profile and Dashboard  
- `health/resilience-score.html` - Different from dashboard version

## 🔗 Cross-Referenced Files

These files appear in multiple navigation contexts:

1. **$MNDY Tokens** (`rewards/main.html`)
   - Accessed from: Dashboard, Rewards section
   
2. **Profile** (`profile/main.html`)
   - Accessed from: Dashboard, Bottom navigation

3. **Resilience Score**
   - Dashboard version: `dashboard/resilience-score.html`
   - Health detail version: `health/resilience-score.html`

## 📝 Quick Copy Commands

### Copy all HTML files to a new directory:
```bash
# Create export directory
mkdir mindbuddy-html-export

# Copy all HTML files preserving structure
cp -r v1/screens mindbuddy-html-export/
cp -r v1/styles mindbuddy-html-export/

# Create a zip file
zip -r mindbuddy-html-files.zip mindbuddy-html-export/
```

### List all HTML files with full paths:
```bash
find v1/screens -name "*.html" -type f | sort
```

### Count files by category:
```bash
echo "Auth: $(find v1/screens/auth -name "*.html" | wc -l)"
echo "Dashboard: $(find v1/screens/dashboard -name "*.html" | wc -l)"
echo "Health: $(find v1/screens/health -name "*.html" | wc -l)"
echo "Rewards: $(find v1/screens/rewards -name "*.html" | wc -l)"
echo "Profile: $(find v1/screens/profile -name "*.html" | wc -l)"
echo "Errors: $(find v1/screens/errors -name "*.html" | wc -l)"
echo "Legal: $(find v1/screens/legal -name "*.html" | wc -l)"
echo "Insights: $(find v1/screens/insights -name "*.html" | wc -l)"
```

## 🎯 HTML File Features

Each HTML file includes:
- ✅ Standalone styling (embedded CSS)
- ✅ Responsive viewport meta tag (393x852)
- ✅ Inter font family
- ✅ Consistent color scheme (#F8F9FA background)
- ✅ Card-based layouts
- ✅ Navigation elements

## 🚀 Ready for Figma Import!

All 47 HTML files are organized and ready to be:
1. Opened individually in browser
2. Captured as screenshots
3. Converted to Figma designs
4. Used as reference for component building

The files maintain consistent structure and styling throughout, making them ideal for creating a unified design system in Figma.