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
const usedUndefinedTokenNames = usedTokenNames.filter(
  token =>
    !oldTokenNames.includes(token) &&
    !newTokenNames.includes(token) &&
    token !== '--gse-ui-progressAndLoading-loadingState-'
);

const mitigatedMissingUsedTokenNames = [
  '--gse-core-fontFamily-body',
  '--gse-core-fontFamily-heading',
  '--gse-core-typography-body-lg-fontFamily',
  '--gse-core-typography-body-lg-fontSize',
  '--gse-core-typography-body-lg-lineHeight',
  '--gse-core-typography-body-md-fontFamily',
  '--gse-core-typography-body-md-fontSize',
  '--gse-core-typography-body-md-lineHeight',
  '--gse-core-typography-body-sm-fontFamily',
  '--gse-core-typography-body-sm-fontSize',
  '--gse-core-typography-body-sm-lineHeight',
  '--gse-core-typography-heading-lg-fontFamily',
  '--gse-core-typography-heading-lg-fontSize',
  '--gse-core-typography-heading-lg-lineHeight',
  '--gse-core-typography-heading-md-fontFamily',
  '--gse-core-typography-heading-md-fontSize',
  '--gse-core-typography-heading-md-lineHeight',
  '--gse-core-typography-heading-overline-fontFamily',
  '--gse-core-typography-heading-overline-fontSize',
  '--gse-core-typography-heading-overline-letterSpacing',
  '--gse-core-typography-heading-overline-lineHeight',
  '--gse-core-typography-heading-overline-textCase',
  '--gse-core-typography-heading-sm-fontFamily',
  '--gse-core-typography-heading-sm-fontSize',
  '--gse-core-typography-heading-sm-lineHeight',
  '--gse-core-typography-heading-xl-fontFamily',
  '--gse-core-typography-heading-xl-fontSize',
  '--gse-core-typography-heading-xl-lineHeight',
  '--gse-core-typography-heading-xs-fontFamily',
  '--gse-core-typography-heading-xs-fontSize',
  '--gse-core-typography-heading-xs-lineHeight',
  '--gse-core-typography-subheading-fontFamily',
  '--gse-core-typography-subheading-fontSize',
  '--gse-core-typography-subheading-lineHeight',
  '--gse-semantic-color-focus',
  '--gse-semantic-focusRing-cornerRadius',
  '--gse-semantic-focusRing-default-border-color',
  '--gse-semantic-focusRing-default-border-style',
  '--gse-semantic-focusRing-default-border-width',
  '--gse-semantic-focusRing-offset',
  '--gse-semantic-focusRing-small-border-color',
  '--gse-semantic-focusRing-small-border-style',
  '--gse-semantic-focusRing-small-border-width',
  '--gse-semantic-focusRing-width',
  '--gse-semantic-forms-fieldset-header-foregroundColor',
  '--gse-semantic-forms-fieldset-header-gap',
  '--gse-semantic-forms-fieldset-header-paddingBottom',
  '--gse-semantic-forms-fieldset-header-text-fontFamily',
  '--gse-semantic-forms-fieldset-header-text-fontSize',
  '--gse-semantic-forms-fieldset-header-text-fontWeight',
  '--gse-semantic-forms-fieldset-header-text-lineHeight',
  '--gse-semantic-forms-fieldset-paddingBottom',
  '--gse-semantic-forms-formBody-paddingBottom',
  '--gse-semantic-forms-formControl-gap',
  '--gse-semantic-forms-formHeader-foregroundColor',
  '--gse-semantic-forms-formHeader-gap',
  '--gse-semantic-forms-formHeader-paddingBottom',
  '--gse-semantic-forms-formHeader-text-fontFamily',
  '--gse-semantic-forms-formHeader-text-fontSize',
  '--gse-semantic-forms-formHeader-text-fontWeight',
  '--gse-semantic-forms-formHeader-text-lineHeight',
  '--gse-semantic-forms-margin',
  '--gse-semantic-forms-maxWidth',
  '--gse-semantic-forms-paragraph-foregroundColor',
  '--gse-semantic-forms-paragraph-text-fontFamily',
  '--gse-semantic-forms-paragraph-text-fontSize',
  '--gse-semantic-forms-paragraph-text-fontWeight',
  '--gse-semantic-forms-paragraph-text-lineHeight',
  '--gse-ui-avatar-badge-away',
  '--gse-ui-avatar-presenceRing-notifications',
  '--gse-ui-calendarMenu-boxShadow-x',
  '--gse-ui-calendarMenu-boxShadow-y',
  '--gse-ui-calendarMenu-day-dayHeader-foregroundColor',
  '--gse-ui-calendarMenu-day-header-fontWeight',
  '--gse-ui-calendarMenu-month-monthHeader-foregroundColor',
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
writeFileSync(
  join(projectPath, `/${folder}/used-undefined-tokens.json`),
  JSON.stringify(usedUndefinedTokenNames, null, 2) + '\n'
);
