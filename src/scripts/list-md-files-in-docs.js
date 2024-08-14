import fs from 'fs';
import path from 'path';

function getFilesRecursive(dir, filelist = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      getFilesRecursive(filepath, filelist);
    } else if (path.extname(file) === '.md') {
      filelist.push(path.relative('./src/pages/docs', filepath));
    }
  });

  return filelist;
}

const docsPath = path.join(process.cwd(), 'src/pages/docs');
const files = getFilesRecursive(docsPath);

console.log(JSON.stringify(files, null, 2));
