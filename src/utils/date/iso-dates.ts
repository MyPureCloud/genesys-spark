export function asIsoDate(date: Date): string {
  const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
  const dateStr = date.getDate().toString().padStart(2, '0');

  return `${date.getFullYear()}-${monthStr}-${dateStr}`;
}

export function asIsoDateRange(date1: Date, date2: Date) {
  const [start, end] = sortedDates([date1, date2]);

  return `${asIsoDate(start)}/${asIsoDate(end)}`;
}

export function fromIsoDate(isoDate: string): Date {
  const [yearStr, monthStr, dayStr] = isoDate.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1; // zero-indexed month
  const day = parseInt(dayStr, 10);

  return new Date(year, month, day);
}

export function fromIsoDateRange(isoDateRange: string): [Date, Date] {
  const [startIsoDate, endIsoDate] = isoDateRange.split('/');

  return [fromIsoDate(startIsoDate), fromIsoDate(endIsoDate)];
}

function sortedDates(dates: Date[]): Date[] {
  return dates.sort((d1, d2) => (d1 < d2 ? -1 : 1));
}
