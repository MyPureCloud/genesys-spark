/********************************************************
 * Time Utilities                                       *
 *                                                      *
 * Time parsing and comparison, for ISO 8601 hh:mm:ss   *
 ********************************************************/
/**
 * converts ISO 24hr time to a date that can be used for comparison
 * with other times converted with this function.
 */
export declare function fromIsoTime(timeStr: string): Date;
