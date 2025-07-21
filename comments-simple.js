// Simplified commenting system for MindBuddy Wireframes
const COMMENTS_CONFIG = {
    logKey: 'mindbuddy_comments_log'
};

class SimpleCommentsManager {
    constructor() {
        this.commentsLog = this.loadCommentsLog();
    }

    loadCommentsLog() {
        const stored = localStorage.getItem(COMMENTS_CONFIG.logKey);
        return stored ? JSON.parse(stored) : [];
    }

    saveCommentsLog() {
        localStorage.setItem(COMMENTS_CONFIG.logKey, JSON.stringify(this.commentsLog));
    }

    addCommentToLog(screenName, screenPath, comment) {
        const logEntry = {
            id: Date.now().toString(),
            screenName,
            screenPath,
            comment,
            timestamp: new Date().toISOString(),
            formattedTime: new Date().toLocaleString()
        };
        
        this.commentsLog.push(logEntry);
        this.saveCommentsLog();
        
        this.showToast(`Comment logged for ${screenName}`);
        return logEntry;
    }

    exportLog(format = 'json') {
        if (this.commentsLog.length === 0) {
            this.showToast('No comments to export');
            return;
        }
        
        let data;
        let filename;
        let mimeType;
        
        if (format === 'json') {
            data = JSON.stringify(this.commentsLog, null, 2);
            filename = `mindbuddy-comments-log-${new Date().toISOString().split('T')[0]}.json`;
            mimeType = 'application/json';
        } else if (format === 'csv') {
            const headers = ['Screen Name', 'Screen Path', 'Comment', 'Timestamp'];
            const rows = this.commentsLog.map(entry => [
                entry.screenName,
                entry.screenPath,
                `"${entry.comment.replace(/"/g, '""')}"`,
                entry.formattedTime
            ]);
            data = [headers, ...rows].map(row => row.join(',')).join('\n');
            filename = `mindbuddy-comments-log-${new Date().toISOString().split('T')[0]}.csv`;
            mimeType = 'text/csv';
        } else if (format === 'txt') {
            data = this.commentsLog.map(entry => 
                `[${entry.formattedTime}] ${entry.screenName}\nPath: ${entry.screenPath}\nComment: ${entry.comment}\n${'─'.repeat(50)}`
            ).join('\n\n');
            filename = `mindbuddy-comments-log-${new Date().toISOString().split('T')[0]}.txt`;
            mimeType = 'text/plain';
        }
        
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast(`Log exported as ${format.toUpperCase()} (${this.commentsLog.length} comments)`);
    }

    clearLog() {
        if (confirm('Are you sure you want to clear all logged comments?')) {
            this.commentsLog = [];
            this.saveCommentsLog();
            this.showToast('Comments log cleared');
        }
    }

    addCommentSection(container) {
        const screenInfo = container.querySelector('.screen-info');
        if (!screenInfo) return;
        
        const screenName = screenInfo.querySelector('.screen-name').textContent;
        const screenPath = screenInfo.querySelector('.screen-path').textContent;
        
        // Add comment section
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        commentSection.innerHTML = `
            <input 
                type="text" 
                class="comment-input" 
                placeholder="Add comment for ${screenName}..."
                data-screen-name="${screenName}"
                data-screen-path="${screenPath}"
            >
            <button class="comment-send-btn">Send</button>
        `;
        
        container.querySelector('.screen-frame').appendChild(commentSection);
        container.querySelector('.screen-frame').classList.add('has-comment');
        
        // Add event listeners
        const input = commentSection.querySelector('.comment-input');
        const sendBtn = commentSection.querySelector('.comment-send-btn');
        
        const sendComment = () => {
            const comment = input.value.trim();
            if (comment) {
                this.addCommentToLog(screenName, screenPath, comment);
                input.value = '';
                input.blur();
            }
        };
        
        sendBtn.onclick = sendComment;
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendComment();
            }
        });
    }

    addExportControls() {
        const viewOptions = document.querySelector('.view-options');
        if (viewOptions) {
            const exportControls = document.createElement('div');
            exportControls.className = 'export-controls';
            exportControls.innerHTML = `
                <div class="log-info">
                    <span class="log-count">${this.commentsLog.length} comments logged</span>
                </div>
                <div class="export-buttons">
                    <button class="export-btn" title="Export as JSON" data-format="json">
                        📄 JSON
                    </button>
                    <button class="export-btn" title="Export as CSV" data-format="csv">
                        📊 CSV
                    </button>
                    <button class="export-btn" title="Export as TXT" data-format="txt">
                        📝 TXT
                    </button>
                    <button class="export-btn clear-btn" title="Clear all comments">
                        🗑️ Clear
                    </button>
                </div>
            `;
            
            viewOptions.insertAdjacentElement('afterbegin', exportControls);
            
            // Add event listeners
            exportControls.addEventListener('click', (e) => {
                if (e.target.classList.contains('export-btn')) {
                    const format = e.target.dataset.format;
                    if (format) {
                        this.exportLog(format);
                    } else if (e.target.classList.contains('clear-btn')) {
                        this.clearLog();
                        this.updateLogCount();
                    }
                }
            });
        }
    }

    updateLogCount() {
        const logCount = document.querySelector('.log-count');
        if (logCount) {
            logCount.textContent = `${this.commentsLog.length} comments logged`;
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'comment-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    init() {
        // Add export controls
        this.addExportControls();
        
        // Watch for screens to be added
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('screen-container')) {
                        this.addCommentSection(node);
                    }
                });
            });
        });
        
        // Start observing
        const grids = document.querySelectorAll('.screens-grid');
        grids.forEach(grid => {
            observer.observe(grid, { childList: true });
        });
        
        // Add to existing screens
        setTimeout(() => {
            const containers = document.querySelectorAll('.screen-container');
            containers.forEach(container => {
                if (!container.querySelector('.comment-section')) {
                    this.addCommentSection(container);
                }
            });
        }, 100);
        
        // Update count after any action
        setInterval(() => {
            this.updateLogCount();
        }, 1000);
    }
}

// Initialize when authenticated
document.addEventListener('DOMContentLoaded', () => {
    const checkAuth = setInterval(() => {
        if (window.authManager && window.authManager.authenticated) {
            clearInterval(checkAuth);
            window.simpleCommentsManager = new SimpleCommentsManager();
            
            // Wait for screens to be loaded
            window.addEventListener('screensLoaded', () => {
                window.simpleCommentsManager.init();
            });
            
            // Also initialize if screens are already loaded
            if (document.querySelector('.screen-container')) {
                window.simpleCommentsManager.init();
            }
        }
    }, 100);
});