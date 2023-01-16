#! /usr/bin/env node

const fs = require('fs');
const glob = require('glob');
const locales = require('../src/i18n/locales.json');

const files = glob.sync('src/components/**/i18n/*.json');

const output = files.map(file => {
  console.log(file);
});
