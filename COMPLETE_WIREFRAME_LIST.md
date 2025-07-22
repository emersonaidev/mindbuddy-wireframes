# MindBuddy Complete Wireframe List

## Overview
This document contains a comprehensive list of all screens needed for the MindBuddy iOS application. Each screen is marked as either ✅ (already designed) or ❌ (needs to be created).

## Screen Dimensions
- **Device**: iPhone 15 Pro
- **Dimensions**: 393 x 852 pixels
- **Style**: Grayscale wireframes only

## 1. Authentication & Onboarding Flow

### 1.1 Welcome & Getting Started
- ✅ **1.1.1 Welcome Screen** - Initial app launch screen
- ✅ **1.1.2 How It Works** - 3-step explanation
- ❌ **1.1.3 Onboarding Progress Indicator** - Shows progress through onboarding

### 1.2 Account Creation
- ✅ **1.2.1 Create Your Account** - Email/password signup
- ❌ **1.2.2 Verify Email** - Email verification screen
- ❌ **1.2.3 Email Verification Success** - Confirmation screen
- ❌ **1.2.4 Email Verification Failed** - Error state

### 1.3 Authentication
- ❌ **1.3.1 Login Screen** - Email/password login
- ❌ **1.3.2 SSO Options** - Google/Apple sign-in buttons
- ❌ **1.3.3 Forgot Password** - Password reset request
- ❌ **1.3.4 Reset Password Email Sent** - Confirmation
- ❌ **1.3.5 Create New Password** - Password reset form
- ❌ **1.3.6 Password Reset Success** - Confirmation

### 1.4 Health Data Connection
- ✅ **1.4.1 Connect Your Data** - Apple Health introduction
- ✅ **1.4.2 Choose What to Share** - Data permissions toggles
- ❌ **1.4.3 Apple Health Permission Dialog** - System permission request
- ❌ **1.4.4 Connection Success** - Confirmation screen
- ❌ **1.4.5 Connection Failed** - Error state with retry

### 1.5 Wallet Connection (Optional)
- ❌ **1.5.1 Connect Wallet Introduction** - Explain benefits
- ❌ **1.5.2 Wallet Selection** - List of supported wallets
- ❌ **1.5.3 Wallet Connection Process** - QR code/deep link
- ❌ **1.5.4 Wallet Connected Success** - Confirmation

### 1.6 Onboarding Completion
- ❌ **1.6.1 Setup Complete** - Welcome to MindBuddy
- ❌ **1.6.2 Tutorial Highlights** - Quick feature tour

## 2. Main App Navigation

### 2.1 Tab Bar Screens
- ✅ **2.1.1 Dashboard** - Main home screen
- ❌ **2.1.2 Health** - Detailed health metrics
- ❌ **2.1.3 Rewards** - Token management
- ❌ **2.1.4 Insights** - Analytics and trends
- ❌ **2.1.5 Profile** - User profile and settings

## 3. Dashboard Features

### 3.1 Main Dashboard
- ✅ **3.1.1 Dashboard Overview** - Balance, resilience, reputation
- ❌ **3.1.2 Dashboard Empty State** - No data yet
- ❌ **3.1.3 Dashboard Loading State** - Fetching data
- ❌ **3.1.4 Dashboard Error State** - Connection issues

### 3.2 Token Details
- ✅ **3.2.1 $MNDY Tokens Screen** - Token history and utility
- ❌ **3.2.2 Token Transaction Details** - Individual transaction
- ❌ **3.2.3 Claim Rewards** - Pending rewards to claim
- ❌ **3.2.4 Token Exchange** - How to exchange tokens

### 3.3 Resilience Score
- ✅ **3.3.1 Resilience Score Details** - Score explanation
- ❌ **3.3.2 Resilience History** - Historical chart
- ❌ **3.3.3 Resilience Factors** - What affects the score

### 3.4 Data Reputation
- ✅ **3.4.1 Data Reputation Score** - Score and improvement tips
- ❌ **3.4.2 Data Quality Details** - Breakdown by data type
- ❌ **3.4.3 Data Gaps** - Missing data notifications

## 4. Health Data Screens

