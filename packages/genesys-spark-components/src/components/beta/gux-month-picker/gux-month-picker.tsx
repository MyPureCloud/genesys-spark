/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  Component,
  Element,
  h,
  JSX,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import {
  buildI18nForComponent,
  GetI18nValue,
  getDesiredLocale
} from '../../../i18n';
import * as sparkIntl from '../../../../../genesys-spark/src/utils/intl';
import { readRegionalDatesCookie } from '../../../i18n/check-regional-dates-cookie';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { afterNextRender } from '@utils/dom/after-next-render';
import {
  getCurrentISOYearMonth,
  getISOYearMonth,
  getYearMonthObject
} from '@utils/date/year-month-values';

import { GuxISOYearMonth } from '../../../utils/date/year-month-values';

import translationResources from './i18n/en.json';

const DateTimeFormats = { year: 'numeric', month: 'long' };

const YearFirstLocales = ['ar', 'he', 'ja', 'ko', 'zh-cn', 'zh-tw'];

@Component({
  styleUrl: 'gux-month-picker.scss',
  tag: 'gux-month-picker-beta',
  shadow: { delegatesFocus: false }
})
export class GuxMonthPicker {
  private i18n: GetI18nValue;
  private calendarToggleButtonElement: HTMLButtonElement;
  private monthCalendarElement: HTMLGuxMonthCalendarElement;
  private monthSpinnerElement: HTMLElement;
  private yearSpinnerElement: HTMLElement;

  @Element()
  private root: HTMLElement;

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

  @Prop()
  disabled: boolean = false;

  @State()
  expanded: boolean = false;

