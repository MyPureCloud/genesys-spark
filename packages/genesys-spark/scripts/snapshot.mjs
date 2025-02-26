#! /usr/bin/env node

import util from 'node:util';
import { exec } from 'node:child_process';

const execP = util.promisify(exec);

import dircompare from 'dir-compare';

import path from 'path';
import { fileURLToPath } from 'url';

const filepath = fileURLToPath(import.meta.url);
const dirname = path.dirname(filepath);
const rootPath = path.resolve(dirname, '../');
const options = {
  compareContent: true,
  noDiffSet: false
};
const dist = path.resolve(rootPath, 'dist');
const snapshot = path.resolve(rootPath, 'snapshot');

async function gitDiff(path1, path2) {
  const { stdout, stderr } = await execP(
    `git diff --no-index ${path1} ${path2}`
  );
  console.log(path1, 'stdout:', stdout);
  console.error(path1, 'stderr:', stderr);
}

try {
  const result = dircompare.compareSync(dist, snapshot, options);

  result.diffSet.forEach(dif => {
    if (dif.state === 'distinct') {
      gitDiff(
        path.resolve(dif.path1, dif.name1),
        path.resolve(dif.path2, dif.name2)
      );
    }
  });

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
