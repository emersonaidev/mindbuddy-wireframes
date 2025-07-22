# How to Make the 📦 Export Button Work

The export button needs a local server to work properly because browsers can't fetch local HTML files directly due to security restrictions.

## Quick Start

### Option 1: Using Node.js (Recommended)
```bash
# Run the server
node server.js

# Open in browser
# Go to: http://localhost:8080
```

### Option 2: Using Python
```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Open in browser
# Go to: http://localhost:8080
```

### Option 3: Using PHP
```bash
php -S localhost:8080
```

## How It Works

1. Start the server using one of the methods above
2. Open http://localhost:8080 in your browser
3. Login with password: `MindBuddy2024!`
4. Click the 📦 export button
5. The web app will create a ZIP file with all HTML files

## What You'll Get

When you click the 📦 button, the web app will:
- Create a ZIP file named `mindbuddy-html-wireframes-[date].zip`
- Include all 44 HTML files organized in folders
- Include the base.css file
- Include a README with instructions

## Troubleshooting

If the export doesn't work:
1. Make sure you're accessing via http://localhost:8080 (not file://)
2. Check the browser console for errors
3. Try a different browser
4. Use the manual export script: `./create-html-zip.sh`

## Alternative: Manual Export

If you can't run a server, use the provided script:
```bash
./create-html-zip.sh
```

This will create the same ZIP file without needing the web interface.