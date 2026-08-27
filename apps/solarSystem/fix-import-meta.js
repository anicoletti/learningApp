const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('import.meta')) {
      content = content.replace(/import\.meta/g, '({env:{MODE:"production"}} /* removed import.meta */)');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed import.meta in', filePath);
    }
  }
}

function findAndReplaceInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findAndReplaceInDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.mjs')) {
      replaceInFile(fullPath);
    }
  }
}

console.log('Running postinstall fix for import.meta...');
findAndReplaceInDir(path.resolve(__dirname, 'node_modules/zustand'));
findAndReplaceInDir(path.resolve(__dirname, 'node_modules/three'));
// Also check the root node_modules if hoisted
findAndReplaceInDir(path.resolve(__dirname, '../../node_modules/zustand'));
findAndReplaceInDir(path.resolve(__dirname, '../../node_modules/three'));
