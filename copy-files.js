const fs = require('fs');
const path = require('path');

console.log('Starting file copy process...');

const sourceDir = path.join(__dirname, 'dist/student-learning-platform/browser/server');
const targetDir = path.join(__dirname, 'dist/student-learning-platform/server');

console.log('Source directory:', sourceDir);
console.log('Target directory:', targetDir);

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  console.log('Creating target directory...');
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all files from source to target
if (fs.existsSync(sourceDir)) {
  console.log('Source directory exists, reading files...');
  const files = fs.readdirSync(sourceDir);
  console.log('Files found:', files);
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} to server directory`);
  });
} else {
  console.log('Source server directory not found');
}

// Create render-utils.server.mjs for Netlify Angular runtime compatibility
const renderUtilsPath = path.join(targetDir, 'render-utils.server.mjs');
if (!fs.existsSync(renderUtilsPath)) {
  console.log('Creating render-utils.server.mjs for Netlify compatibility...');
  const renderUtilsContent = `// Minimal render-utils.server.mjs for Netlify Angular runtime compatibility
export function renderApplication() {
  // Placeholder function for Netlify Angular runtime
  return Promise.resolve();
}

export default {
  renderApplication
};`;
  fs.writeFileSync(renderUtilsPath, renderUtilsContent);
  console.log('Created render-utils.server.mjs');
} else {
  console.log('render-utils.server.mjs already exists');
}

console.log('File copy process completed.');
