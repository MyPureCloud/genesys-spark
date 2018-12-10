/*
 * Bundles the component.i18n.<lang>.json files for each component into a
 * single genesys-webcomponents.i18n.<lang>.json file per language.  The
 * default/english component.i18n.json files aren't bundled here, because
 * webpack handles that for us.
 */

const fs = require('fs');
const glob = require('glob');
const path = require('path');

const filePatternRegex = /[\/\\]([^\/\\]+)\.i18n\.([^.]+)\.json$/;
const outputFolder = path.join(__dirname, '../build/i18n');
const outputFileName = 'genesys-webcomponents';

glob('src/components/**/*.i18n.*.json', (err, files) => {
  if (err) {
    console.error('Error encountered while trying to find the i18n json files');
    console.error(err);
    process.exit(1);
  }

  const languages = {};

  files.forEach(file => {
    const match = file.match(filePatternRegex);
    if (!match || match.length < 3) {
      console.warn(`Encountered file without a language code: '${file}'`);
      return;
    }

    const component = match[1];
    const lang = match[2];

    languages[lang] = languages[lang] || {};
    languages[lang][component] = JSON.parse(fs.readFileSync(file, 'utf8'));
  });

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  Object.keys(languages).forEach(lang => {
    const targetFile = path.join(
      outputFolder,
      `${outputFileName}.i18n.${lang}.json`
    );

    console.log(`Writing '${targetFile}'`);
    fs.writeFileSync(targetFile, JSON.stringify(languages[lang]));
  });
});
