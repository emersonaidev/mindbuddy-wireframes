# Firebase Setup Instructions

## Setting up Firebase for MindBuddy Wireframes

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" 
3. Name your project (e.g., "mindbuddy-wireframes")
4. Follow the setup wizard

### 2. Enable Google Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Google" provider
3. Add your project name and support email
4. Save the configuration

### 3. Configure Authorized Domains
1. In Authentication → Settings → Authorized domains
2. Add your domain (e.g., `yourdomain.com`)
3. For local testing, `localhost` is already authorized

### 4. Get Your Firebase Configuration
1. Go to Project Settings (gear icon)
2. Under "Your apps", click "Web" (</>)
3. Register your app with a nickname
4. Copy the Firebase configuration object

### 5. Update firebase-config.js
Replace the placeholder values in `firebase-config.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 6. Configure User Access (Optional)
To restrict access to specific users:
1. In Firebase Console, go to "Authentication" → "Users"
2. You can manually add authorized users
3. Or implement a whitelist in your code checking `user.email`

### 7. Deploy to Your Domain
1. Make sure your domain is added to authorized domains
2. Deploy all files to your web server
3. Test the Google Sign-In flow

## Security Notes
- Never commit your Firebase configuration to public repositories
- Use environment variables or secure configuration management
- Consider implementing additional access control based on email domains or specific user lists

## Testing Locally
1. Use a local web server (e.g., `python -m http.server 8000`)
2. Access via `http://localhost:8000`
3. Firebase auth works on localhost by default