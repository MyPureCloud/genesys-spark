import { CalendarModes } from '../../../common-enums';

import { GuxDatepickerIntervalRange } from './gux-datepicker.types';
import * as sparkIntl from '../../../genesys-spark-utils/intl';

export function getCalendarLabels(
  labelString: string,
  mode: string,
  defaultLabels: string[]
) {
  const labels = labelString.split(',').map(label => label.trim());

  if (mode === CalendarModes.Range) {
    return [labels[0] || defaultLabels[0], labels[1] || defaultLabels[1]];
  } else if (mode !== CalendarModes.Range && !labels[0]) {
    return [defaultLabels[2]];
  }

  return [labels[0]];
}

export function isOutOfBoundsDate(value: Date, min: Date, max: Date): boolean {
  return (max && max < value) || (min && min > value);
}

export function getClampedMonthValue(unclampedMonthValue: number): number {
  let clampedMonthValue = unclampedMonthValue;

  while (clampedMonthValue < 0) {
    clampedMonthValue += 12;
  }

  clampedMonthValue = clampedMonthValue % 12;

  return clampedMonthValue;
}

export function incrementDay(delta: number, focusedDateValue: Date): Date {
  let newDay = new Date(focusedDateValue.getTime());

  newDay.setDate(newDay.getDate() + delta);

  if (delta < 0) {
    if (newDay.getDate() > focusedDateValue.getDate()) {
      newDay = new Date(
        focusedDateValue.getFullYear(),
        focusedDateValue.getMonth() + 1,
        0,
        0,
        0,
        0
      );
    }
  } else {
    if (newDay.getDate() < focusedDateValue.getDate()) {
      newDay.setMonth(newDay.getMonth() - 1);
    }
  }

  return newDay;
}

export function incrementMonth(delta: number, focusedDateValue: Date): Date {
  const newMonth = new Date(focusedDateValue.valueOf());
  const newMonthValue = getClampedMonthValue(newMonth.getMonth() + delta);

  newMonth.setMonth(newMonthValue);
  newMonth.setFullYear(focusedDateValue.getFullYear());

  if (newMonth.getMonth() !== newMonthValue) {
    return incrementMonth(delta, incrementDay(-1, focusedDateValue));
  }

  return newMonth;
}

export function incrementYear(delta: number, focusedDateValue: Date): Date {
  const newYear = new Date(focusedDateValue.valueOf());

  newYear.setFullYear(focusedDateValue.getFullYear() + delta);

  return newYear;
}

export function getFormattedDay(date: Date): string {
  return `0${date.getDate().toString()}`.slice(-2);
}

export function getFormattedMonth(date: Date): string {
  return `0${(date.getMonth() + 1).toString()}`.slice(-2);
}

export function getFormattedYear(date: Date, yearFormat: string): string {
  if (yearFormat === 'yyyy') {
    return date.getFullYear().toString();
  } else {
    return date.getFullYear().toString().slice(-2);
  }
}

export function getFormattedDate(date: Date, format: string) {
  const formatSeparator = getFormatSeparator(format);

  const dateString = format
    .split(formatSeparator)
    .map(intervalFormat => {
      switch (intervalFormat[0]) {
        case 'd':
          return getFormattedDay(date);
        case 'm':
          return getFormattedMonth(date);
        case 'y':
          return getFormattedYear(date, intervalFormat);
      }
    })
    .join(formatSeparator);

  return dateString;
}

export function getIntervalLetter(format: string, index: number): string {
  const intervalLetter = format[index];

  if (!intervalLetter || intervalLetter === '/') {
    return format[index - 1];
  }

  return intervalLetter;
}

export function getFormatSeparator(format: string): string {
  return format.match(/\W/)[0];
}

export function getPreviousIntervalRange(
  format: string,
  currentIntervalRange: GuxDatepickerIntervalRange
): GuxDatepickerIntervalRange {
  const intervalOrder = getIntervalOrder(format);
  const currentIntervalLetter = getIntervalLetter(
    format,
    currentIntervalRange.selectionStart
  );
  const currentIntervalOrderIndex = intervalOrder.indexOf(
    currentIntervalLetter
  );
  const newIntervalOrderIndex =
    (currentIntervalOrderIndex + intervalOrder.length - 1) %
    intervalOrder.length;
  const newIntervalLetter = intervalOrder[newIntervalOrderIndex];

  return getIntervalRange(format, newIntervalLetter);
}

export function getNextIntervalRange(
  format: string,
  currentIntervalRange: GuxDatepickerIntervalRange
): GuxDatepickerIntervalRange {
  const intervalOrder = getIntervalOrder(format);
  const currentIntervalLetter = getIntervalLetter(
    format,
    currentIntervalRange.selectionStart
  );
  const currentIntervalOrderIndex = intervalOrder.indexOf(
    currentIntervalLetter
  );
  const newIntervalOrderIndex =
    (currentIntervalOrderIndex + 1) % intervalOrder.length;
  const newIntervalLetter = intervalOrder[newIntervalOrderIndex];

  return getIntervalRange(format, newIntervalLetter);
}

export function getIntervalOrder(format: string): string[] {
  const formatSeperator = getFormatSeparator(format);

  return format
    .split(formatSeperator)
    .reduce((acc, cv) => acc.concat(cv[0]), [] as string[]);
}

export function getIntervalRange(
  format: string,
  intervalLetter: string
): GuxDatepickerIntervalRange {
  const selectionStart = format.indexOf(intervalLetter);
  const selectionEnd = format.lastIndexOf(intervalLetter) + 1;

  return { selectionStart, selectionEnd };
}

export function getFormat(component: HTMLElement): string {
  const fixedDate = new Date('December 31, 2000 15:00:00 UTC+00:00');
  const localizedFixedDate = sparkIntl
    .dateTimeFormat(sparkIntl.determineDisplayLocale(component), {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
    .format(fixedDate);
  const fixedDay = sparkIntl
    .dateTimeFormat(sparkIntl.determineDisplayLocale(component), {
      day: 'numeric'
    })
    .format(fixedDate)
    .match(/(\d+)/)[0];
  const fixedMonth = sparkIntl
    .dateTimeFormat(sparkIntl.determineDisplayLocale(component), {
      month: 'numeric'
    })
    .format(fixedDate)
    .match(/(\d+)/)[0];
  const fixedYear = sparkIntl
    .dateTimeFormat(sparkIntl.determineDisplayLocale(component), {
      year: 'numeric'
    })
    .format(fixedDate)
    .match(/(\d+)/)[0];

  return localizedFixedDate
    .replace(fixedDay, 'dd')
    .replace(fixedMonth, 'mm')
    .replace(fixedYear, 'yyyy');
}
