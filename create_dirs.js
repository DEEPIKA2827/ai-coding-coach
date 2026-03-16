#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const basePath = 'c:\\Users\\Deepika\\ai_coding\\backend';
const directories = [
  path.join(basePath, 'src'),
  path.join(basePath, 'src', 'routes'),
  path.join(basePath, 'src', 'controllers'),
  path.join(basePath, 'src', 'services'),
  path.join(basePath, 'src', 'models'),
  path.join(basePath, 'src', 'middleware'),
  path.join(basePath, 'src', 'config')
];

console.log('Creating directory structure...\n');

let success = true;

for (const dir of directories) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Created: ${dir}`);
    } else {
      console.log(`✓ Already exists: ${dir}`);
    }
  } catch (error) {
    console.error(`✗ Failed to create ${dir}: ${error.message}`);
    success = false;
  }
}

if (success) {
  console.log('\n✓ All directories created successfully!\n');
  console.log('--- Directory Tree ---\n');
  
  const printTree = (dir, prefix = '') => {
    try {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      files.forEach((file, index) => {
        const isLast = index === files.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        console.log(prefix + connector + file.name);
        
        if (file.isDirectory()) {
          const extension = isLast ? '    ' : '│   ';
          printTree(path.join(dir, file.name), prefix + extension);
        }
      });
    } catch (error) {
      console.error(`Error reading directory ${dir}: ${error.message}`);
    }
  };
  
  console.log(basePath + '/');
  printTree(basePath);
} else {
  process.exit(1);
}
