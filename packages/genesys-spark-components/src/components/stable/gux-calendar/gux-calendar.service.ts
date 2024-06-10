import { capitalizeFirstLetter } from '@utils/string/capitalize-first-letter';
import * as sparkIntl from '../../../genesys-spark-utils/intl';
// Remove with this ticket https://inindca.atlassian.net/browse/COMUI-2598
import { useRegionalDates } from '../../../i18n/use-regional-dates';

export function firstDateInMonth(
  month: number,
  year: number,
  startDayOfWeek: number
) {
  const startDate = new Date(year, month, 1, 1, 0, 0, 0);
  const firstDayOfMonth = startDate.getDay();
  const firstDayOffset = (-1 * (startDayOfWeek - firstDayOfMonth - 7)) % 7;

  return new Date(startDate.getTime() - firstDayOffset * (86400 * 1000));
}

export function getWeekdays(
  locale: Intl.LocalesArgument,
  startDayOfWeek: number
): string[] {
  const days: string[] = [];
  // Sunday
  const day = new Date(1970, 0, 4);

  for (let i = 0; i < 7; i++) {
    const weekday = day.toLocaleString(locale, { weekday: 'narrow' });
    days.push(weekday);
    day.setDate(day.getDate() + 1);
  }

  return shiftArray(days, startDayOfWeek);
}

function shiftArray(arr: string[], n: number): string[] {
  const times = n > arr.length ? n % arr.length : n;

  return arr.concat(arr.splice(0, times));
}

export function getOffsetMonthDate(baseDate: Date, monthDelta: number) {
  const date = new Date(baseDate);
  date.setDate(1);
  date.setMonth(date.getMonth() + monthDelta);

  return date;
}

export function getDateMonthAndYearString(date: Date, locale: string) {
  if (useRegionalDates()) {
    return capitalizeFirstLetter(
      sparkIntl
        .dateTimeFormat(locale, {
          year: 'numeric',
          month: 'long'
        })
        .format(date)
    );
  } else {
    return capitalizeFirstLetter(
      date.toLocaleDateString(locale, { year: 'numeric', month: 'long' })
    );
  }
}

const getDatePatternForPart = (part: Intl.DateTimeFormatPart) => {
  switch (part.type) {
    case 'day':
      return 'd'.repeat(part.value.length);
    case 'month':
      return 'm'.repeat(part.value.length);
    case 'year':
      return 'y'.repeat(part.value.length);
    case 'literal':
      return part.value;
    default:
      console.log('Unsupported date part', part);
      return '';
  }
};

/**
 * Get the date format pattern for the given locale.
 * @example
 *     getDatePlaceholderForLocale(date, 'en-AU');   // dd/mm/yyyy
 *     getDatePlaceholderForLocale(date, 'en-US');   // m/d/yyyy
 */
export function getDatePlaceholderForLocale(date: Date, locale: string) {
  // const locale = (new Intl.NumberFormat()).resolvedOptions().locale;
  return new Intl.DateTimeFormat(locale)
    .formatToParts(date)
    .map(getDatePatternForPart)
    .join('');
}
