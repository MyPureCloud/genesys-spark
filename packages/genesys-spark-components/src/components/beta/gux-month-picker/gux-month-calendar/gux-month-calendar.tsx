import {
  Component,
  Element,
  h,
  JSX,
  Prop,
  State,
  Method,
  Watch
} from '@stencil/core';

import {
  buildI18nForComponent,
  GetI18nValue,
  getDesiredLocale
} from '../../../../i18n';
import * as sparkIntl from '../../../../genesys-spark-utils/intl';
import { readRegionalDatesCookie } from '../../../../i18n/check-regional-dates-cookie';
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
  private previousYearElement: HTMLButtonElement;
  private nextYearElement: HTMLButtonElement;
  private monthListElement: HTMLGuxMonthListElement;

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

  @Watch('value')
  onValueUpdate(newValue: GuxISOYearMonth) {
    const { year } = getYearMonthObject(newValue);

    this.year = year;
  }

  /**
   * Focus a month
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxFocus(iSOYearMonth: GuxISOYearMonth): Promise<void> {
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

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    if (readRegionalDatesCookie()) {
      this.locale = sparkIntl.determineDisplayLocale(this.root);
    } else {
      this.locale = getDesiredLocale(this.root);
    }
    if (this.value) {
      this.year = getYearMonthObject(this.value).year;
    } else {
      this.year = getYearMonthObject(getCurrentISOYearMonth()).year;
    }
  }

  private updateValue(value: GuxISOYearMonth): void {
    this.value = value;

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

  private doFocusTrap(): void {
    if (!this.previousYearElement.disabled) {
      this.previousYearElement.focus();
    }

    if (!this.nextYearElement.disabled) {
      this.nextYearElement.focus();
    }

    this.monthListElement.focus();
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
            icon-name="chevron-small-left"
            screenreader-text={this.i18n('changeYear', {
              currentYear: parseInt(this.year),
              changeYear: parseInt(this.year) - 1
            })}
          ></gux-icon>
        </button>
        <div>{this.getYearLabel(this.year)}</div>
        <button
          type="button"
          class="gux-year-change"
          onClick={() => this.changeYear(1)}
          disabled={this.isNextYearGreaterThanMaxYear(this.year, this.max)}
          ref={(el: HTMLButtonElement) => (this.nextYearElement = el)}
        >
          <gux-icon
            icon-name="chevron-small-right"
            screenreader-text={this.i18n('changeYear', {
              currentYear: parseInt(this.year),
              changeYear: parseInt(this.year) + 1
            })}
          ></gux-icon>
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

    return (
      <gux-month-list
        tabIndex={1}
        ref={(el: HTMLGuxMonthListElement) => (this.monthListElement = el)}
      >
        {monthButtons}
      </gux-month-list>
    ) as JSX.Element;
  }

  private renderTrapFocusEl(): JSX.Element {
    return (
      <span onFocus={() => this.doFocusTrap()} tabindex="0"></span>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <div class="gux-month-calendar">
        {this.renderHeader()}
        {this.renderMonths()}
        {this.renderTrapFocusEl()}
      </div>
    ) as JSX.Element;
  }
}
