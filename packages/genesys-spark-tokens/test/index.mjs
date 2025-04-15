import path from 'path';
import dircompare from 'dir-compare';

import { getRootPath } from '../utils/get-root-path.mjs';

const options = { compareContent: true };
const rootPath = getRootPath();
const dist = path.resolve(rootPath, 'dist');
const snapshot = path.resolve(rootPath, 'snapshot');

try {
  const result = dircompare.compareSync(dist, snapshot, options);
  const {
    same,
    differencesDirs,
    differencesFiles,
    totalDirs,
    totalFiles,
    diffSet
  } = result;
  if (!same) {
    console.warn(`❌  'dist' and 'snapshot' folders are different.\n`);
    console.error(`${differencesDirs}/${totalDirs} directories are distinct`);
    console.error(`${differencesFiles}/${totalFiles} files are distinct`);
    for (const diff of diffSet) {
      if (diff.state !== 'equal') {
        console.error(diff);
      }
    }
    process.exit(1);
  }
  console.info(`✅  'dist' and 'snapshot' folders are identical.\n`);
} catch {
  console.warn(
    `${rootPath}: ❌  'dist' folder missing. Run 'npm run build'.\n`
  );
  process.exit(1);
}
