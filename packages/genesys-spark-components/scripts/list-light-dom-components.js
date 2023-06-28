#! /usr/bin/env node

const fs = require('fs').promises;
const { glob } = require('glob');

async function listLightDomComponents() {
  const files = glob.sync('**/*.tsx', {
    ignore: [
      'src/components/@(beta|stable|legacy)/*/*.functional.tsx',
      '**/*.service.tsx'
    ]
  });

  let lightDomComponents = [];

  await Promise.all(
    files.map(async file => {
      const contents = await fs.readFile(file, 'utf8');
      const legacy = file.includes('legacy');
      const component = file.split('/').slice(-1)[0].split('.')[0];

      if (
        !(
          contents.includes('  shadow: true') ||
          contents.includes(' shadow: { delegatesFocus')
        ) &&
        !legacy
      ) {
        lightDomComponents.push({ component: component, file: file });
      }
    })
  );
  console.table(lightDomComponents, ['component', 'file']);
}

listLightDomComponents();
