import { transformTokens } from 'token-transformer';

export function transformToStyleDictionaryReadableTokens(
  tokens,
  setToTransform
) {
  const allSets = Object.keys(tokens);
  const setsToUse = [];
  const setsToExcludes = allSets.filter(s => s !== setToTransform);
  const transformerOptions = {
    expandTypography: true,
    expandShadow: true,
    expandComposition: true,
    expandBorder: true,
    preserveRawValue: false,
    throwErrorWhenNotResolved: true,
    resolveReferences: true
  };

  return transformTokens(tokens, setsToUse, setsToExcludes, transformerOptions);
}
