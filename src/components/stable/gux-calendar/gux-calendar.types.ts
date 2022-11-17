import { CalendarModes } from '../../../common-enums';

export type GuxCalendarMode = CalendarModes.Single | CalendarModes.Range;

export interface IDateElement {
  class: string;
  date: Date;
  selected: boolean;
  disabled: boolean;
  hidden: boolean;
}

export type GuxCalendarDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
