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
    apiKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4OrCkzb7AfSzL\nDGreD++JGDBnxug+RsZXNFcRSlA5BNNBDDpqZ21KwxqWsTgOIAL5Y4PXeBirAtav\nA3xSJ4KL1G0a3qcdrA1yTXazdWQ+VyvZkli8Rhu8c+jaEdveMl7DxZC3xmwG7Cy7\nqqAa6uLjzOIy3AxTgv6+s2AVte1yl9+G4vjTuJ5Ov0+CbLPrUnEoqOeK4YusfP85\nDVOGtQWL4hW7d34BWnsKJnCe8LR9UlZXTrkWZ1LysHbatbRaW/eZX0cgWX4Sq6cs\n8DutvjbIlZZFm2NjyefJptirmAVoC8Qkr+ogGB5Ld+k7IBotn/29XQ+aUomJ4jGc\n7uW0eDR3AgMBAAECggEARtLVNr4b328fyb1v1gelS/x/G141yT83H64w7KY3efwX\nZLHZQS+arfucXKMrjA6VZh9yP2LdhNy2AJkj8Ydb4fqbqRFAiKEsmC0cfXgbPfYQ\nFvfyYgrHveaHdVIZRu3xTWzFqki/HdgsiEbbfw2ehPmuWeQLXw2EdnaJ8T671mnS\nMcouK2Uz9FdfYK+/R8iboo/+OKqIXTii7ER6tV9VwaJdfzPmfIX02qxj/YNDrelG\n8DNEasq4qteI5uX5lNHezWN3kkW1md1yubvZli4lVVYqG3Ya08smykthkUKilUhY\nE5PjffLCs6Fmhwrfu4e2TgbKW/MVkLWw52g2UZbRpQKBgQDjFD5FErXrtgpPz5/q\nH5ESeMhVP+hjz1k3GUDikZDOehsl2WM6oFMjETsQaP7GmSjk7Mw3AL+i3abdYCON\nnJsek/+q5Y6LUMRRIb/Bh6Itx3KvEtVabZG/pQe1RI1cMv5/+N5KMbnkqAa1567P\nnHzeZOTzjqMTjA/x6o/dRNHNhQKBgQDPsVumg3JXs4ifrUgCqps8lcxAcywnOJqB\ngGO6U4LFhrfcqG1Ohr8oDAJmHDHRwPmXcZHPMLo7Yg99irz8KfKUSipaIVjOeh22\nJOQF3d4uJeDbhvcMaZeRN8x2bRnAZoLPP/vNV5EerCJDeObhkdvzpq1RimSa5J/m\ncSbpaBgMywKBgQCoKJGEbTqy9vfj6oktw3qXB0KzfsQFRcN3fggCwHFPtjTsbnOB\nMsDeMyBeIqKpRzp1bLY99Rv069dqEIvDjrmAh3DJiX1pxcHbovZxxpNe+1f+NiAw\n+vr3xKpUnhNgt5KoCg/zOafDoHp3sr5NmEEQH/88LeCt1Qbpyx4GabREUQKBgE7s\nTq+P87tv9dL3vg2FV0hGhD9ZhMXCtLPRXhRH98Gn1+Z5+k+E1M8bAS5cOHJEqpPq\nDEZ3dc1rDgfe2MHaDtxa8o0dbunHbdLxYdT44p0Wt8O0Hd0Row8D7SZzfv2l9r9a\nyQzW4caOEtcg8lt1WefUxrfdpy1VA45GIUtAyyLRAoGBAMjG60xpRMzt7BkDX0Vk\nR9t4sgiPNqTs/8e4ukr5oWosc2dr3UOFgyAI9v9S4Ww0obmmX+2T+eK+7ul+zZNL\ng79QCwsS3IF6e7Ad/1qy3E/rDHmDvHChdPapp5vVXT0d33EiyM7RweyUi18XR0pQ\n/Ie9gyzO0oPEk0Cn8WpzOAwY\n-----END PRIVATE KEY-----\n",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "wireframeapp-da0af",
    storageBucket: "YOUR_STORAGE_BUCKET",
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