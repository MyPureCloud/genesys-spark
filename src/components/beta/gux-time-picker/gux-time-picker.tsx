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
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';
import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { trackComponent } from '../../../usage-tracking';
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';

import {
  GuxClockType,
  GuxISOHourMinute,
  GuxMinuteInterval
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
  styleUrl: 'gux-time-picker.less',
  tag: 'gux-time-picker-beta',
  shadow: true
})
export class GuxTimePickerBeta {
  private listElement: HTMLGuxListElement;
  private clockButton: HTMLButtonElement;
  private hourInputElement: HTMLInputElement;
  private minuteInputElement: HTMLInputElement;
  private moveFocusDelay: number = 100;
  private i18n: GetI18nValue;
  private valueOnFocus: GuxISOHourMinute;

  @Element()
  private root: HTMLElement;

  @Prop({ mutable: true })
  value: GuxISOHourMinute = '00:00';

  @Prop()
  interval: GuxMinuteInterval = 60;

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

  @Listen('focus')
  onFocus() {
    this.valueOnFocus = this.value;
  }

  @Listen('blur')
  onBlur() {
    if (this.valueOnFocus !== this.value) {
      simulateNativeEvent(this.root, 'change');
    }
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside() {
    this.expanded = false;
  }

  @Watch('value')
  watchValue(): void {
    simulateNativeEvent(this.root, 'input');
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

  private focusFirstItemInPopupList(): void {
    setTimeout(() => {
      void this.listElement.guxFocusFirstItem();
    }, this.moveFocusDelay);
  }

  private toggleDropdown() {
    this.expanded = !this.expanded;

    if (this.expanded) {
      this.focusFirstItemInPopupList();
    }
  }

  private handleClickDropdownValue(displayValue: GuxISOHourMinute) {
    const value = getValue(displayValue, this.clockType, isAm(this.value));

    this.value = value;
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
        this.value = incrementHour(this.value, -1);

        break;
      case 'ArrowUp':
        event.preventDefault();
        this.value = incrementHour(this.value, 1);
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
        this.value = getValidValueHourChange(
          this.value,
          this.clockType,
          event.key,
          this.hourInputElement.selectionStart
        );
        break;
      }
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
        this.value = incrementMinute(this.value, -1);

        break;
      case 'ArrowUp':
        event.preventDefault();
        this.value = incrementMinute(this.value, 1);
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
        this.value = getValidValueMinuteChange(
          this.value,
          event.key,
          this.minuteInputElement.selectionStart
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
    this.value = incrementHour(this.value, 12);
  }

  private getAmPmString(): string {
    return isAm(this.value) ? this.i18n('am') : this.i18n('pm');
  }

  private renderNumberInput(): JSX.Element {
    return (
      <div>
        <input
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
          {this.getAmPmString()}
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
        <gux-icon decorative icon-name="clock-outline"></gux-icon>
      </button>
    ) as JSX.Element;
  }

  private renderTimeListItems(): JSX.Element[] {
    return getTimeDisplayValues(this.interval, this.clockType).map(
      displayValue =>
        (
          <gux-list-item
            onClick={() => this.handleClickDropdownValue(displayValue)}
          >
            {displayValue}
          </gux-list-item>
        ) as JSX.Element
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
