import { capitalizeFirstLetter } from '@utils/string/capitalize-first-letter';

export function getFirstOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
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

export function getDateAsMonthYear(date: Date, locale: string) {
  return capitalizeFirstLetter(
    date.toLocaleDateString(locale, { year: 'numeric', month: 'long' })
  );
}

function rotateArray(arr: string[], n: number): string[] {
  const times = n % arr.length;
  return arr.concat(arr.splice(0, times));
}

export function firstDateInMonth(
  month: number,
  year: number,
  startDayOfWeek: number
) {
  const startDate = new Date(year, month, 1, 0, 0, 0, 0);
  const firstDayOfMonth = startDate.getDay();
  const firstDayOffset = (-1 * (startDayOfWeek - firstDayOfMonth - 7)) % 7;
  const firstDateInMonth = new Date(
    startDate.getTime() - firstDayOffset * (86400 * 1000)
  );
  firstDateInMonth.setHours(0, 0, 0, 0);

  return firstDateInMonth;
}
