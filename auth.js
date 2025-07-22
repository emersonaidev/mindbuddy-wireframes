// Authentication logic for MindBuddy Wireframes
const AUTH_CONFIG = {
    password: 'mindbuddy2025!',
    sessionKey: 'mindbuddy_auth',
    sessionDuration: 24 * 60 * 60 * 1000 // 24 hours
};

class AuthManager {
    constructor() {
        this.authenticated = false;
        this.checkSession();
    }

    checkSession() {
        const session = sessionStorage.getItem(AUTH_CONFIG.sessionKey);
        if (session) {
            const sessionData = JSON.parse(session);
            if (Date.now() - sessionData.timestamp < AUTH_CONFIG.sessionDuration) {
                this.authenticated = true;
                return true;
            }
        }
        return false;
    }

    authenticate(password) {
        if (password === AUTH_CONFIG.password) {
            const sessionData = {
                timestamp: Date.now(),
                authenticated: true
            };
            sessionStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(sessionData));
            this.authenticated = true;
            return true;
        }
        return false;
    }

    logout() {
        sessionStorage.removeItem(AUTH_CONFIG.sessionKey);
        this.authenticated = false;
        location.reload();
    }

    createLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-overlay"></div>
            <div class="auth-container">
                <div class="auth-box">
                    <h2>MindBuddy Wireframes</h2>
                    <p>Please enter the password to access the wireframes</p>
                    <form id="auth-form">
                        <input 
                            type="password" 
                            id="auth-password" 
                            class="auth-input" 
                            placeholder="Enter password"
                            autocomplete="off"
                        >
                        <button type="submit" class="auth-button">Access Gallery</button>
                        <div id="auth-error" class="auth-error"></div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners
        const form = document.getElementById('auth-form');
        const passwordInput = document.getElementById('auth-password');
        const errorDiv = document.getElementById('auth-error');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = passwordInput.value;
            
            if (this.authenticate(password)) {
                modal.remove();
                // Restore scrolling after authentication
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
                this.onAuthenticated();
            } else {
                errorDiv.textContent = 'Incorrect password. Please try again.';
                passwordInput.value = '';
                passwordInput.focus();
                
                // Clear error after 3 seconds
                setTimeout(() => {
                    errorDiv.textContent = '';
                }, 3000);
            }
        });

        // Focus on password input
        passwordInput.focus();
    }

    onAuthenticated() {
        // Callback for when authentication is successful
        console.log('User authenticated');
        
        // Add logout button to category nav
        const categoryNav = document.querySelector('.category-nav');
        if (categoryNav && !document.querySelector('.logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'logout-btn';
            logoutBtn.textContent = 'Logout';
            logoutBtn.onclick = () => this.logout();
            categoryNav.appendChild(logoutBtn);
        }
    }

    init() {
        if (!this.authenticated) {
            this.createLoginModal();
            document.body.style.overflow = 'hidden';
        } else {
            this.onAuthenticated();
            // Ensure body is scrollable after authentication
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }
    }
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
    window.authManager.init();
});