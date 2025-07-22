// Firebase Google Authentication for MindBuddy Wireframes

class AuthManager {
    constructor() {
        this.authenticated = false;
        this.currentUser = null;
        this.firebaseLoaded = false;
        this.initializeFirebase();
    }

    async initializeFirebase() {
        try {
            // Dynamically import Firebase modules
            const { auth, provider, signInWithPopup, onAuthStateChanged, signOut } = await import('./firebase-config.js');
            
            this.auth = auth;
            this.provider = provider;
            this.signInWithPopup = signInWithPopup;
            this.onAuthStateChanged = onAuthStateChanged;
            this.signOut = signOut;
            this.firebaseLoaded = true;
            
            console.log('Firebase loaded successfully');
            this.setupAuthListener();
            
        } catch (error) {
            console.error('Failed to initialize Firebase:', error);
            this.showError('Failed to load authentication system. Please check Firebase configuration.');
            this.showLoginModal();
        }
    }

    setupAuthListener() {
        if (!this.firebaseLoaded) return;
        
        // Listen for authentication state changes
        this.onAuthStateChanged(this.auth, (user) => {
            if (user) {
                // User is signed in
                this.authenticated = true;
                this.currentUser = user;
                console.log('User authenticated:', user.email);
                this.onAuthenticated();
                
                // Remove modal if it exists
                const modal = document.querySelector('.auth-modal');
                if (modal) {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                    document.documentElement.style.overflow = 'auto';
                }
            } else {
                // User is signed out
                this.authenticated = false;
                this.currentUser = null;
                this.showLoginModal();
            }
        });
    }

    async signInWithGoogle() {
        if (!this.firebaseLoaded) {
            this.showError('Authentication system not loaded. Please refresh the page.');
            return;
        }
        
        try {
            const result = await this.signInWithPopup(this.auth, this.provider);
            // The signed-in user info
            const user = result.user;
            console.log('Successfully signed in:', user.email);
        } catch (error) {
            console.error('Error signing in:', error);
            
            // Show user-friendly error messages
            if (error.code === 'auth/popup-closed-by-user') {
                this.showError('Sign-in cancelled');
            } else if (error.code === 'auth/network-request-failed') {
                this.showError('Network error. Please check your connection.');
            } else {
                this.showError('Sign-in failed. Please try again.');
            }
        }
    }

    async logout() {
        if (!this.firebaseLoaded) return;
        
        try {
            await this.signOut(this.auth);
            location.reload();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    showLoginModal() {
        // Check if modal already exists
        if (document.querySelector('.auth-modal')) return;
        
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-overlay"></div>
            <div class="auth-container">
                <div class="auth-box">
                    <h2>MindBuddy Wireframes</h2>
                    <p>Sign in to access the wireframes gallery</p>
                    
                    <button id="google-sign-in" class="google-sign-in-btn">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                            <path fill="#FBBC04" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"/>
                            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                        </svg>
                        Sign in with Google
                    </button>
                    
                    <div id="auth-error" class="auth-error"></div>
                    
                    <p class="auth-note">Only authorized users can access these wireframes</p>
                    
                    ${!this.firebaseLoaded ? '<p class="auth-note" style="color: #ff6b6b;">⚠️ Firebase not configured properly</p>' : ''}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Add event listener to Google sign-in button
        const googleBtn = document.getElementById('google-sign-in');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.signInWithGoogle());
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('auth-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            setTimeout(() => {
                errorDiv.textContent = '';
                errorDiv.style.display = 'none';
            }, 5000);
        }
    }

    onAuthenticated() {
        console.log('User authenticated:', this.currentUser?.email);
        
        // Update header with user info
        this.updateUserDisplay();
    }

    updateUserDisplay() {
        // Update logout button to show user info
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn && this.currentUser) {
            // Show user avatar if available
            const userPhoto = this.currentUser.photoURL;
            const userName = this.currentUser.displayName || this.currentUser.email;
            
            if (userPhoto) {
                logoutBtn.innerHTML = `
                    <img src="${userPhoto}" alt="${userName}" class="user-avatar" referrerpolicy="no-referrer">
                    <span>Logout</span>
                `;
            } else {
                logoutBtn.innerHTML = `<span>Logout (${userName})</span>`;
            }
        }
    }

    init() {
        // Firebase initialization is handled in constructor
        console.log('AuthManager initialized');
    }
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
    window.authManager.init();
});

// Make auth manager available globally for the logout button
window.logout = () => {
    if (window.authManager) {
        window.authManager.logout();
    }
};