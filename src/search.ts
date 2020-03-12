const conversion = /[ +]/g;
const expressions = new Map<string, RegExp>();
const replacements = new Map<string, RegExp>();

export function matchesFuzzy(sourceWord: string, targetWord: string): boolean {
  let exp = expressions.get(sourceWord);
  if (!exp) {
    exp = convertToRegex(sourceWord);
    expressions.set(sourceWord, exp);
  }

  return exp.test(targetWord);
}

export function getFuzzyReplacements(sourceWord: string): any[] {
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

function makeRegexSafe(str: string): string {
  return str.replace(/[\^$*+?.(){}[\]\\]/g, '\\$&');
}

function convertToRegex(word: string): RegExp {
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
