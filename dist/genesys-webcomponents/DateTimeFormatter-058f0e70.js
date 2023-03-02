import { l as locales } from './index-0998c803.js';

/**
 * @class A class that implements the method needed to format dates and times depending on locales
 */
class DateTimeFormatter {
  /**
   * @constructor
   * @param locale A locale string is required to initialize a DateTimeFormatter class instance
   */
  constructor(locale) {
    if (locales.includes(locale)) {
      this.locale = locale;
    }
    else {
      console.warn(`Locale "${locale}" is not supported. Falling back to English translation.`);
      this.locale = 'en';
    }
  }
  /**
   *
   * @param {Date} datetime A Date object that requires formatting
   * @param {GuxDateTimeFormat} format An allowed format string
   * @returns {string} Formatted date string
   */
  formatDate(datetime, format) {
    return datetime.toLocaleDateString(this.locale, { dateStyle: format });
  }
  /**
   *
   * @param {Date} datetime A Date object that requires formatting
   * @param {GuxDateTimeFormat} format An allowed format string
   * @returns {string} Formatted time string
   */
  formatTime(datetime, format) {
    return datetime.toLocaleTimeString(this.locale, { timeStyle: format });
  }
  /**
   *
   * @param {Date} datetime A Date object that requires formatting
   * @param {GuxDateTimeFormat} format An allowed format string
   * @returns {string} Formatted datetime string
   */
  formatDateTime(datetime, format) {
    return datetime.toLocaleString(this.locale, {
      dateStyle: format,
      timeStyle: format
    });
  }
}

export { DateTimeFormatter as D };
