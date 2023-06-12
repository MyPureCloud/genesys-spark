#! /usr/bin/env node

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import semverSort from 'semver-sort';
import { createRequire } from 'module';

const requireShim = createRequire(import.meta.url);

const newVersion = requireShim('../package.json').version;

const currentVersionsUrl =
  'https://apps.inindca.com/common-ui-docs/genesys-webcomponents/versions.json';
const currentVersionsFile = await fetch(currentVersionsUrl);
const currentVersionsJson = await currentVersionsFile.json();

const npmPackageUrl = 'https://registry.npmjs.org/genesys-spark-components';
const npmPackageFile = await fetch(npmPackageUrl);
const npmPackageJson = await npmPackageFile.json();
const npmVersionsJson = Object.keys(npmPackageJson.versions);

const newVersionsJson = semverSort.desc([
  ...new Set([].concat(currentVersionsJson, npmVersionsJson, newVersion))
]);
const newVersionsString = JSON.stringify(newVersionsJson, null, 2);

fs.writeFileSync(path.resolve('./dist/versions.json'), newVersionsString, {
  encoding: 'utf8'
});
