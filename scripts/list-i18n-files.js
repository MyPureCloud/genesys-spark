#! /usr/bin/env node

const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/**/i18n/en.json');

const output = files.map(file => {
  const folder = file.replace('/en.json', '');
  const component = folder.replace('/i18n', '');
  const numberOfTranslations = fs.readdirSync(folder).length;

  const otherLanguageFile = file.replace('/en.json', '/ja.json');

  const englishFileContent = fs.readFileSync(file, {
    encoding: 'utf8',
    flag: 'r'
  });
  const otherLanguageFileContent = fs.readFileSync(otherLanguageFile, {
    encoding: 'utf8',
    flag: 'r'
  });

  const translationsFound = englishFileContent !== otherLanguageFileContent;

  return { component, numberOfTranslations, translationsFound };
});

console.table(output, [
  'component',
  'numberOfTranslations',
  'translationsFound'
]);
