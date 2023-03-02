export interface ILocalizedComponentResources {
  [resourceKey: string]: string;
}
export interface ILocalizedResources {
  [componentName: string]: ILocalizedComponentResources;
}
export interface IResourceCache {
  [locale: string]: ILocalizedResources;
}
export declare const determineFetchUrl: (locale?: string) => string;
export declare const fetchResources: (componentName: string, locale: string) => Promise<ILocalizedComponentResources>;
