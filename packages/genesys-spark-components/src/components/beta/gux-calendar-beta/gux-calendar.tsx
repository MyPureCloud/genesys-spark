import {
  Component,
  Element,
  forceUpdate,
  h,
  JSX,
  Method,
  Prop,
  State
} from '@stencil/core';
import { IWeekElement, GuxCalendarDayOfWeek } from './gux-calendar.types';
import {
  getWeekdays,
  getFirstOfMonth,
  localizedYearMonth,
  firstDateInWeek,
  AttributeSynchronizer
} from './services/calendar.service';
import {
  getDesiredLocale,
  getFirstDayOfWeek,
  buildI18nForComponent,
  GetI18nValue
} from '../../../i18n';
import translationResources from './i18n/en.json';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { logError } from '@utils/error/log-error';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { Temporal } from '@js-temporal/polyfill';

@Component({
  styleUrl: 'gux-calendar.scss',
  tag: 'gux-calendar-beta',
  shadow: true
})
export class GuxCalendar {
  @Element()
  root: HTMLElement;

  // The start day of the week based on user's locale
  // Some locales will have the start day of the week be different than others
  @Prop({ mutable: true })
  startDayOfWeek: GuxCalendarDayOfWeek;

  @Method()
  async guxForceUpdate(): Promise<void> {
    forceUpdate(this.root);
  }

  /**
   * The date that receives focus when selecting a specific day. This also
   * determines what month is currently displayed. The corresponding element
   * does not necessarily have browser focus at any given time, since focus
   * may be on other parts of the component.
   */
  @State()
  private focusDate: Temporal.PlainDate = Temporal.Now.plainDateISO();

  @State()
  min: Temporal.PlainDate | null;

  @State()
  max: Temporal.PlainDate | null;

  @State()
  disabled: boolean = false;

  private attributeSynchronizer: AttributeSynchronizer<
    HTMLInputElement,
    GuxCalendar
  >;

  private locale: string = 'en';

  private i18n: GetI18nValue;

  // Total number of dates that will display for each month in the calendar
  private MONTH_DATE_COUNT: number = 42;

  private get slottedInput(): HTMLInputElement {
    return this.root.querySelector('input[type="date"]');
  }

  async componentWillLoad(): Promise<void> {
    if (!this.slottedInput) {
      logError(
        this.root,
        'You must slot a date input element like so: input[type="date"].'
      );
    }

    this.locale = getDesiredLocale(this.root);

    // Set start day of week
    this.startDayOfWeek = this.startDayOfWeek || getFirstDayOfWeek(this.locale);

    this.i18n = await buildI18nForComponent(this.root, translationResources);

    const selectedDate = this.getSelectedDate();
    if (selectedDate) {
      this.focusDate = selectedDate;
    }

    this.attributeSynchronizer = new AttributeSynchronizer<
      HTMLInputElement,
      GuxCalendar
    >({
      readFrom: this.slottedInput,
      writeTo: this,
      mappings: {
        min: (val: string) => {
          return val ? Temporal.PlainDate.from(val) : undefined;
        },
        max: (val: string) => {
          return val ? Temporal.PlainDate.from(val) : undefined;
        },
        disabled: val => val
      }
    });
  }

  onSlotChange() {
    this.attributeSynchronizer.setSourceElement(this.slottedInput);
  }

  async disconnectedCallback() {
    this.attributeSynchronizer.disconnect();
  }

  private detectDayClick(event: MouseEvent) {
    if (!((event.target as HTMLElement).tagName === 'GUX-DAY-BETA')) {
      return;
    }
    const dayElement = event.target as HTMLGuxDayBetaElement;
    const selectedDate = Temporal.PlainDate.from(dayElement.day);
    this.selectDate(selectedDate);
    event.stopPropagation();
  }

  /**
   * Finds the `gux-day` element corresponding to the provided
   * date string.
   * @param dateStr The date to find in ISO format
   */
  private getGuxDayForDate(dateStr: string): HTMLElement | null {
    return this.root.shadowRoot.querySelector(`.day-${dateStr}`);
  }

  private selectDate(date: Temporal.PlainDate): void {
    if (this.isInvalidDate(date)) {
      return;
    }
    const newDateStr = date.toString();
    this.slottedInput.value = newDateStr;
    this.focusDate = date;
    this.focusOnFocusDate();

    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }

  /**
   * Shifts the focused date by the provided interval
   * @param interval A Temporal-compatible interval definition
   */
  private shiftFocusDate(interval: Temporal.DurationLike): void {
    const shiftInterval = Temporal.Duration.from(interval);
    let newFocusedValue = this.focusDate.add(shiftInterval);
    // Clamp to the valid range
    if (
      this.min &&
      Temporal.PlainDate.compare(newFocusedValue, this.min) == -1
    ) {
      newFocusedValue = this.min;
    } else if (
      this.max &&
      Temporal.PlainDate.compare(newFocusedValue, this.max) == 1
    ) {
      newFocusedValue = this.max;
    }

    this.focusDate = newFocusedValue;
  }

  /**
   * Directs browser focus to the element corresponding to the `.focusDate` date.
   */
  private focusOnFocusDate() {
    // Wait for render in case the displayed month just changed with the focus date
    afterNextRenderTimeout(() => {
      const isoDateStr = this.focusDate.toString();
      const target = this.getGuxDayForDate(isoDateStr);
      if (target) {
        target.focus();
      }
    });
  }

