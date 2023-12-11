import fs from 'fs';

export function getTokenStudioTokens(tokenStudioTokensFile) {
  const tokens = JSON.parse(fs.readFileSync(tokenStudioTokensFile));

  delete tokens.$themes;

  return tokens;
}
