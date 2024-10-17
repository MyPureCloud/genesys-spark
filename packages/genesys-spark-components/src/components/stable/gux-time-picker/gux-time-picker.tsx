import { Component, Element, h, JSX, Listen, Prop, State } from '@stencil/core';

import { OnClickOutside } from '@utils/decorator/on-click-outside';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { afterNextRender } from '@utils/dom/after-next-render';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';

import translationResources from './i18n/en.json';

import { GuxFormFieldError } from '../gux-form-field/functional-components/functional-components';
import { randomHTMLId } from '@utils/dom/random-html-id';

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
  private i18n: GetI18nValue;
  private valueLastChange: GuxISOHourMinute;
  private errorMessageId: string = randomHTMLId('gux-time-picker-eror');

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

  @State()
  expanded: boolean = false;

  @State()
  hasInputError: boolean = false;

  @Listen('focus')
  onFocus() {
    this.valueLastChange = this.value;
  }

  @Listen('blur')
  onBlur() {
    if (this.valueLastChange !== this.value) {
      // Format input time to match format found in the popup time list (e.g. "01:30" -> "1:30", "00:30" -> "12:30", etc)
      const split = this.value.split(':');
      const hourParsed = parseInt(split[0], 10);
      let hour = hourParsed === 0 ? 12 : hourParsed;
      hour = hour > 12 ? hour % 12 : hour;
      const minutes = split[1];
      const valueFormatted = `${hour}:${minutes}`;

      // Check if the input value is in the popup time list
      const valueIsValid = getTimeDisplayValues(
        this.interval,
        this.clockType
      ).find(displayValue => displayValue === valueFormatted);

      if (!valueIsValid) {
        this.hasInputError = true;
      } else {
        this.hasInputError = false;
      }

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

  private valueToId(value: string): string {
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
          aria-describedby={this.errorMessageId}
          class="gux-input-time-hours"
          type="text"
          disabled={this.disabled}
          value={getHourDisplayValue(this.value, this.clockType)}
          onKeyDown={e => this.onHourKeyDown(e)}
          aria-label={this.i18n('hoursInput')}
          pattern={getHoursPattern(this.clockType)}
          ref={el => (this.hourInputElement = el)}
        />
        <span class="gux-time-separator">{this.i18n('time-separator')}</span>
        <input
          aria-describedby={this.errorMessageId}
          class="gux-input-time-minutes"
          type="text"
          disabled={this.disabled}
          value={getMinuteDisplayValue(this.value)}
          onKeyDown={e => this.onMinuteKeyDown(e)}
          aria-label={this.i18n('minutesInput')}
          pattern={getMinutesPattern()}
          ref={el => (this.minuteInputElement = el)}
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
        <gux-icon decorative icon-name="fa/clock-regular"></gux-icon>
      </button>
    ) as JSX.Element;
  }

  private renderTimeListItems(): JSX.Element[] {
    return getTimeDisplayValues(this.interval, this.clockType).map(
      displayValue => {
        const value = getValue(displayValue, this.clockType, isAm(this.value));

        return (
          <gux-list-item
            id={this.valueToId(value)}
            onClick={() => this.handleClickDropdownValue(displayValue)}
          >
            {displayValue}
          </gux-list-item>
        ) as JSX.Element;
      }
    );
  }

  private renderTarget(): JSX.Element {
    return (
      <div class="gux-input-time" slot="target">
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

  private maybeRenderInputError(): JSX.Element {
    const error = 'Enter a valid time';
    return (
      <GuxFormFieldError show={this.hasInputError}>
        <span id={this.errorMessageId}>{error}</span>
      </GuxFormFieldError>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <div>
        <gux-popup
          class={{
            'gux-time-picker': true,
            'gux-error': this.hasError || this.hasInputError
          }}
          expanded={this.expanded}
          disabled={this.disabled}
        >
          {this.renderTarget()}
          {this.renderPopup()}
        </gux-popup>
        {this.maybeRenderInputError()}
      </div>
    ) as JSX.Element;
  }
}