  private onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.shiftFocusDate({ weeks: 1 });
        this.focusOnFocusDate();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.shiftFocusDate({ weeks: -1 });
        this.focusOnFocusDate();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.shiftFocusDate({ days: -1 });
        this.focusOnFocusDate();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.shiftFocusDate({ days: 1 });
        this.focusOnFocusDate();
        break;
      case 'PageUp':
        event.preventDefault();
        this.shiftFocusDate({ months: 1 });
        this.focusOnFocusDate();
        break;
      case 'PageDown':
        event.preventDefault();
        this.shiftFocusDate({ months: -1 });
        this.focusOnFocusDate();
        break;
    }
  }

  /**
   * Returns true if the date is less than the min date or greater than the max date
   */
  private isInvalidDate(date: Temporal.PlainDate): boolean {
    return (
      (this.min && Temporal.PlainDate.compare(date, this.min) == -1) ||
      (this.max && Temporal.PlainDate.compare(date, this.max) == 1)
    );
  }

  private getMonthDays(): IWeekElement[] {
    const today = Temporal.Now.plainDateISO();
    const firstOfMonth = getFirstOfMonth(this.getFocusDate());
    const weeks = [];
    let currentWeek: IWeekElement = { dates: [] };
    let weekDayIndex = 0;
    const currentMonth = firstOfMonth.month;
    const selectedValue = this.getSelectedDate();

    let currentDate = firstDateInWeek(firstOfMonth, this.startDayOfWeek);
    // Generate all of the dates in the current month
    for (let d = 0; d < this.MONTH_DATE_COUNT + 1; d += 1) {
      if (weekDayIndex > 0 && weekDayIndex % 7 === 0) {
        weeks.push(currentWeek);
        currentWeek = {
          dates: []
        };
      }

      currentWeek.dates.push({
        date: Temporal.PlainDate.from(currentDate),
        disabled: this.isInvalidDate(currentDate),
        inCurrentMonth: currentMonth === currentDate.month,
        selected: selectedValue?.equals(currentDate),
        focused: this.getFocusDate().equals(currentDate),
        isCurrentDate: currentDate.equals(today)
      });
      weekDayIndex += 1;
      currentDate = currentDate.add({ days: 1 });
    }

    return weeks;
  }

  private getFocusDate(): Temporal.PlainDate {
    return this.focusDate;
  }

  private getSelectedDate(): Temporal.PlainDate | null {
    if (this.slottedInput.value) {
      return Temporal.PlainDate.from(this.slottedInput.value);
    }
    return null;
  }

  private renderHeader(): JSX.Element {
    return (
      <div class="gux-header">
        <button
          type="button"
          class="gux-left"
          aria-label={this.i18n('previousMonth', {
            localizedPreviousMonthAndYear: localizedYearMonth(
              this.getFocusDate().add({ months: -1 }),
              this.locale
            )
          })}
          onClick={() => this.shiftFocusDate({ months: -1 })}
        >
          <gux-icon
            size="small"
            decorative
            icon-name="custom/chevron-left-small-regular"
          ></gux-icon>
        </button>
        <span class="gux-header-month-and-year">
          {localizedYearMonth(this.getFocusDate(), this.locale)}
        </span>
        <button
          type="button"
          class="gux-right"
          aria-label={this.i18n('nextMonth', {
            localizedNextMonthAndYear: localizedYearMonth(
              this.getFocusDate().add({ months: 1 }),
              this.locale
            )
          })}
          onClick={() => this.shiftFocusDate({ months: 1 })}
        >
          <gux-icon
            size="small"
            decorative
            icon-name="custom/chevron-right-small-regular"
          ></gux-icon>
        </button>
      </div>
    ) as JSX.Element;
  }

  private renderContent(): JSX.Element {
    return (
      <div
        onKeyDown={e => void this.onKeyDown(e)}
        onClick={e => void this.detectDayClick(e)}
      >
        <div class="gux-content">
          <div class="gux-week-days">
            {getWeekdays(this.locale, this.startDayOfWeek).map(
              day => (<div class="gux-week-day">{day}</div>) as JSX.Element
            )}
          </div>
          <div>
            {this.getMonthDays().map(
              week =>
                (
                  <div class="gux-content-week">
                    {week.dates.map(day => {
                      const isoDateStr = day.date.toString();
                      return (
                        <gux-day-beta
                          day={isoDateStr}
                          aria-current={day.selected ? 'true' : 'false'}
                          disabled={day.disabled ? true : false}
                          tabindex={day.selected || day.focused ? '0' : '-1'}
                          class={`
                            ${!day.inCurrentMonth || day.disabled ? 'gux-muted' : ''}
                            day-${isoDateStr}  
                          `}
                        ></gux-day-beta>
                      ) as JSX.Element;
                    })}
                  </div>
                ) as JSX.Element
            )}
          </div>
        </div>
      </div>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <div class={`gux-calendar-beta ${this.disabled ? 'gux-disabled' : ''}`}>
        <slot
          onSlotchange={() => {
            this.onSlotChange();
          }}
        />
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    ) as JSX.Element;
  }
}
