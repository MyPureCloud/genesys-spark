import {
  getTokenStudioTokens,
  outputStyles,
  transformToStyleDictionaryReadableTokens
} from './index.mjs';

export async function processTokenFile(distFolder, tokenStudioFile) {
  console.info(`Processing ${tokenStudioFile}`);

  const tokenStudioTokens = getTokenStudioTokens(tokenStudioFile);

  for (const set of ['ui', 'semantic']) {
    const outputFilename = set;
    const styleDictionaryReadableTokens =
      transformToStyleDictionaryReadableTokens(tokenStudioTokens, set);

    await outputStyles(
      distFolder,
      outputFilename,
      styleDictionaryReadableTokens
    );
  }
}
