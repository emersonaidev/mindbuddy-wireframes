# MindBuddy Wireframes

Clean minimalist wireframe designs for the MindBuddy iOS application.

## Overview

This repository contains 45+ wireframe screens for MindBuddy, a stress monitoring and rewards application that tracks health data from Apple Watch and rewards users with MNDY tokens.

## Design Specifications

- **Device**: iPhone 15 Pro
- **Dimensions**: 393×852px
- **Style**: Clean Minimalist (V1)
- **Color Scheme**: Grayscale

## Screen Categories

### Authentication (11 screens)
- Welcome
- Login
- How It Works
- Create Account
- Connect Data
- Choose What to Share
- Forgot Password
- Email Verification
- Account Success
- SSO (Google & Apple)

### Dashboard & Navigation (5 screens)
- Main Dashboard
- Health Overview
- Rewards Overview
- Profile
- Insights

### Health Data (5 screens)
- Health Main
- Heart Rate Detail
- Sleep Analysis
- HRV Detail
- Activity Detail

### Rewards & Tokens (5 screens)
- Rewards Main
- Withdraw
- Exchange
- Transaction History
- Earn More

### Profile & Settings (6 screens)
- Profile Main
- Personal Information
- Security Settings
- Connected Devices
- Notifications
- Subscription Plans

### Error States (5 screens)
- Network Error
- Empty State
- Permission Denied
- Loading States
- Generic Error

## Viewing the Wireframes

Open `wireframe-gallery-simple.html` in your browser to view all screens in an interactive gallery with:
- Category filtering
- Multiple view options (1-4 columns)
- Keyboard navigation
- Touch gestures for mobile

## Structure

```
mindbuddy-ux-ui/
├── v1/
│   ├── screens/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── health/
│   │   ├── rewards/
│   │   ├── profile/
│   │   ├── errors/
│   │   └── insights/
│   └── styles/
│       └── base.css
├── wireframe-gallery-simple.html
└── README.md
```

## Technology

- Pure HTML/CSS
- No frameworks or dependencies
- Figma-import friendly structure
- Responsive design

## License

© 2025 MindBuddy. All rights reserved.
