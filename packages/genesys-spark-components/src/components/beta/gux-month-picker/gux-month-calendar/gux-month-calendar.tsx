import {
  Component,
  Element,
  h,
  JSX,
  Prop,
  State,
  Method,
  Listen,
  Watch
} from '@stencil/core';

import {
  buildI18nForComponent,
  GetI18nValue,
  getDesiredLocale
} from '../../../../i18n';
import * as sparkIntl from '../../../../genesys-spark-utils/intl';
// Remove with this ticket https://inindca.atlassian.net/browse/COMUI-2598
import { useRegionalDates } from '../../../../i18n/use-regional-dates';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { afterNextRender } from '@utils/dom/after-next-render';
import {
  getISOYearMonth,
  getCurrentISOYearMonth,
  getYearMonthObject
} from '@utils/date/year-month-values';
import { GuxISOYearMonth } from '../../../../utils/date/year-month-values';

import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-month-calendar.scss',
  tag: 'gux-month-calendar',
  shadow: { delegatesFocus: true }
})
export class GuxMonthCalendar {
  private i18n: GetI18nValue;
  private nextYearElement: HTMLButtonElement;
  private previousYearElement: HTMLButtonElement;

  @Element()
  root: HTMLElement;

  /**
   * The current selected year and month in ISO8601 format (yyyy-mm)
   */
  @Prop({ mutable: true })
  value: GuxISOYearMonth;

  /**
   * The min year and month selectable in ISO8601 format (yyyy-mm)
   */
  @Prop()
  min: GuxISOYearMonth;

  /**
   * The max year and month selectable in ISO8601 format (yyyy-mm)
   */
  @Prop()
  max: GuxISOYearMonth;

  @State()
  year: string;

  @State()
  locale: string;

  @State()
  previewValue: string;

  /**
   * Controls hiding and showing the month-calendar
   */
  @State()
  expanded: boolean = true;

  @Watch('value')
  onValueUpdate(newValue: GuxISOYearMonth) {
    const { year } = getYearMonthObject(newValue);

    this.year = year;
  }

