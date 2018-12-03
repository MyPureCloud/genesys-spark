const replaceValues = (
  str: string,
  replacementValue: any,
  replacementIndex: number
) =>
  str.replace(new RegExp(`\\{${replacementIndex}\\}`, 'g'), replacementValue);

export const formatString = (str: string, ...args: any[]): string =>
  args.reduce(replaceValues, str);
