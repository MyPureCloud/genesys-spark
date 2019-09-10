import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State
} from '@stencil/core';
import { CalendarModes, KeyCode } from '../../../common-enums';
import {
  addClassToElements,
  removeClassToElements
} from '../../../common-utils';
import { IDateElement } from './gux-calendar-constants';

@Component({
  styleUrl: 'gux-calendar.less',
  tag: 'gux-calendar'
})
export class GuxCalendar {
  @Element()
  root: HTMLStencilElement;
  /**
   * The calendar current selected date
   */
  @Prop({ mutable: true })
  value: Date | [Date, Date] = new Date();
  /**
   * The calendar first week day (default to 0 (sunday))
   */
  @Prop()
  firstDayOfWeek: number = 0;
  /**
   * The calendar locale (default to browser locale)
   */
  @Prop()
  locale: string = navigator.languages
    ? navigator.languages[0]
    : navigator.language;
  /**
   * The calendar mode (can be single or range)
   */
  @Prop()
  mode: string = CalendarModes.Single;
  /**
   * The calendar number of months displayed
   */
  @Prop()
  numberOfMonths: number = 1;

  @State()
  previewValue: Date = new Date();

  isSelecting: boolean = false;

  /**
   * Triggered when user selects a date
   */
  @Event()
  input: EventEmitter<Date | [Date, Date]>;
  onInput() {
    this.input.emit(this.value);
  }

  /**
   * Sets new value and rerender the calendar
   */
  @Method()
  async setValue(value: Date | [Date, Date]) {
    if (this.mode === CalendarModes.Range) {
      if (value[0] > value[1]) {
        this.value = [
          new Date(value[1].getTime()),
          new Date(value[0].getTime())
        ];
      } else {
        this.value = [
          new Date(value[0].getTime()),
          new Date(value[1].getTime())
        ];
      }
      this.previewValue = new Date(this.value[0].getTime());
    } else {
      this.value = new Date((value as Date).getTime());
      this.previewValue = new Date((value as Date).getTime());
    }
  }

  /**
   * Focus the preview date
   */
  @Method()
  async focusPreviewDate() {
    const target: HTMLTableCellElement = this.root.querySelector(
      `td[data-date="${this.previewValue.getTime()}"]`
    );
    if (target) {
      target.focus();
    }
  }

  incrementPreviewDateByMonth(month: number) {
    this.previewValue = new Date(
      this.previewValue.getFullYear(),
      this.previewValue.getMonth() + month,
      this.previewValue.getDate(),
      0,
      0,
      0
    );
    // Wait for render before focusing preview date
    setTimeout(() => {
      this.focusPreviewDate();
    });
  }

