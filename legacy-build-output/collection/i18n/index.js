import IntlMessageFormat from 'intl-messageformat';
import { fetchResources } from './fetchResources';
// If this import is failing, you should run the i18n script to generate the list of locales
import locales from './locales.json';
import startOfWeekDataUntyped from './start-of-week.json';
import { getClosestElement } from '../utils/dom/get-closest-element';
const DEFAULT_LOCALE = 'en';
export async function buildI18nForComponent(component, defaultResources, parentComponent) {
  let resources = defaultResources;
  let locale = 'en';
  if (component !== undefined) {
    locale = getDesiredLocale(component);
    resources = await getComponentI18nResources(component, defaultResources, locale, parentComponent);
  }
  const intlFormats = Object.entries(resources).reduce((map, [key, val]) => {
    map.set(key, new IntlMessageFormat(val, locale));
    return map;
  }, new Map());
  const defaultFormats = Object.entries(defaultResources).reduce((map, [key, val]) => {
    map.set(key, new IntlMessageFormat(val, DEFAULT_LOCALE));
    return map;
  }, new Map());
  return (resourceKey, context) => {
    var _a, _b;
    let i18nString = (_a = intlFormats.get(resourceKey)) === null || _a === void 0 ? void 0 : _a.format(context);
    if (!i18nString) {
      i18nString = (_b = defaultFormats.get(resourceKey)) === null || _b === void 0 ? void 0 : _b.format(context);
      console.warn(`No localized string available for "${resourceKey}-${i18nString}" for "${locale}" locale. Falling back to English translation.`);
    }
    return i18nString;
  };
}
export async function getComponentI18nResources(component, defaultResources, locale, parentComponent) {
  const componentName = parentComponent ||
    component.tagName.toLocaleLowerCase().replace(/-beta$/, '');
  let resources;
  if (component['i18n-resources']) {
    resources = component['i18n-resources'];
  }
  else if (locale !== DEFAULT_LOCALE) {
    try {
      resources = await fetchResources(componentName, locale);
    }
    catch (_) {
      resources = null;
    }
  }
  if (!resources) {
    resources = defaultResources;
  }
  return resources;
}
export function getDesiredLocale(element) {
  const locale = findLocaleInDom(element);
  const lang = locale.split(/[_-]/)[0];
  if (locales.indexOf(locale) >= 0) {
    return locale;
  }
  else if (locales.indexOf(lang) >= 0) {
    return lang;
  }
  else {
    return DEFAULT_LOCALE;
  }
}
function findLocaleInDom(element) {
  const closestElement = getClosestElement('[lang]', element);
  if (closestElement && closestElement.lang) {
    return closestElement.lang.toLowerCase();
  }
  else {
    return DEFAULT_LOCALE;
  }
}
export function getStartOfWeek(locale = DEFAULT_LOCALE) {
  const startOfWeekData = startOfWeekDataUntyped;
  return (startOfWeekData[locale]
    ? startOfWeekData[locale]
    : startOfWeekData[DEFAULT_LOCALE]);
}
