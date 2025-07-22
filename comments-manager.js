/**
 * Professional Comments System for MindBuddy Wireframes
 * Handles comment creation, storage, export, and UI management
 * @version 2.0.0
 */

// Configuration constants
const COMMENTS_CONFIG = {
    logKey: 'mindbuddy_comments_log',
    maxCommentLength: 500,
    autoSaveDelay: 1000,
    version: '2.0.0'
};

/**
 * Professional Comments Manager Class
 * Implements event-driven architecture with proper error handling
 */
class ProfessionalCommentsManager {
    constructor() {
        this.commentsLog = [];
        this.eventListeners = new Map();
        this.isInitialized = false;
        this.loadCommentsLog();
        this.setupEventSystem();
    }

    /**
     * Setup custom event system for decoupled communication
     */
    setupEventSystem() {
        this.events = new EventTarget();
    }

    /**
     * Add event listener with automatic cleanup tracking
     */
    addEventListener(element, event, handler, options = {}) {
        const key = `${element.tagName || 'document'}_${event}_${Date.now()}`;
        element.addEventListener(event, handler, options);
        this.eventListeners.set(key, { element, event, handler });
        return key;
    }

    /**
     * Remove specific event listener
     */
    removeEventListener(key) {
        const listener = this.eventListeners.get(key);
        if (listener) {
            listener.element.removeEventListener(listener.event, listener.handler);
            this.eventListeners.delete(key);
        }
    }

    /**
     * Clean up all event listeners
     */
    cleanup() {
        this.eventListeners.forEach((listener, key) => {
            this.removeEventListener(key);
        });
        this.eventListeners.clear();
    }

    /**
     * Load comments with version migration and error handling
     */
    loadCommentsLog() {
        try {
            const stored = localStorage.getItem(COMMENTS_CONFIG.logKey);
            if (stored) {
                const data = JSON.parse(stored);
                // Handle version migration if needed
                if (Array.isArray(data)) {
                    this.commentsLog = data;
                } else if (data.version && data.comments) {
                    this.commentsLog = data.comments;
                } else {
                    this.commentsLog = [];
                }
            } else {
                this.commentsLog = [];
            }
        } catch (error) {
            console.error('Failed to load comments log:', error);
            this.commentsLog = [];
            this.showToast('Failed to load saved comments', 'error');
        }
    }

    /**
     * Save comments with versioning and error handling
     */
    saveCommentsLog() {
        try {
            const dataToSave = {
                version: COMMENTS_CONFIG.version,
                timestamp: new Date().toISOString(),
                comments: this.commentsLog
            };
            localStorage.setItem(COMMENTS_CONFIG.logKey, JSON.stringify(dataToSave));
            this.events.dispatchEvent(new CustomEvent('commentsSaved', { 
                detail: { count: this.commentsLog.length } 
            }));
        } catch (error) {
            console.error('Failed to save comments log:', error);
            this.showToast('Failed to save comment', 'error');
        }
    }

    /**
     * Validate and sanitize comment input
     */
    validateComment(comment) {
        if (!comment || typeof comment !== 'string') {
            return { valid: false, error: 'Comment cannot be empty' };
        }

        const trimmed = comment.trim();
        if (trimmed.length === 0) {
            return { valid: false, error: 'Comment cannot be empty' };
        }

        if (trimmed.length > COMMENTS_CONFIG.maxCommentLength) {
            return { 
                valid: false, 
                error: `Comment too long (${trimmed.length}/${COMMENTS_CONFIG.maxCommentLength} characters)` 
            };
        }

        // Basic XSS protection - sanitize HTML
        const sanitized = this.sanitizeHTML(trimmed);
        return { valid: true, sanitized };
    }

    /**
     * Basic HTML sanitization
     */
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Add comment with validation and error handling
     */
    addCommentToLog(screenName, screenPath, comment) {
        const validation = this.validateComment(comment);
        if (!validation.valid) {
            this.showToast(validation.error, 'error');
            return null;
        }

        try {
            const logEntry = {
                id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                screenName: this.sanitizeHTML(screenName),
                screenPath: this.sanitizeHTML(screenPath),
                comment: validation.sanitized,
                timestamp: new Date().toISOString(),
                formattedTime: new Date().toLocaleString(),
                version: COMMENTS_CONFIG.version
            };

            this.commentsLog.push(logEntry);
            this.saveCommentsLog();
            this.updateUI();
            this.showToast(`Comment added for ${screenName}`, 'success');
            
            return logEntry;
        } catch (error) {
            console.error('Failed to add comment:', error);
            this.showToast('Failed to add comment', 'error');
            return null;
        }
    }

