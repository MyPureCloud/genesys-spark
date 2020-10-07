import { CalendarModes } from '../../../common-enums';

export type GuxCalendarMode = CalendarModes.Single | CalendarModes.Range;

export interface IDateElement {
  class: string;
  date: Date;
  selected: boolean;
  hidden: boolean;
}
