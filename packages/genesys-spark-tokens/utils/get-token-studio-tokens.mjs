import fs from 'fs';

export function getTokenStudioTokens(tokenStudioTokensFile) {
  return JSON.parse(fs.readFileSync(tokenStudioTokensFile));
}
