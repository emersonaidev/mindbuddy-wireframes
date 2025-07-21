// Commenting system for MindBuddy Wireframes
const COMMENTS_CONFIG = {
    storageKey: 'mindbuddy_comments',
    authorKey: 'mindbuddy_author'
};

class CommentsManager {
    constructor() {
        this.comments = this.loadComments();
        this.currentScreen = null;
        this.author = this.loadAuthor();
    }

    loadComments() {
        const stored = localStorage.getItem(COMMENTS_CONFIG.storageKey);
        return stored ? JSON.parse(stored) : {};
    }

    saveComments() {
        localStorage.setItem(COMMENTS_CONFIG.storageKey, JSON.stringify(this.comments));
    }

    loadAuthor() {
        return localStorage.getItem(COMMENTS_CONFIG.authorKey) || '';
    }

    saveAuthor(name) {
        this.author = name;
        localStorage.setItem(COMMENTS_CONFIG.authorKey, name);
    }

    addComment(screenPath, screenName, comment, author) {
        const id = this.generateCommentId(screenPath);
        if (!this.comments[id]) {
            this.comments[id] = [];
        }
        
        const commentData = {
            id: Date.now().toString(),
            screenPath,
            screenName,
            comment,
            author: author || 'Anonymous',
            timestamp: new Date().toISOString()
        };
        
        this.comments[id].push(commentData);
        this.saveComments();
        return commentData;
    }

    getComments(screenPath) {
        const id = this.generateCommentId(screenPath);
        return this.comments[id] || [];
    }

    deleteComment(screenPath, commentId) {
        const id = this.generateCommentId(screenPath);
        if (this.comments[id]) {
            this.comments[id] = this.comments[id].filter(c => c.id !== commentId);
            if (this.comments[id].length === 0) {
                delete this.comments[id];
            }
            this.saveComments();
        }
    }

    generateCommentId(screenPath) {
        return screenPath.replace(/[^a-zA-Z0-9]/g, '_');
    }

    exportComments(format = 'json') {
        const allComments = [];
        Object.values(this.comments).forEach(screenComments => {
            allComments.push(...screenComments);
        });
        
        // Sort by timestamp
        allComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        if (format === 'json') {
            return JSON.stringify(allComments, null, 2);
        } else if (format === 'csv') {
            const headers = ['Screen', 'Path', 'Comment', 'Author', 'Timestamp'];
            const rows = allComments.map(c => [
                c.screenName,
                c.screenPath,
                `"${c.comment.replace(/"/g, '""')}"`,
                c.author,
                new Date(c.timestamp).toLocaleString()
            ]);
            return [headers, ...rows].map(row => row.join(',')).join('\n');
        }
    }

