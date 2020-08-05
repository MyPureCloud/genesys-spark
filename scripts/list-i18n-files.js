#! /usr/bin/env node

const glob = require('glob');

glob('src/components/**/i18n/en.json', (err, files) => {
  if (err) {
    console.error(
      'Error encountered while trying to find the english i18n json files'
    );
    console.error(err);
    process.exit(1);
  }

  files.forEach(file => {
    console.log(`genesys-webcomponents/${file}`);
  });
});
