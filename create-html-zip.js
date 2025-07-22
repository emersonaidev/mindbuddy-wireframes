// Node.js script to create ZIP file with all HTML files
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create output stream
const output = fs.createWriteStream('mindbuddy-html-wireframes.zip');
const archive = archiver('zip', {
    zlib: { level: 9 }
});

// Listen for close event
output.on('close', function() {
    console.log(`ZIP file created: ${archive.pointer()} total bytes`);
    console.log('Archive has been finalized');
});

// Handle errors
archive.on('error', function(err) {
    throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add all HTML files from v1/screens directory
const screensDir = path.join(__dirname, 'v1/screens');

// Define all directories to include
const directories = [
    'auth',
    'dashboard', 
    'health',
    'rewards',
    'profile',
    'errors',
    'legal',
    'insights'
];

// Add each directory
directories.forEach(dir => {
    const dirPath = path.join(screensDir, dir);
    if (fs.existsSync(dirPath)) {
        archive.directory(dirPath, dir);
        console.log(`Added directory: ${dir}`);
    }
});

// Add base.css
const baseCssPath = path.join(__dirname, 'v1/styles/base.css');
if (fs.existsSync(baseCssPath)) {
    archive.file(baseCssPath, { name: 'styles/base.css' });
    console.log('Added base.css');
}

// Add README
const readme = `MindBuddy HTML Wireframes Export
Generated on: ${new Date().toLocaleString()}

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
- Primary color: #000000`;

archive.append(readme, { name: 'README.txt' });

// Finalize the archive
archive.finalize();