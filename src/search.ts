const conversion = /[ +]/g;
const expressions = new Map<string, RegExp>();
const replacements = new Map<string, RegExp>();

function convertToExpression(word: string): RegExp {
  let newexp = word.replace(conversion, '.*');

  const parts = newexp.split('.*');

  if (parts.length === 1) {
    return new RegExp(newexp, 'i');
  }

  newexp = `(`;

  parts.forEach((part, index) => {
    newexp += part + ').*';

    if (index !== parts.length - 1) {
      newexp += `(`;
    }
  });

  return new RegExp(newexp + '$', 'i');
}

export function matchesFuzzy(sourceWord: string, targetWord: string): boolean {
  let exp = expressions.get(sourceWord);
  if (!exp) {
    exp = convertToExpression(sourceWord);
    expressions.set(sourceWord, exp);
  }

  return exp.test(targetWord);
}

export function getFuzzyReplacements(sourceWord: string): any[] {
  return sourceWord
    .replace(conversion, '.*')
    .split('.*')
    .map(word => {
      let exp = replacements.get(word);

      if (!exp) {
        exp = new RegExp(word, 'i');
        replacements.set(word, exp);
      }

      return exp;
    });
}
