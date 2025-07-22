#!/bin/bash

# Create a temporary directory for the export
EXPORT_DIR="mindbuddy-html-export"
ZIP_NAME="mindbuddy-html-wireframes-$(date +%Y-%m-%d).zip"

# Remove existing export directory if it exists
rm -rf $EXPORT_DIR

# Create the export directory structure
mkdir -p $EXPORT_DIR/auth
mkdir -p $EXPORT_DIR/dashboard
mkdir -p $EXPORT_DIR/health
mkdir -p $EXPORT_DIR/rewards
mkdir -p $EXPORT_DIR/profile
mkdir -p $EXPORT_DIR/errors
mkdir -p $EXPORT_DIR/legal
mkdir -p $EXPORT_DIR/insights
mkdir -p $EXPORT_DIR/styles

# Copy all HTML files
echo "Copying HTML files..."

# Auth files
cp v1/screens/auth/*.html $EXPORT_DIR/auth/ 2>/dev/null

# Dashboard files
cp v1/screens/dashboard/*.html $EXPORT_DIR/dashboard/ 2>/dev/null

# Health files
cp v1/screens/health/*.html $EXPORT_DIR/health/ 2>/dev/null

# Rewards files
cp v1/screens/rewards/*.html $EXPORT_DIR/rewards/ 2>/dev/null

# Profile files
cp v1/screens/profile/*.html $EXPORT_DIR/profile/ 2>/dev/null

# Error files
cp v1/screens/errors/*.html $EXPORT_DIR/errors/ 2>/dev/null

# Legal files
cp v1/screens/legal/*.html $EXPORT_DIR/legal/ 2>/dev/null

# Insights files
cp v1/screens/insights/*.html $EXPORT_DIR/insights/ 2>/dev/null

# Copy base.css
cp v1/styles/base.css $EXPORT_DIR/styles/ 2>/dev/null

# Create README
cat > $EXPORT_DIR/README.txt << 'EOF'
MindBuddy HTML Wireframes Export

These HTML files are the source wireframes for the MindBuddy application.
Each file is a complete HTML page with embedded CSS styling.

To view:
1. Open any HTML file in a web browser
2. Set viewport to 393x852px (iPhone 14)
3. The files reference '../styles/base.css' for common styles

Categories included:
- auth/ (11 files) - Onboarding & Authentication
- dashboard/ (4 files) - Dashboard screens
- health/ (6 files) - Health data screens
- rewards/ (5 files) - Rewards screens
- profile/ (9 files) - Profile & settings
- errors/ (5 files) - Error states
- legal/ (3 files) - Legal documents
- insights/ (1 file) - Insights screen

Total: 44 HTML files

These files can be:
- Opened directly in browser
- Imported to Figma using HTML to Figma plugins
- Used as reference for design implementation

Design specifications:
- Device: iPhone 14 (393x852px)
- Font: Inter
- Background: #F8F9FA
- Primary color: #000000
EOF

# Count files
echo "Files copied:"
echo "Auth: $(ls -1 $EXPORT_DIR/auth/*.html 2>/dev/null | wc -l) files"
echo "Dashboard: $(ls -1 $EXPORT_DIR/dashboard/*.html 2>/dev/null | wc -l) files"
echo "Health: $(ls -1 $EXPORT_DIR/health/*.html 2>/dev/null | wc -l) files"
echo "Rewards: $(ls -1 $EXPORT_DIR/rewards/*.html 2>/dev/null | wc -l) files"
echo "Profile: $(ls -1 $EXPORT_DIR/profile/*.html 2>/dev/null | wc -l) files"
echo "Errors: $(ls -1 $EXPORT_DIR/errors/*.html 2>/dev/null | wc -l) files"
echo "Legal: $(ls -1 $EXPORT_DIR/legal/*.html 2>/dev/null | wc -l) files"
echo "Insights: $(ls -1 $EXPORT_DIR/insights/*.html 2>/dev/null | wc -l) files"

# Create ZIP file
echo "Creating ZIP file..."
zip -r "$ZIP_NAME" $EXPORT_DIR

echo "Done! Created: $ZIP_NAME"

# Clean up
rm -rf $EXPORT_DIR