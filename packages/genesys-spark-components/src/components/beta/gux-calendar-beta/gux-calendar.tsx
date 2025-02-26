import { Component, Element, h, JSX, Listen, State } from '@stencil/core';
import { IWeekElement, GuxCalendarDayOfWeek } from './gux-calendar.types';
import {
  getWeekdays,
  getFirstOfMonth,
  localizedYearMonth,
  firstDateInWeek
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

  /**
   * The date that receives focus when selecting a specific day. This also
   * determines what month is currently displayed. The corresponding element
   * does not necessarily have browser focus at any given time, since focus
   * may be on other parts of the component.
   */
  @State()
  private focusDate: Temporal.PlainDate = Temporal.Now.plainDateISO();

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

    const selectedDate = this.getSelectedDate();
    if (selectedDate) {
      this.focusDate = selectedDate;
    }

    // Set min value from the "min" input prop
    if (this.slottedInput.min) {
      this.minValue = Temporal.PlainDate.from(this.slottedInput.min);
    }
    // Set max value from the "max" input prop
    if (this.slottedInput.max) {
      this.maxValue = Temporal.PlainDate.from(this.slottedInput.max);
    }
  }

  async componentDidRender() {
    // Because the selection state may be set on slotted attributes, we have
    // to update it after rendering.
    this.renderDateSelection();
  }

  /**
   * Finds the `gux-day` element corresponding to the provided
   * date string, whether rendered by this component or slotted.
   * @param dateStr The date to find in ISO format
   */
  private getGuxDayForDate(dateStr: string): HTMLElement | null {
    return (
      this.root.shadowRoot
        // Find the slot for the date
        .querySelector<HTMLSlotElement>(`slot[name="${dateStr}"]`)
        // Get the first of the rendered items for that slot
        ?.assignedNodes({ flatten: true })[0] as HTMLElement
    );
  }

  private selectDate(date: Temporal.PlainDate): void {
    if (this.isInvalidDate(date)) {
      return;
    }
    const oldDateStr = this.slottedInput.value;
    const newDateStr = date.toString();
    this.focusDate = date;
    this.slottedInput.value = newDateStr;

    afterNextRenderTimeout(() => {
      this.renderDateSelection(oldDateStr);
    });

    simulateNativeEvent(this.root, 'input');
  }

  /**
   * Clears the `gux-selected` attribute on the old element and add it
   * to the new element. This enables styling of the selected state in
   * the gux-day element in a way that can be used by slotted elements.
   */
  private renderDateSelection(oldDateStr?: string): void {
    const selectedDate = this.getSelectedDate();
    if (oldDateStr) {
      const oldSelectedElement = this.getGuxDayForDate(oldDateStr);
      oldSelectedElement?.removeAttribute('gux-selected');
    }

    if (selectedDate) {
      const newSelectedElement = this.getGuxDayForDate(selectedDate.toString());
      newSelectedElement?.setAttribute('gux-selected', '');
    }
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
      (this.minValue &&
        Temporal.PlainDate.compare(date, this.minValue) == -1) ||
      (this.maxValue && Temporal.PlainDate.compare(date, this.maxValue) == 1)
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
                                'gux-muted': !day.inCurrentMonth || day.disabled
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
