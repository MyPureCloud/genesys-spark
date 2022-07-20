import locales from './locales.json';

/**
 * Allowed formats for formatting dates and times 
 */
export type GuxDateTimeFormat = 'full' | 'long' | 'medium' | 'short';

/**
 * @class A class that implements the method needed to format dates and times depending on locales
 */
export class DateTimeFormatter {
    locale: typeof locales[number];

    /**
     * @constructor  
     * @param locale A locale string is required to initialize a DateTimeFormatter class instance
     */
    constructor(locale: typeof locales[number]) {
        if (locales.includes(locale)) {
            this.locale = locale;
        } else {
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
    formatDate(datetime: Date, format: GuxDateTimeFormat) : string {
        return datetime.toLocaleDateString(this.locale, { dateStyle: format });
    }

    /**
     * 
     * @param {Date} datetime A Date object that requires formatting
     * @param {GuxDateTimeFormat} format An allowed format string 
     * @returns {string} Formatted time string
     */
    formatTime(datetime: Date, format: GuxDateTimeFormat) : string {
        return datetime.toLocaleTimeString(this.locale, { timeStyle: format });
    }

    /**
     * 
     * @param {Date} datetime A Date object that requires formatting
     * @param {GuxDateTimeFormat} format An allowed format string 
     * @returns {string} Formatted datetime string
     */
    formatDateTime(datetime: Date, format: GuxDateTimeFormat) : string {
        return datetime.toLocaleString(this.locale, { dateStyle: format, timeStyle: format });
    }
}
