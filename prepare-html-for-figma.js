#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Define screens structure
const screens = {
    'onboarding': [
        { name: 'Welcome', path: 'v1/screens/auth/welcome.html' },
        { name: 'How It Works', path: 'v1/screens/auth/how-it-works.html' },
        { name: 'Choose Data', path: 'v1/screens/auth/choose-data.html' },
        { name: 'Connect Data', path: 'v1/screens/auth/connect-data.html' },
        { name: 'Success', path: 'v1/screens/auth/success.html' }
    ],
    'authentication': [
        { name: 'Login', path: 'v1/screens/auth/login.html' },
        { name: 'Create Account', path: 'v1/screens/auth/create-account.html' },
        { name: 'Email Verification', path: 'v1/screens/auth/email-verification.html' },
        { name: 'Forgot Password', path: 'v1/screens/auth/forgot-password.html' },
        { name: 'SSO Apple', path: 'v1/screens/auth/sso-apple.html' },
        { name: 'SSO Google', path: 'v1/screens/auth/sso-google.html' }
    ],
    'dashboard': [
        { name: 'Dashboard', path: 'v1/screens/dashboard/main.html' },
        { name: 'Insights', path: 'v1/screens/insights/main.html' }
    ],
    'health': [
        { name: 'Health Overview', path: 'v1/screens/health/main.html' },
        { name: 'Resilience Score', path: 'v1/screens/health/resilience-score.html' },
        { name: 'Heart Rate Detail', path: 'v1/screens/health/heart-rate-detail.html' },
        { name: 'HRV Detail', path: 'v1/screens/health/hrv-detail.html' },
        { name: 'Sleep Detail', path: 'v1/screens/health/sleep-detail.html' },
        { name: 'Activity Detail', path: 'v1/screens/health/activity-detail.html' }
    ],
    'rewards': [
        { name: 'Rewards Hub', path: 'v1/screens/rewards/main.html' },
        { name: 'Earn More', path: 'v1/screens/rewards/earn-more.html' },
        { name: 'Exchange', path: 'v1/screens/rewards/exchange.html' },
        { name: 'Withdraw', path: 'v1/screens/rewards/withdraw.html' },
        { name: 'History', path: 'v1/screens/rewards/history.html' }
    ],
    'profile': [
        { name: 'Profile', path: 'v1/screens/profile/main.html' },
        { name: 'Personal Info', path: 'v1/screens/profile/personal-info.html' },
        { name: 'Security', path: 'v1/screens/profile/security.html' },
        { name: 'Notifications', path: 'v1/screens/profile/notifications.html' },
        { name: 'Data Permissions', path: 'v1/screens/profile/data-permissions.html' },
        { name: 'Data Reputation Score', path: 'v1/screens/profile/data-reputation-score.html' },
        { name: 'Connected Devices', path: 'v1/screens/profile/connected-devices.html' },
        { name: 'Wallet Connection', path: 'v1/screens/profile/wallet-connection.html' },
        { name: 'Subscription', path: 'v1/screens/profile/subscription.html' },
        { name: 'Help Center', path: 'v1/screens/profile/help-center.html' }
    ],
    'errors': [
        { name: 'Empty State', path: 'v1/screens/errors/empty-state.html' },
        { name: 'Generic Error', path: 'v1/screens/errors/generic-error.html' },
        { name: 'Network Error', path: 'v1/screens/errors/network-error.html' },
        { name: 'Permission Denied', path: 'v1/screens/errors/permission-denied.html' },
        { name: 'Loading', path: 'v1/screens/errors/loading.html' }
    ],
    'legal': [
        { name: 'Terms & Conditions', path: 'v1/screens/legal/terms.html' },
        { name: 'Privacy Policy', path: 'v1/screens/legal/privacy.html' },
        { name: 'Security & Compliance', path: 'v1/screens/legal/security-compliance.html' }
    ]
};

// Load base CSS
const baseCSS = fs.readFileSync('v1/styles/base.css', 'utf8');

// Extract CSS variables
const cssVariables = baseCSS.match(/:root\s*{[^}]+}/s)?.[0] || '';