    /**
     * Show export preview modal with editable content
     */
    showExportPreview() {
        if (this.commentsLog.length === 0) {
            this.showToast('No comments to export', 'warning');
            return;
        }

        // Generate text content
        const textContent = this.generateTextExport();
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'export-preview-modal';
        modal.innerHTML = `
            <div class="export-overlay"></div>
            <div class="export-container">
                <div class="export-box">
                    <div class="export-header">
                        <h3>Preview & Edit Comments Export</h3>
                        <button class="export-close" aria-label="Close preview">&times;</button>
                    </div>
                    <div class="export-content">
                        <div class="export-info">
                            <span>📝 ${this.commentsLog.length} comments • You can edit the content before downloading</span>
                        </div>
                        <textarea class="export-textarea" spellcheck="false">${textContent}</textarea>
                    </div>
                    <div class="export-actions">
                        <button class="export-download-btn">📥 Download as Text File</button>
                        <button class="export-cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        const closeBtn = modal.querySelector('.export-close');
        const overlay = modal.querySelector('.export-overlay');
        const downloadBtn = modal.querySelector('.export-download-btn');
        const cancelBtn = modal.querySelector('.export-cancel-btn');
        const textarea = modal.querySelector('.export-textarea');

        const closeModal = () => {
            modal.classList.add('closing');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };

        const downloadContent = () => {
            const content = textarea.value;
            const timestamp = new Date().toISOString().split('T')[0];
            const filename = `mindbuddy-comments-${timestamp}.txt`;
            
            this.downloadFile(content, filename, 'text/plain');
            this.showToast('Comments exported successfully', 'success');
            closeModal();
        };

        closeBtn.onclick = closeModal;
        overlay.onclick = closeModal;
        cancelBtn.onclick = closeModal;
        downloadBtn.onclick = downloadContent;

        // Focus textarea and select all for easy editing
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(0, 0); // Position cursor at start
        }, 100);

        // Trigger animation
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    /**
     * Generate text export content
     */
    generateTextExport() {
        return [
            `MindBuddy Wireframes - Comments Export`,
            `Export Date: ${new Date().toLocaleString()}`,
            `Total Comments: ${this.commentsLog.length}`,
            `${'='.repeat(60)}`,
            '',
            ...this.commentsLog.map(entry => 
                `[${entry.formattedTime}] ${entry.screenName}\n` +
                `Path: ${entry.screenPath}\n` +
                `Comment: ${entry.comment}\n` +
                `ID: ${entry.id}\n` +
                `${'─'.repeat(50)}`
            )
        ].join('\n');
    }

    /**
     * Enhanced export functionality with error handling
     */
    exportLog(format = 'json') {
        if (this.commentsLog.length === 0) {
            this.showToast('No comments to export', 'warning');
            return;
        }

        try {
            let data, filename, mimeType;
            const timestamp = new Date().toISOString().split('T')[0];

            switch (format) {
                case 'json':
                    data = JSON.stringify({
                        exportDate: new Date().toISOString(),
                        version: COMMENTS_CONFIG.version,
                        totalComments: this.commentsLog.length,
                        comments: this.commentsLog
                    }, null, 2);
                    filename = `mindbuddy-comments-${timestamp}.json`;
                    mimeType = 'application/json';
                    break;

                case 'csv':
                    const headers = ['Screen Name', 'Screen Path', 'Comment', 'Timestamp', 'ID'];
                    const rows = this.commentsLog.map(entry => [
                        `"${entry.screenName.replace(/"/g, '""')}"`,
                        `"${entry.screenPath.replace(/"/g, '""')}"`,
                        `"${entry.comment.replace(/"/g, '""')}"`,
                        `"${entry.formattedTime}"`,
                        `"${entry.id}"`
                    ]);
                    data = [headers, ...rows].map(row => row.join(',')).join('\n');
                    filename = `mindbuddy-comments-${timestamp}.csv`;
                    mimeType = 'text/csv';
                    break;

                case 'txt':
                    data = [
                        `MindBuddy Wireframes - Comments Export`,
                        `Export Date: ${new Date().toLocaleString()}`,
                        `Total Comments: ${this.commentsLog.length}`,
                        `${'='.repeat(60)}`,
                        '',
                        ...this.commentsLog.map(entry => 
                            `[${entry.formattedTime}] ${entry.screenName}\n` +
                            `Path: ${entry.screenPath}\n` +
                            `Comment: ${entry.comment}\n` +
                            `ID: ${entry.id}\n` +
                            `${'─'.repeat(50)}`
                        )
                    ].join('\n');
                    filename = `mindbuddy-comments-${timestamp}.txt`;
                    mimeType = 'text/plain';
                    break;

                default:
                    throw new Error(`Unsupported export format: ${format}`);
            }

            this.downloadFile(data, filename, mimeType);
            this.showToast(`Comments exported as ${format.toUpperCase()} (${this.commentsLog.length} comments)`, 'success');

        } catch (error) {
            console.error('Export failed:', error);
            this.showToast('Export failed', 'error');
        }
    }

    /**
     * Secure file download helper
     */
    downloadFile(data, filename, mimeType) {
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        try {
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    /**
     * Clear log with confirmation and backup
     */
    clearLog() {
        if (!confirm('Are you sure you want to clear all comments? This action cannot be undone.')) {
            return;
        }

        try {
            // Create backup before clearing
            const backup = {
                timestamp: new Date().toISOString(),
                comments: [...this.commentsLog]
            };
            localStorage.setItem('mindbuddy_comments_backup', JSON.stringify(backup));

            this.commentsLog = [];
            this.saveCommentsLog();
            this.updateUI();
            this.showToast('Comments cleared successfully', 'success');
        } catch (error) {
            console.error('Failed to clear comments:', error);
            this.showToast('Failed to clear comments', 'error');
        }
    }

    /**
     * Add professional export controls to navigation
     */
    addExportControls() {
        // Prevent duplicate controls
        if (document.querySelector('.export-controls')) {
            return;
        }

        const exportControls = document.createElement('div');
        exportControls.className = 'export-controls';
        exportControls.setAttribute('role', 'toolbar');
        exportControls.setAttribute('aria-label', 'Comment export tools');
        
        // Check if we're in focus mode
        const inFocusMode = window.location.pathname.includes('focus.html');
        
        let controlsHTML = '';
        
        if (inFocusMode) {
            // Add back button in focus mode
            controlsHTML = `
                <button class="focus-back-btn" title="Back to Gallery" data-action="back" aria-label="Back to gallery">←</button>
            `;
        }
        
        controlsHTML += `
            <span class="log-count" aria-live="polite">${this.commentsLog.length} comments</span>
            <button class="export-btn" title="Preview & Export Comments" data-action="preview" aria-label="Preview and export comments">📝</button>
            <button class="export-btn clear-btn" title="Clear all comments" aria-label="Clear all comments">🗑️</button>
        `;
        
        exportControls.innerHTML = controlsHTML;

        // In focus mode or mobile, append to body. Otherwise to nav
        if (inFocusMode || window.innerWidth <= 640) {
            document.body.appendChild(exportControls);
        } else {
            const categoryNav = document.querySelector('.category-nav');
            if (categoryNav) {
                categoryNav.appendChild(exportControls);
            } else {
                document.body.appendChild(exportControls);
            }
        }

        // Add event listeners with proper error handling
        this.addEventListener(exportControls, 'click', (e) => {
            // Handle back button in focus mode
            if (e.target.classList.contains('focus-back-btn')) {
                if (window.focusModeGoBack) {
                    window.focusModeGoBack();
                }
                return;
            }
            
            if (!e.target.classList.contains('export-btn')) return;

            try {
                const action = e.target.dataset.action;
                if (action === 'preview') {
                    this.showExportPreview();
                } else if (e.target.classList.contains('clear-btn')) {
                    this.clearLog();
                }
            } catch (error) {
                console.error('Export control error:', error);
                this.showToast('Operation failed', 'error');
            }
        });

        console.log('Export controls added successfully');
    }

    /**
     * Update UI elements (count, states) via events
     */
    updateUI() {
        const logCount = document.querySelector('.log-count');
        if (logCount) {
            const count = this.commentsLog.length;
            logCount.textContent = `${count} comment${count !== 1 ? 's' : ''}`;
            logCount.setAttribute('aria-label', `${count} comments logged`);
        }

        // Dispatch update event for other components
        this.events.dispatchEvent(new CustomEvent('uiUpdate', { 
            detail: { commentCount: this.commentsLog.length } 
        }));
    }

    /**
     * Enhanced toast notifications with types and accessibility
     */
    showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.comment-toast').forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `comment-toast toast-${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-remove with cleanup
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, type === 'error' ? 4000 : 2000);
    }

    /**
     * Initialize the comments system with proper error handling
     */
    async init() {
        if (this.isInitialized) {
            console.warn('Comments manager already initialized');
            return;
        }

        try {
            // Add export controls
            this.addExportControls();
            
            // Setup UI event listeners
            this.addEventListener(this.events, 'commentsSaved', () => {
                this.updateUI();
            });

            // Initialize UI state
            this.updateUI();
            
            this.isInitialized = true;
            console.log('Professional Comments Manager initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize comments manager:', error);
            this.showToast('Failed to initialize comments system', 'error');
        }
    }

    /**
     * Get comments statistics
     */
    getStats() {
        return {
            totalComments: this.commentsLog.length,
            averageLength: this.commentsLog.length > 0 
                ? Math.round(this.commentsLog.reduce((sum, c) => sum + c.comment.length, 0) / this.commentsLog.length)
                : 0,
            dateRange: this.commentsLog.length > 0 
                ? {
                    oldest: Math.min(...this.commentsLog.map(c => new Date(c.timestamp).getTime())),
                    newest: Math.max(...this.commentsLog.map(c => new Date(c.timestamp).getTime()))
                }
                : null
        };
    }
}

