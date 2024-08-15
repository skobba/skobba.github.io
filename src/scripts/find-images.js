// output-image-paths.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Use ES module-compatible methods for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the source directory
const srcDir = path.resolve(__dirname, '../content/docs');

// Function to recursively find and log image files
function logImagePaths(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively search directories
      logImagePaths(filePath);
    } else if (/\.(jpg|jpeg|png|gif|bmp|tiff|svg)$/i.test(filePath)) {
      // Log the image file path if it matches the pattern
      console.log(filePath);
    }
  });
}

// Start the logging process
logImagePaths(srcDir);

console.log('Image paths output successfully.');