    downloadComments(format = 'json') {
        const data = this.exportComments(format);
        const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mindbuddy-comments-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    createCommentModal(screenPath, screenName) {
        this.currentScreen = { path: screenPath, name: screenName };
        const existingComments = this.getComments(screenPath);
        
        const modal = document.createElement('div');
        modal.className = 'comment-modal';
        modal.innerHTML = `
            <div class="comment-overlay"></div>
            <div class="comment-container">
                <div class="comment-box">
                    <div class="comment-header">
                        <h3>Comments for ${screenName}</h3>
                        <button class="comment-close">&times;</button>
                    </div>
                    
                    <div class="comment-form">
                        <input 
                            type="text" 
                            id="comment-author" 
                            class="comment-author-input" 
                            placeholder="Your name (optional)"
                            value="${this.author}"
                        >
                        <textarea 
                            id="comment-text" 
                            class="comment-textarea" 
                            placeholder="Add your comment..."
                            rows="4"
                        ></textarea>
                        <button id="comment-submit" class="comment-submit">Add Comment</button>
                    </div>
                    
                    <div class="existing-comments">
                        <h4>Previous Comments (${existingComments.length})</h4>
                        <div class="comments-list">
                            ${existingComments.map(c => this.renderComment(c)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('.comment-close').onclick = () => modal.remove();
        modal.querySelector('.comment-overlay').onclick = () => modal.remove();
        
        const authorInput = modal.querySelector('#comment-author');
        const commentText = modal.querySelector('#comment-text');
        const submitBtn = modal.querySelector('#comment-submit');
        
        authorInput.addEventListener('change', () => {
            this.saveAuthor(authorInput.value);
        });
        
        submitBtn.onclick = () => {
            const comment = commentText.value.trim();
            if (comment) {
                const newComment = this.addComment(
                    screenPath, 
                    screenName, 
                    comment, 
                    authorInput.value.trim()
                );
                
                // Add to UI
                const commentsList = modal.querySelector('.comments-list');
                const newCommentHtml = this.renderComment(newComment);
                commentsList.insertAdjacentHTML('afterbegin', newCommentHtml);
                
                // Update count
                const count = this.getComments(screenPath).length;
                modal.querySelector('h4').textContent = `Previous Comments (${count})`;
                
                // Update badge
                this.updateCommentBadge(screenPath);
                
                // Clear form
                commentText.value = '';
                
                // Show success
                this.showToast('Comment added successfully!');
            }
        };
        
        // Add delete handlers
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('comment-delete')) {
                const commentId = e.target.dataset.commentId;
                this.deleteComment(screenPath, commentId);
                e.target.closest('.comment-item').remove();
                
                // Update count
                const count = this.getComments(screenPath).length;
                modal.querySelector('h4').textContent = `Previous Comments (${count})`;
                
                // Update badge
                this.updateCommentBadge(screenPath);
                
                this.showToast('Comment deleted');
            }
        });
        
        // Focus on textarea
        commentText.focus();
    }

    renderComment(comment) {
        const date = new Date(comment.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        
        return `
            <div class="comment-item" data-comment-id="${comment.id}">
                <div class="comment-meta">
                    <span class="comment-author-name">${comment.author}</span>
                    <span class="comment-date">${formattedDate}</span>
                    <button class="comment-delete" data-comment-id="${comment.id}">&times;</button>
                </div>
                <div class="comment-content">${this.escapeHtml(comment.comment)}</div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateCommentBadge(screenPath) {
        const count = this.getComments(screenPath).length;
        const screens = document.querySelectorAll('.screen-container');
        
        screens.forEach(container => {
            const iframe = container.querySelector('.screen-iframe');
            if (iframe && iframe.src.includes(screenPath)) {
                let badge = container.querySelector('.comment-badge');
                if (count > 0) {
                    if (!badge) {
                        badge = document.createElement('span');
                        badge.className = 'comment-badge';
                        container.querySelector('.comment-btn').appendChild(badge);
                    }
                    badge.textContent = count;
                } else if (badge) {
                    badge.remove();
                }
            }
        });
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

    addCommentButtons() {
        const screenContainers = document.querySelectorAll('.screen-container');
        
        screenContainers.forEach(container => {
            const screenInfo = container.querySelector('.screen-info');
            const screenName = screenInfo.querySelector('.screen-name').textContent;
            const screenPath = screenInfo.querySelector('.screen-path').textContent;
            
            // Add comment button
            const commentBtn = document.createElement('button');
            commentBtn.className = 'comment-btn';
            commentBtn.innerHTML = '💬';
            commentBtn.title = 'Add comment';
            commentBtn.onclick = () => this.createCommentModal(screenPath, screenName);
            
            container.appendChild(commentBtn);
            
            // Add badge if there are comments
            const count = this.getComments(screenPath).length;
            if (count > 0) {
                const badge = document.createElement('span');
                badge.className = 'comment-badge';
                badge.textContent = count;
                commentBtn.appendChild(badge);
            }
        });
    }

    addExportButton() {
        const viewOptions = document.querySelector('.view-options');
        if (viewOptions) {
            const exportContainer = document.createElement('div');
            exportContainer.className = 'export-container';
            exportContainer.innerHTML = `
                <button class="export-btn" title="Export all comments">
                    📥 Export
                </button>
                <div class="export-dropdown">
                    <button class="export-option" data-format="json">Export as JSON</button>
                    <button class="export-option" data-format="csv">Export as CSV</button>
                </div>
            `;
            
            viewOptions.insertAdjacentElement('afterbegin', exportContainer);
            
            const exportBtn = exportContainer.querySelector('.export-btn');
            const dropdown = exportContainer.querySelector('.export-dropdown');
            
            exportBtn.onclick = () => {
                dropdown.classList.toggle('show');
            };
            
            exportContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('export-option')) {
                    const format = e.target.dataset.format;
                    this.downloadComments(format);
                    dropdown.classList.remove('show');
                    this.showToast(`Comments exported as ${format.toUpperCase()}`);
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!exportContainer.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });
        }
    }

    init() {
        // Wait for screens to load
        setTimeout(() => {
            this.addCommentButtons();
            this.addExportButton();
        }, 1000);
    }
}

// Initialize comments when authenticated
document.addEventListener('DOMContentLoaded', () => {
    // Wait for authentication
    const checkAuth = setInterval(() => {
        if (window.authManager && window.authManager.authenticated) {
            clearInterval(checkAuth);
            window.commentsManager = new CommentsManager();
            window.commentsManager.init();
        }
    }, 100);
});