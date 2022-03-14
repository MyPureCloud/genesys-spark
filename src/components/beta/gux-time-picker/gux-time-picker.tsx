import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { fromIsoTime } from '../../../utils/date/from-iso-time-string';
import { trackComponent } from '../../../usage-tracking';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import translationResources from './i18n/en.json';

const MAX_TIME: string = '23:59:59';
const MIN_TIME: string = '00:00:00';
const DEFAULT_INTERVAL: number = 15;

@Component({
  styleUrl: 'gux-time-picker.less',
  tag: 'gux-time-picker-beta',
  shadow: true
})
export class GuxTimePicker {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop({ mutable: true, reflect: true })
  value: string = '';

  @Prop({ mutable: true })
  interval: number = DEFAULT_INTERVAL;

  @Prop({ mutable: true })
  max: string = MAX_TIME;

  @Prop({ mutable: true })
  min: string = MIN_TIME;

  @Prop()
  label: string = '';

  @State()
  active: boolean = false;

  @State()
  openDropdown: boolean = false;

  @State()
  suggestion: string = '00';

  @Event()
  changed: EventEmitter<string>;

  inputElement: HTMLInputElement;
  focusedField: HTMLInputElement;
  dropdownList: HTMLGuxListElement;
  maxTimeObj: Date;
  minTimeObj: Date;
  isPressEvent: boolean = false;

  @Watch('value')
  watchValue(newValue: string) {
    this.changed.emit(newValue);
  }

  private getShadowDomEventTarget(event: Event): EventTarget {
    return event.composedPath()[0];
  }

  @Listen('keydown', { passive: false })
  onKeyDown(e: KeyboardEvent) {
    this.focusedField = this.getShadowDomEventTarget(e) as HTMLInputElement;

    if (this.focusedField === this.inputElement) {
      switch (e.key) {
        case 'Enter':
          this.updateChosenValue();
          this.inputElement.focus();
          break;
        case 'Backspace':
          e.preventDefault();
          this.handleBackspace();
          break;
        case 'Tab':
          this.updateChosenValue();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (this.dropdownList) {
            void this.dropdownList.setFocusOnFirstItem();
          }
          break;
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowLeft':
          e.preventDefault();
          break;
        default:
          e.preventDefault();
          if ('0' <= e.key && e.key <= '9') {
            this.openDropdown = true;
            if (this.focusedField.value.length < 8) {
              let newValue =
                this.focusedField.value + String(parseInt(e.key, 10));
              const arr = newValue.split(':');
              if (newValue.length > 6 && Number(arr[2].padEnd(2, '0')) > 59) {
                return;
              }
              if (!this.canBeCompletedToAValidTime(newValue)) {
                return;
              }
              if (arr[arr.length - 1].length === 2 && newValue.length < 8) {
                newValue += ':';
              }
              this.focusedField.value = newValue;
              this.suggestion = arr[0].padEnd(2, '0');
            }
          }
      }
    } else {
      switch (e.key) {
        case 'Enter':
          this.inputElement.focus();
          break;
        case 'Escape':
          this.updateChosenValue();
          this.inputElement.focus();
          break;
      }
    }
  }

  canBeCompletedToAValidTime(str: string) {
    const max = fromIsoTime(str + this.max.slice(str.length));
    const min = fromIsoTime(str + this.min.slice(str.length));
    if (
      (this.minTimeObj <= max && max <= this.maxTimeObj) ||
      (this.minTimeObj <= min && min <= this.maxTimeObj)
    ) {
      return true;
    }
    return false;
  }

  handleBackspace() {
    this.openDropdown = true;
    if (this.focusedField.selectionStart === this.focusedField.selectionEnd) {
      const newEnd = this.focusedField.value.endsWith(':') ? -2 : -1;
      this.focusedField.value = this.focusedField.value.slice(0, newEnd);
      this.suggestion = this.focusedField.value.split(':')[0].padEnd(2, '0');
    } else {
      this.focusedField.value = '';
    }
  }

