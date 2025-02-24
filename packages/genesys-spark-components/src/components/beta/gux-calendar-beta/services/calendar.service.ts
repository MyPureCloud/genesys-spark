import { Temporal } from '@js-temporal/polyfill';

/**
 * Given a date, return the first day of the month that date is in.
 */
export function getFirstOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
  return Temporal.PlainDate.from({
    day: 1,
    month: date.month,
    year: date.year
  });
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

  return rotateArray(days, startDayOfWeek);
}

export function localizedYearMonth(
  date: Temporal.PlainDate,
  locale: string
): string {
  return date.toLocaleString(locale, { year: 'numeric', month: 'long' });
}

function rotateArray(arr: string[], n: number): string[] {
  const times = n % arr.length;
  return arr.concat(arr.splice(0, times));
}

/**
 * Given a starting date and the first day of the week, find the first date of
 * the week of the provided date. For example, February 1st 2025 is a Saturday.
 * If the first day of the week is considered Monday (1), this function would
 * return a date of 2027-01-27.
 * @param date The date we want to find the start of the week for
 * @param startDayOfWeek The day that should be considered the first day of the week
 * @returns The first day of the first week of the provided month
 */
export function firstDateInWeek(
  date: Temporal.PlainDate,
  startDayOfWeek: number
): Temporal.PlainDate {
  let dayDelta = startDayOfWeek - date.dayOfWeek;
  if (dayDelta > 0) {
    dayDelta = dayDelta - 7;
  }
  const interval = Temporal.Duration.from({ days: dayDelta });
  return date.add(interval);
}
