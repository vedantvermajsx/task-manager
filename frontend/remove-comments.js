
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function removeCommentsFromFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/(?<!:)\/\/.*$/gm, '');
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Cleaned:', filePath);
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            removeCommentsFromFile(fullPath);
        }
    }
}

processDirectory(srcDir);
console.log('Done removing all comments!');
