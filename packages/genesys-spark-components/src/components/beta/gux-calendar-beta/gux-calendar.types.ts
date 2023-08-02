export interface IWeekElement {
  dates: IDateElement[];
}

export interface IDateElement {
  date: Date;
  disabled: boolean;
  selected: boolean;
  inCurrentMonth: boolean;
  tabIndex: string;
  isCurrentDate: boolean;
  focused: boolean;
}

export type GuxCalendarDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
