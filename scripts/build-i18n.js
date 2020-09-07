#! /usr/bin/env node

/*
 * Bundles the <lang>.json files for each component into a
 * single genesys-webcomponents.i18n.<lang>.json file per language.  The
 * default/english component.i18n.json files are built in, so are ignored here.
 */

const fs = require('fs');
const glob = require('glob');
const path = require('path');

const filePatternRegex = /[\/\\]([^\/\\]+)\/i18n\/([^.]+)\.json$/;
const translationsFolder = path.join(__dirname, '../build/i18n');
const localesFile = path.join(__dirname, '../src/i18n/locales.json');

glob('src/components/**/i18n/*.json', (err, files) => {
  if (err) {
    console.error('Error encountered while trying to find the i18n json files');
    console.error(err);
    process.exit(1);
  }

  const translations = {};
  const locales = new Set();

  files.forEach(file => {
    const match = file.match(filePatternRegex);
    if (!match || match.length < 3) {
      console.warn(`Encountered file without a language code: '${file}'`);
      return;
    }

    const component = match[1];
    const locale = match[2];

    locales.add(locale);
    translations[locale] = translations[locale] || {};
    translations[locale][component] = JSON.parse(fs.readFileSync(file, 'utf8'));
  });

  if (!fs.existsSync(translationsFolder)) {
    fs.mkdirSync(translationsFolder, { recursive: true });
  }

  console.log('Writing locale list...');
  fs.writeFileSync(
    localesFile,
    `${JSON.stringify(Array.from(locales), null, 2)}\n`
  );

  console.log('Writing translation files...');
  Object.keys(translations).forEach(lang => {
    const targetFile = path.join(
      translationsFolder,
      `genesys-webcomponents.i18n.${lang}.json`
    );

    fs.writeFileSync(targetFile, JSON.stringify(translations[lang]));
  });
});
