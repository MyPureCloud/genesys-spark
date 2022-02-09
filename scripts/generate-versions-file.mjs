#! /usr/bin/env node

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import semverSort from 'semver-sort';
import { createRequire } from 'module';

const requireShim = createRequire(import.meta.url);

const newVersion = requireShim('../package.json').version;
const newVersionsPath = path.resolve('docs/dist/versions.json');
const currentVersionsUrl =
  'https://apps.inindca.com/common-ui-docs/genesys-webcomponents/versions.json';

const currentVersionsFile = await fetch(currentVersionsUrl);
const currentVersionsJson = await currentVersionsFile.json();

const newVersionsJson = semverSort.desc(currentVersionsJson.concat(newVersion));
const newVersionsString = JSON.stringify(newVersionsJson, null, 2);

fs.writeFileSync(newVersionsPath, newVersionsString, { encoding: 'utf8' });
