#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const versionHelper = require('./version-helper');

const name = 'genesys-chart-webcomponents';
const sourceDir = path.join(__dirname, '../dist/genesys-chart-webcomponents');
const version = versionHelper.getDeployVersion();
const build = `${process.env.BUILD_NUMBER}`;
const buildDate = new Date().toISOString();
const indexFiles = [];

const manifest = {
  name,
  sourceDir,
  version,
  build,
  buildDate,
  indexFiles
};

const manifestPath = path.join(__dirname, '../manifest.json');
const manifestJson = JSON.stringify(manifest, null, 2);

console.info(`Writing manifest file: ${manifestPath}`, manifestJson);
fs.writeFileSync(manifestPath, manifestJson, { encoding: 'utf8' });