  /**
   * Focus a month
   */
  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus(iSOYearMonth: GuxISOYearMonth): Promise<void> {
    this.expanded = true;
    iSOYearMonth = iSOYearMonth || getCurrentISOYearMonth();

    const { year } = getYearMonthObject(iSOYearMonth);
    this.year = year;

    afterNextRender(() => {
      const target: HTMLButtonElement = this.root.shadowRoot.querySelector(
        `gux-month-list-item[value="${iSOYearMonth}"]`
      );
      if (target) {
        target.focus();
      }
    });
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab':
        if (event.shiftKey) {
          return;
        }

        if (this.nextYearElement.matches(':focus-visible')) {
          this.focusSelectedMonth();
          event.preventDefault();
        } else if (
          this.previousYearElement.matches(':focus-visible') &&
          this.nextYearElement.disabled
        ) {
          this.focusSelectedMonth();
          event.preventDefault();
        }
        break;
    }
  }

  private focusSelectedMonth(): void {
    const monthElement: HTMLButtonElement = this.root.shadowRoot.querySelector(
      `gux-month-list-item[value="${this.previewValue}"]`
    );

    if (monthElement && monthElement.matches(':focus-visible')) {
      monthElement?.focus();
    } else {
      // Focus the first month that is not disabled
      const children =
        this.root.shadowRoot.querySelectorAll(`gux-month-list-item`);
      const monthElement: HTMLGuxMonthListItemElement = Array.from(
        children
      ).find(a => !a.disabled);
      monthElement?.focus();
    }
  }

  private nextYearElementOnBlur(event: FocusEvent): void {
    // If the user hits the next year button and the next year button becomes disabled due
    // to reaching the max date boundary then we want to move focus to the first non-disabled month
    const nextYearElement = event.target as HTMLButtonElement;
    if (nextYearElement.disabled && !event.relatedTarget) {
      this.focusSelectedMonth();
      event.preventDefault();
    }
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    if (useRegionalDates()) {
      this.locale = sparkIntl.determineDisplayLocale(this.root);
    } else {
      this.locale = getDesiredLocale(this.root);
    }
    if (this.value) {
      this.year = getYearMonthObject(this.value).year;
      this.previewValue = this.value;
    } else {
      this.year = getYearMonthObject(getCurrentISOYearMonth()).year;
    }
  }

  private updateValue(value: GuxISOYearMonth): void {
    this.value = value;
    this.previewValue = this.value;

    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }

  private isOutOfBounds(value: GuxISOYearMonth): boolean {
    return (this.max && this.max < value) || (this.min && this.min > value);
  }

  private onMonthClick(value: GuxISOYearMonth): void {
    if (this.isOutOfBounds(value)) {
      return;
    }

    this.updateValue(value);
  }

  private isCurrentMonth(month: string): boolean {
    return (
      getYearMonthObject(getCurrentISOYearMonth()).year == this.year &&
      getYearMonthObject(getCurrentISOYearMonth()).month == month
    );
  }

  private getMonthAriaLabel(value: GuxISOYearMonth): string {
    const { year, month } = getYearMonthObject(value);

    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      this.locale,
      { year: 'numeric', month: 'long' }
    );
  }

  private getYearLabel(year: string): string {
    return new Date(Number(year), 5).toLocaleDateString(this.locale, {
      year: 'numeric'
    });
  }

  private isSelectedMonth(value: GuxISOYearMonth): boolean {
    return value === this.value;
  }

  private isAriaSelectedMonth(value: GuxISOYearMonth): 'true' | false {
    if (this.isSelectedMonth(value)) {
      return 'true';
    }

    return false;
  }

  private changeYear(increment: number): void {
    this.year = (parseInt(this.year) + increment).toString();

    if (this.value) {
      // Update preview value
      const month = getYearMonthObject(this.value).month;
      const value = getISOYearMonth(this.year, month);
      this.previewValue = value;
    }
  }

  private isPreviousYearLessThanMinYear(
    year: string,
    minISOYearMonth: GuxISOYearMonth
  ): boolean {
    return (
      (parseInt(year) - 1).toString() <
      (minISOYearMonth && getYearMonthObject(minISOYearMonth).year)
    );
  }

  private isNextYearGreaterThanMaxYear(
    year: string,
    maxISOYearMonth: GuxISOYearMonth
  ): boolean {
    return (
      (parseInt(year) + 1).toString() >
      (maxISOYearMonth && getYearMonthObject(maxISOYearMonth).year)
    );
  }

  private getMonthShortName(year: string, month: string): string {
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      this.locale,
      { month: 'short' }
    );
  }

  private renderHeader(): JSX.Element {
    return (
      <div class="gux-year-header">
        <button
          type="button"
          class="gux-year-change"
          onClick={() => this.changeYear(-1)}
          disabled={this.isPreviousYearLessThanMinYear(this.year, this.min)}
          ref={(el: HTMLButtonElement) => (this.previousYearElement = el)}
        >
          <gux-icon
            icon-name="custom/chevron-left-small-regular"
            decorative
            size="small"
          ></gux-icon>
          <gux-screen-reader-beta>
            {this.i18n('changeYear', {
              currentYear: parseInt(this.year),
              changeYear: parseInt(this.year) - 1
            })}
          </gux-screen-reader-beta>
        </button>
        <div>{this.getYearLabel(this.year)}</div>
        <button
          type="button"
          class="gux-year-change"
          onClick={() => this.changeYear(1)}
          disabled={this.isNextYearGreaterThanMaxYear(this.year, this.max)}
          ref={(el: HTMLButtonElement) => (this.nextYearElement = el)}
          onBlur={this.nextYearElementOnBlur.bind(this)}
        >
          <gux-icon
            icon-name="custom/chevron-right-small-regular"
            decorative
            size="small"
          ></gux-icon>
          <gux-screen-reader-beta>
            {this.i18n('changeYear', {
              currentYear: parseInt(this.year),
              changeYear: parseInt(this.year) + 1
            })}
          </gux-screen-reader-beta>
        </button>
      </div>
    ) as JSX.Element;
  }

  private renderMonths(): JSX.Element {
    const monthButtons = Array.from(new Array(12), (_, i) =>
      String(i + 1).padStart(2, '0')
    ).map(month => {
      const value = getISOYearMonth(this.year, month);

      return (
        <gux-month-list-item
          class={{ 'gux-current-month': this.isCurrentMonth(month) }}
          value={value}
          selected={this.isSelectedMonth(value)}
          aria-selected={this.isAriaSelectedMonth(value)}
          aria-label={this.getMonthAriaLabel(value)}
          onClick={() => this.onMonthClick(value)}
          disabled={this.isOutOfBounds(value)}
        >
          {this.getMonthShortName(this.year, month)}
        </gux-month-list-item>
      ) as JSX.Element;
    });

    return (<gux-month-list>{monthButtons}</gux-month-list>) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-hidden': !this.expanded,
          'gux-month-calendar': true
        }}
      >
        {this.renderHeader()}
        {this.renderMonths()}
      </div>
    ) as JSX.Element;
  }
}
