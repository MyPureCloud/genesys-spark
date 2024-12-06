#! /usr/bin/env node
import { globSync } from 'glob';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const projectPath = join(__dirname, '..');

const definedTokenFilesGlob = join(projectPath, '/snapshot/scss/*.scss');
const usedTokenFilesGlob = [
  join(projectPath, '../genesys-spark/src/**/*.scss'),
  join(projectPath, '../genesys-spark-components/src/components/**/*.scss')
];

function getTokenNames(filesGlob) {
  return globSync(filesGlob)
    .reduce((acc, file) => {
      return acc.concat(readFileSync(file).toString().split('\n'));
    }, [])
    .map(line => line.trim())
    .filter(line => line.includes('--gse'))
    .map(line => {
      return line.match(/--gse-[A-Za-z0-9\-_]*/g);
    })
    .flat()
    .sort()
    .filter((item, pos, array) => !pos || item != array[pos - 1]);
}

const definedTokenNames = getTokenNames(definedTokenFilesGlob).sort();
const usedTokenNames = getTokenNames(usedTokenFilesGlob).sort();

const usedUndefinedTokenNames = usedTokenNames
  .filter(
    token =>
      !definedTokenNames.includes(token) &&
      token !== '--gse-ui-progressAndLoading-loadingState-'
  )
  .sort();
const unusedDefinedUiTokenNames = definedTokenNames
  .filter(
    token =>
      !usedTokenNames.includes(token) &&
      token.startsWith('--gse-ui-') &&
      !token.startsWith('--gse-ui-globalNav-') &&
      !token.endsWith('-boxShadow-type')
  )
  .sort();

const folder = 'reports';

mkdirSync(join(projectPath, `/${folder}`), { recursive: true });

writeFileSync(
  join(projectPath, `/${folder}/unused-defined-ui-tokens.json`),
  JSON.stringify(unusedDefinedUiTokenNames, null, 2) + '\n'
);
writeFileSync(
  join(projectPath, `/${folder}/used-tokens.json`),
  JSON.stringify(usedTokenNames, null, 2) + '\n'
);
writeFileSync(
  join(projectPath, `/${folder}/used-undefined-tokens.json`),
  JSON.stringify(usedUndefinedTokenNames, null, 2) + '\n'
);
