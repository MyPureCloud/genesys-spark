/**
 * Provides an [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
 * object for formatting dates and times. Unlike the native version, `locale` is
 * an optional argument. If not provided, the function will try to determine the
 * locale from the DOM, where it should be set for a11y reasons.
 * @param locale optional locale to use for formatting
 * @param options options to pass to the Intl.DateTimeFormat constructor
 * @returns a new DateTimeFormat
 */
export function dateTimeFormat(
  localeOrOptions: string | Intl.DateTimeFormatOptions,
  options?: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat {
  let locale = undefined;
  if (typeof localeOrOptions === 'string') {
    locale = localeOrOptions;
  } else {
    options = localeOrOptions;
  }

  if (locale != undefined) {
    return new Intl.DateTimeFormat(locale, options);
  } else {
    const userLocale = determineDisplayLocale();
    return new Intl.DateTimeFormat(userLocale, options);
  }
}
/**
 * Provides an [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)
 * object for formatting dates and times. Unlike the native version, `locale` is
 * an optional argument. If not provided, the function will try to determine the
 * locale from the DOM, where it should be set for a11y reasons.
 * @param locale optional locale to use for formatting
 * @param options options to pass to the Intl.RelativeTimeFormat constructor
 * @returns a new RelativeTimeFormat
 */
export function relativeTimeFormat(
  localeOrOptions: string | Intl.RelativeTimeFormatOptions,
  options?: Intl.RelativeTimeFormatOptions
): Intl.RelativeTimeFormat {
  let locale = undefined;
  if (typeof localeOrOptions === 'string') {
    locale = localeOrOptions;
  } else {
    options = localeOrOptions;
  }

  if (locale != undefined) {
    return new Intl.RelativeTimeFormat(locale, options);
  } else {
    const userLocale = determineDisplayLocale();
    return new Intl.RelativeTimeFormat(userLocale, options);
  }
}

/**
 * Makes a best effort to return the locale that should be used for a given element
 * by checking language tags on ancestors. If no element is provided, it will
 * start with the document's <body> tag. If no locale can be found, it will use
 * the browser's locale preference. It will also try to add a region to regionless
 * locales when there is a partial match with the browser's locale.
 * @returns a locale string (e.g. 'en-US', 'en', 'de-DE', etc)
 */
export function determineDisplayLocale(
  element: HTMLElement = document.body
): string {
  const domLocale = element.closest<HTMLElement>('[lang]')?.lang;
  if (!domLocale || browserHasRegionData(domLocale)) {
    // If we can't find a locale in the DOM, or we find a locale without a region that matches the
    // users's browser locale, use the browser locale.
    return navigator.language;
  } else {
    return domLocale;
  }
}

/**
 * Returns true if the provided locale only has a language, but the user's
 * browser settings have the same language with a locale.
 * @param localeString The locale to check
 * @returns true if the region can be guessed from the browser settings.
 */
function browserHasRegionData(localeString: string): boolean {
  return (
    localeString.length == 2 &&
    navigator.language.startsWith(`${localeString}-`)
  );
}
