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
      return line.match(/--gse-[A-Za-z0-9\-_]*/g);
    })
    .flat()
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
const mitigatedMissingUsedTokenNames = [
  '--gse-semantic-color-focus',
  '--gse-ui-calendarMenu-boxShadow-x',
  '--gse-ui-calendarMenu-boxShadow-y',
  '--gse-ui-card-raised-boxShadow-x',
  '--gse-ui-card-raised-boxShadow-y',
  '--gse-ui-formControl-label-tooltipTrigger-optionalColor',
  '--gse-ui-icon-size-lg',
  '--gse-ui-icon-size-md',
  '--gse-ui-icon-size-sm',
  '--gse-ui-link-active-foregroundColor',
  '--gse-ui-link-default-foregroundColor',
  '--gse-ui-link-disabled-foregroundColor',
  '--gse-ui-link-hover-foregroundColor',
  '--gse-ui-link-inLine-medium-text-fontFamily',
  '--gse-ui-link-inLine-medium-text-fontSize',
  '--gse-ui-link-inLine-medium-text-fontWeight',
  '--gse-ui-link-inLine-medium-text-lineHeight',
  '--gse-ui-link-inLine-medium-underlinedText-fontFamily',
  '--gse-ui-link-inLine-medium-underlinedText-fontSize',
  '--gse-ui-link-inLine-medium-underlinedText-fontWeight',
  '--gse-ui-link-inLine-medium-underlinedText-lineHeight',
  '--gse-ui-link-inLine-medium-underlinedText-textDecoration',
  '--gse-ui-link-inLine-small-text-fontFamily',
  '--gse-ui-link-inLine-small-text-fontSize',
  '--gse-ui-link-inLine-small-text-fontWeight',
  '--gse-ui-link-inLine-small-text-lineHeight',
  '--gse-ui-link-inLine-small-underlinedText-fontFamily',
  '--gse-ui-link-inLine-small-underlinedText-fontSize',
  '--gse-ui-link-inLine-small-underlinedText-fontWeight',
  '--gse-ui-link-inLine-small-underlinedText-lineHeight',
  '--gse-ui-link-inLine-small-underlinedText-textDecoration',
  '--gse-ui-link-visited-foregroundColor',
  '--gse-ui-menu-boxShadow-x',
  '--gse-ui-menu-boxShadow-y',
  '--gse-ui-modal-boxShadow-x',
  '--gse-ui-modal-boxShadow-y',
  '--gse-ui-popover-boxShadow-x',
  '--gse-ui-popover-boxShadow-y',
  '--gse-ui-progressAndLoading-loadingState-',
  '--gse-ui-toast-boxShadow-x',
  '--gse-ui-toast-boxShadow-y',
  '--gse-ui-tooltip-boxShadow-x',
  '--gse-ui-tooltip-boxShadow-y',
  '--gse-ui-tooltip-light-iconColor'
];

const folder = 'reports';

mkdirSync(join(projectPath, `/${folder}`), { recursive: true });

writeFileSync(
  join(projectPath, `/${folder}/missing-old-tokens.json`),
  JSON.stringify(missingOldTokenNames, null, 2) + '\n'
);
writeFileSync(
  join(projectPath, `/${folder}/new-new-tokens.json`),
  JSON.stringify(newNewTokenNames, null, 2) + '\n'
);
writeFileSync(
  join(projectPath, `/${folder}/used-tokens.json`),
  JSON.stringify(usedTokenNames, null, 2) + '\n'
);
writeFileSync(
  join(projectPath, `/${folder}/missing-used-tokens.json`),
  JSON.stringify(
    missingUsedTokenNames.filter(
      x => !mitigatedMissingUsedTokenNames.includes(x)
    ),
    null,
    2
  ) + '\n'
);
