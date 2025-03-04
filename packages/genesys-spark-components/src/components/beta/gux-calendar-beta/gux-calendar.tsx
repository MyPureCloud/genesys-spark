import { Component, Element, h, JSX, State } from '@stencil/core';
import { IWeekElement, GuxCalendarDayOfWeek } from './gux-calendar.types';
import { asIsoDate, fromIsoDate } from '@utils/date/iso-dates';
import {
  getWeekdays,
  getFirstOfMonth,
  getDateAsMonthYear,
  firstDateInMonth
} from './services/calendar.service';
import { getDesiredLocale, getStartOfWeek } from '../../../i18n';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { logError } from '@utils/error/log-error';
import simulateNativeEvent from '@utils/dom/simulate-native-event';

@Component({
  styleUrl: 'gux-calendar.scss',
  tag: 'gux-calendar-beta',
  shadow: true
})
export class GuxCalendar {
  @Element()
  root: HTMLElement;

  @State()
  private focusedValue: Date;

  @State()
  private minValue: Date;

  @State()
  private maxValue: Date;

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
    this.startDayOfWeek = this.startDayOfWeek || getStartOfWeek(this.locale);

    this.i18n = await buildI18nForComponent(this.root, translationResources);

    if (this.slottedInput.value) {
      this.focusedValue = fromIsoDate(this.slottedInput.value);
    }

