#! /usr/bin/env node
import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const projectPath = path.join(__dirname, '..');

const componentSpecsOutputFolder = path.join(
  projectPath,
  'build/component-specs'
);

if (!fs.existsSync(componentSpecsOutputFolder)) {
  fs.mkdirSync(componentSpecsOutputFolder, { recursive: true });
}
const specDestination = path.join(
  projectPath,
  'build/component-specs/component-specs.json'
);
const styleExampleGlob = path.join(projectPath, 'src/style/examples/*.html');

fs.writeFileSync(
  specDestination,
  JSON.stringify(generateComponentSpec(), null, 2)
);

function generateComponentSpec() {
  let styleExamples = globSync(styleExampleGlob);
  let stylesSpec = styleExamples.reduce((spec, examplePath) => {
    const name = path.basename(examplePath, '.html');
    spec[name] = { styles: true };
    return spec;
  }, {});

  return { ...stylesSpec };
}
