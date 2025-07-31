#! /usr/bin/env node
const { readFile } = require('fs').promises;
const { globSync } = require('glob');

async function listMissingTranslations() {
  const files = globSync('src/i18n/translations/*.json');
  const enFile = 'src/i18n/translations/en.json';
  const enFileContents = await readFile(enFile, 'utf8');
  const enFileJson = JSON.parse(enFileContents);
  const components = Object.keys(enFileJson).sort();
  const translatedFiles = files.filter(file => file !== enFile);
  const translatedFilesJsonArray = await Promise.all(
    translatedFiles.map(async file => {
      const lang = file.split('/').pop().split('.')[0];
      const contents = await readFile(file, 'utf8');

      return { [lang]: JSON.parse(contents) };
    })
  );
  const translatedFilesJson = Object.assign({}, ...translatedFilesJsonArray);
  const languages = Object.keys(translatedFilesJson).sort();
  const manuallyConfirmedTranslations = {
    ar: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    cs: {
      'gux-time-picker': { 'time-separator': true }
    },
    da: {
      'gux-datepicker': { start: true },
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    de: {
      'gux-breadcrumbs': { breadcrumbs: true },
      'gux-datepicker': { start: true },
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': { 'time-separator': true }
    },
    'es-es': {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': { 'time-separator': true }
    },
    es: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': { 'time-separator': true }
    },
    fi: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    fr: {
      'gux-datepicker': { date: true },
      'gux-pagination-buttons': { page: true },
      'gux-pagination-buttons-beta': { page: true, pageNumber: true },
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    'fr-ca': {
      'gux-datepicker': { date: true },
      'gux-pagination-buttons': { page: true },
      'gux-pagination-buttons-beta': { page: true, pageNumber: true },
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    he: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': { 'time-separator': true }
    },
    hi: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': { 'time-separator': true }
    },
    it: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    ja: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': { 'time-separator': true }
    },
    ko: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': { 'time-separator': true }
    },
    nl: {
      'gux-breadcrumbs': { breadcrumbs: true },
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    no: {
      'gux-datepicker': { start: true },
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    pl: {
      'gux-time-picker': { 'time-separator': true }
    },
    'pt-br': {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    'pt-pt': {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    ru: {
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    sv: {
      'gux-datepicker': { start: true },
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    th: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    tr: {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': { 'time-separator': true }
    },
    uk: {
      'gux-time-picker': { 'time-separator': true }
    },
    'zh-cn': {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    },
    'zh-tw': {
      'gux-pagination-item-counts': { itemCountDisplay: true },
      'gux-pagination-item-counts-beta': { itemCountDisplay: true },
      'gux-time-picker': {
        am: true,
        'time-separator': true,
        pm: true
      }
    }
  };
  const output = components.map(component => {
    const isTranslateds = languages.map(language => {
      const manuallyConfirmed =
        manuallyConfirmedTranslations[language] &&
        manuallyConfirmedTranslations[language][component];
      const translation = translatedFilesJson[language][component];
      const enTranslation = enFileJson[component];
      const isPresent =
        translation &&
        Object.keys(enTranslation).every(key => translation[key]);
      const isTranslated =
        translation &&
        Object.keys(enTranslation).every(
          key =>
            enTranslation[key] !== translation[key] ||
            (manuallyConfirmed && manuallyConfirmed[key])
        );
      const check = isPresent && isTranslated;

      return { [language]: check ? ' ' : 'X' };
    });

    return Object.assign({ component }, ...isTranslateds);
  });

  console.table(output);
}

listMissingTranslations();
