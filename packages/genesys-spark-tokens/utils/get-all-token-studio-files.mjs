import fs from 'fs';
import path from 'path';

import { getRootPath } from './get-root-path.mjs';

export function getAllTokenStudioFiles(dataFolder) {
  const tokenStudioTokensFolder = path.resolve(getRootPath(), dataFolder);

  return fs
    .readdirSync(tokenStudioTokensFolder)
    .filter(tokenStudioFile => tokenStudioFile.endsWith('.json'))
    .map(tokenStudioFile =>
      path.resolve(tokenStudioTokensFolder, tokenStudioFile)
    );
}
