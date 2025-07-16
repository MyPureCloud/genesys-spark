declare function fullLocale(localeBaseName: string): Intl.Locale;
declare function fullLocaleString(localeBaseName: string): string;
/**
 * Provides an [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
 * object for formatting dates and times. Unlike the native version, `locale` is
 * an optional argument. If not provided, the function will try to determine the
 * locale from the DOM, where it should be set for a11y reasons.
 * @param locale optional locale to use for formatting
 * @param options options to pass to the Intl.DateTimeFormat constructor
 * @returns a new DateTimeFormat
 */
declare function dateTimeFormat(localeOrOptions: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat;
/**
 * Provides an [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)
 * object for formatting dates and times. Unlike the native version, `locale` is
 * an optional argument. If not provided, the function will try to determine the
 * locale from the DOM, where it should be set for a11y reasons.
 * @param locale optional locale to use for formatting
 * @param options options to pass to the Intl.RelativeTimeFormat constructor
 * @returns a new RelativeTimeFormat
 */
declare function relativeTimeFormat(localeOrOptions: string | Intl.RelativeTimeFormatOptions, options?: Intl.RelativeTimeFormatOptions): Intl.RelativeTimeFormat;
/**
 * Makes a best effort to return the locale that should be used for a given element
 * by checking language tags on ancestors. If no element is provided, it will
 * start with the document's <body> tag. If no locale can be found, it will use
 * the browser's locale preference. It will also try to add a region to regionless
 * locales when there is a partial match with the browser's locale.
 * @returns a locale string (e.g. 'en-US', 'en', 'de-DE', etc)
 */
declare function determineDisplayLocale(element?: HTMLElement): string;
declare function getFormat(locale: string): string;

declare const intl_dateTimeFormat: typeof dateTimeFormat;
declare const intl_determineDisplayLocale: typeof determineDisplayLocale;
declare const intl_fullLocale: typeof fullLocale;
declare const intl_fullLocaleString: typeof fullLocaleString;
declare const intl_getFormat: typeof getFormat;
declare const intl_relativeTimeFormat: typeof relativeTimeFormat;
declare namespace intl {
  export {
    intl_dateTimeFormat as dateTimeFormat,
    intl_determineDisplayLocale as determineDisplayLocale,
    intl_fullLocale as fullLocale,
    intl_fullLocaleString as fullLocaleString,
    intl_getFormat as getFormat,
    intl_relativeTimeFormat as relativeTimeFormat,
  };
}

interface registerOptions {
    /**
     * Optional base URL to use for component assets like JS and CSS (i.e. where dist/genesys-webcomponents is hosted).
     * This is meant for testing. In production, assets should be loaded from the default CDN location.
     */
    assetsUrl?: string;
    theme?: 'flare' | 'legacy';
}
/**
 * TODO
 */
declare function loadSparkFonts(opts?: registerOptions): Promise<void>;
/**
 * Loads the spark web components, as well as required CSS and fonts from a
 * shared CDN. Performance can be optimized by pre-loading fonts in static HTML.
 *
 * @returns a promise that succeeds if the component script and styles
 * load successfully. It is not recommended to wait on this promise or to stop
 * application bootstrap if it rejects. Its primary use should be for logging
 * unexpected failures.
 */
declare function registerSparkComponents(opts?: registerOptions): Promise<void>;
/**
 * TODO
 */
declare function registerSparkChartComponents(opts?: registerOptions): Promise<void>;

export { intl as Intl, loadSparkFonts, registerSparkChartComponents, registerSparkComponents };
