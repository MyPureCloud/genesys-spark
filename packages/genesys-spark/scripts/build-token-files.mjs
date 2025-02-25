#! /usr/bin/env node
import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const FOLDER = process.env.OUTDIR || 'dist';

const __dirname = dirname(fileURLToPath(import.meta.url));

const projectPath = path.join(__dirname, '..');

const cssFileFolder = path.join(projectPath, `${FOLDER}/css/flare`);
const cssFilesGlob = path.join(cssFileFolder, '*.css');

const cssFiles = globSync(cssFilesGlob);

function writeToDistTokensFolder(filename, fileContent) {
  const folder = path.join(projectPath, `${FOLDER}/tokens/flare`);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  fs.writeFileSync(path.join(folder, filename), fileContent);
}

function getCssCustomProperties(cssFileContent) {
  return [...new Set(cssFileContent.match(/--gse-[^:]*/gm))].sort();
}

function getScssFileContent(cssCustomProperties) {
  return cssCustomProperties
    .map(
      cssCustomProperties =>
        `${cssCustomProperties.replace('--gse', '$gse')}: var(${cssCustomProperties});`
    )
    .join('\n');
}

function getLessFileContent(cssCustomProperties) {
  return cssCustomProperties
    .map(
      cssCustomProperties =>
        `${cssCustomProperties.replace('--gse', '@gse')}: var(${cssCustomProperties});`
    )
    .join('\n');
}

cssFiles.forEach(cssFile => {
  const cssFileName = path.basename(cssFile);
  const cssFileContent = fs.readFileSync(cssFile, 'utf8');
  const cssCustomProperties = getCssCustomProperties(cssFileContent);

  const scssFileName = '_' + cssFileName.replace('.css', '.scss');
  const scssFileContent = getScssFileContent(cssCustomProperties);

  const lessFileName = cssFileName.replace('.css', '.less');
  const lessFileContent = getLessFileContent(cssCustomProperties);

  writeToDistTokensFolder(scssFileName, scssFileContent);
  writeToDistTokensFolder(lessFileName, lessFileContent);
});
