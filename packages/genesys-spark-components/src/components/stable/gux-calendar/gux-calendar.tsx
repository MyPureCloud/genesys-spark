import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Method,
  Prop,
  State
} from '@stencil/core';

import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import {
  asIsoDateRange,
  asIsoDate,
  fromIsoDateRange,
  fromIsoDate
} from '@utils/date/iso-dates';
import {
  addClassToElements,
  removeClassToElements
} from '@utils/dom/manipulate-elements-classes';

import { trackComponent } from '@utils/tracking/usage';
import { CalendarModes } from '../../../common-enums';
import { getDesiredLocale, getStartOfWeek } from '../../../i18n';

import {
  firstDateInMonth,
  getWeekdays,
  getOffsetMonthDate,
  getDateMonthAndYearString
} from './gux-calendar.service';
import {
  GuxCalendarDayOfWeek,
  GuxCalendarMode,
  IDateElement
} from './gux-calendar.types';

@Component({
  styleUrl: 'gux-calendar.less',
  tag: 'gux-calendar',
  shadow: true
})
export class GuxCalendar {
  @Element()
  root: HTMLElement;

  /**
   * The calendar current selected date
   */
  @Prop({ mutable: true })
  value: string = '';

  /**
   * The min date selectable
   */
  @Prop()
  minDate: string = '';

  /**
   * The max date selectable
   */
  @Prop()
  maxDate: string = '';

  /**
   * The calendar mode (can be single or range)
   */
  @Prop()
  mode: GuxCalendarMode = CalendarModes.Single;

  /**
   * The calendar number of months displayed
   */
  @Prop()
  numberOfMonths: number = 1;

  /**
   * The day of the week to start each calendar row. ISO weekday number ie 1 - Monday, 2 - Tuesday, ... 7 - Sunday
   */
  @Prop({ mutable: true })
  startDayOfWeek: GuxCalendarDayOfWeek;

  @State()
  previewValue: Date = new Date();

  @State()
  selectingDate: Date | null = null;

  /**
   * Triggered when user selects a date
   */
  @Event()
  calendarSelect: EventEmitter<string>;

  private locale: string = 'en';

  emitCalendarSelect() {
    this.calendarSelect.emit(this.value);
  }