// Professional initialization with proper error handling and timing
class CommentsInitializer {
    constructor() {
        this.initializationAttempts = 0;
        this.maxAttempts = 50; // 5 seconds with 100ms intervals
        this.manager = null;
    }

    async waitForAuth() {
        return new Promise((resolve, reject) => {
            const checkAuth = () => {
                this.initializationAttempts++;
                
                if (window.authManager && window.authManager.authenticated) {
                    resolve(true);
                } else if (this.initializationAttempts >= this.maxAttempts) {
                    reject(new Error('Authentication timeout'));
                } else {
                    setTimeout(checkAuth, 100);
                }
            };
            
            checkAuth();
        });
    }

    async initialize() {
        try {
            console.log('Waiting for authentication...');
            await this.waitForAuth();
            
            console.log('Authentication confirmed, initializing comments manager...');
            this.manager = new ProfessionalCommentsManager();
            await this.manager.init();
            
            // Make manager globally available
            window.professionalCommentsManager = this.manager;
            
            // Setup comment input handlers for existing elements
            this.setupCommentHandlers();
            
            // Listen for new screens being added
            window.addEventListener('screensLoaded', () => {
                this.setupCommentHandlers();
            });
            
            console.log('Professional Comments Manager fully initialized');
            
        } catch (error) {
            console.error('Failed to initialize comments system:', error);
            // Attempt fallback initialization without auth check
            this.fallbackInit();
        }
    }

