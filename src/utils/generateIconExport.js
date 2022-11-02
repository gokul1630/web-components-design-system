const { resolve } = require('path');
const {
  createWriteStream,
  open,
  close,
  readdir,
  readFile,
  existsSync,
} = require('fs');
const path = require('path');

const assetsPath = resolve(__dirname, '../', 'assets');
const filePath = resolve(__dirname, '../', 'icons.ts');

const file = createWriteStream(filePath);

const writeData = data => file.write(data);

open(filePath, (err, fd) => {
  if (err) throw err;

  totalIcons = 0;

  readdir(assetsPath, (err, fileNames) => {
    if (err) throw err;

    fileNames = fileNames.map(fileName => fileName.split('.')[0]);

    writeData("import { svg } from 'lit';\n\n");
    fileNames.forEach(fileName => {
      readFile(
        resolve(__dirname, '../', `assets/${fileName}.svg`),
        'utf8',
        (err, data) => {
          if (err) throw err;
          writeData(`const ${fileName} = svg\`${data}\` \n\n`);
        }
      );
      totalIcons += 1;
    });

    file.on('drain', () => {
      writeData(`export const icons: any = {${fileNames}};\n\n`);
      console.log(`Total Icons written: ${totalIcons}`);
      file.close();
    });
  });
  close(fd);
});