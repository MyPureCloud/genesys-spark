import path from 'path';
import dircompare from 'dir-compare';

import { getRootPath } from '../utils/get-root-path.mjs';

const options = { compareContent: true };

const dist = path.resolve(getRootPath(), 'dist');
const snapshot = path.resolve(getRootPath(), 'snapshot');

try {
  const result = dircompare.compareSync(dist, snapshot, options);

  if (!result.same) {
    console.warn(`❌  'dist' and 'snapshot' folders are different.\n`);
    console.error(result);
    process.exit(1);
  }

  console.info(`✅  'dist' and 'snapshot' folders are identical.\n`);
} catch {
  console.warn(`❌  'dist' folder missing. Run 'npm run build'.\n`);
  process.exit(1);
}

const distNew = path.resolve(getRootPath(), 'dist-new');
const snapshotNew = path.resolve(getRootPath(), 'snapshot-new');

try {
  const result = dircompare.compareSync(distNew, snapshotNew, options);

  if (!result.same) {
    console.warn(`❌  'dist-new' and 'snapshot-new' folders are different.\n`);
    console.error(result);
    process.exit(1);
  }

  console.info(`✅  'dist-new' and 'snapshot-new' folders are identical.\n`);
} catch {
  console.warn(`❌  'dist-new' folder missing. Run 'npm run build'.\n`);
  process.exit(1);
}
