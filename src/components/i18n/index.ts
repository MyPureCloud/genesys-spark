import IntlMessageFormat from 'intl-messageformat';
import { fetchResources, ILocalizedComponentResources } from './fetchResources';

export const buildI18nForComponent = async (
  component: HTMLElement,
  defaultResources: ILocalizedComponentResources
): Promise<(resourceKey: string, context?: any) => string> => {
  let resources = defaultResources;
  let locale = 'en';
  if (component !== undefined) {
    locale = getComponentClosestLanguage(component);
    resources = await getComponentI18nResources(
      component,
      defaultResources,
      locale
    );
  }

  const intlFormats = Object.entries(resources).reduce((map, [key, val]) => {
    map.set(key, new IntlMessageFormat(val, locale));
    return map;
  }, new Map<string, IntlMessageFormat>());

  return (resourceKey: string, context?: any): string =>
    intlFormats.get(resourceKey).format(context);
};

export const getComponentI18nResources = async (
  component: HTMLElement,
  defaultResources: ILocalizedComponentResources,
  locale: string
) => {
  const componentName = component.tagName.toLocaleLowerCase();

  let resources: ILocalizedComponentResources;
  if (component['i18n-resources']) {
    resources = component['i18n-resources'];
  } else if (locale !== 'en') {
    try {
      resources = await fetchResources(componentName, locale);
    } catch (_) {
      resources = null;
    }
  }

  if (!resources) {
    resources = defaultResources;
  }

  return resources;
};

const getComponentClosestLanguage = (element: HTMLElement): string => {
  const closestElement = element.closest('[lang]') as HTMLElement;
  return closestElement ? closestElement.lang : 'en';
};
