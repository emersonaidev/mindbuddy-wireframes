/**
 * Agent Sidebar JavaScript
 * Handles sidebar interactions and change request functionality
 */

class AgentSidebar {
    constructor() {
        this.selectedWireframe = null;
        this.init();
    }

    init() {
        // Wait for DOM and auth
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Chat input and send button
        const chatInput = document.getElementById('chat-input') || document.getElementById('chatInput');
        const sendBtn = document.getElementById('send-btn') || document.querySelector('.send-btn');
        const clearBtn = document.getElementById('clear-btn') || document.querySelector('.clear-btn');

        if (chatInput && sendBtn) {
            // Send on button click
            sendBtn.addEventListener('click', () => this.sendChangeRequest());
            
            // Send on Enter (but not Shift+Enter)
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendChangeRequest();
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearHistory());
        }
    }

    setSelectedWireframe(name, path) {
        this.selectedWireframe = { name, path };
        
        // Update sidebar display
        const selectedNameEl = document.getElementById('sidebar-selected-name') || document.querySelector('.selected-screen-name');
        if (selectedNameEl) {
            selectedNameEl.textContent = name;
        }

        // Enable input
        const chatInput = document.getElementById('chat-input') || document.getElementById('chatInput');
        const sendBtn = document.getElementById('send-btn') || document.querySelector('.send-btn');
        
        if (chatInput) {
            chatInput.disabled = false;
            chatInput.placeholder = `Describe changes needed for ${name}...`;
        }
        
        if (sendBtn) {
            sendBtn.disabled = false;
        }
    }

    sendChangeRequest() {
        const chatInput = document.getElementById('chat-input') || document.getElementById('chatInput');
        if (!chatInput || !this.selectedWireframe) return;

        const message = chatInput.value.trim();
        if (!message) return;

        // Add to comments log
        if (window.professionalCommentsManager) {
            const result = window.professionalCommentsManager.addCommentToLog(
                this.selectedWireframe.name,
                this.selectedWireframe.path,
                message
            );
            
            if (result) {
                // Clear input
                chatInput.value = '';
                
                // Update display
                this.displayChangeRequest(result);
            }
        }
    }

    displayChangeRequest(request) {
        const chatHistory = document.getElementById('chat-history') || document.getElementById('chatHistory');
        if (!chatHistory) return;

        // Remove welcome message if exists
        const welcome = chatHistory.querySelector('.chat-welcome');
        if (welcome) welcome.remove();

        // Check if we need to add header
        if (!chatHistory.querySelector('.change-requests-header')) {
            const header = document.createElement('div');
            header.className = 'change-requests-header';
            header.innerHTML = '<h4>Change Requests</h4>';
            chatHistory.insertBefore(header, chatHistory.firstChild);
        }

        // Create change request item
        const requestItem = document.createElement('div');
        requestItem.className = 'change-request-item';
        requestItem.dataset.commentId = request.id;
        requestItem.innerHTML = `
            <div class="request-header">
                <span class="request-number">#${chatHistory.querySelectorAll('.change-request-item').length + 1}</span>
                <span class="request-time">${new Date().toLocaleTimeString()}</span>
                <button class="delete-comment-btn" onclick="window.agentSidebar.deleteComment('${request.id}')" title="Delete comment">×</button>
            </div>
            <div class="request-content">${this.escapeHtml(request.comment)}</div>
        `;

        // Insert after header
        const header = chatHistory.querySelector('.change-requests-header');
        if (header && header.nextSibling) {
            chatHistory.insertBefore(requestItem, header.nextSibling);
        } else {
            chatHistory.appendChild(requestItem);
        }

        // Scroll to top to show new request
        chatHistory.scrollTop = 0;
    }

    clearHistory() {
        const chatHistory = document.getElementById('chat-history') || document.getElementById('chatHistory');
        if (!chatHistory) return;

        // Clear display but keep welcome message structure
        chatHistory.innerHTML = `
            <div class="chat-welcome">
                <p>👋 Welcome!</p>
                <p style="color: #ccc;">Single click to add change requests. Double click for focus mode.</p>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    deleteComment(commentId) {
        if (!window.professionalCommentsManager || !confirm('Are you sure you want to delete this comment?')) return;
        
        // Remove from comments log
        const index = window.professionalCommentsManager.commentsLog.findIndex(c => c.id === commentId);
        if (index > -1) {
            window.professionalCommentsManager.commentsLog.splice(index, 1);
            window.professionalCommentsManager.saveCommentsLog();
            
            // Reload the display
            this.loadChangeRequests();
            
            // Update UI
            window.professionalCommentsManager.updateUI();
        }
    }

    loadChangeRequests() {
        if (!window.professionalCommentsManager || !this.selectedWireframe) return;
        
        const chatHistory = document.getElementById('chat-history') || document.getElementById('chatHistory');
        if (!chatHistory) return;

        // Get comments for this wireframe
        const wireframeComments = window.professionalCommentsManager.commentsLog.filter(
            comment => comment.screenName === this.selectedWireframe.name
        );

        // Always clear the history first
        chatHistory.innerHTML = '';

        if (wireframeComments.length > 0) {
            // Add header
            chatHistory.innerHTML = `<div class="change-requests-header"><h4>Change Requests</h4></div>`;
            
            // Add each comment
            wireframeComments.forEach((comment, index) => {
                const requestItem = document.createElement('div');
                requestItem.className = 'change-request-item';
                requestItem.dataset.commentId = comment.id;
                requestItem.innerHTML = `
                    <div class="request-header">
                        <span class="request-number">#${index + 1}</span>
                        <span class="request-time">${new Date(comment.timestamp).toLocaleTimeString()}</span>
                        <button class="delete-comment-btn" onclick="window.agentSidebar.deleteComment('${comment.id}')" title="Delete comment">×</button>
                    </div>
                    <div class="request-content">${this.escapeHtml(comment.comment)}</div>
                `;
                chatHistory.appendChild(requestItem);
            });
        } else {
            // Show welcome message if no comments
            chatHistory.innerHTML = `
                <div class="chat-welcome">
                    <p>👋 Welcome!</p>
                    <p style="color: #ccc;">Single click to add change requests. Double click for focus mode.</p>
                </div>
            `;
        }
    }
}

// Initialize sidebar
window.agentSidebar = new AgentSidebar();