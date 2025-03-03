import { Component, Element, h, JSX, Listen, State } from '@stencil/core';
import { IWeekElement, GuxCalendarDayOfWeek } from '../../gux-calendar.types';
import {
  getWeekdays,
  getFirstOfMonth,
  localizedYearMonth,
  firstDateInWeek
} from '../../services/calendar.service';
import {
  getDesiredLocale,
  getFirstDayOfWeek,
  buildI18nForComponent,
  GetI18nValue
} from '../../../../../i18n';
import translationResources from '../../i18n/en.json';
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

  @State()
  private focusedValue: Temporal.PlainDate;

  @State()
  private minValue: Temporal.PlainDate | null;

  @State()
  private maxValue: Temporal.PlainDate | null;

  @Listen('guxdayselected')
  onDaySelected(event: CustomEvent<string>) {
    const selectedDate = Temporal.PlainDate.from(event.detail);
    this.selectDate(selectedDate);
    event.stopPropagation();
  }

  private locale: string = 'en';

  private i18n: GetI18nValue;

  // Total number of dates that will display for each month in the calendar
  private MONTH_DATE_COUNT: number = 42;

  // Keeps track of the start day of the week based on user's locale
  // Some locales will have the start day of the week be different than others
  private startDayOfWeek: GuxCalendarDayOfWeek;

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
    const startDayOfWeek = this.slottedInput.getAttribute('start-day-of-week');
    if (startDayOfWeek?.length) {
      this.startDayOfWeek = parseInt(
        startDayOfWeek,
        10
      ) as GuxCalendarDayOfWeek;
    }
    this.startDayOfWeek = this.startDayOfWeek || getFirstDayOfWeek(this.locale);

    this.i18n = await buildI18nForComponent(this.root, translationResources);

    if (this.slottedInput.value) {
      this.focusedValue = Temporal.PlainDate.from(this.slottedInput.value);
    }

    // Set min value from the "min" input prop
    if (this.slottedInput.min) {
      this.minValue = Temporal.PlainDate.from(this.slottedInput.min);
    }
    // Set max value from the "max" input prop
    if (this.slottedInput.max) {
      this.maxValue = Temporal.PlainDate.from(this.slottedInput.max);
    }

    console.log('START OF WEEK:', this.startDayOfWeek);
  }

  private selectDate(date: Temporal.PlainDate): void {
    if (this.isInvalidDate(date)) {
      return;
    }
    this.focusedValue = date;
    this.slottedInput.value = date.toString();
    simulateNativeEvent(this.root, 'input');
  }

  /**
   * Shifts the focused date by the provided interval
   * @param event
   * @param interval A Temporal-compatible interval definition
   */
  private shiftFocusedDate(interval: Temporal.DurationLike): void {
    const shiftInterval = Temporal.Duration.from(interval);
    let newFocusedValue = this.focusedValue.add(shiftInterval);
    // Clamp to the valid range
    if (
      this.minValue &&
      Temporal.PlainDate.compare(newFocusedValue, this.minValue) == -1
    ) {
      newFocusedValue = this.minValue;
    } else if (
      this.maxValue &&
      Temporal.PlainDate.compare(newFocusedValue, this.maxValue) == 1
    ) {
      newFocusedValue = this.maxValue;
    }

    this.focusedValue = newFocusedValue;
    afterNextRenderTimeout(() => {
      this.focusDate();
    });
  }

  /**
   * Focus the focused date
   */
  private focusDate() {
    const isoDateStr = this.focusedValue.toString();
    // Find the rendered element for the slot for the focused date
    const target: HTMLElement = this.root.shadowRoot
      .querySelector<HTMLSlotElement>(`slot[name="${isoDateStr}"]`)
      .assignedNodes({ flatten: true })[0] as HTMLElement;
    if (target) {
      target.focus();
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.shiftFocusedDate({ weeks: 1 });
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.shiftFocusedDate({ weeks: -1 });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.shiftFocusedDate({ days: -1 });
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.shiftFocusedDate({ days: 1 });
        break;
      case 'PageUp':
        event.preventDefault();
        this.shiftFocusedDate({ months: 1 });
        break;
      case 'PageDown':
        event.preventDefault();
        this.shiftFocusedDate({ months: -1 });
        break;
    }
  }

  /**
   * Returns true if the date is less than the min date or greater than the max date
   */
  private isInvalidDate(date: Temporal.PlainDate): boolean {
    return (
      (this.minValue &&
        Temporal.PlainDate.compare(date, this.minValue) == -1) ||
      (this.maxValue && Temporal.PlainDate.compare(date, this.maxValue) == 1)
    );
  }

  private getMonthDays(): IWeekElement[] {
    const firstOfMonth = getFirstOfMonth(this.getFocusedValue());
    const weeks = [];
    let currentWeek: IWeekElement = { dates: [] };
    let weekDayIndex = 0;
    const currentMonth = firstOfMonth.month;
    const selectedValue = this.getSelectedValue();
    let currentDate = firstDateInWeek(firstOfMonth, this.startDayOfWeek);

    // Generate all of the dates in the current month
    for (let d = 0; d < this.MONTH_DATE_COUNT + 1; d += 1) {
      const selected =
        selectedValue.equals(currentDate) && this.focusedValue !== undefined;

      if (weekDayIndex > 0 && weekDayIndex % 7 === 0) {
        weeks.push(currentWeek);
        currentWeek = {
          dates: []
        };
      }

      // Check if a date is outside the defined date range boundaries
      const disabled = this.isInvalidDate(currentDate);

      const focused =
        this.getFocusedValue().equals(currentDate) &&
        !this.getFocusedValue().equals(selectedValue); // Do not show preview value for date if it's already selected

      const today = Temporal.Now.plainDateISO();

      currentWeek.dates.push({
        date: Temporal.PlainDate.from(currentDate),
        disabled,
        inCurrentMonth: currentMonth === currentDate.month,
        selected: selected,
        focused,
        isCurrentDate: currentDate.equals(today)
      });
      weekDayIndex += 1;
      currentDate = currentDate.add({ days: 1 });
    }

    return weeks;
  }

  private getFocusedValue(): Temporal.PlainDate {
    if (this.focusedValue) {
      return this.focusedValue;
    }
    return this.getSelectedValue();
  }

  private getSelectedValue(): Temporal.PlainDate {
    if (this.slottedInput.value) {
      const value = Temporal.PlainDate.from(this.slottedInput.value);
      return value;
    }

    return Temporal.Now.plainDateISO();
  }

  private renderHeader(): JSX.Element {
    return (
      <div class="gux-header">
        <button
          type="button"
          class="gux-left"
          aria-label={this.i18n('previousMonth', {
            localizedPreviousMonthAndYear: localizedYearMonth(
              this.getFocusedValue().add({ months: -1 }),
              this.locale
            )
          })}
          onClick={() => this.shiftFocusedDate({ months: -1 })}
        >
          <gux-icon
            size="small"
            decorative
            icon-name="custom/chevron-left-small-regular"
          ></gux-icon>
        </button>
        <span class="gux-header-month-and-year">
          {localizedYearMonth(this.getFocusedValue(), this.locale)}
        </span>
        <button
          type="button"
          class="gux-right"
          aria-label={this.i18n('nextMonth', {
            localizedNextMonthAndYear: localizedYearMonth(
              this.getFocusedValue().add({ months: 1 }),
              this.locale
            )
          })}
          onClick={() => this.shiftFocusedDate({ months: 1 })}
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
      <div onKeyDown={e => void this.onKeyDown(e)}>
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
                        <gux-focus-proxy
                          aria-current={day.selected ? 'true' : 'false'}
                          aria-disabled={day.disabled ? 'true' : 'false'}
                          tabindex={day.selected || day.focused ? '0' : '-1'}
                        >
                          <slot key={isoDateStr} name={isoDateStr}>
                            <gux-day-beta
                              day={isoDateStr}
                              class={{
                                'gux-muted': !day.inCurrentMonth
                              }}
                            ></gux-day-beta>
                          </slot>
                        </gux-focus-proxy>
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
      <div class="gux-calendar-beta">
        <slot />
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    ) as JSX.Element;
  }
}
