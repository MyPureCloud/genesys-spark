#! /usr/bin/env node

const fs = require('fs/promises');
const { globSync } = require('glob');

async function main() {
  const specFiles = globSync('src/**/*.spec.ts');

  const data = await Promise.all(
    specFiles.map(async file => {
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
