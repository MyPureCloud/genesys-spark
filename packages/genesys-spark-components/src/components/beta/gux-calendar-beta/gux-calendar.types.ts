import { Temporal } from '@js-temporal/polyfill';

export interface IWeekElement {
  dates: IDateElement[];
}

export interface IDateElement {
  date: Temporal.PlainDate;
  disabled: boolean;
  selected: boolean;
  inCurrentMonth: boolean;
  isCurrentDate: boolean;
  focused: boolean;
}

export type GuxCalendarDayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
