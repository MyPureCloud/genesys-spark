export const determineFullResourceName = (
  resourceBaseName: string,
  locale: string = 'en'
): string => `/i18n/${resourceBaseName}.i18n.${locale}.json`;

export const sanitizeResource = (resourceObject: any): Map<string, string> => {
  const entries = Object.entries(resourceObject || {}).filter(
    (pair): pair is [string, string] => typeof pair[1] === 'string'
  );

  return new Map(entries);
};

export const fetchResource = async (
  resourceBaseName: string,
  locale: string = 'en'
): Promise<Map<string, string>> => {
  const fullResource = determineFullResourceName(resourceBaseName, locale);

  const response = await fetch(fullResource);
  if (!response.ok) {
    throw new Error(`Couldn't fetch resource at '${fullResource}'`);
  }

  const json = await response.json();

  return sanitizeResource(json);
};
