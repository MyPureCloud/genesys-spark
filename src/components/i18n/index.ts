import { fetchResource } from './fetchResource';
import { formatString } from './format';

const getComponentClosestLanguage = (element: HTMLElement): string => {
  const closestElement = element.closest('[lang]') as HTMLElement;
  return closestElement ? closestElement.lang : 'en';
};

const getLocalizedResources = async (
  element: HTMLElement,
  resourceBaseName?: string
) => {
  const lang = getComponentClosestLanguage(element);

  if (!resourceBaseName) {
    resourceBaseName = element.tagName.toLocaleLowerCase();
  }

  try {
    return await fetchResource(resourceBaseName, lang);
  } catch (err) {
    if (lang === 'en') {
      throw err;
    }

    return await fetchResource(resourceBaseName, 'en');
  }
};

export const buildI18nForComponent = async (
  element: HTMLElement,
  resourceBaseName?: string
) => {
  const resources = await getLocalizedResources(element, resourceBaseName);

  return (resourceName: string, ...formatArgs: any[]): string => {
    const resource = resources.get(resourceName);
    if (resource === undefined) {
      throw new Error(`No localized resource for '${resourceName}'`);
    }

    return formatString(resource, ...formatArgs);
  };
};
