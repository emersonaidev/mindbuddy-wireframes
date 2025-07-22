# Updated HTML Snippets for MindBuddy Wireframes

## Key Changes Made

### 1. Authentication System
- Removed Firebase/Gmail authentication
- Restored password-based authentication (password: MindBuddy2024!)

### 2. New Dashboard Screens
- Created **Resilience Score** page in Dashboard folder
- Created **Data Reputation Score** page in Dashboard folder

### 3. Updated Dashboard Design
- Background: #F8F9FA
- Cards: White with subtle shadows
- Font: Inter
- Circular progress rings for scores

### 4. Updated $MNDY Tokens Page
- Token earnings history with day-by-day breakdown
- Token utility section

### 5. All Screens Layout
- Maintains original grid structure
- Subtle dividers between categories with labels

## Updated HTML Snippets

### Dashboard Main Page
```html
<div class="dashboard-container">
    <h1 class="dashboard-title">Dashboard</h1>
    <div class="cards-container">
        <div class="card resilience-card">
            <h2 class="card-title">Resilience Score</h2>
            <p class="card-subtitle">Overall physical readiness</p>
            <div class="circular-progress-small">
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#E0E0E0" stroke-width="8" fill="none"></circle>
                    <circle cx="50" cy="50" r="40" stroke="#666" stroke-width="8" fill="none" 
                            stroke-dasharray="251.2" stroke-dashoffset="69.84" stroke-linecap="round"></circle>
                </svg>
                <span class="progress-value">72</span>
            </div>
            <p class="card-description">High</p>
        </div>
        
        <div class="card reputation-card">
            <h2 class="card-title">Data Reputation Score</h2>
            <p class="card-subtitle">Data sharing consistency</p>
            <div class="circular-progress-small">
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#E0E0E0" stroke-width="8" fill="none"></circle>
                    <circle cx="50" cy="50" r="40" stroke="#666" stroke-width="8" fill="none" 
                            stroke-dasharray="251.2" stroke-dashoffset="45.22" stroke-linecap="round"></circle>
                </svg>
                <span class="progress-value">82%</span>
            </div>
            <p class="card-description">Excellent</p>
        </div>
    </div>
</div>
```

### Resilience Score Page (Dashboard)
```html
<div class="resilience-container">
    <div class="nav-header">
        <a href="#" class="nav-back">
            <span class="back-arrow">←</span>
            <span>Back</span>
        </a>
    </div>
    
    <div class="header-title">
        <h1 class="page-title">Resilience Score</h1>
    </div>
    
    <div class="content">
        <div class="score-display">
            <div class="score-ring-container">
                <svg class="score-ring" viewBox="0 0 120 120">
                    <circle class="ring-background" cx="60" cy="60" r="50"></circle>
                    <circle class="ring-progress" cx="60" cy="60" r="50"></circle>
                </svg>
                <div class="score-text">
                    <span class="score-number">72</span>
                    <div class="score-label">Today's Score</div>
                </div>
            </div>
            <div class="score-status">High</div>
        </div>
        
        <div class="explanation-card">
            <h2 class="card-title">What does this mean?</h2>
            <p class="card-description">
                Your Resilience Score combines your data to show how stressed your body is.
            </p>
            
            <div class="columns-container">
                <div class="column">
                    <div class="column-header">
                        <span class="arrow">↑</span>
                        <span class="column-title">High Score</span>
                    </div>
                    <p class="column-text">
                        Your nervous system is doing well, so it's a good time for intense workouts or pushing yourself a little further.
                    </p>
                </div>
                
                <div class="column">
                    <div class="column-header">
                        <span class="arrow">↓</span>
                        <span class="column-title">Low Score</span>
                    </div>
                    <p class="column-text">
                        Your system is under pressure. Give your body time to recover by focusing on rest, sleep, gentle movement, and activities that make you feel good.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Data Reputation Score Page (Dashboard)
```html
<div class="reputation-container">
    <div class="nav-header">
        <a href="#" class="nav-back">
            <span class="back-arrow">←</span>
            <span>Back</span>
        </a>
    </div>
    
    <div class="title-section">
        <h1 class="page-title">Data Reputation Score</h1>
    </div>
    
    <div class="content">
        <div class="score-card">
            <div class="score-ring-container">
                <svg class="score-ring" viewBox="0 0 120 120">
                    <circle class="ring-background" cx="60" cy="60" r="50"></circle>
                    <circle class="ring-progress" cx="60" cy="60" r="50"></circle>
                </svg>
                <div class="score-text">
                    <span class="score-percentage">82%</span>
                    <div class="score-label">Your current score</div>
                </div>
            </div>
            
            <div class="rating-bar-container">
                <div class="rating-bar">
                    <div class="rating-fill"></div>
                </div>
                <div class="rating-labels">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Excellent</span>
                </div>
                <div class="score-range">Score range: 0–100</div>
            </div>
        </div>
        
        <div class="explanation-card">
            <h2 class="card-title">What does this mean?</h2>
            <p class="card-text">
                This score shows how reliable and consistent your shared data is. It's based on how often you contribute and the types of data you share. A higher score means your data is more valuable for us and may help you earn more $MNDY.
            </p>
        </div>
        
        <div class="guidance-card">
            <h2 class="card-title">How to improve your score</h2>
            <ul class="bullet-list">
                <li class="bullet-item">Share data consistently</li>
                <li class="bullet-item">Enable more data types (e.g. HRV, sleep, activity)</li>
                <li class="bullet-item">Avoid gaps or missing signals</li>
            </ul>
        </div>
    </div>
