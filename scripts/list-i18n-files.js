#! /usr/bin/env node

const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/**/i18n/en.json');

const output = files.map(file => {
  const folder = file.replace('/en.json', '');
  const component = folder.replace('/i18n', '');
  const numberOfTranslations = fs.readdirSync(folder).length;

  return { component, numberOfTranslations };
});

console.table(output, ['component', 'numberOfTranslations']);
