// copy-images.js
import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';

// Define the directories
const srcDir = path.resolve('./src/content/docs');
const destDir = path.resolve('./dist/images');

console.log('srcDir: ', srcDir)
console.log('destDir: ', destDir)

// Ensure the destination directory exists
fse.ensureDirSync(destDir);

// Copy image files to the destination folder
fse.copySync(srcDir, destDir, {
  filter: (src) => /\.(jpg|jpeg|png|gif|bmp|tiff|svg)$/i.test(src)
});

console.log('Image files copied successfully.');
