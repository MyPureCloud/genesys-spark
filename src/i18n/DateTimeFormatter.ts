import locales from './locales.json';

export type FormatOptions = 'full' | 'long' | 'short';

export class DateTimeFormatter {
    locale: typeof locales[number];

    constructor(locale: typeof locales[number]) {
        if (locales.includes(locale)) {
            this.locale = locale;
        } else {
            console.warn(`Locale "${locale}" is not supported. Falling back to English translation.`);
            this.locale = 'en';
        }
    }

    formatDate(datetime: Date, format: FormatOptions) : string {
        return new Intl.DateTimeFormat(this.locale, { dateStyle: format }).format(datetime);
    }

    formatTime(datetime: Date, format: FormatOptions) : string {
        return new Intl.DateTimeFormat(this.locale, { timeStyle: format }).format(datetime);
    }

    formatDateTime(datetime: Date, format: FormatOptions) : string {
        return new Intl.DateTimeFormat(this.locale, { dateStyle: format, timeStyle: format }).format(datetime);
    }
}
