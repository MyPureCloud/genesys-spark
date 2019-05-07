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
import { buildI18nForComponent } from '../../i18n';
import { IDateElement } from './gux-calendar-constants';
import i18nStrings from './gux-calendar.i18n.json';

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
  value: Date = new Date();
  /**
   * The calendar current from range value
   */
  @Prop({ mutable: true })
  fromValue: Date = new Date();
  /**
   * The calendar current to range value
   */
  @Prop({ mutable: true })
  toValue: Date = new Date();
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

  shouldFocus: boolean = false;
  shouldSetTabIndex: boolean = false;

  isSelecting: boolean = false;

  i18n: (resourceKey: string, context?: any) => string;

  /**
   * Triggered user selects a date
   */
  @Event()
  change: EventEmitter;
  onChange(value: Date | Date[]) {
    this.change.emit(value);
  }

  /**
   * Sets new value and rerender the calendar
   */
  @Method()
  setValue(value: Date | Date[]) {
    if (this.mode === CalendarModes.Range) {
      this.fromValue = new Date(value[0].getTime());
      this.toValue = new Date(value[1].getTime());
      this.previewValue = new Date(value[0].getTime());
    } else {
      this.value = new Date((value as Date).getTime());
      this.previewValue = new Date((value as Date).getTime());
    }
  }

  /**
   * Focus the preview date
   */
  @Method()
  focusPreviewDate() {
    const target: HTMLTableCellElement = this.root.querySelector(
      `td[data-date="${this.previewValue.getTime()}"]`
    );
    if (target) {
      target.focus();
    }
  }

  incrementPreviewDateByMonth(month: number) {
    this.previewValue = new Date(
      this.previewValue.setMonth(this.previewValue.getMonth() + month)
    );
    this.updateTabIndex(false);
  }

  updateTabIndex(willFocus: boolean) {
    for (const element of this.getAllSelectableDatesElements()) {
      element.setAttribute('tabindex', '-1');
    }
    const target: HTMLTableCellElement = this.root.querySelector(
      `td[data-date="${this.previewValue.getTime()}"]`
    );
    if (target && !target.classList.contains('not-in-month')) {
      target.setAttribute('tabindex', '0');
      if (willFocus) {
        target.focus();
      }
    } else {
      this.shouldSetTabIndex = true;
      if (willFocus) {
        this.shouldFocus = true;
      }
    }
  }

  getMonth(index: number) {
    const month = new Date(this.previewValue.getTime());
    month.setMonth(month.getMonth() + index);
    const monthName = month.toLocaleString(this.locale, { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }

  firstDateInMonth(month: number, year: number) {
    const startDate = new Date(year, month, 1);
    const firstDayOfMonth = startDate.getUTCDay();
    const firstDayOffset =
      (-1 * (this.firstDayOfWeek - firstDayOfMonth - 7)) % 7;
    return new Date(startDate.getTime() - firstDayOffset * (86400 * 1000));
  }

  weeksInMonth(month: number, year: number, monthDays: number): number {
    const firstOfMonth = new Date(year, month, 1);
    const firstWeekDay = (firstOfMonth.getDay() - this.firstDayOfWeek + 7) % 7;
    return Math.ceil((firstWeekDay + monthDays) / 7);
  }

  generateDatesFrom(
    month: number,
    startTimestamp: number,
    length: number
  ): IDateElement[] {
    const arr = [];
    const selectedTimestamp = new Date(
      this.value.getFullYear(),
      this.value.getMonth(),
      this.value.getDate()
    ).getTime();
    const fromTimeStamp = new Date(
      this.fromValue.getFullYear(),
      this.fromValue.getMonth(),
      this.fromValue.getDate()
    ).getTime();
    const toTimeStamp = new Date(
      this.toValue.getFullYear(),
      this.toValue.getMonth(),
      this.toValue.getDate()
    ).getTime();
    for (let i = 0; i < length; i++) {
      const increment = 86400 * 1000 * i;
      const timestamp = startTimestamp + increment;
      const date = new Date(timestamp);
      const classes = ['unselectable'];
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
        if (
          date.getTime() === fromTimeStamp ||
          date.getTime() === toTimeStamp
        ) {
          isSelected = true;
          classes.push('selected');
        }
      } else {
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
    const startTime = this.firstDateInMonth(monthIndex, year);
    const monthDays = new Date(year, monthIndex + 1, 0).getDate();
    const totalWeeks = this.weeksInMonth(monthIndex, year, monthDays);
    const totalDays = monthDays + (totalWeeks * 7 - monthDays);
    const datesArray = this.generateDatesFrom(
      monthIndex,
      startTime.getTime(),
      totalDays
    );
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
      this.onChange(date);
    } else {
      if (!this.isSelecting) {
        // First click
        removeClassToElements(this.getAllDatesElements(), 'hovered');
        this.isSelecting = true;
        this.fromValue = date;
      } else {
        // Second click
        this.isSelecting = false;
        if (this.fromValue > date) {
          this.toValue = new Date(this.fromValue);
          this.fromValue = date;
        } else {
          this.toValue = date;
        }
        const target: HTMLTableCellElement = this.root.querySelector(
          `td[data-date="${date.getTime()}"]`
        );
        if (target) {
          target.classList.add('selected');
        }
        this.updateRangeElements();
        this.onChange([this.fromValue, this.toValue]);
      }
    }
  }

  onDateMouseEnter(date: Date) {
    if (this.mode === CalendarModes.Range && this.isSelecting) {
      this.toValue = date;
      this.updateRangeElements();
    }
  }

  updateRangeElements() {
    removeClassToElements(this.getAllDatesElements(), 'hovered');
    const rangeElements = this.getRangeDatesElements(
      this.fromValue,
      this.toValue
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
        break;
      case KeyCode.Up:
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() - 7)
        );
        this.onDateMouseEnter(this.previewValue);
        break;
      case KeyCode.Left:
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() - 1)
        );
        this.onDateMouseEnter(this.previewValue);
        break;
      case KeyCode.Right:
        this.previewValue = new Date(
          this.previewValue.setDate(this.previewValue.getDate() + 1)
        );
        this.onDateMouseEnter(this.previewValue);
        break;
      case KeyCode.End:
        this.incrementPreviewDateByMonth(1);
        this.onDateMouseEnter(this.previewValue);
        break;
      case KeyCode.Home:
        this.incrementPreviewDateByMonth(-1);
        this.onDateMouseEnter(this.previewValue);
        break;
    }
    this.updateTabIndex(true);
  }

  get weekdays(): string[] {
    const days = [
      this.i18n('sunday'),
      this.i18n('monday'),
      this.i18n('tuesday'),
      this.i18n('wednesday'),
      this.i18n('thursday'),
      this.i18n('friday'),
      this.i18n('saturday')
    ];
    return days.concat(days.splice(0, this.firstDayOfWeek));
  }

  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, i18nStrings);
    this.value.setHours(0, 0, 0, 0);
    this.fromValue.setHours(0, 0, 0, 0);
    this.toValue.setHours(0, 0, 0, 0);
    this.previewValue.setHours(0, 0, 0, 0);
  }

  componentDidUpdate() {
    if (this.shouldSetTabIndex) {
      const target: HTMLTableCellElement = this.root.querySelector(
        `td[data-date="${this.previewValue.getTime()}"]`
      );
      if (target) {
        target.setAttribute('tabindex', '0');
        if (this.shouldFocus) {
          target.focus();
          this.shouldFocus = false;
        }
      }
      this.shouldSetTabIndex = false;
    }
    this.updateRangeElements();
  }

  renderMonthHeader() {
    return (
      <div class="month-list">
        {Array.from(Array(this.numberOfMonths).keys()).map(index => (
          <label>
            {this.getMonth(index)} {this.previewValue.getFullYear()}
          </label>
        ))}
      </div>
    );
  }

  renderCalendarTable(index) {
    return (
      <table cellPadding="0">
        <tr>
          {this.weekdays.map(day => (
            <th>{day.charAt(0)}</th>
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
            tabindex="0"
            aria-hidden="true"
          />
          {this.renderMonthHeader()}
          <button
            type="button"
            class="genesys-icon-chevron-right"
            onClick={() => this.incrementPreviewDateByMonth(1)}
            tabindex="0"
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
