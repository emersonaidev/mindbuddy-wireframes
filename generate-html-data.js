// Node.js script to generate a JavaScript file with all HTML content embedded
const fs = require('fs');
const path = require('path');

// Output file
let output = 'const htmlFiles = {\n';

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

// Process each directory
directories.forEach(dir => {
    const dirPath = path.join(__dirname, 'v1/screens', dir);
    
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));
        
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Escape the content for JavaScript
            const escapedContent = content
                .replace(/\\/g, '\\\\')
                .replace(/`/g, '\\`')
                .replace(/\$/g, '\\$');
            
            // Add to output
            output += `    '${dir}/${file}': \`${escapedContent}\`,\n`;
            
            console.log(`Processed: ${dir}/${file}`);
        });
    }
});

// Add base.css
const baseCssPath = path.join(__dirname, 'v1/styles/base.css');
if (fs.existsSync(baseCssPath)) {
    const cssContent = fs.readFileSync(baseCssPath, 'utf8');
    const escapedCss = cssContent
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');
    
    output += `    'styles/base.css': \`${escapedCss}\`\n`;
}

output += '};\n\n';
output += 'window.htmlFilesData = htmlFiles;\n';

// Write to file
fs.writeFileSync('html-files-data.js', output);
console.log('\nGenerated html-files-data.js with all HTML content embedded');
console.log('Include this file in your index.html to make export work');