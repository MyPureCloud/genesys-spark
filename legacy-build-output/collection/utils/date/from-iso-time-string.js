/********************************************************
 * Time Utilities                                       *
 *                                                      *
 * Time parsing and comparison, for ISO 8601 hh:mm:ss   *
 ********************************************************/
// Format should always adhere to: http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
const DATE_STRING_PREFIX = '1978-09-23T';
const DATE_STRING_POSTFIX = 'Z'; // always use UTC
/**
 * converts ISO 24hr time to a date that can be used for comparison
 * with other times converted with this function.
 */
export function fromIsoTime(timeStr) {
  return new Date(DATE_STRING_PREFIX + timeStr.trim() + DATE_STRING_POSTFIX);
}
