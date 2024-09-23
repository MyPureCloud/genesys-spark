# Spark Regional Date Time Support

## Spark Components support regional date functionality

- Spark components have been updated to support regional date functionality in latest versions of **V3** and **V4**.
- The new updates in Spark are internally feature toggled so that we can release the new date/time regional at the same time for all apps
- There are two methods for enabling the new regional date features in Spark components: a global variable, and a feature toggle in the form of a cookie
  o To test the new Spark component regional date formatting in your application, set the global variable on the window object:

      ```
      window['GUX_OPTIONS_enableRegionalDates']= true
      ```

## Feature Toggling

- All regional date functionality should be feature toggled. We want to avoid confusing customers with different date time behavior across applications
- The Spark component functionality is internally feature toggled and when it is time to GA this feature, will be globally enabled via a cookie set in web directory
- If your app resides outside of web directory, this cookie should still take effect after the user navigates to web directory the first time
- All regional date functionality that is outside of the Spark components should be feature toggled behind the feature toggle for the epic, `PURE-2946_InternationalizationOfDatesAndTimes`

## Using components for new date/time regional features

All Spark components that relate to date or time leverage support the new regional date/time features. Here is a list of all the components that are affected by these changes:

- gux-calendar
- gux-date
- gux-datepicker
- gux-date-time
- gux-month-picker
- gux-month-calendar
- gux-time
- gux-time-picker

If you already use these components in your application and are using the latest versions of either V3 or V4, please verify that the new updates are working as expected in your application. As mentioned above, verifying these changes can be done by settting the global variable on the window object: `window['GUX_OPTIONS_enableRegionalDates']= true`
If you see any issues when verifying these new features, please create a COMUI ticket or reach out in the Common UI Development room.

## New Spark Utilities:

In addition to updating the Spark components, we have also added new utilities to the `genesys-spark` package to assist with date and time formatting. These utilities standardize date and time formatting practices in Spark components and can serve as utility functions for applications. The utilities are proxies to the browser’s `Intl` object, and will determine the user’s region from the browser configuration of the current language setting if a region is not specified.

Importing the Intl helpers from `genesys-spark` is only possible in `v4`, due to limitations in how Stencil builds packages in `v3`, which makes export of JS APIs not possible. If the Intl helpers are needed in your application but you are still using v3 of genesys-spark-components, it is recommend to import v4 of `genesys-spark` in addition. Using `v4` of genesys-spark alongside `v3` of genesys-spark-components will be reliable as long as registerSparkComponents is not called, and since the genesys-spark package does not contain any component code, using both should not affect the bundle size in your applications.

### dateTimeFormat

- Provides an [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) object for formatting dates and times.

* Unlike the native version, `locale` is an optional argument. If not provided, the function will try to determine the locale from the DOM, where it should be set for a11y reasons.
* param `locale` (optional) -- locale to use for formatting
* param `options` options to pass to the Intl.DateTimeFormat constructor`
* `@returns a new DateTimeFormat`

Example (adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat):

```
import * as sparkIntl from 'genesys-spark';

const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
// Results below assume UTC timezone - your results may vary

// Specify default date formatting for language (locale)
console.log(new sparkIntl.dateTimeFormat('en-US').format(date));
// Expected output: "12/20/2020"

// Specify default date formatting for language with a fallback language (in this case Indonesian)
console.log(new sparkIntl.dateTimeFormat(['ban', 'id']).format(date));
// Expected output: "20/12/2020"

// Specify date and time format using "style" options (i.e. full, long, medium, short)
console.log(
 new sparkIntl.dateTimeFormat('en-GB', {
   dateStyle: 'full',
   timeStyle: 'long',
   timeZone: 'Australia/Sydney',
 }).format(date),
);
// Expected output: "Sunday, 20 December 2020 at 14:23:16 GMT+11"

