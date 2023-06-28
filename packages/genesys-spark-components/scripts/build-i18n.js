#! /usr/bin/env node

const fs = require('fs');
const { glob } = require('glob');
const path = require('path');

const translationsInputFolder = path.join(
  __dirname,
  '../src/i18n/translations'
);
const translationsOutputFolder = path.join(__dirname, '../build/i18n');
const localesFile = path.join(__dirname, '../src/i18n/locales.json');

if (!fs.existsSync(translationsOutputFolder)) {
  fs.mkdirSync(translationsOutputFolder, { recursive: true });
}

glob(`${translationsInputFolder}/*.json`, (err, files) => {
  if (err) {
    console.error('Error encountered while trying to find the i18n json files');
    console.error(err);
    process.exit(1);
  }

  const locales = new Set();

  files.forEach(file => {
    const locale = path.parse(file).name;

    locales.add(locale);

    console.log(`Writing ${locale} translation file`);
    fs.writeFileSync(
      path.join(
        translationsOutputFolder,
        `genesys-webcomponents.i18n.${locale}.json`
      ),
      JSON.stringify(JSON.parse(fs.readFileSync(file, 'utf8')))
    );
  });

  console.log('Writing locale list');
  fs.writeFileSync(
    localesFile,
    `${JSON.stringify(Array.from(locales), null, 2)}\n`
  );
});
