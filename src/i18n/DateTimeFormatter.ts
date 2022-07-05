import locales from './locales.json';

export type FormatOptions = 'full' | 'long' | 'medium' | 'short';

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
        return datetime.toLocaleDateString(this.locale, { dateStyle: format });
    }

    formatTime(datetime: Date, format: FormatOptions) : string {
        return datetime.toLocaleTimeString(this.locale, { timeStyle: format });
    }

    formatDateTime(datetime: Date, format: FormatOptions) : string {
        return datetime.toLocaleString(this.locale, { dateStyle: format, timeStyle: format });
    }
}
