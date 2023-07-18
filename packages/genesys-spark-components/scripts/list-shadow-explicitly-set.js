#! /usr/bin/env node

const fs = require('fs').promises;
const { globSync } = require('glob');

async function listShadowExplicitlySet() {
  const files = globSync('src/components/@(beta|stable|legacy)/*/*.tsx', {
    ignore: 'src/components/@(beta|stable|legacy)/*/*.functional.tsx'
  });

  const output = await Promise.all(
    files.map(async file => {
      const contents = await fs.readFile(file, 'utf8');

      const shadowDomExplicitlySet = contents.includes('  shadow: ')
        ? '✅'
        : '❌';

      return { file, shadowDomExplicitlySet };
    })
  );

  console.table(output, ['file', 'shadowDomExplicitlySet']);
}

listShadowExplicitlySet();