    // Set min value from the "min" input prop
    if (this.slottedInput.min) {
      this.minValue = new Date(this.slottedInput.min);
      this.minValue.setHours(0, 0, 0, 0);
    }
    // Set max value from the "max" input prop
    if (this.slottedInput.max) {
      this.maxValue = new Date(this.slottedInput.max);
      this.maxValue.setHours(0, 0, 0, 0);
    }
  }

  private onDateClick(date: Date): void {
    if (this.isInvalidDate(date)) {
      return;
    }
    this.focusedValue = new Date(date.getTime());
    this.slottedInput.value = asIsoDate(date);
    simulateNativeEvent(this.root, 'input');
  }

  private setDateAfterArrowKeyPress(
    event: KeyboardEvent,
    newDayValue: number
  ): void {
    event.preventDefault();
    this.focusedValue = new Date(
      this.getFocusedValue().getFullYear(),
      this.getFocusedValue().getMonth(),
      this.getFocusedValue().getDate() + newDayValue,
      0,
      0,
      0
    );
    afterNextRenderTimeout(() => {
      this.focusDate();
    });
  }

  /**
   * Focus the focused date
   */
  private focusDate() {
    const target: HTMLTableCellElement = this.root.shadowRoot.querySelector(
      `.gux-content-date[data-date="${this.focusedValue.getTime()}"]`
    );
    if (target) {
      target.focus();
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        break;
      case 'Enter':
        event.preventDefault();
        this.onDateClick(this.getFocusedValue());
        afterNextRenderTimeout(() => {
          this.focusDate();
        });
        break;
      case 'ArrowDown':
        this.setDateAfterArrowKeyPress(event, 7);
        break;
      case 'ArrowUp':
        this.setDateAfterArrowKeyPress(event, -7);
        break;
      case 'ArrowLeft':
        this.setDateAfterArrowKeyPress(event, -1);
        break;
      case 'ArrowRight':
        this.setDateAfterArrowKeyPress(event, 1);
        break;
      case 'PageUp':
        event.preventDefault();
        this.setNewFocusedMonth(1);
        afterNextRenderTimeout(() => {
          this.focusDate();
        });
        break;
      case 'PageDown':
        event.preventDefault();
        this.setNewFocusedMonth(-1);
        afterNextRenderTimeout(() => {
          this.focusDate();
        });
        break;
    }
  }

  private isInvalidDate(date: Date): boolean {
    return (
      (this.minValue && date.getTime() <= this.minValue.getTime()) ||
      (this.maxValue && date.getTime() > this.maxValue.getTime())
    );
  }

  private getMonthDays(): IWeekElement[] {
    const firstOfMonth = getFirstOfMonth(this.getFocusedValue());
    const weeks = [];
    let currentWeek = { dates: [] };
    let weekDayIndex = 0;
    const currentMonth = firstOfMonth.getMonth();
    const selectedValue = this.getSelectedValue();
    const firstOfMonthDate = new Date(firstOfMonth.getTime());
    const currentDate = firstDateInMonth(
      currentMonth,
      firstOfMonthDate.getFullYear(),
      this.startDayOfWeek
    );

    // Generate all of the dates in the current month
    for (let d = 0; d < this.MONTH_DATE_COUNT + 1; d += 1) {
      const selected =
        selectedValue.getTime() === currentDate.getTime() &&
        this.focusedValue !== undefined;

      if (weekDayIndex > 0 && weekDayIndex % 7 === 0) {
        weeks.push(currentWeek);
        currentWeek = {
          dates: []
        };
      }

      // Check if a date is outside the defined date range boundaries
      const disabled = this.isInvalidDate(currentDate);

      const focused =
        this.getFocusedValue()?.getTime() === currentDate.getTime() &&
        this.getFocusedValue()?.getTime() !== selectedValue.getTime(); // Do not show preview value for date if it's already selected

      const today = new Date();

      currentWeek.dates.push({
        date: new Date(currentDate),
        disabled,
        inCurrentMonth: currentMonth === currentDate.getMonth() && !disabled,
        selected: selected && selectedValue,
        focused,
        isCurrentDate:
          currentDate.getDate() === today.getDate() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getFullYear() === today.getFullYear()
      });
      weekDayIndex += 1;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weeks as IWeekElement[];
  }

  private getFocusedValue(): Date {
    if (this.focusedValue) {
      return this.focusedValue;
    }
    return this.getSelectedValue();
  }

  private changeMonth(newMonthValue: number): Date {
    return new Date(
      this.getFocusedValue().getFullYear(),
      this.getFocusedValue().getMonth() + newMonthValue,
      1,
      0,
      0,
      0
    );
  }

  private setNewFocusedMonth(newMonthValue: number): void {
    this.focusedValue = this.changeMonth(newMonthValue);
  }

  private getSelectedValue(): Date {
    if (this.slottedInput.value) {
      const value = fromIsoDate(this.slottedInput.value);
      return value;
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }

  private renderHeader(): JSX.Element {
    return (
      <div class="gux-header">
        <button
          type="button"
          class="gux-left"
          aria-label={this.i18n('previousMonth', {
            localizedPreviousMonthAndYear: getDateAsMonthYear(
              this.changeMonth(-1),
              this.locale
            )
          })}
          onClick={() => this.setNewFocusedMonth(-1)}
        >
          <gux-icon
            size="small"
            decorative
            icon-name="custom/chevron-left-small-regular"
          ></gux-icon>
        </button>
        <span class="gux-header-month-and-year">
          {getDateAsMonthYear(this.getFocusedValue(), this.locale)}
        </span>
        <button
          type="button"
          class="gux-right"
          aria-label={this.i18n('nextMonth', {
            localizedNextMonthAndYear: getDateAsMonthYear(
              this.changeMonth(1),
              this.locale
            )
          })}
          onClick={() => this.setNewFocusedMonth(1)}
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
                  {week.dates.map(
                    day =>
                      (
                        <div
                          data-date={day.date.getTime()}
                          onClick={() => this.onDateClick(day.date)}
                          role="button"
                          aria-current={day.selected ? 'true' : 'false'}
                          tabindex={day.selected || day.focused ? '0' : '-1'}
                          onKeyDown={e => void this.onKeyDown(e)}
                          aria-disabled={day.disabled ? 'true' : 'false'}
                          class={{
                            'gux-content-date': true,
                            'gux-disabled': day.disabled,
                            'gux-current-month': day.inCurrentMonth,
                            'gux-selected': day.selected,
                            'gux-current-date': day.isCurrentDate
                          }}
                        >
                          <span class="gux-non-sr" aria-hidden="true">
                            {day.date.getDate()}
                          </span>
                          <span class="gux-sr-only">
                            <gux-date-beta
                              datetime={day.date.toISOString()}
                              format="long"
                            ></gux-date-beta>
                          </span>
                        </div>
                      ) as JSX.Element
                  )}
                </div>
              ) as JSX.Element
          )}
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
