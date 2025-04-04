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

import { OnClickOutside } from '@utils/decorator/on-click-outside';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { afterNextRender } from '@utils/dom/after-next-render';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';

import translationResources from './i18n/en.json';
import { logError } from '../../../utils/error/log-error';

import {
  GuxClockType,
  GuxISOHourMinute,
  GuxMinuteInterval,
  GuxMinuteStep
} from './gux-time-picker.type';
import {
  getHourDisplayValue,
  getHoursPattern,
  getLocaleClockType,
  getMinuteDisplayValue,
  getMinutesPattern,
  getTimeDisplayValues,
  getValidValueHourChange,
  getValidValueMinuteChange,
  getValue,
  incrementHour,
  incrementMinute,
  isAm
} from './gux-time-picker.service';

@Component({
  styleUrl: 'gux-time-picker.scss',
  tag: 'gux-time-picker',
  shadow: true
})
export class GuxTimePicker {
  private listElement: HTMLGuxListElement;
  private clockButton: HTMLButtonElement;
  private hourInputElement: HTMLInputElement;
  private minuteInputElement: HTMLInputElement;
  private amPmElement: HTMLButtonElement;
  private i18n: GetI18nValue;
  private valueLastChange: GuxISOHourMinute;

  @Element()
  private root: HTMLElement;

  @Prop({ mutable: true })
  value: GuxISOHourMinute = '00:00';

  @Prop()
  interval: GuxMinuteInterval = 60;

  @Prop()
  step: GuxMinuteStep = 1;

  @Prop()
  disabled: boolean = false;

  @Prop()
  required: boolean = false;

  @Prop()
  hasError: boolean = false;

  @Prop({ mutable: true })
  clockType: GuxClockType;

  @Prop()
  min?: string;

  @Prop()
  max?: string;

  @State()
  expanded: boolean = false;

  @Listen('focus')
  onFocus() {
    this.valueLastChange = this.value;
  }

  @Listen('blur')
  onBlur() {
    if (this.valueLastChange !== this.value) {
      simulateNativeEvent(this.root, 'change');
    }
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside() {
    this.expanded = false;
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.expanded = false;
        break;
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);

    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.clockType = this.clockType || getLocaleClockType(this.root);

    this.validateValueFormat(this.value, '00:00');
    if (this.clockType == '12h' && (this.min || this.max)) {
      logError(this.root, 'clock type must be "24h" when using min/max props');
    }
  }

  @Watch('value')
  private validateValueFormat(
    newValue: GuxISOHourMinute,
    oldValue: GuxISOHourMinute
  ) {
    if (!this.isValidTimeFormat(newValue)) {
      logError(
        this.root,
        `"${newValue}" is not a valid value format. Format must be "hh:mm" or "h:mm". Falling back to previous value: "${oldValue}"`
      );
      this.value = oldValue;
    }
  }

  private isValidTimeFormat(value: GuxISOHourMinute) {
    return typeof value === 'string' && /^\d{1,2}:\d{2}$/.test(value);
  }

  private updateValue(
    value: GuxISOHourMinute,
    fireChange: boolean = false
  ): void {
    if (value !== this.value) {
      this.value = value;
      simulateNativeEvent(this.root, 'input');

      if (fireChange) {
        if (this.valueLastChange !== this.value) {
          simulateNativeEvent(this.root, 'change');
          this.valueLastChange = this.value;
        }
      }
    }
  }

  private valueToId(value: GuxISOHourMinute): string {
    return `gux-id-${value.replace(':', '-')}`;
  }

  private focusRelevantItemInPopupList(): void {
    afterNextRender(() => {
      void this.listElement.guxFocusItemByClosestId(this.valueToId(this.value));
    });
  }

  private toggleDropdown() {
    this.expanded = !this.expanded;

    if (this.expanded) {
      this.focusRelevantItemInPopupList();
    }
  }

  private onTargetClick(event: MouseEvent): void {
    const clickPath = event.composedPath();
    const clickedClockButton = clickPath.includes(this.clockButton);
    const clickedAmPmButton = clickPath.includes(this.amPmElement);
    const clickedHourInput = clickPath.includes(this.hourInputElement);
    const clickedMinuteInput = clickPath.includes(this.minuteInputElement);

    // Toggle the dropdown if you click in the padded area of the target container
    if (
      !clickedClockButton &&
      !clickedAmPmButton &&
      !clickedMinuteInput &&
      !clickedHourInput
    ) {
      this.toggleDropdown();
    }
  }

  private handleClickDropdownValue(displayValue: GuxISOHourMinute) {
    const value = getValue(displayValue, this.clockType, isAm(this.value));

    this.updateValue(value, true);
    this.clockButton.focus();
    this.expanded = false;
  }

  private onHourKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Tab':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Escape':
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.updateValue(incrementHour(this.value, -1));