  getMonthLabel(index: number) {
    const month = new Date(this.previewValue.getTime());
    month.setMonth(month.getMonth() + index);
    const monthName = month.toLocaleString(this.locale, { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }

  firstDateInMonth(month: number, year: number) {
    const startDate = new Date(year, month, 1, 0, 0, 0, 0);
    const firstDayOfMonth = startDate.getDay();
    const firstDayOffset =
      (-1 * (this.firstDayOfWeek - firstDayOfMonth - 7)) % 7;
    return new Date(startDate.getTime() - firstDayOffset * (86400 * 1000));
  }

  generateDatesFrom(
    month: number,
    startDate: Date,
    length: number
  ): IDateElement[] {
    const arr = [];
    const currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      0,
      0,
      0,
      0
    );
    for (let i = 0; i < length; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        0,
        0,
        0,
        0
      );
      const classes = [];
      let hidden = false;
      if (date.getMonth() !== month) {
        classes.push('not-in-month');
        if (this.mode === CalendarModes.Range) {
          classes.push('hidden');
          hidden = true;
        }
      }
      let isSelected = false;
      if (this.mode === CalendarModes.Range) {
        const fromTimeStamp = new Date(
          this.value[0].getFullYear(),
          this.value[0].getMonth(),
          this.value[0].getDate()
        ).getTime();
        const toTimeStamp = new Date(
          this.value[1].getFullYear(),
          this.value[1].getMonth(),
          this.value[1].getDate()
        ).getTime();
        if (
          date.getTime() === fromTimeStamp ||
          date.getTime() === toTimeStamp
        ) {
          isSelected = true;
          classes.push('selected');
        }
      } else {
        const selectedTimestamp = new Date(
          (this.value as Date).getFullYear(),
          (this.value as Date).getMonth(),
          (this.value as Date).getDate()
        ).getTime();
        if (date.getTime() === selectedTimestamp) {
          isSelected = true;
          classes.push('selected');
        }
      }
      arr.push({
        class: classes.join(' '),
        date,
        hidden,
        selected: isSelected
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return arr;
  }

  create2DArray(arr: any[], chunkSize: number): IDateElement[][] {
    const result = [];
    for (let i = 0; i < chunkSize - 1; i++) {
      const week = arr.slice(i * chunkSize, i * chunkSize + chunkSize);
      if (this.weekShouldBeDisplayed(week)) {
        result.push(week);
      }
    }
    return result;
  }

  weekShouldBeDisplayed(week: IDateElement[]): boolean {
    const hasNonHiddenDate = week.find(date => {
      return !date.hidden;
    });
    return week.length && !!hasNonHiddenDate;
  }

  getMonthDays(index: number): IDateElement[][] {
    const month = new Date(this.previewValue.getTime());
    month.setMonth(month.getMonth() + index);
    const monthIndex = month.getMonth();
    const year = month.getFullYear();
    const startDate = this.firstDateInMonth(monthIndex, year);
    const datesArray = this.generateDatesFrom(monthIndex, startDate, 42);
    return this.create2DArray(datesArray, 7);
  }

  addDays(date: Date, days: number): Date {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  getAllDatesElements(): HTMLTableDataCellElement[] {
    const targets = this.root.querySelectorAll('td');
    return Array.from(targets);
  }

  getAllSelectableDatesElements(): HTMLTableDataCellElement[] {
    const targets = this.root.querySelectorAll(
      'td[tabindex="0"]'
    ) as NodeListOf<HTMLTableDataCellElement>;
    return Array.from(targets);
  }

  getRangeDatesElements(from: Date, to: Date): HTMLTableCellElement[] {
    const elements = [];
    let array;
    if (to < from) {
      array = this.getRangeDates(to, from);
    } else {
      array = this.getRangeDates(from, to);
    }
    for (const date of array) {
      const target: HTMLTableCellElement = this.root.querySelector(
        `td[data-date="${date.getTime()}"]:not(.hidden)`
      );
      if (target) {
        elements.push(target);
      }
    }
    return elements;
  }

  getRangeDates(from: Date, to: Date): Date[] {
    const array = [];
    let currentDate = from;
    while (currentDate <= to) {
      array.push(new Date(currentDate));
      currentDate = this.addDays(currentDate, 1);
    }
    return array;
  }

  onDateClick(date: Date) {
    if (this.mode !== CalendarModes.Range) {
      this.setValue(date);
      this.onInput();
    } else {
      if (!this.isSelecting) {
        // First click
        removeClassToElements(this.getAllDatesElements(), 'hovered');
        this.isSelecting = true;
        this.value = [new Date(date.getTime()), new Date(date.getTime())];
        this.previewValue = new Date(date.getTime());
      } else {
        // Second click
        this.isSelecting = false;
        const target: HTMLTableCellElement = this.root.querySelector(
          `td[data-date="${date.getTime()}"]`
        );
        if (target) {
          target.classList.add('selected');
        }
        this.updateRangeElements();
        this.setValue([date, this.value[0]]);
        this.onInput();
      }
    }
    this.focusPreviewDate();
  }

  onDateMouseEnter(date: Date) {
    if (this.mode === CalendarModes.Range && this.isSelecting) {
      this.value[1] = date;
      this.updateRangeElements();
    }
  }

  updateRangeElements() {
    removeClassToElements(this.getAllDatesElements(), 'hovered');
    const rangeElements = this.getRangeDatesElements(
      this.value[0],
      this.value[1]
    );
    addClassToElements(rangeElements, 'hovered');
  }

  onKeyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KeyCode.Enter:
      case KeyCode.Space:
        this.onDateClick(this.previewValue);
        break;
      case KeyCode.Down:
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() + 7)
        );
        this.onDateMouseEnter(this.previewValue);
        this.focusPreviewDate();
        break;
      case KeyCode.Up:
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() - 7)
        );
        this.onDateMouseEnter(this.previewValue);
        this.focusPreviewDate();
        break;
      case KeyCode.Left:
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() - 1)
        );
        this.onDateMouseEnter(this.previewValue);
        this.focusPreviewDate();
        break;
      case KeyCode.Right:
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() + 1)
        );
        this.onDateMouseEnter(this.previewValue);
        this.focusPreviewDate();
        break;
      case KeyCode.PageUp:
        this.incrementPreviewDateByMonth(1);
        this.onDateMouseEnter(this.previewValue);
        break;
      case KeyCode.PageDown:
        this.incrementPreviewDateByMonth(-1);
        this.onDateMouseEnter(this.previewValue);
        break;
    }
  }

  shiftArray(arr: string[], n: number): string[] {
    const times = n > arr.length ? n % arr.length : n;
    return arr.concat(arr.splice(0, times));
  }

  get weekdays(): string[] {
    const days = [];
    // Sunday
    const day = new Date(1970, 0, 4);
    for (let i = 0; i < 7; i++) {
      const weekday = day.toLocaleString(this.locale, { weekday: 'long' });
      days.push(weekday.charAt(0).toUpperCase());
      day.setDate(day.getDate() + 1);
    }
    return this.shiftArray(days, this.firstDayOfWeek);
  }

  componentWillLoad() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (this.mode === CalendarModes.Range) {
      this.value = [now, now];
    } else {
      this.value = now;
    }
    this.previewValue = now;
  }

  componentDidUpdate() {
    this.updateRangeElements();
  }

  renderMonthHeader() {
    return (
      <div class="month-list">
        {Array.from(Array(this.numberOfMonths).keys()).map(index => (
          <label>
            {this.getMonthLabel(index)} {this.previewValue.getFullYear()}
          </label>
        ))}
      </div>
    );
  }

  renderCalendarTable(index) {
    return (
      <table cellPadding="2">
        <tr>
          {this.weekdays.map(day => (
            <th>{day}</th>
          ))}
        </tr>
        {this.getMonthDays(index).map(week => (
          <tr>
            {week.map(day => (
              <td
                tabindex={day.selected ? '0' : '-1'}
                class={day.class}
                aria-hidden={day.hidden ? 'true' : 'false'}
                data-date={day.date.getTime()}
                onClick={() => this.onDateClick(day.date)}
                onMouseEnter={() => this.onDateMouseEnter(day.date)}
                onKeyDown={e => this.onKeyDown(e)}
              >
                {day.date.getDate()}
              </td>
            ))}
          </tr>
        ))}
      </table>
    );
  }

  render() {
    return (
      <div class="gux-calendar" tabindex="-1">
        <div class="header" tabindex="-1">
          <button
            type="button"
            class="genesys-icon-chevron-left"
            onClick={() => this.incrementPreviewDateByMonth(-1)}
            tabindex="-1"
            aria-hidden="true"
          />
          {this.renderMonthHeader()}
          <button
            type="button"
            class="genesys-icon-chevron-right"
            onClick={() => this.incrementPreviewDateByMonth(1)}
            tabindex="-1"
            aria-hidden="true"
          />
        </div>
        <div class="content">
          {Array.from(Array(this.numberOfMonths).keys()).map(index =>
            this.renderCalendarTable(index)
          )}
        </div>
      </div>
    );
  }
}
