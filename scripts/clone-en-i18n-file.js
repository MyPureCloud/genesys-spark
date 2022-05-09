#! /usr/bin/env node

const fs = require('fs');
const glob = require('glob');
const locales = require('../src/i18n/locales.json');
const { COPYFILE_EXCL } = fs.constants;
const files = glob.sync('src/components/**/i18n/en.json');

const output = files.map(file => {
  const folder = file.replace('/en.json', '');
  const component = folder.replace('/i18n', '');
  const numberOfTranslations = fs.readdirSync(folder).length;

  if (numberOfTranslations <= 1) {
    locales.forEach(locale => {
      const newFile = file.replace('/en.json', `/${locale}.json`);

      if (file !== newFile) {
        fs.copyFileSync(file, newFile, COPYFILE_EXCL);
      }
    });
  }
});