</div>
```

### $MNDY Tokens Page
```html
<div class="rewards-container">
    <div class="nav-header">
        <a href="#" class="nav-back">
            <span class="back-arrow">←</span>
            <span>Back</span>
        </a>
    </div>
    
    <div class="title-section">
        <h1 class="page-title">$MNDY Tokens</h1>
    </div>
    
    <div class="content">
        <div class="earnings-card">
            <h2 class="card-title">Token Earnings History</h2>
            <p class="card-subtitle">Your recent activity</p>
            
            <div class="day-section">
                <div class="day-header">
                    <span class="day-label">Today</span>
                    <span class="day-total">+7 $MNDY</span>
                </div>
                <div class="activities-grid">
                    <span class="activity-label">Sleep</span>
                    <span class="activity-value">+3</span>
                    <span class="activity-label">HRV</span>
                    <span class="activity-value">+4</span>
                </div>
            </div>
            
            <!-- Additional days... -->
        </div>
        
        <div class="utility-section">
            <h2 class="utility-title">What can I use $MNDY for?</h2>
            <p class="utility-subtitle">Token utility</p>
            
            <ul class="utility-list">
                <li class="utility-item">
                    <div class="utility-header">Unlock future premium features</div>
                    <p class="utility-subtext">Access advanced analytics and exclusive wellness tools (coming soon)</p>
                </li>
                <li class="utility-item">
                    <div class="utility-header">Exchange on supported platforms</div>
                    <p class="utility-subtext">Trade your tokens on decentralised exchanges and supported platforms</p>
                </li>
            </ul>
        </div>
    </div>
</div>
```

### All Screens Category Divider
```html
<div class="category-simple-divider">
    <span>Authentication</span>
</div>
```

## CSS Key Styles

### Global Styles
```css
body {
    background-color: #F8F9FA;
}

font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Card Styles
```css
.card {
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
    padding: 20px;
}
```

### Circular Progress
```css
.circular-progress-small {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 16px auto;
}

.ring-progress {
    stroke-dasharray: 314; /* Full circumference */
    stroke-dashoffset: 56.52; /* 82% = 18% offset */
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;
}
```

### Category Dividers
```css
.category-simple-divider {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    margin: 32px 0;
    position: relative;
}

.category-simple-divider::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: #333;
    opacity: 0.15;
}

.category-simple-divider span {
    background: #fafafa;
    padding: 0 16px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #666;
    position: relative;
    z-index: 1;
}
```

## Summary of Updates

1. **46 total screens** (was 44)
2. **Dashboard section: 5 screens** (was 3)
   - Dashboard (main)
   - Resilience Score (NEW)
   - Data Reputation Score (NEW)
   - $MNDY Tokens
   - Profile

3. **All changes aligned with partner feedback**
4. **Consistent design language with Inter font and #F8F9FA background**
5. **Password authentication restored**