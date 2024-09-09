#! /usr/bin/env node
import { globSync } from 'glob';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const projectPath = join(__dirname, '..');

const oldTokenFilesGlob = join(projectPath, '/snapshot/css/*.css');
const newTokenFilesGlob = join(projectPath, '/snapshot-new/scss/*.scss');
const usedTokenFilesGlob = join(
  projectPath,
  '../genesys-spark-components/src/components/**/*.scss'
);

function getTokenNames(filesGlob) {
  return globSync(filesGlob)
    .reduce((acc, file) => {
      return acc.concat(readFileSync(file).toString().split('\n'));
    }, [])
    .map(line => line.trim())
    .filter(line => line.includes('--gse'))
    .map(line => {
      return line.match(/--gse-[A-Za-z0-9\-_]*/)[0];
    })
    .sort()
    .filter((item, pos, array) => !pos || item != array[pos - 1]);
}

const oldTokenNames = getTokenNames(oldTokenFilesGlob);
const newTokenNames = getTokenNames(newTokenFilesGlob);
const usedTokenNames = getTokenNames(usedTokenFilesGlob);

const missingOldTokenNames = oldTokenNames.filter(
  token => !newTokenNames.includes(token)
);
const newNewTokenNames = newTokenNames.filter(
  token => !oldTokenNames.includes(token)
);
const missingUsedTokenNames = usedTokenNames.filter(
  token => !newTokenNames.includes(token)
);

const folder = 'reports';

mkdirSync(join(projectPath, `/${folder}`), { recursive: true });

writeFileSync(
  join(projectPath, `/${folder}/missing-old-tokens.json`),
  JSON.stringify(missingOldTokenNames, null, 2)
);
writeFileSync(
  join(projectPath, `/${folder}/new-new-tokens.json`),
  JSON.stringify(newNewTokenNames, null, 2)
);
writeFileSync(
  join(projectPath, `/${folder}/used-tokens.json`),
  JSON.stringify(usedTokenNames, null, 2)
);
writeFileSync(
  join(projectPath, `/${folder}/missing-used-tokens.json`),
  JSON.stringify(missingUsedTokenNames, null, 2)
);
