import { copyFile, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// get a list of files in the genesys-spark utils folder
function utilsFilesList() {
  let list = readdirSync(join(__dirname, `../../genesys-spark/src/utils`));
  let utilFiles = [];
  list.forEach(result => {
    utilFiles.push(result);
  });
  return utilFiles;
}

// copy each file in genesys-spark/src/utils to genesys-spark-components
function copyGenesysSparkUtils() {
  utilsFilesList().forEach(file => {
    const copyFromPath = join(
      __dirname,
      `../../genesys-spark/src/utils/${file}`
    );
    const destinationPath = join(
      __dirname,
      `../src/genesys-spark-utils/${file}`
    );
    copyFile(copyFromPath, destinationPath, err => {
      if (err) throw err;
      console.log(`${file} was copied to destination`);
    });
  });
}

// Address in COMUI-2598
copyGenesysSparkUtils();