  @State()
  locale: string;

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.expanded = false;
        this.calendarToggleButtonElement.focus();
        break;
    }
  }

  @Watch('value')
  onValueUpdate(newValue: GuxISOYearMonth) {
    if (this.isOutOfBounds(newValue)) {
      if (this.isBeforeMin(newValue)) {
        this.value = this.min;
      } else {
        this.value = this.max;
      }
    } else {
      this.value = newValue;
    }

    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.expanded = false;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    if (readRegionalDatesCookie()) {
      this.locale = sparkIntl.determineDisplayLocale(this.root);
    } else {
      this.locale = getDesiredLocale(this.root);
    }
  }

  private isOutOfBounds(value: GuxISOYearMonth): boolean {
    return this.isBeforeMin(value) || this.isAfterMax(value);
  }

  private isBeforeMin(value: GuxISOYearMonth): boolean {
    return this.min && this.min > value;
  }

  private isAfterMax(value: GuxISOYearMonth): boolean {
    return this.max && this.max < value;
  }

  private toggleCalendar(): void {
    this.expanded = !this.expanded;

    if (this.expanded) {
      afterNextRender(() => {
        void this.monthCalendarElement.guxFocus(this.value);
      });
    }
  }

  private onMonthCalendarInput(): void {
    this.value = this.monthCalendarElement.value;
    this.expanded = false;
    this.calendarToggleButtonElement.focus();
  }

  private incrementMonth(delta: 1 | -1): void {
    if (this.value) {
      const { year: currentYear, month: currentMonth } = getYearMonthObject(
        this.value
      );
      const newMonth = (((parseInt(currentMonth) + 11 + delta) % 12) + 1)
        .toString()
        .padStart(2, '0');

      this.value = getISOYearMonth(currentYear, newMonth);
    } else {
      this.value = getCurrentISOYearMonth();
    }
  }

  private incrementYear(delta: 1 | -1): void {
    if (this.value) {
      const { year: currentYear, month: currentMonth } = getYearMonthObject(
        this.value
      );
      const newYear = Math.max(Number(currentYear) + delta, 0).toString();

      this.value = getISOYearMonth(newYear, currentMonth);
    } else {
      this.value = getCurrentISOYearMonth();
    }
  }

  private onSpinnerKeyDown(
    event: KeyboardEvent,
    incrementor: (delta: 1 | -1) => void,
    nextFocusElement: HTMLElement
  ): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        incrementor(-1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        incrementor(1);
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        event.preventDefault();
        nextFocusElement.focus();
        break;
      case 'Enter':
        event.preventDefault();
        this.expanded = true;
        afterNextRender(() => {
          void this.monthCalendarElement.guxFocus(this.value);
        });
        break;
      case ' ':
        event.preventDefault();
        break;
    }
  }

  private onSpinnerKeyUp(event: KeyboardEvent): void {
    event.stopPropagation();

    switch (event.key) {
      case ' ':
        event.preventDefault();
        this.expanded = true;
        afterNextRender(() => {
          void this.monthCalendarElement.guxFocus(this.value);
        });
        break;
    }
  }

  private onSpinnerClick(): void {
    this.expanded = true;
  }

  private getSpinnerLabel(period: 'month' | 'year'): string {
    if (this.value) {
      const { year, month } = getYearMonthObject(this.value);

      return new Date(Number(year), Number(month) - 1).toLocaleDateString(
        this.locale,
        { [period]: DateTimeFormats[period] }
      );
    }

    return this.i18n(period);
  }

  private getSpinnerValueNow(period: 'month' | 'year'): string {
    return this.value ? getYearMonthObject(this.value)[period] : '0';
  }

  private getSpinnerValueText(): string | boolean {
    if (this.value) {
      const { year, month } = getYearMonthObject(this.value);

      return new Date(Number(year), Number(month) - 1).toLocaleDateString(
        this.locale,
        { year: 'numeric', month: 'long' }
      );
    }

    return this.i18n('unset');
  }

  private renderMonthSpinnerButton(): JSX.Element {
    return (
      <div
        role="spinbutton"
        class="gux-spinner"
        tabIndex={this.disabled ? -1 : 0}
        onKeyDown={(e: KeyboardEvent) =>
          this.onSpinnerKeyDown(
            e,
            d => this.incrementMonth(d),
            this.yearSpinnerElement
          )
        }
        onKeyUp={(e: KeyboardEvent) => this.onSpinnerKeyUp(e)}
        onClick={() => this.onSpinnerClick()}
        ref={(el: HTMLElement) => (this.monthSpinnerElement = el)}
        aria-valuenow={this.getSpinnerValueNow('month')}
        aria-valuetext={this.getSpinnerValueText()}
        aria-valuemin="1"
        aria-valuemax="12"
        aria-label={this.i18n('month')}
      >
        {this.getSpinnerLabel('month')}
      </div>
    ) as JSX.Element;
  }

  private renderYearSpinnerButton(): JSX.Element {
    return (
      <div
        role="spinbutton"
        class="gux-spinner"
        tabIndex={this.disabled ? -1 : 0}
        onKeyDown={(e: KeyboardEvent) =>
          this.onSpinnerKeyDown(
            e,
            d => this.incrementYear(d),
            this.monthSpinnerElement
          )
        }
        onKeyUp={(e: KeyboardEvent) => this.onSpinnerKeyUp(e)}
        onClick={() => this.onSpinnerClick()}
        ref={(el: HTMLElement) => (this.yearSpinnerElement = el)}
        aria-valuenow={this.getSpinnerValueNow('year')}
        aria-valuetext={this.getSpinnerValueText()}
        aria-valuemin="0"
        aria-label={this.i18n('year')}
      >
        {this.getSpinnerLabel('year')}
      </div>
    ) as JSX.Element;
  }

  private renderSpinnerButtons(): JSX.Element {
    if (YearFirstLocales.includes(this.locale)) {
      return (
        <span class="gux-display">
          {this.renderYearSpinnerButton()}
          {this.renderMonthSpinnerButton()}
        </span>
      ) as JSX.Element;
    }

    return (
      <span class="gux-display">
        {this.renderMonthSpinnerButton()}
        {this.renderYearSpinnerButton()}
      </span>
    ) as JSX.Element;
  }

  private renderCalendarToggleButton(): JSX.Element {
    return (
      <button
        class={{
          'gux-popup-toggle': true,
          'gux-expanded': this.expanded
        }}
        ref={(el: HTMLButtonElement) => (this.calendarToggleButtonElement = el)}
        type="button"
        onClick={() => this.toggleCalendar()}
        disabled={this.disabled}
      >
        <gux-icon
          icon-name="calendar"
          screenreader-text={this.i18n('toggleCalendar')}
        ></gux-icon>
      </button>
    ) as JSX.Element;
  }

  renderTarget(): JSX.Element {
    return (
      <div class="gux-target" slot="target">
        {this.renderSpinnerButtons()}
        {this.renderCalendarToggleButton()}
      </div>
    ) as JSX.Element;
  }

  private renderPopup(): JSX.Element {
    return (
      <gux-month-calendar
        slot="popup"
        ref={(el: HTMLGuxMonthCalendarElement) =>
          (this.monthCalendarElement = el)
        }
        onInput={() => this.onMonthCalendarInput()}
        value={this.value}
        min={this.min}
        max={this.max}
      />
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <gux-popup
        expanded={this.expanded}
        disabled={this.disabled}
        exceed-target-width
      >
        {this.renderTarget()}
        {this.renderPopup()}
      </gux-popup>
    ) as JSX.Element;
  }
}
