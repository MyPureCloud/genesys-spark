#! /usr/bin/env node

const fs = require('fs').promises;
const glob = require('glob');
const path = require('path');

async function listShadowDomEnabled() {
  const files = glob.sync('src/components/@(beta|stable|legacy)/*/*.tsx');

  const output = await Promise.all(
    files.map(async file => {
      const contents = await fs.readFile(file, 'utf8');

      const shadowDomEnabled = contents.includes('shadow: true') ? '✅' : '❌';

      return { file, shadowDomEnabled };
    })
  );

  console.table(output, ['file', 'shadowDomEnabled']);
}

listShadowDomEnabled();