  @Listen('press', { passive: false })
  onPress(e: CustomEvent) {
    this.isPressEvent = true;

    const chosenTimeOption = this.getShadowDomEventTarget(
      e
    ) as HTMLGuxListItemElement;
    this.inputElement.value = chosenTimeOption.value as string;
    this.updateChosenValue();
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside() {
    this.updateChosenValue();
  }

  updateChosenValue() {
    this.inputElement.value = this.validateValue(this.inputElement.value);
    this.value = this.inputElement.value;
    this.active = false;
    this.openDropdown = false;
  }

  @Listen('mouseup')
  onMouseUp(e: MouseEvent) {
    this.focusedField = this.getShadowDomEventTarget(e) as HTMLInputElement;
    if (this.focusedField === this.inputElement) {
      if (this.focusedField.selectionEnd !== this.inputElement.value.length) {
        this.inputElement.setSelectionRange(0, this.inputElement.value.length);
      } else {
        this.inputElement.setSelectionRange(
          this.inputElement.value.length,
          this.inputElement.value.length
        );
      }
    }
  }

  @Listen('focusin')
  onFocusIn(e: FocusEvent) {
    this.focusedField = this.getShadowDomEventTarget(e) as HTMLInputElement;
    this.active = true;
  }

  isValidTime(time: string): boolean {
    const postionArray = time.split(':');
    const maxTimeArray = MAX_TIME.split(':');
    for (let i = 0; i < postionArray.length; i++) {
      if (Number(postionArray[i]) > Number(maxTimeArray[i])) {
        return false;
      }
    }
    return true;
  }

  validateUpperBound() {
    this.max = this.isInFormat(this.max) ? this.max : MAX_TIME;
    this.max = this.isValidTime(this.max) ? this.max : MAX_TIME;
  }

  validateLowerBound() {
    this.min = this.isInFormat(this.min) ? this.min : MIN_TIME;
    this.min = this.isValidTime(this.min) ? this.min : MIN_TIME;
  }

  validateBounds() {
    this.validateUpperBound();
    this.validateLowerBound();
    this.maxTimeObj = fromIsoTime(this.max);
    this.minTimeObj = fromIsoTime(this.min);
    if (this.maxTimeObj < this.minTimeObj) {
      this.max = MAX_TIME;
      this.min = MIN_TIME;
      this.maxTimeObj = fromIsoTime(this.max);
      this.minTimeObj = fromIsoTime(this.min);
    }
  }

  validateValue(value: string) {
    let validatedValue = this.isInFormat(value) ? value : '';
    validatedValue =
      validatedValue !== '' && this.isValidTime(validatedValue)
        ? validatedValue
        : '';
    if (validatedValue) {
      const valueTimeObj = fromIsoTime(validatedValue);
      validatedValue =
        this.minTimeObj <= valueTimeObj && valueTimeObj <= this.maxTimeObj
          ? validatedValue
          : '';
    }
    return validatedValue;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.validateBounds();
    this.value = this.validateValue(this.value);
  }

  isInFormat(value: string): boolean {
    const regex = /^\d{2}:\d{2}:\d{2}$/;
    return regex.test(value);
  }

  render(): JSX.Element {
    return (
      <div>
        <div class="gux-input">
          <input
            type="text"
            value={this.value}
            size={9}
            aria-label={this.label || this.i18n('defaultAriaLabel')}
            ref={el => (this.inputElement = el)}
          ></input>
        </div>
        {this.openDropdown === true && (
          <div class="gux-list-container">
            <gux-list ref={el => (this.dropdownList = el)}>
              {this.buildDropdownOptions().map(value => {
                return (
                  <gux-list-item value={value} text={value}></gux-list-item>
                ) as JSX.Element;
              })}
            </gux-list>
          </div>
        )}
      </div>
    ) as JSX.Element;
  }

  buildDropdownOptions(): string[] {
    const dropDownOptions: string[] = [];
    for (let i = 0; i < 60; i += this.interval) {
      const time = [
        this.suggestion.toString().padStart(2, '0'),
        i.toString().padStart(2, '0'),
        '00'
      ].join(':');
      const timeObj = fromIsoTime(time);
      if (this.minTimeObj <= timeObj && timeObj <= this.maxTimeObj) {
        dropDownOptions.push(time);
      }
    }
    return dropDownOptions;
  }
}
