import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GetI18nValue } from '../../../i18n';
import { GuxCalendarDayOfWeek } from '../gux-calendar/gux-calendar.types';
import { GuxDatepickerMode, GuxDatepickerIntervalRange } from './gux-datepicker.types';
export declare class GuxDatepicker {
  yearFormat: string;
  intervalOrder: string[];
  datepickerElement: HTMLElement;
  inputElement: HTMLInputElement;
  toInputElement: HTMLInputElement;
  calendarElement: HTMLGuxCalendarElement;
  intervalRange: GuxDatepickerIntervalRange;
  focusedField: HTMLInputElement;
  /**
   * Indicates if the user is selecting the range with the mouse.
   * This prevents other events from processing on the input range.
   */
  isSelectingRangeWithMouse: boolean;
  lastIntervalRange: GuxDatepickerIntervalRange;
  lastYear: number;
  startInputId: string;
  endInputId: string;
  private cleanupUpdatePosition;
  i18n: GetI18nValue;
  root: HTMLElement;
  /**
   * The datepicker current value
   */
  value: string;
  /**
   * The datepicker label (can be a single label, or two separated by a comma if it's a range datepicker)
   */
  label: string;
  /**
   * The datepicker number of months displayed
   */
  numberOfMonths: number;
  /**
   * The day of the week to start each calendar row. 1 - Monday, 2 - Tuesday, ... 7 - Sunday
   */
  startDayOfWeek: GuxCalendarDayOfWeek;
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
  mode: GuxDatepickerMode;
  /**
   * The datepicker date format (default to mm/dd/yyyy, or specified)
   */
  format: string;
  /**
   * Disable the input and prevent interactions.
   */
  disabled: boolean;
  /**
   * The datepicker current value
   */
  formattedValue: string;
  minDateDate: Date;
  maxDateDate: Date;
  /**
   * The datepicker current value
   */
  toFormattedValue: string;
  /**
   * Uses styling to control visibility of the calendar element
   */
  active: boolean;
  watchValue(): void;
  watchMinDate(newDate: string): void;
  watchMaxDate(newDate: string): void;
  watchFormat(newFormat: string): void;
  watchActiveCalendar(active: boolean): void;
  /**
   * Triggered when user selects a date
   */
  input: EventEmitter<string>;
  onKeyDown(event: KeyboardEvent): void;
  onMouseDown(event: MouseEvent): void;
  onClickOutside(): void;
  /*********  Event Handlers  **********/
  onInputFocusIn(event: FocusEvent): void;
  onInputFocusOut(): void;
  onInputMouseUp(event: MouseEvent): void;
  /********  Other Methods  **********/
  isInputFieldEvent(event: Event): boolean;
  get initialIntervalRange(): GuxDatepickerIntervalRange;
  getInputFieldFromEvent(event: Event): HTMLInputElement;
  updateIntervalValue(event: KeyboardEvent): void;
  updateSelection(field: HTMLInputElement, text: string): void;
  getCalendarLabels(): string[];
  stringToDate(stringDate: string): Date;
  onCalendarSelect(inputEvent: Event): void;
  setValue(): void;
  setRange(): void;
  typeYearValue(selection: string, key: string): void;
  canSetDate(key: number): boolean;
  getMapAndRegexFromField(value: Date): {
    map: {
      dd: string;
      mm: string;
      yy?: string;
      yyyy?: string;
    };
    regexp: RegExp;
  };
  updateDate(): void;
  /** Selects a range of the input text based on the intervalRange property. */
  setCursorRange(): void;
  toggleCalendar(): void;
  setIntervalRange(intervalRange: GuxDatepickerIntervalRange): void;
  getCombinedFocusedDateValue(): Date;
  getFocusedDateValue(): Date;
  getRangeFocusedDateValue(): Date;
  increment(delta: number): void;
  componentWillLoad(): Promise<void>;
  private runUpdatePosition;
  private updatePosition;
  componentDidUpdate(): void;
  disconnectedCallback(): void;
  renderCalendarToggleButton(): JSX.Element;
  renderCalendar(): JSX.Element;
  renderStartDateField(): JSX.Element;
  renderEndDateField(): JSX.Element;
  render(): JSX.Element;
}
