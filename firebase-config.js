// Firebase configuration for MindBuddy Wireframes
// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged,
    signOut 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Your Firebase configuration
// IMPORTANT: Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Configure Google provider
provider.setCustomParameters({
    prompt: 'select_account'
});

export { auth, provider, signInWithPopup, onAuthStateChanged, signOut };