// Clean and prepare HTML for Figma
function prepareHTMLForFigma(htmlPath, screenName) {
    try {
        const html = fs.readFileSync(htmlPath, 'utf8');
        const dom = new JSDOM(html);
        const document = dom.window.document;
        
        // Get inline styles
        const styleElements = document.querySelectorAll('style');
        let inlineStyles = '';
        styleElements.forEach(style => {
            inlineStyles += style.textContent + '\n';
        });
        
        // Get body content
        const bodyContent = document.body.innerHTML;
        
        // Create clean HTML with all styles inline
        const cleanHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=393, initial-scale=1.0">
    <title>${screenName} - MindBuddy</title>
    <style>
        /* CSS Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        /* CSS Variables */
        ${cssVariables}
        
        /* Base Styles */
        ${baseCSS}
        
        /* Screen Specific Styles */
        ${inlineStyles}
        
        /* Container for Figma */
        body {
            width: 393px;
            height: 852px;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
            background: #FFFFFF;
        }
    </style>
</head>
<body>
    ${bodyContent}
</body>
</html>`;
        
        return cleanHTML;
    } catch (error) {
        console.error(`Error processing ${htmlPath}:`, error.message);
        return null;
    }
}

// Create output directories
function createDirectories() {
    const baseDir = 'html-snippets';
    
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }
    
    Object.keys(screens).forEach(category => {
        const categoryDir = path.join(baseDir, category);
        if (!fs.existsSync(categoryDir)) {
            fs.mkdirSync(categoryDir);
        }
    });
}

// Process all screens
function processAllScreens() {
    createDirectories();
    
    let totalProcessed = 0;
    let totalFailed = 0;
    
    console.log('Preparing HTML files for Figma import...\n');
    
    Object.entries(screens).forEach(([category, screenList]) => {
        console.log(`Processing ${category}...`);
        
        screenList.forEach(screen => {
            const cleanHTML = prepareHTMLForFigma(screen.path, screen.name);
            
            if (cleanHTML) {
                const filename = screen.name.toLowerCase().replace(/\s+/g, '-') + '.html';
                const outputPath = path.join('html-snippets', category, filename);
                
                fs.writeFileSync(outputPath, cleanHTML);
                console.log(`  ✓ ${screen.name} -> ${filename}`);
                totalProcessed++;
            } else {
                console.log(`  ✗ ${screen.name} (failed)`);
                totalFailed++;
            }
        });
    });
    
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Processing complete!`);
    console.log(`Total processed: ${totalProcessed}`);
    console.log(`Total failed: ${totalFailed}`);
    console.log(`\nHTML snippets saved in: ${path.resolve('html-snippets')}`);
    
    // Create index file
    createIndexFile();
}

// Create an index HTML file with all screens
function createIndexFile() {
    const indexContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>MindBuddy Screens - Figma Import Index</title>
    <style>
        body {
            font-family: -apple-system, sans-serif;
            padding: 40px;
            background: #f5f5f5;
        }
        h1 { margin-bottom: 20px; }
        .category {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .category h2 {
            margin-bottom: 10px;
            color: #333;
        }
        .screen-list {
            list-style: none;
        }
        .screen-list li {
            margin: 8px 0;
        }
        .screen-list a {
            color: #007AFF;
            text-decoration: none;
        }
        .screen-list a:hover {
            text-decoration: underline;
        }
        .instructions {
            background: #e8f4ff;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <h1>MindBuddy Screens - Ready for Figma Import</h1>
    
    <div class="instructions">
        <h3>How to import to Figma:</h3>
        <ol>
            <li>Install "html.to.design" plugin in Figma</li>
            <li>Click on any screen below to open it</li>
            <li>Select all (Cmd+A) and copy the HTML</li>
            <li>Paste into the plugin</li>
            <li>Click "Import to Figma"</li>
        </ol>
    </div>
    
    ${Object.entries(screens).map(([category, screenList]) => `
    <div class="category">
        <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <ul class="screen-list">
            ${screenList.map(screen => {
                const filename = screen.name.toLowerCase().replace(/\s+/g, '-') + '.html';
                return `<li><a href="${category}/${filename}" target="_blank">${screen.name}</a></li>`;
            }).join('\n            ')}
        </ul>
    </div>
    `).join('\n    ')}
</body>
</html>`;
    
    fs.writeFileSync('html-snippets/index.html', indexContent);
    console.log('\nCreated index.html for easy navigation');
}

// Check if jsdom is installed
try {
    require('jsdom');
} catch (e) {
    console.error('Error: jsdom is required. Install with: npm install jsdom');
    process.exit(1);
}

// Run the script
processAllScreens();