    setupCommentHandlers() {
        const commentSections = document.querySelectorAll('.comment-section');
        
        commentSections.forEach(section => {
            const input = section.querySelector('.comment-input');
            const sendBtn = section.querySelector('.comment-send-btn');
            
            if (!input || !sendBtn || input.dataset.handlerAdded) return;
            
            const screenName = section.dataset.screenName;
            const screenPath = section.dataset.screenPath;
            
            // Expansion/collapse handlers
            const expandInput = () => {
                input.classList.add('expanded');
                section.classList.add('focused');
            };
            
            const collapseInput = () => {
                if (!input.value.trim()) {
                    input.classList.remove('expanded');
                    section.classList.remove('focused');
                }
            };
            
            // Debounced input handler for character count and validation
            let debounceTimer;
            const handleInput = () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    const length = input.value.length;
                    input.style.borderColor = length > COMMENTS_CONFIG.maxCommentLength ? '#ff4444' : '';
                    section.setAttribute('data-char-count', `${length}/${COMMENTS_CONFIG.maxCommentLength}`);
                }, 150);
            };
            
            // Send comment handler
            const sendComment = () => {
                if (!this.manager) return;
                
                const comment = input.value.trim();
                if (comment) {
                    const result = this.manager.addCommentToLog(screenName, screenPath, comment);
                    if (result) {
                        input.value = '';
                        input.style.borderColor = '';
                        input.classList.remove('expanded');
                        section.classList.remove('focused');
                        section.removeAttribute('data-char-count');
                        input.blur();
                    }
                }
            };

            // Add event listeners
            input.addEventListener('focus', expandInput);
            input.addEventListener('blur', (e) => {
                // Delay collapse to allow click on send button
                setTimeout(collapseInput, 150);
            });
            input.addEventListener('input', handleInput);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendComment();
                }
            });
            sendBtn.addEventListener('click', sendComment);
            
            // Mark as handled
            input.dataset.handlerAdded = 'true';
        });
    }

    fallbackInit() {
        console.log('Attempting fallback initialization...');
        this.manager = new ProfessionalCommentsManager();
        this.manager.init();
        window.professionalCommentsManager = this.manager;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const initializer = new CommentsInitializer();
        initializer.initialize();
    });
} else {
    const initializer = new CommentsInitializer();
    initializer.initialize();
}