#! /usr/bin/env node

const { globSync } = require('glob');

const files = globSync('src/components/**/i18n/*.json');

files.map(file => {
  console.log(file);
});
