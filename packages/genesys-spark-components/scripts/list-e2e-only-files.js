#! /usr/bin/env node

const fs = require('fs/promises');
const { globSync } = require('glob');

async function main() {
  const e2eFiles = globSync('src/components/**/*.e2e.ts');
  const playwrightFiles = globSync('src/components/**/*.e2e.playwright.ts');

  const files = e2eFiles.filter(
    x => !playwrightFiles.map(f => f.replace('.playwright.', '.')).includes(x)
  );

  const data = await Promise.all(
    files.map(async file => {
      const content = await fs.readFile(file, { encoding: 'utf8' });
      const size = content.toString().split('\n').length;

      return { size, file };
    })
  );

  data.sort(function (a, b) {
    return a.size - b.size;
  });

  console.table(data);
}

main();
