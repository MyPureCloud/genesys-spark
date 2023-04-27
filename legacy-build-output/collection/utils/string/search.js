const conversion = /[ +]/g;
const expressions = new Map();
const replacements = new Map();
export function matchesFuzzy(sourceWord, targetWord) {
  let exp = expressions.get(sourceWord);
  if (!exp) {
    exp = convertToRegex(sourceWord);
    expressions.set(sourceWord, exp);
  }
  return exp.test(targetWord);
}
export function getFuzzyReplacements(sourceWord) {
  return sourceWord
    .split(conversion)
    .map(makeRegexSafe)
    .map(word => {
    let exp = replacements.get(word);
    if (!exp) {
      exp = new RegExp(word, 'i');
      replacements.set(word, exp);
    }
    return exp;
  });
}
function makeRegexSafe(str) {
  return str.replace(/[\^$*+?.(){}[\]\\]/g, '\\$&');
}
function convertToRegex(word) {
  const parts = word.split(conversion).map(makeRegexSafe);
  if (parts.length === 1) {
    return new RegExp(parts[0], 'i');
  }
  let newexp = `(`;
  parts.forEach((part, index) => {
    newexp += part + ').*';
    if (index !== parts.length - 1) {
      newexp += `(`;
    }
  });
  return new RegExp(newexp + '$', 'i');
}
