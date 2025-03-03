import IntlMessageFormat from 'intl-messageformat';
import { fetchResources, ILocalizedComponentResources } from './fetchResources';
// If this import is failing, you should run the i18n script to generate the list of locales
import locales from './locales.json';
import startOfWeekDataUntyped from './start-of-week.json';
import { getClosestElement } from '@utils/dom/get-closest-element';

type StartOfWeek = { [key: string]: number };
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

type WeekStartDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
/**
 * Get the 0-indexed first day of the week for a given locale, where 0 represents
 * Sunday. This should be considered deprecated, as newer browser APIs use
 * a different day-of-week indexing scheme, provided by `getFirstDayOfWeek`
 * @param locale
 * @returns A number representing the first day of the week where 0 is Sunday
 */
export function getStartOfWeek(
  locale: string = DEFAULT_LOCALE
): WeekStartDayOfWeek {
  const startOfWeekData: StartOfWeek = startOfWeekDataUntyped;
  return (
    startOfWeekData[locale]
      ? startOfWeekData[locale]
      : startOfWeekData[DEFAULT_LOCALE]
  ) as WeekStartDayOfWeek;
}

/**
 * Get the 1-indexed first day of the week for a given locale, where 1 represents
 * Monday. This is the preferred format, as it aligns with the scheme used in the
 * upcoming browser Temporal APIs.
 * @param locale
 * @returns A number representing the first day of the week where 1 is Monday
 */
type FirstDayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export function getFirstDayOfWeek(
  locale: string = DEFAULT_LOCALE
): FirstDayOfWeek {
  // Eventually, we can hopefully convert all of this to:
  // `new Locale(locale).getWeekInfo().firstDay`
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo
  const legacyFirstDay = getStartOfWeek(locale);
  // This looks crazy, but it's the following:
  // - Shift legacy days "left" 1 place: `legacyFirstDay - 1`
  // - Take a true mathematical modulo: `((n % d) + d) % d` (where d is 7)
  //    to get back to the correct range
  // - Add 1 to make the list 1 - indexed.
  return (((((legacyFirstDay - 1) % 7) + 7) % 7) + 1) as FirstDayOfWeek;
}
