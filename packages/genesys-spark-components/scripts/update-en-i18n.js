#! /usr/bin/env node

const fs = require('fs');
const { globSync } = require('glob');
const path = require('path');

const filePatternRegex = /[/\\]([^/\\]+)\/i18n\/[^.]+\.json$/;
const translationsFolder = path.join(__dirname, '../src/i18n/translations');

if (!fs.existsSync(translationsFolder)) {
  fs.mkdirSync(translationsFolder, { recursive: true });
}

composeI18nFileFromComponents('en');

function composeI18nFileFromComponents(locale) {
  try {
    const files = globSync(`src/components/**/i18n/${locale}.json`).sort();

    const translations = files.reduce((acc, file) => {
      const match = file.match(filePatternRegex);
      if (!match || match.length < 2) {
        console.warn(`Encountered file without a language code: '${file}'`);
        return;
      }

      const component = match[1];

      return Object.assign(acc, {
        [component]: JSON.parse(fs.readFileSync(file, 'utf8'))
      });
    }, {});

    console.log(`Writing ${locale} translation file`);

    fs.writeFileSync(
      path.join(translationsFolder, `${locale}.json`),
      JSON.stringify(translations, null, 2) + '\n'
    );
  } catch (err) {
    console.error('Error encountered while trying to find the i18n json files');
    console.error(err);
    process.exit(1);
  }
}