        break;
      case 'ArrowUp':
        event.preventDefault();
        this.updateValue(incrementHour(this.value, 1));
        break;
      case 'Backspace':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        {
          event.preventDefault();
          this.hourInputElement.setSelectionRange(2, 2);
          this.updateValue(
            getValidValueHourChange(
              this.value,
              this.clockType,
              event.key,
              this.hourInputElement.selectionStart,
              this.hourInputElement.value.length
            )
          );
        }
        break;
      default:
        event.preventDefault();
    }
  }

  private onMinuteKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Tab':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Escape':
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.updateValue(incrementMinute(this.value, -1, this.step));

        break;
      case 'ArrowUp':
        event.preventDefault();
        this.updateValue(incrementMinute(this.value, 1, this.step));
        break;
      case 'Backspace':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        event.preventDefault();
        this.minuteInputElement.setSelectionRange(2, 2);
        this.updateValue(
          getValidValueMinuteChange(
            this.value,
            event.key,
            this.minuteInputElement.selectionStart
          )
        );
        break;
      }
      default:
        event.preventDefault();
    }
  }

  private onAmPmButtonKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this.toggleAmPm(event);
        break;
    }
  }

  private onListKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.expanded = false;
        this.clockButton.focus();
        break;
    }
  }

  private toggleAmPm(event: Event) {
    event.preventDefault();
    this.updateValue(incrementHour(this.value, 12), true);
  }

  private getAmPmString(): string {
    return isAm(this.value) ? this.i18n('am') : this.i18n('pm');
  }

  private renderNumberInput(): JSX.Element {
    return (
      <div class="gux-input-time-container">
        <input
          role="spinbutton"
          class="gux-input-time-hours"
          type="text"
          disabled={this.disabled}
          value={getHourDisplayValue(this.value, this.clockType)}
          onKeyDown={e => this.onHourKeyDown(e)}
          aria-label={this.i18n('hoursInput')}
          pattern={getHoursPattern(this.clockType)}
          ref={el => (this.hourInputElement = el)}
          aria-valuetext={getHourDisplayValue(this.value, this.clockType)}
          aria-valuenow={getHourDisplayValue(this.value, this.clockType)}
          aria-valuemin={this.clockType === '24h' ? 0 : 1}
          aria-valuemax={this.clockType === '24h' ? 23 : 12}
        />
        <span class="gux-time-separator">{this.i18n('time-separator')}</span>
        <input
          role="spinbutton"
          class="gux-input-time-minutes"
          type="text"
          disabled={this.disabled}
          value={getMinuteDisplayValue(this.value)}
          onKeyDown={e => this.onMinuteKeyDown(e)}
          aria-label={this.i18n('minutesInput')}
          pattern={getMinutesPattern()}
          ref={el => (this.minuteInputElement = el)}
          aria-valuetext={getMinuteDisplayValue(this.value)}
          aria-valuenow={getMinuteDisplayValue(this.value)}
          aria-valuemin={0}
          aria-valuemax={59}
        />
      </div>
    ) as JSX.Element;
  }

  private renderAmPmSelector(): JSX.Element {
    if (this.clockType === '12h') {
      return (
        <button
          class="gux-input-time-am-pm-selector"
          type="button"
          disabled={this.disabled}
          aria-label={this.i18n('toggleAmPM', { amOrPm: this.getAmPmString() })}
          onClick={(e: MouseEvent) => this.toggleAmPm(e)}
          onKeyDown={(e: KeyboardEvent) => this.onAmPmButtonKeyDown(e)}
          ref={el => (this.amPmElement = el)}
        >
          <div
            class={{
              'gux-meridiem': true,
              'gux-visible': isAm(this.value)
            }}
          >
            {this.i18n('am')}
          </div>
          <div
            class={{
              'gux-meridiem': true,
              'gux-visible': !isAm(this.value)
            }}
          >
            {this.i18n('pm')}
          </div>
        </button>
      ) as JSX.Element;
    }
  }

  private renderClockButton(): JSX.Element {
    return (
      <button
        class={{
          'gux-clock-button': true,
          'gux-active': this.expanded
        }}
        type="button"
        disabled={this.disabled}
        aria-label={this.i18n('clockButton')}
        aria-expanded={this.expanded.toString()}
        onClick={this.toggleDropdown.bind(this)}
        ref={el => (this.clockButton = el)}
      >
        <gux-icon
          decorative
          icon-name="fa/clock-regular"
          size="small"
        ></gux-icon>
      </button>
    ) as JSX.Element;
  }

  private renderTimeListItems(): JSX.Element[] {
    return getTimeDisplayValues(
      this.interval,
      this.clockType,
      this.min,
      this.max
    ).map(displayValue => {
      const value = getValue(displayValue, this.clockType, isAm(this.value));

      return (
        <gux-list-item
          id={this.valueToId(value)}
          onClick={() => this.handleClickDropdownValue(displayValue)}
        >
          {displayValue}
        </gux-list-item>
      ) as JSX.Element;
    });
  }

  private renderTarget(): JSX.Element {
    return (
      <div
        class="gux-input-time"
        slot="target"
        onClick={this.onTargetClick.bind(this)}
      >
        {this.renderNumberInput()}
        {this.renderAmPmSelector()}
        {this.renderClockButton()}
      </div>
    ) as JSX.Element;
  }

  private renderPopup(): JSX.Element {
    return (
      <div
        slot="popup"
        class="gux-list-container"
        onKeyDown={(e: KeyboardEvent) => this.onListKeyDown(e)}
      >
        <gux-list ref={el => (this.listElement = el)}>
          {this.renderTimeListItems()}
        </gux-list>
      </div>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <gux-popup
        class={{
          'gux-time-picker': true,
          'gux-error': this.hasError
        }}
        expanded={this.expanded}
        disabled={this.disabled}
      >
        {this.renderTarget()}
        {this.renderPopup()}
      </gux-popup>
    ) as JSX.Element;
  }
}