### 4.1 Health Overview
- ❌ **4.1.1 Health Dashboard** - All health metrics summary
- ❌ **4.1.2 Health Empty State** - No data connected
- ❌ **4.1.3 Health Permission Required** - Need to grant access

### 4.2 Individual Metrics
- ❌ **4.2.1 Heart Rate Details** - Charts and history
- ❌ **4.2.2 HRV Details** - Heart rate variability
- ❌ **4.2.3 Sleep Analysis** - Sleep patterns and quality
- ❌ **4.2.4 Activity Details** - Steps, exercise, movement
- ❌ **4.2.5 Stress Level Details** - Calculated stress metrics

### 4.3 Data Input
- ❌ **4.3.1 Manual Data Entry** - Add data manually
- ❌ **4.3.2 Data Correction** - Fix incorrect data
- ❌ **4.3.3 Batch Data Submission** - Sync pending data

## 5. Rewards & Tokens

### 5.1 Rewards Overview
- ❌ **5.1.1 Rewards Dashboard** - Total earnings, pending, history
- ❌ **5.1.2 Rewards Empty State** - No rewards yet
- ❌ **5.1.3 Rewards Loading State** - Calculating rewards

### 5.2 Earning Tokens
- ❌ **5.2.1 How to Earn** - Guide to earning tokens
- ❌ **5.2.2 Daily Tasks** - Available tasks for tokens
- ❌ **5.2.3 Bonus Opportunities** - Special earning events

### 5.3 Token Management
- ❌ **5.3.1 Token Wallet** - Current balance and transactions
- ❌ **5.3.2 Transaction History** - Detailed transaction list
- ❌ **5.3.3 Withdraw Tokens** - Transfer to external wallet
- ❌ **5.3.4 Withdrawal Confirmation** - Security check
- ❌ **5.3.5 Withdrawal Success** - Transaction complete

## 6. Insights & Analytics

### 6.1 Insights Overview
- ❌ **6.1.1 Insights Dashboard** - Key trends and patterns
- ❌ **6.1.2 Weekly Summary** - Week's health summary
- ❌ **6.1.3 Monthly Report** - Monthly health report

### 6.2 Detailed Analytics
- ❌ **6.2.1 Stress Patterns** - When stress peaks occur
- ❌ **6.2.2 Sleep Patterns** - Sleep quality trends
- ❌ **6.2.3 Activity Patterns** - Movement and exercise trends
- ❌ **6.2.4 Correlation Analysis** - What affects your stress

### 6.3 Recommendations
- ❌ **6.3.1 Personalized Tips** - Based on your data
- ❌ **6.3.2 Goal Setting** - Set health goals
- ❌ **6.3.3 Progress Tracking** - Track goal progress

## 7. Social Features

### 7.1 Leaderboard
- ❌ **7.1.1 Global Leaderboard** - Top contributors
- ❌ **7.1.2 Friends Leaderboard** - Compare with friends
- ❌ **7.1.3 Leaderboard Filters** - By time period, metric

### 7.2 Challenges
- ❌ **7.2.1 Active Challenges** - Current challenges
- ❌ **7.2.2 Challenge Details** - Rules and rewards
- ❌ **7.2.3 Join Challenge** - Confirmation screen
- ❌ **7.2.4 Challenge Progress** - Your standing
- ❌ **7.2.5 Challenge Completed** - Results and rewards

### 7.3 Community
- ❌ **7.3.1 Community Feed** - Updates and achievements
- ❌ **7.3.2 Share Achievement** - Share your progress
- ❌ **7.3.3 Friend Requests** - Manage connections

## 8. Profile & Settings

### 8.1 Profile
- ❌ **8.1.1 Profile Overview** - User info and stats
- ❌ **8.1.2 Edit Profile** - Update user information
- ❌ **8.1.3 Profile Photo** - Add/change photo
- ❌ **8.1.4 Achievements** - Badges and milestones

