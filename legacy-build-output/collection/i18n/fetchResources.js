import { getAssetPath } from '@stencil/core';
const resourceCache = {};
export const determineFetchUrl = (locale = 'en') => getAssetPath(`i18n/genesys-webcomponents.i18n.${locale}.json`);
export const fetchResources = async (componentName, locale) => {
  if (!resourceCache[locale]) {
    const url = determineFetchUrl(locale);
    const response = await fetch(url);
    const resources = await response.json();
    resourceCache[locale] = resources;
  }
  return resourceCache[locale][componentName];
};
