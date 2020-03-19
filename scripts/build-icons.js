/*
 * Bundles the src/assets/svg/*.svg files into a single genesys-icons.svg file.
 */

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const svgstore = require('svgstore');

const filePatternRegex = /[\/\\]([^\/\\]+)\.svg$/;
const outputFolder = path.join(__dirname, '../build/svg-icons');
const outputFileName = 'genesys-icons.svg';

glob('src/assets/svg/*.svg', (err, files) => {
  if (err) {
    console.error('Error encountered while trying to find the svg files');
    console.error(err);
    process.exit(1);
  }

  const svg = svgstore();

  files.forEach(file => {
    const match = file.match(filePatternRegex);
    const name = match[1];

    svg.add(`gux-icon-${name}`, fs.readFileSync(file, 'utf8'));
  });

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const targetFile = path.join(outputFolder, outputFileName);
  console.log(`Writing '${targetFile}'`);
  fs.writeFileSync(targetFile, svg);
});
