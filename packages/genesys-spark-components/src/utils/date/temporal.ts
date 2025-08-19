/**
 * Helpers for working with the temporal polyfill. We should be able to remove
 * these once Temporal lands in browsers.
 */
import { Temporal } from '@js-temporal/polyfill';

/**
 * Formats a PlainDate Temporal polyfill object. Once browser support for Temporal
 * lands, this can be removed, as the `Intl` formatters should handle Temporal
 * entities natively at that point.
 *
 * @param formatter The formatter to use - should be derived from from our intl utilities
 * @param date The date to format
 * @returns a formatted date string
 */
export function formatPlainDate(
  formatter: Intl.DateTimeFormat,
  date: Temporal.PlainDate
): string {
  const formatDate = new Date();
  // These setters interpret the input as if they came from the current browser
  // timezone, so they will not result in day shifts on format to timezones which
  // would happen if we passed the values in via the Date constructor, where
  // they are interpreted as UTC
  formatDate.setFullYear(date.year);

  // Set date to 1 first to avoid rollover issues when changing month
  formatDate.setMonth(date.month - 1, 1);
  formatDate.setDate(date.day);
  formatDate.setHours(12);
  formatDate.setMinutes(0);
  formatDate.setSeconds(0);
  formatDate.setMilliseconds(0);

  return formatter.format(formatDate);
}
