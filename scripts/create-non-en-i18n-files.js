#! /usr/bin/env node

const fs = require('fs');
const glob = require('glob');

const locales = require('../src/i18n/locales.json');

const enFiles = glob.sync('src/components/**/i18n/en.json');

const output = enFiles.map(enFile => {
  const folder = locales.forEach(locale => {
    const localeFile = enFile.replace('/en.json', `/${locale}.json`);

    try {
      fs.copyFileSync(enFile, localeFile, fs.constants.COPYFILE_EXCL);

      console.log(`Added ${localeFile} file`);
    } catch {}
  });
});
