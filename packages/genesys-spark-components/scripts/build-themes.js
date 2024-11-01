#! /usr/bin/env node

const fs = require('fs');
const { globSync } = require('glob');
const path = require('path');
const { pathToFileURL } = require('url');
const sass = require('sass');

// An importer that redirects relative URLs starting with "~" to a parent `node_modules` folder.
const customImporter = {
  findFileUrl(url) {
    if (url.startsWith('~')) {
      const maxDepth = pathToFileURL('').pathname.match(/\//g).length;

      for (let index = 0; index <= maxDepth; index++) {
        const lookup = path.resolve(
          ...Array(index).fill('..'),
          'node_modules',
          url.substring(1)
        );
        const dirname = path.dirname(lookup);
        const filename = path.basename(lookup);
        const fallbackLookup = path.join(dirname, `_${filename}`);

        if (fs.existsSync(lookup)) {
          return new URL(pathToFileURL(lookup));
        }

        if (fs.existsSync(fallbackLookup)) {
          return new URL(pathToFileURL(fallbackLookup));
        }
      }
    }

    return null;
  }
};
const stylesInputFolder = path.join(__dirname, '../src/style');
const stylesOutputFolder = path.join(__dirname, '../build/style');

if (!fs.existsSync(stylesOutputFolder)) {
  fs.mkdirSync(stylesOutputFolder, { recursive: true });
}

try {
  globSync(`${stylesInputFolder}/[^_]*.scss`)
    .sort()
    .forEach(file => {
      if (file.endsWith('style.scss')) {
        return;
      }

      const newFilename = file
        .replace(stylesInputFolder, stylesOutputFolder)
        .replace('.scss', '.css');
      const result = sass.compile(file, {
        style: 'compressed',
        importers: [customImporter]
      });

      console.info(`Writing ${newFilename}`);
      fs.writeFileSync(newFilename, result.css);
    });
} catch (err) {
  console.error(err);
  process.exit(1);
}
