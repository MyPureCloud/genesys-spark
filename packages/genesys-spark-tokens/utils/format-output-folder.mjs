import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { globSync } from 'glob';

import { getRootPath } from './get-root-path.mjs';

export async function formatOutputFolder(folder) {
  const outputFolder = path.resolve(getRootPath(), folder);

  const files = globSync(`${outputFolder}/**/*`, { nodir: true });

  for (const file of files) {
    const fileContent = fs.readFileSync(file, { encoding: 'utf8' });
    const prettierConfig = await prettier.resolveConfig(file);

    fs.writeFileSync(
      file,
      prettier.format(fileContent, { ...prettierConfig, filepath: file }),
      { encoding: 'utf8' }
    );
  }
}
