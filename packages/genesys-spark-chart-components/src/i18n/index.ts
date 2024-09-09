import IntlMessageFormat from 'intl-messageformat';
import { fetchResources, ILocalizedComponentResources } from './fetchResources';
// If this import is failing, you should run the i18n script to generate the list of locales
import locales from './locales.json';
import { getClosestElement } from '@utils/dom/get-closest-element';

type I18nValueContext = { [key: string]: string | number };

export type GetI18nValue = (
  resourceKey: string,
  context?: I18nValueContext
) => string;

const DEFAULT_LOCALE = 'en';

export async function buildI18nForComponent(
  component: HTMLElement,
  defaultResources: ILocalizedComponentResources,
  parentComponent?: string
): Promise<GetI18nValue> {
  let resources = defaultResources;
  let locale = 'en';

  if (component !== undefined) {
    locale = getDesiredLocale(component);
    resources = await getComponentI18nResources(
      component,
      defaultResources,
      locale,
      parentComponent
    );
  }

  const intlFormats = Object.entries(resources).reduce((map, [key, val]) => {
    map.set(key, new IntlMessageFormat(val, locale));
    return map;
  }, new Map<string, IntlMessageFormat>());

  const defaultFormats = Object.entries(defaultResources).reduce(
    (map, [key, val]) => {
      map.set(key, new IntlMessageFormat(val, DEFAULT_LOCALE));
      return map;
    },
    new Map<string, IntlMessageFormat>()
  );

  return (resourceKey: string, context?: I18nValueContext): string => {
    let i18nString = intlFormats.get(resourceKey)?.format(context) as string;
    if (!i18nString) {
      i18nString = defaultFormats.get(resourceKey)?.format(context) as string;
      console.warn(
        `No localized string available for "${resourceKey}-${i18nString}" for "${locale}" locale. Falling back to English translation.`
      );
    }
    return i18nString;
  };
}

export async function getComponentI18nResources(
  component: HTMLElement,
  defaultResources: ILocalizedComponentResources,
  locale: string,
  parentComponent?: string
): Promise<ILocalizedComponentResources> {
  const componentName =
    parentComponent ||
    component.tagName.toLocaleLowerCase().replace(/-beta$/, '');

  let resources: ILocalizedComponentResources;
  if (component['i18n-resources']) {
    resources = component['i18n-resources'];
  } else if (locale !== DEFAULT_LOCALE) {
    try {
      resources = await fetchResources(componentName, locale);
    } catch {
      resources = null;
    }
  }

  if (!resources) {
    resources = defaultResources;
  }

  return resources;
}

export function getDesiredLocale(element: HTMLElement): string {
  const locale = findLocaleInDom(element);
  const lang = locale.split(/[_-]/)[0];

  if (locales.indexOf(locale) >= 0) {
    return locale;
  } else if (locales.indexOf(lang) >= 0) {
    return lang;
  } else {
    return DEFAULT_LOCALE;
  }
}

function findLocaleInDom(element: HTMLElement): string {
  const closestElement = getClosestElement('[lang]', element) as HTMLElement;

  if (closestElement && closestElement.lang) {
    return closestElement.lang.toLowerCase();
  } else {
    return DEFAULT_LOCALE;
  }
}
