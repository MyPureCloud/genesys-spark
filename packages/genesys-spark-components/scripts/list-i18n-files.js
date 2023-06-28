#! /usr/bin/env node

const { glob } = require('glob');

const files = glob.sync('src/components/**/i18n/*.json');

files.map(file => {
  console.log(file);
});
