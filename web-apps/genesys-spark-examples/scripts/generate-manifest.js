#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const versionHelper = require('./version-helper');

const name = 'common-ui-docs/genesys-webcomponents';
const version = versionHelper.getDeployVersion();
const build = `${process.env.BUILD_NUMBER}`;
const buildDate = new Date().toISOString();
const indexFiles = globSync(path.join(__dirname, '../dist/*.html'))
  .map(file => ({ file: path.basename(file) }))
  .concat({ file: 'versions.json' });

const manifest = {
  name,
  version,
  build,
  buildDate,
  indexFiles
};

const manifestPath = path.join(__dirname, '../manifest.json');
const manifestJson = JSON.stringify(manifest, null, 2);

console.log(`Writing manifest file: ${manifestPath}`, manifestJson);
fs.writeFileSync(manifestPath, manifestJson, { encoding: 'utf8' });