### 8.2 Settings
- ✅ **8.2.1 Settings Main Menu** - All settings categories
- ✅ **8.2.2 Account Info** - Email, wallet, security
- ✅ **8.2.3 Data Control** - Privacy and sharing
- ✅ **8.2.4 Connected Platforms** - Health integrations
- ✅ **8.2.5 Notification Settings** - Push preferences
- ❌ **8.2.6 App Preferences** - Theme, units, language
- ❌ **8.2.7 Help & Support** - FAQ, contact, feedback
- ❌ **8.2.8 About** - App version, terms, privacy

### 8.3 Account Management
- ❌ **8.3.1 Change Email** - Update email process
- ❌ **8.3.2 Change Password** - Update password
- ❌ **8.3.3 Two-Factor Setup** - Enable 2FA
- ❌ **8.3.4 Export Data** - Download your data
- ❌ **8.3.5 Delete Account** - Account deletion flow
- ❌ **8.3.6 Delete Confirmation** - Final warning

## 9. Error & Edge Cases

### 9.1 Network Errors
- ❌ **9.1.1 No Internet Connection** - Offline state
- ❌ **9.1.2 Server Error** - 500 errors
- ❌ **9.1.3 Request Timeout** - Slow connection

### 9.2 Data Errors
- ❌ **9.2.1 Sync Failed** - Data sync issues
- ❌ **9.2.2 Invalid Data** - Corrupted data warning
- ❌ **9.2.3 Storage Full** - Device storage issues

### 9.3 Permission Errors
- ❌ **9.3.1 Health Access Denied** - Permission rejected
- ❌ **9.3.2 Notification Denied** - Push permission
- ❌ **9.3.3 Camera Access Denied** - For profile photo

### 9.4 Authentication Errors
- ❌ **9.4.1 Session Expired** - Need to login again
- ❌ **9.4.2 Account Locked** - Too many attempts
- ❌ **9.4.3 Invalid Credentials** - Wrong password

## 10. Modals & Overlays

### 10.1 Confirmations
- ❌ **10.1.1 Generic Confirmation** - Yes/No dialogs
- ❌ **10.1.2 Destructive Action** - Delete confirmations
- ❌ **10.1.3 Success Modal** - Action completed

### 10.2 Information
- ❌ **10.2.1 Info Tooltip** - Help text overlays
- ❌ **10.2.2 Tutorial Overlay** - Feature explanations
- ❌ **10.2.3 What's New** - Feature announcements

### 10.3 Loading States
- ❌ **10.3.1 Full Screen Loader** - Major operations
- ❌ **10.3.2 Inline Loader** - Section loading
- ❌ **10.3.3 Pull to Refresh** - Manual refresh

## Summary Statistics
- **Total Screens Needed**: 115
- **Already Designed**: 14 (12%)
- **Still Needed**: 101 (88%)

## Priority Recommendations

### High Priority (Core User Flow)
1. Login/Authentication screens
2. Health Dashboard
3. Rewards Dashboard
4. Profile Overview
5. Error states for main screens

### Medium Priority (Enhanced Experience)
1. Detailed health metrics screens
2. Insights and analytics
3. Social features
4. Advanced settings

### Low Priority (Nice to Have)
1. Tutorial overlays
2. Achievement screens
3. Community features
4. Advanced analytics

## Improvements for Existing Wireframes

### General Improvements
1. **Consistency**: Ensure all screens have consistent header styles with back buttons
2. **Error States**: Add error message display areas to all screens with data
3. **Loading States**: Include skeleton screens or loading indicators
4. **Empty States**: Design friendly empty states with CTAs
5. **Accessibility**: Ensure touch targets are at least 44x44 points

### Specific Screen Improvements

**1.1 Welcome Screen**
- Add app version number at bottom
- Include "Skip" option for returning users

**1.3 Create Your Account**
- Add password strength indicator
- Include terms of service checkbox
- Show password requirements

**2.1 Main Dashboard**
- Add pull-to-refresh gesture indicator
- Include last updated timestamp
- Add quick action buttons

**Settings Screens**
- Add search functionality in main settings
- Include confirmation dialogs for destructive actions
- Show current values for all settings

## Next Steps
1. Create HTML templates for each missing screen
2. Ensure consistent navigation patterns
3. Design reusable components (buttons, cards, headers)
4. Create a style guide for spacing and typography
5. Build interactive prototypes for user testing