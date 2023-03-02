import { ILocalizedComponentResources } from './fetchResources';
type I18nValueContext = {
  [key: string]: string | number;
};
export type GetI18nValue = (resourceKey: string, context?: I18nValueContext) => string;
export declare function buildI18nForComponent(component: HTMLElement, defaultResources: ILocalizedComponentResources, parentComponent?: string): Promise<GetI18nValue>;
export declare function getComponentI18nResources(component: HTMLElement, defaultResources: ILocalizedComponentResources, locale: string, parentComponent?: string): Promise<ILocalizedComponentResources>;
export declare function getDesiredLocale(element: HTMLElement): string;
type WeekStartDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export declare function getStartOfWeek(locale?: string): WeekStartDayOfWeek;
export {};
