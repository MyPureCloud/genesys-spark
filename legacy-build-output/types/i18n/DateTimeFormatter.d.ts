/**
 * Allowed formats for formatting dates and times
 */
export type GuxDateTimeFormat = 'full' | 'long' | 'medium' | 'short';
/**
 * @class A class that implements the method needed to format dates and times depending on locales
 */
export declare class DateTimeFormatter {
  locale: string;
  /**
   * @constructor
   * @param locale A locale string is required to initialize a DateTimeFormatter class instance
   */
  constructor(locale: string);
  /**
   *
   * @param {Date} datetime A Date object that requires formatting
   * @param {GuxDateTimeFormat} format An allowed format string
   * @returns {string} Formatted date string
   */
  formatDate(datetime: Date, format: GuxDateTimeFormat): string;
  /**
   *
   * @param {Date} datetime A Date object that requires formatting
   * @param {GuxDateTimeFormat} format An allowed format string
   * @returns {string} Formatted time string
   */
  formatTime(datetime: Date, format: GuxDateTimeFormat): string;
  /**
   *
   * @param {Date} datetime A Date object that requires formatting
   * @param {GuxDateTimeFormat} format An allowed format string
   * @returns {string} Formatted datetime string
   */
  formatDateTime(datetime: Date, format: GuxDateTimeFormat): string;
}
