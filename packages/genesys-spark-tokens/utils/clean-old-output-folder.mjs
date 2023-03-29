import fs from 'fs';
import path from 'path';

import { getRootPath } from './get-root-path.mjs';

export function cleanOldOutputFolder(folder) {
  const outputFolder = path.resolve(getRootPath(), folder);

  if (fs.existsSync(outputFolder)) {
    fs.rmSync(outputFolder, { recursive: true });
  }
}
