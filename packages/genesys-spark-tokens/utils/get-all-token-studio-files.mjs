import fs from 'fs';
import path from 'path';

import { getRootPath } from './get-root-path.mjs';

export function getAllTokenStudioFiles() {
  const tokenStudioTokensFolder = path.resolve(getRootPath(), 'data');

  return fs
    .readdirSync(tokenStudioTokensFolder)
    .map(tokenStudioFile =>
      path.resolve(tokenStudioTokensFolder, tokenStudioFile)
    );
}