  /**
   * Sets new value and rerender the calendar
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setValue(value: Date | [Date, Date]) {
    if (this.mode === CalendarModes.Range && value instanceof Array) {
      const [date1, date2] = value;
      this.value = asIsoDateRange(date1, date2); // sorts
      this.previewValue = fromIsoDateRange(this.value)[0];
    } else {
      const selected = value as Date;
      this.value = asIsoDate(selected);
      this.previewValue = selected;
    }
  }

  /**
   * Focus the preview date
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async focusPreviewDate() {
    const target: HTMLTableCellElement = this.root.shadowRoot.querySelector(
      `td[data-date="${this.previewValue.getTime()}"]`
    );
    if (target) {
      target.focus();
    }
  }

  /**
   * Reset calendar view to show first selected date
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async resetCalendarView(value: Date): Promise<void> {
    this.previewValue = value;
  }

  incrementPreviewDateByMonth(increment: number) {
    this.previewValue = new Date(
      this.previewValue.getFullYear(),
      this.previewValue.getMonth() + increment,
      15, // Don't use the day from the old value, because we'll skip a month on the 31st
      0,
      0,
      0
    );
    // Wait for render before focusing preview date
    afterNextRenderTimeout(() => {
      void this.focusPreviewDate();
    });
  }

  async setValueAndEmit(value: Date | [Date, Date]) {
    await this.setValue(value);
    this.emitCalendarSelect();
  }

  outOfBounds(date: Date): boolean {
    return (
      (this.maxDate !== '' && fromIsoDate(this.maxDate) < date) ||
      (this.minDate !== '' && fromIsoDate(this.minDate) > date)
    );
  }

  generateDatesFrom(
    month: number,
    startDate: Date,
    length: number
  ): IDateElement[] {
    const arr: IDateElement[] = [];
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

      let disabled = false;
      let hidden = false;
      if (date.getMonth() !== month) {
        classes.push('gux-not-in-month');
        disabled = true;
        if (this.mode === CalendarModes.Range) {
          classes.push('gux-hidden');
          hidden = true;
        }
      }

      if (this.outOfBounds(date)) {
        classes.push('gux-disabled');
        disabled = true;
      }

      let isSelected = false;
      if (this.mode === CalendarModes.Range) {
        const [start, end] = fromIsoDateRange(this.value);
        const fromTimeStamp = start.getTime();
        const toTimeStamp = end.getTime();
        if (date.getTime() === fromTimeStamp) {
          isSelected = true;
          classes.push('gux-selected');
          classes.push('gux-start-date');
        } else if (date.getTime() === toTimeStamp) {
          isSelected = true;
          classes.push('gux-selected');
          classes.push('gux-end-date');
        }
      } else {
        const selectedTimestamp = fromIsoDate(this.value).getTime();
        if (date.getTime() === selectedTimestamp) {
          isSelected = true;
          classes.push('gux-selected');
        }
      }
      arr.push({
        class: classes.join(' '),
        date,
        hidden,
        disabled,
        selected: isSelected
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return arr;
  }

  create2DArray(arr: IDateElement[], chunkSize: number): IDateElement[][] {
    const result: IDateElement[][] = [];
    for (let i = 0; i < chunkSize - 1; i++) {
      const week = arr.slice(i * chunkSize, i * chunkSize + chunkSize);
      if (this.weekShouldBeDisplayed(week)) {
        result.push(week);
      }
    }
    return result;
  }

  isFocusableDate(day: IDateElement): boolean {
    return day.selected || this.previewValue.getTime() === day.date.getTime();
  }

  weekShouldBeDisplayed(week: IDateElement[]): boolean {
    const hasNonHiddenDate = week.find(date => {
      return !date.hidden;
    });
    return week.length && !!hasNonHiddenDate;
  }

  getMonthDays(index: number): IDateElement[][] {
    const month = new Date(this.previewValue.getTime());
    month.setDate(1);
    month.setMonth(month.getMonth() + index);
    const monthIndex = month.getMonth();
    const year = month.getFullYear();
    const startDate = firstDateInMonth(monthIndex, year, this.startDayOfWeek);
    const datesArray = this.generateDatesFrom(monthIndex, startDate, 42);
    return this.create2DArray(datesArray, 7);
  }

  addDays(date: Date, days: number): Date {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  getAllDatesElements(): HTMLTableCellElement[] {
    const targets = this.root.shadowRoot.querySelectorAll('td');
    return Array.from(targets);
  }

  getAllSelectableDatesElements(): HTMLTableCellElement[] {
    const targets = this.root.shadowRoot.querySelectorAll('td[tabindex="0"]');
    return Array.from(targets) as HTMLTableCellElement[];
  }

  getRangeDatesElements(from: Date, to: Date): HTMLTableCellElement[] {
    const elements: HTMLTableCellElement[] = [];
    let rangeDates: Date[];
    if (to < from) {
      rangeDates = this.getRangeDates(to, from);
    } else {
      rangeDates = this.getRangeDates(from, to);
    }
    for (const date of rangeDates) {
      const target: HTMLTableCellElement = this.root.shadowRoot.querySelector(
        `td[data-date="${date.getTime()}"]:not(.gux-hidden)`
      );
      if (target) {
        elements.push(target);
      }
    }
    return elements;
  }

  getRangeDates(from: Date, to: Date): Date[] {
    const array: Date[] = [];
    let currentDate = from;
    while (currentDate <= to) {
      array.push(new Date(currentDate));
      currentDate = this.addDays(currentDate, 1);
    }
    return array;
  }

  async onDateClick(date: Date): Promise<void> {
    if (!this.outOfBounds(date)) {
      if (this.mode !== CalendarModes.Range) {
        await this.setValueAndEmit(date);
      } else {
        if (this.selectingDate === null) {
          // First click
          removeClassToElements(this.getAllDatesElements(), 'gux-hovered');
          this.selectingDate = new Date(date.valueOf());
          this.value = asIsoDateRange(date, date);
        } else {
          // Second click
          const target: HTMLTableCellElement =
            this.root.shadowRoot.querySelector(
              `td[data-date="${date.getTime()}"]`
            );
          if (target) {
            target.classList.add('gux-selected');
          }
          this.updateRangeElements();
          await this.setValueAndEmit([this.selectingDate, date]);
          this.previewValue = date;
          this.selectingDate = null;
        }
      }
    }
  }

  onDateMouseEnter(date: Date) {
    if (this.mode === CalendarModes.Range && this.selectingDate !== null) {
      this.value = asIsoDateRange(date, this.selectingDate);
      this.updateRangeElements();
    }
  }

  updateRangeElements() {
    if (this.mode === CalendarModes.Range) {
      removeClassToElements(this.getAllDatesElements(), 'gux-hovered');
      const [start, end] = fromIsoDateRange(this.value);
      const rangeElements = this.getRangeDatesElements(start, end);
      addClassToElements(rangeElements, 'gux-hovered');
    }
  }

  async onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        await this.onDateClick(this.previewValue);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() + 7)
        );
        this.onDateMouseEnter(this.previewValue);
        afterNextRenderTimeout(() => {
          void this.focusPreviewDate();
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() - 7)
        );
        this.onDateMouseEnter(this.previewValue);
        afterNextRenderTimeout(() => {
          void this.focusPreviewDate();
        });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() - 1)
        );
        this.onDateMouseEnter(this.previewValue);
        afterNextRenderTimeout(() => {
          void this.focusPreviewDate();
        });
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() + 1)
        );
        this.onDateMouseEnter(this.previewValue);
        afterNextRenderTimeout(() => {
          void this.focusPreviewDate();
        });
        break;
      case 'PageUp':
        this.incrementPreviewDateByMonth(1);
        this.onDateMouseEnter(this.previewValue);
        break;
      case 'PageDown':
        this.incrementPreviewDateByMonth(-1);
        this.onDateMouseEnter(this.previewValue);
        break;
    }
  }

  componentWillLoad() {
    trackComponent(this.root, { variant: this.mode });
    this.locale = getDesiredLocale(this.root);

    this.startDayOfWeek = this.startDayOfWeek || getStartOfWeek(this.locale);

    if (!this.value) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (this.mode === CalendarModes.Range) {
        this.value = asIsoDateRange(now, now);
      } else {
        this.value = asIsoDate(now);
      }
    }
    this.previewValue = fromIsoDate(this.value);
  }

  componentDidRender() {
    this.updateRangeElements();
  }

  renderMonthHeader() {
    return (
      <div class="gux-month-list">
        {Array.from(Array(this.numberOfMonths).keys()).map(index => {
          const offsetMonthDate = getOffsetMonthDate(this.previewValue, index);
          return (
            <label>
              {getDateMonthAndYearString(offsetMonthDate, this.locale)}
            </label>
          ) as JSX.Element;
        })}
      </div>
    ) as JSX.Element;
  }

  renderCalendarTable(index: number) {
    return (
      <table>
        <tr>
          {getWeekdays(this.locale, this.startDayOfWeek).map(
            day => (<th>{day}</th>) as JSX.Element
          )}
        </tr>
        {this.getMonthDays(index).map(
          week =>
            (
              <tr>
                {week.map(
                  day =>
                    (
                      <td
                        tabindex={this.isFocusableDate(day) ? '0' : '-1'}
                        class={day.class}
                        aria-hidden={day.hidden ? 'true' : 'false'}
                        aria-disabled={day.disabled ? 'true' : 'false'}
                        data-date={day.date.getTime()}
                        onClick={() => void this.onDateClick(day.date)}
                        onMouseEnter={() => this.onDateMouseEnter(day.date)}
                        onKeyDown={e => void this.onKeyDown(e)}
                      >
                        {day.date.getDate()}
                        <span class="gux-sr-only">
                          {getDateMonthAndYearString(day.date, this.locale)}
                        </span>
                      </td>
                    ) as JSX.Element
                )}
              </tr>
            ) as JSX.Element
        )}
      </table>
    ) as JSX.Element;
  }

  render() {
    return (
      <div class="gux-calendar">
        <div class="gux-header">
          <button
            type="button"
            class="gux-left"
            onClick={() => this.incrementPreviewDateByMonth(-1)}
            tabindex="-1"
            aria-hidden="true"
          >
            <gux-icon decorative icon-name="chevron-small-left"></gux-icon>
          </button>
          {this.renderMonthHeader()}
          <button
            type="button"
            class="gux-right"
            onClick={() => this.incrementPreviewDateByMonth(1)}
            tabindex="-1"
            aria-hidden="true"
          >
            <gux-icon decorative icon-name="chevron-small-right"></gux-icon>
          </button>
        </div>
        <div class="gux-content">
          {Array.from(Array(this.numberOfMonths).keys()).map(index =>
            this.renderCalendarTable(index)
          )}
        </div>
      </div>
    ) as JSX.Element;
  }
}
