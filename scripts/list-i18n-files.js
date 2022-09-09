#! /usr/bin/env node

const fs = require('fs');
const glob = require('glob');
const locales = require('../src/i18n/locales.json');

const files = glob.sync('src/components/**/i18n/en.json');

const output = files.map(file => {
  const folder = file.replace('/en.json', '');
  const component = folder.replace('/i18n', '').split('/').pop();

  const englishFileRaw = fs.readFileSync(file, {
    encoding: 'utf8',
    flag: 'r'
  });
  const englishFileJson = JSON.parse(englishFileRaw);

  const translationsFound = locales.reduce((acc, cv) => {
    const otherLanguageFile = file.replace('/en.json', `/${cv}.json`);
    const otherLanguageRaw = fs.readFileSync(otherLanguageFile, {
      encoding: 'utf8',
      flag: 'r'
    });
    const otherLanguageJson = JSON.parse(otherLanguageRaw);

    const numberOfUntranslatedKeys = Object.keys(englishFileJson).reduce(
      (count, key) => {
        return englishFileJson[key] !== otherLanguageJson[key] || cv === 'en'
          ? count
          : count + 1;
      },
      0
    );

    return Object.assign(acc, {
      [cv]: numberOfUntranslatedKeys ? numberOfUntranslatedKeys : '✅'
    });
  }, {});

  return Object.assign({ component }, translationsFound);
});

console.table(output, ['component'].concat(locales));
