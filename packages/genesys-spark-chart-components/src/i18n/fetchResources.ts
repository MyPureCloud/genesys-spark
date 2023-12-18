import { getAssetPath } from '@stencil/core';

export interface ILocalizedComponentResources {
  [resourceKey: string]: string;
}

export interface ILocalizedResources {
  [componentName: string]: ILocalizedComponentResources;
}

export interface IResourceCache {
  [locale: string]: ILocalizedResources;
}

const resourceCache: IResourceCache = {};

export const determineFetchUrl = (locale: string = 'en'): string =>
  getAssetPath(`i18n/genesys-webcomponents.i18n.${locale}.json`);

export const fetchResources = async (
  componentName: string,
  locale: string
): Promise<ILocalizedComponentResources> => {
  if (!resourceCache[locale]) {
    const url = determineFetchUrl(locale);
    const response = await fetch(url);
    const resources = await response.json();

    resourceCache[locale] = resources;
  }

  return resourceCache[locale][componentName];
};
