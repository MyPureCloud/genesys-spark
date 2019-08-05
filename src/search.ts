const conversion = /[ +]/g;
const expressions = new Map<string, RegExp>();

function convertToExpression(word: string): RegExp {
  let newexp = word.replace(conversion, '.*');

  const parts = newexp.split('.*');

  if (parts.length === 1) {
    return new RegExp(newexp, 'i');
  }

  let ind = 97;

  newexp = `(?<${String.fromCharCode(ind)}>`;

  parts.forEach((part, index) => {
    newexp += part + ').*';

    if (index !== parts.length - 1) {
      newexp += `(?<${String.fromCharCode(++ind)}>`;
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

export function getFuzzyMatch(sourceWord: string, targetWord: string): any {
  let exp = expressions.get(sourceWord);
  if (!exp) {
    exp = convertToExpression(sourceWord);
    expressions.set(sourceWord, exp);
  }

  return targetWord.match(exp);
}
