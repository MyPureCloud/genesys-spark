#! /usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const themesJsonFile = join(__dirname, '../data/$themes.json');

const themesJsonFileContent = readFileSync(themesJsonFile);
const themesJson = JSON.parse(themesJsonFileContent);

const themesJsonNew = themesJson.map(theme => {
  return Object.assign(theme, {
    $figmaStyleReferences: order(theme.$figmaStyleReferences),
    $figmaVariableReferences: order(theme.$figmaVariableReferences)
  });
});
const themesJsonFileNewContent = JSON.stringify(themesJsonNew, null, 2);
writeFileSync(themesJsonFile, themesJsonFileNewContent);

// Utils
function order(unordered) {
  return Object.keys(unordered)
    .sort()
    .reduce((acc, cv) => Object.assign(acc, { [cv]: unordered[cv] }), {});
}
