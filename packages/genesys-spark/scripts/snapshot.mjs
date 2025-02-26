#! /usr/bin/env node

import dircompare from 'dir-compare';

import path from 'path';
import { fileURLToPath } from 'url';

const filepath = fileURLToPath(import.meta.url);
const dirname = path.dirname(filepath);
const rootPath = path.resolve(dirname, '../');
const options = { compareContent: true, noDiffSet: false };
const dist = path.resolve(rootPath, 'dist');
const snapshot = path.resolve(rootPath, 'snapshot');

try {
  const result = dircompare.compareSync(dist, snapshot, options);

  if (!result.same) {
    console.warn(
      `${rootPath}: ❌  'dist' and 'snapshot' folders are different.\n`
    );
    console.error(result);
    process.exit(1);
  }

  console.info(
    `${rootPath}: ✅  'dist' and 'snapshot' folders are identical.\n`
  );
} catch {
  console.warn(
    `${rootPath}: ❌  'dist' folder missing. Run 'npm run build'.\n`
  );
  process.exit(1);
}
