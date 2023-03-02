import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxCalendarDayOfWeek, GuxCalendarMode, IDateElement } from './gux-calendar.types';
export declare class GuxCalendar {
  root: HTMLElement;
  /**
   * The calendar current selected date
   */
  value: string;
  /**
   * The min date selectable
   */
  minDate: string;
  /**
   * The max date selectable
   */
  maxDate: string;
  /**
   * The calendar mode (can be single or range)
   */
  mode: GuxCalendarMode;
  /**
   * The calendar number of months displayed
   */
  numberOfMonths: number;
  /**
   * The day of the week to start each calendar row. ISO weekday number ie 1 - Monday, 2 - Tuesday, ... 7 - Sunday
   */
  startDayOfWeek: GuxCalendarDayOfWeek;
  previewValue: Date;
  selectingDate: Date | null;
  /**
   * Triggered when user selects a date
   */
  input: EventEmitter<string>;
  private locale;
  emitInput(): void;
  /**
   * Sets new value and rerender the calendar
   */
  setValue(value: Date | [Date, Date]): Promise<void>;
  /**
   * Focus the preview date
   */
  focusPreviewDate(): Promise<void>;
  /**
   * Reset calendar view to show first selected date
   */
  resetCalendarView(value: Date): Promise<void>;
  incrementPreviewDateByMonth(increment: number): void;
  setValueAndEmit(value: Date | [Date, Date]): Promise<void>;
  outOfBounds(date: Date): boolean;
  generateDatesFrom(month: number, startDate: Date, length: number): IDateElement[];
  create2DArray(arr: IDateElement[], chunkSize: number): IDateElement[][];
  weekShouldBeDisplayed(week: IDateElement[]): boolean;
  getMonthDays(index: number): IDateElement[][];
  addDays(date: Date, days: number): Date;
  getAllDatesElements(): HTMLTableCellElement[];
  getAllSelectableDatesElements(): HTMLTableCellElement[];
  getRangeDatesElements(from: Date, to: Date): HTMLTableCellElement[];
  getRangeDates(from: Date, to: Date): Date[];
  onDateClick(date: Date): Promise<void>;
  onDateMouseEnter(date: Date): void;
  updateRangeElements(): void;
  onKeyDown(event: KeyboardEvent): Promise<void>;
  componentWillLoad(): void;
  componentDidRender(): void;
  renderMonthHeader(): JSX.Element;
  renderCalendarTable(index: number): JSX.Element;
  render(): JSX.Element;
}
