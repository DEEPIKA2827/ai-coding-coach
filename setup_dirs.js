const fs = require('fs');
const path = require('path');

// Define the directory structure
const basePath = 'c:\\Users\\Deepika\\ai_coding\\backend';
const dirs = [
  'src',
  'src\\routes',
  'src\\controllers',
  'src\\services',
  'src\\models',
  'src\\middleware',
  'src\\config'
];

// Create all directories
dirs.forEach(dir => {
  const fullPath = path.join(basePath, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${fullPath}`);
  } else {
    console.log(`✓ Already exists: ${fullPath}`);
  }
});

console.log('\n✓ Directory structure created successfully!\n');

// Display the directory tree
const { execSync } = require('child_process');
try {
  const output = execSync(`tree "${basePath}"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
  console.log(output);
} catch (e) {
  // If tree command fails, use dir instead
  console.log('Directory structure:');
  const listDirs = (dir, prefix = '') => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach((file, index) => {
      const isLast = index === files.length - 1;
      const currentPrefix = isLast ? '└── ' : '├── ';
      console.log(prefix + currentPrefix + file.name);
      if (file.isDirectory()) {
        const nextPrefix = prefix + (isLast ? '    ' : '│   ');
        listDirs(path.join(dir, file.name), nextPrefix);
      }
    });
  };
  console.log(basePath);
  listDirs(basePath);
}
