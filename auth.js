// Simple password authentication for MindBuddy Wireframes
const AUTH_CONFIG = {
    password: 'MindBuddy2024!',
    maxAttempts: 3,
    lockoutTime: 30000 // 30 seconds
};

class AuthManager {
    constructor() {
        this.authenticated = false;
        this.attempts = 0;
        this.lockedUntil = null;
    }

    init() {
        // Check if user is already authenticated
        const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
        if (isAuthenticated) {
            this.authenticated = true;
            this.onAuthenticated();
        } else {
            this.showLoginModal();
        }
    }

    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-overlay"></div>
            <div class="auth-container">
                <div class="auth-box">
                    <h2>MindBuddy Wireframes</h2>
                    <p>Enter password to access the gallery</p>
                    
                    <form id="auth-form">
                        <input 
                            type="password" 
                            id="password-input" 
                            placeholder="Enter password"
                            class="password-input"
                            autocomplete="off"
                        />
                        <button type="submit" class="submit-btn">Access Gallery</button>
                    </form>
                    
                    <div id="auth-error" class="auth-error"></div>
                    
                    <p class="auth-note">Only authorized users can access these wireframes</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Focus on password input
        setTimeout(() => {
            document.getElementById('password-input').focus();
        }, 100);

        // Add form submit listener
        document.getElementById('auth-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAuth();
        });
    }

    handleAuth() {
        // Check if locked out
        if (this.lockedUntil && Date.now() < this.lockedUntil) {
            const remainingTime = Math.ceil((this.lockedUntil - Date.now()) / 1000);
            this.showError(`Too many attempts. Try again in ${remainingTime} seconds.`);
            return;
        }

        const passwordInput = document.getElementById('password-input');
        const password = passwordInput.value;

        if (password === AUTH_CONFIG.password) {
            // Success
            this.authenticated = true;
            sessionStorage.setItem('authenticated', 'true');
            this.onAuthenticated();
            
            // Remove modal
            const modal = document.querySelector('.auth-modal');
            if (modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
            }
        } else {
            // Failed attempt
            this.attempts++;
            passwordInput.value = '';
            
            if (this.attempts >= AUTH_CONFIG.maxAttempts) {
                this.lockedUntil = Date.now() + AUTH_CONFIG.lockoutTime;
                this.showError(`Too many attempts. Try again in 30 seconds.`);
            } else {
                this.showError(`Incorrect password. ${AUTH_CONFIG.maxAttempts - this.attempts} attempts remaining.`);
            }
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('auth-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    onAuthenticated() {
        console.log('User authenticated');
        // Any post-authentication logic here
    }

    logout() {
        sessionStorage.removeItem('authenticated');
        location.reload();
    }
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
    window.authManager.init();
});

// Make logout available globally
window.logout = () => {
    if (window.authManager) {
        window.authManager.logout();
    }
};