```

### relativeTimeFormat

- Provides an [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat) object for formatting dates and times.

- Unlike the native version, `locale` is an optional argument. If not provided, the function will try to determine the locale from the DOM, where it should be set for a11y reasons.

- param `locale` (optional) -- locale to use for formatting

- param `options` -- options to pass to the Intl.RelativeTimeFormat constructor

- returns a new RelativeTimeFormat

Code Example

```
import * as sparkIntl from 'genesys-spark';

const rtf1 = new sparkIntl.relativeTimeFormat({ style: 'short' });

console.log(rtf1.format(-1, 'day'));
// Expected output (if language in DOM in English): "1 day ago"

```

### determineDisplayLocale

- Makes a best effort to return the locale that should be used for a given element by checking language tags on ancestors. If no element is provided, it will start with the document's <body> tag. If no locale can be found, it will use the browser's locale preference. It will also try to add a region to regionless locales when there is a partial match with the browser's locale.
- returns a locale string (e.g. 'en-US', 'en', 'de-DE', etc)

Code Example

```
 import * as sparkIntl from 'genesys-spark';

sparkIntl.determineDisplayLocale(this.root)
```

## Additional Changes:

We have made an additional change in the gux-time-picker component to remove hardcoded 24 hour format default for certain languages (AR, KO, zh-CN and zh-TW). The hour format of these locals will now be determined by the Intl date and time utilities COMUI-2890 This change is also behind the enableRegionalDates toggle.

## FAQ

### Q. What is the purpose behind this effort?

A. Customers can specify their Genesys Cloud language, but in many cases this Genesys Cloud language does not have regional specificity. For instance, Genesys users can specify their language as English, but cannot specify the region they reside in (such as UK or US). Date and time formats can vary per region. Using the Spark components or the Spark Utils supplements the Genesys Cloud language with the user’s regional data that is set in the browser.

### Q. What is the expected behavior for users?

The current languages used in Genesys Cloud consist of two general types: those with and those without regional variants. Here is a list of the current Genesys Cloud supported languages. In this list, the hyphenated entries represent languages with a regional variant that we support.
'ar', 'cs', 'da', 'de', 'en', 'es-es', 'es', 'fi', 'fr-ca', 'fr', 'he', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt-br', 'pt-pt', 'ru', 'sv', 'th', 'tr', uk', 'zh-cn', 'zh-tw'
For the supported languages without a regional variant, such as EN (English) here is the expected behavior for users

| Genesys Cloud Language | Browser Language    | Date Time Format                                                        |
| ---------------------- | ------------------- | ----------------------------------------------------------------------- |
| English (EN)           | German (any region) | EN - Genesys Cloud language takes precedence over browser configuration |
| English (EN)           | English, UK         | EN-GB - Genesys Cloud language supplemented with Browser region         |

For the Chinese supported Genesys Cloud languages, we have exceptions for more specific regional Chinese variants as follows:

| Genesys Cloud Language      | Browser Language                      | Date Time Format                                                |
| --------------------------- | ------------------------------------- | --------------------------------------------------------------- |
| Traditional Chinese (ZH-TW) | Hong Kong Chinese                     | ZH-HK Hong Kong regional variant of Traditional Chinese is used |
| Traditional Chinese (ZH-TW) | Any other region other than Hong Kong | ZH-TW                                                           |
| Simplified Chinese (ZH-CN)  | Singapore Chinese                     | ZN-SG Singapore regional variant of Simplified Chinese is used  |
| Simplified Chinese (ZH-CN)  | Any region other than Singapore       | ZN-CN                                                           |

For the supported languages that have a regional variant, such as ‘fr-ca’, the region from the browser does not take effect. The Genesys Cloud language and region takes precedence over the browser region.

### Q. I’m not using Spark components to format my dates, I’m using something else (Moment.js, etc)

You can use the Spark utils for formatting dates. The Spark Utils are proxies to the [browser’s Intl object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl), and will determine the user’s region from the browser configuration of the current language setting if a region is not specified. There are multiple tutorials online detailing how to replace libraries such as Moment.js using Intl

### Q. I’m not upgraded V4 of Genesys Spark Components yet

Spark Component updates have been backported to `V3`. The Spark Utils can be imported separately using `v4` of `genesys-spark`.
