import {
  getTokenStudioTokens,
  outputStyles,
  transformToStyleDictionaryReadableTokens
} from './index.mjs';

export async function processTokenFile(distFolder, tokenStudioFile) {
  console.info(`Processing ${tokenStudioFile}`);

  const tokenStudioTokens = getTokenStudioTokens(tokenStudioFile);
  const allSets = tokenStudioTokens.$metadata.tokenSetOrder;

  const sets = allSets.filter(set => !set.endsWith('_deprecated'));

  for (const setName of sets) {
    const styleDictionaryReadableTokens =
      transformToStyleDictionaryReadableTokens(tokenStudioTokens, setName);

    await outputStyles(distFolder, setName, styleDictionaryReadableTokens);
  }
}
