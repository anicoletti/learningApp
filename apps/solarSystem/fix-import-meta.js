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

function findPackagesAndReplace(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item === 'zustand' || item === 'three') {
        findAndReplaceInDir(fullPath);
      } else if (item === 'node_modules' || !item.startsWith('.')) {
        findPackagesAndReplace(fullPath);
      }
    }
  }
}

console.log('Running postinstall fix for import.meta...');
findPackagesAndReplace(path.resolve(__dirname, 'node_modules'));
findPackagesAndReplace(path.resolve(__dirname, '../../node_modules'));

