import fs from 'fs';
import path from 'path';

import { getRootPath } from './get-root-path.mjs';

export function getAllTokenStudioFiles() {
  const tokenStudioTokensFolder = path.resolve(getRootPath(), 'data');

  return fs
    .readdirSync(tokenStudioTokensFolder)
    .filter(tokenStudioFile => tokenStudioFile.endsWith('.json'))
    .map(tokenStudioFile =>
      path.resolve(tokenStudioTokensFolder, tokenStudioFile)
    );
}
