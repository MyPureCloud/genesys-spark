import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { O as OnClickOutside } from './on-click-outside-c96e7b47.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { b as afterNextRender } from './after-next-render-ed0f7dcd.js';
import { g as getDesiredLocale, b as buildI18nForComponent } from './index-0998c803.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import './get-closest-element-1597503c.js';

const am = "AM";
const clockButton = "Toggle suggested times";
const hoursInput = "Input hours";
const minutesInput = "Input minutes";
const pm = "PM";
const timeOptionsState = "Time options open: {state}";
const toggleAmPM = "{amOrPm} selected, click to toggle";
const translationResources = {
	am: am,
	"time-separator": ":",
	clockButton: clockButton,
	hoursInput: hoursInput,
	minutesInput: minutesInput,
	pm: pm,
	timeOptionsState: timeOptionsState,
	toggleAmPM: toggleAmPM
};

function getTimeDisplayValues(minuteInterval, clockType) {
  const minuteOptions = [0, 15, 30, 45]
    .filter(option => Number.isInteger(option / minuteInterval))
    .map(x => String(x).padStart(2, '0'));
  const hourOptions = clockType === '12h'
    ? ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
    : Array.from(Array(24).keys()).map(x => String(x).padStart(2, '0'));
  return hourOptions.reduce((acc, hourOption) => {
    return acc.concat(minuteOptions.map(minuteOption => `${hourOption}:${minuteOption}`));
  }, []);
}
function getLocaleClockType(root) {
  const locale = getDesiredLocale(root);
  const date = new Date('January 19, 1975 15:00:00 UTC+00:00');
  const time = new Intl.DateTimeFormat(locale, {
    timeStyle: 'short',
    timeZone: 'UTC'
  }).format(date);
  return new RegExp('.*15.*').test(time) ? '24h' : '12h';
}
function incrementHour(value, delta) {
  const [hour, minute] = value.split(':');
  const newHour = ((parseInt(hour, 10) + delta + 24) % 24)
    .toString()
    .padStart(2, '0');
  return `${newHour}:${minute}`;
}
function incrementMinute(value, delta, step) {
  const [hour, minute] = value.split(':');
  const minuteInt = parseInt(minute, 10);
  let newMinuteInt = (minuteInt + delta + 60) % 60;
  while (newMinuteInt % step !== 0) {
    newMinuteInt = (newMinuteInt + delta + 60) % 60;
  }
  const newMinute = newMinuteInt.toString().padStart(2, '0');
  return `${hour}:${newMinute}`;
}
function getDisplayValue(value, clockType) {
  const [hour, minute] = value.split(':');
  if (clockType === '12h') {
    return `${(parseInt(hour, 10) % 12 || 12).toString()}:${minute}`;
  }
  return `${hour}:${minute}`;
}
function getValue(displayValue, clockType, isAm) {
  const [hour, minute] = displayValue.split(':');
  if (clockType === '12h') {
    if (isAm) {
      return `${(parseInt(hour, 10) % 12)
        .toString()
        .padStart(2, '0')}:${minute}`;
    }
    return `${((parseInt(hour, 10) % 12) + 12)
      .toString()
      .padStart(2, '0')}:${minute}`;
  }
  return `${hour}:${minute}`;
}
function getHourDisplayValue(value, clockType) {
  const [hour] = getDisplayValue(value, clockType).split(':');
  return hour;
}
function getMinuteDisplayValue(value) {
  const [, minute] = value.split(':');
  return minute;
}
function isAm(value) {
  const [hour] = value.split(':');
  return parseInt(hour, 10) < 12;
}
function getHoursPattern(clockType) {
  if (clockType === '12h') {
    return '^(0?[1-9]|1[012])$';
  }
  return '^([01]?[0-9]|2[0-3])$';
}
function getMinutesPattern() {
  return '^[0-5][0-9]$';
}
function getValidValueHourChange(value, clockType, change, selectionStart, hourInputLength) {
  const [displayValue, minute] = getDisplayValue(value, clockType).split(':');
  let wantedDisplayValue = displayValue;
  if (change === 'Backspace') {
    if (clockType == '12h' && hourInputLength == 1) {
      wantedDisplayValue = wantedDisplayValue
        .split('')
        .filter((_, i) => i == selectionStart - 1)
        .join('');
    }
    else {
      wantedDisplayValue = wantedDisplayValue
        .split('')
        .filter((_, i) => i !== selectionStart - 1)
        .join('')
        .padStart(2, '0');
    }
  }
  else {
    wantedDisplayValue = parseInt(wantedDisplayValue.slice(0, selectionStart) +
      change +
      wantedDisplayValue.slice(selectionStart + 1), 10)
      .toString()
      .slice(-2)
      .padStart(2, '0');
  }
  if (!new RegExp(getHoursPattern(clockType)).test(wantedDisplayValue)) {
    if (clockType === '12h') {
      wantedDisplayValue = change;
    }
    else {
      wantedDisplayValue = change.padStart(2, '0');
    }
  }
  return getValue(`${wantedDisplayValue}:${minute}`, clockType, isAm(value));
}
function getValidValueMinuteChange(value, change, selectionStart) {
  const [hour, minute] = value.split(':');
  let wanted = minute;
  if (change === 'Backspace') {
    wanted = wanted
      .split('')
      .filter((_, i) => i !== selectionStart - 1)
      .join('')
      .padStart(2, '0');
  }
  else {
    wanted = (wanted.slice(0, selectionStart) +
      change +
      wanted.slice(selectionStart + 1))
      .slice(-2)
      .padStart(2, '0');
  }
  if (!new RegExp(getMinutesPattern()).test(wanted)) {
    wanted = change.padStart(2, '0');
  }
  return `${hour}:${wanted}`;
}

const guxTimePickerCss = ".gux-time-picker{position:relative;display:inline-block}.gux-time-picker.gux-error .gux-input-time{border-color:#ea0b0b}.gux-time-picker .gux-input-time{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;gap:8px;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:4px 8px 4px 8px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-time-picker .gux-input-time:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-time-picker .gux-input-time input{flex:1 1 auto;align-self:auto;order:0;width:20px;padding:0;font-size:12px;color:#2e394c;text-align:center;text-align:left;background-color:#f6f7f9;border:none;outline:none}.gux-time-picker .gux-input-time input.gux-input-time-hours{text-align:right}.gux-time-picker .gux-input-time input::placeholder{color:#596373;opacity:1}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector{display:grid;grid-template:auto 1fr / auto 1fr auto;place-items:flex-end;padding:0;font-size:12px;font-weight:bold;color:#2e394c;background:transparent;border:none;outline:none}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector:not(:disabled):hover{color:#2a60c8;cursor:pointer}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector:focus-visible{color:#2a60c8}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector .gux-meridiem{grid-row:1;grid-column:1;visibility:hidden}.gux-time-picker .gux-input-time .gux-input-time-am-pm-selector .gux-meridiem.gux-visible{visibility:visible}.gux-time-picker .gux-input-time .gux-clock-button{display:flex;flex:0 1 auto;align-items:center;align-self:auto;justify-content:center;order:0;padding:0;color:#596373;background:transparent;border:none}.gux-time-picker .gux-input-time .gux-clock-button.gux-active:not(:disabled){color:#2a60c8;cursor:pointer}.gux-time-picker .gux-input-time .gux-clock-button.gux-active:not(:disabled):hover{color:#2a60c8 !important;cursor:pointer}.gux-time-picker .gux-input-time .gux-clock-button:not(:disabled):hover{color:#2e394c;cursor:pointer}.gux-time-picker .gux-input-time .gux-clock-button:focus{border:none;outline:none}.gux-time-picker .gux-input-time .gux-clock-button:focus-visible gux-icon{outline:2px solid #aac9ff;outline-offset:0;border-radius:2px}.gux-time-picker .gux-input-time .gux-clock-button gux-icon{width:16px;height:16px}.gux-time-picker .gux-list-container{max-height:150px;padding:8px 0;margin:0;overflow-y:scroll;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const GuxTimePickerBeta = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = '00:00';
    this.interval = 60;
    this.step = 1;
    this.disabled = false;
    this.required = false;
    this.hasError = false;
    this.clockType = undefined;
    this.expanded = false;
  }
  onFocus() {
    this.valueLastChange = this.value;
  }
  onBlur() {
    if (this.valueLastChange !== this.value) {
      simulateNativeEvent(this.root, 'change');
    }
  }
  onClickOutside() {
    this.expanded = false;
  }
  handleKeydown(event) {
    switch (event.key) {
      case 'Escape':
      case 'Tab':
        this.expanded = false;
        break;
    }
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.clockType = this.clockType || getLocaleClockType(this.root);
  }
  updateValue(value, fireChange = false) {
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
  valueToId(value) {
    return `gux-id-${value.replace(':', '-')}`;
  }
  focusRelevantItemInPopupList() {
    afterNextRender(() => {
      void this.listElement.guxFocusItemByClosestId(this.valueToId(this.value));
    });
  }
  toggleDropdown() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.focusRelevantItemInPopupList();
    }
  }
  handleClickDropdownValue(displayValue) {
    const value = getValue(displayValue, this.clockType, isAm(this.value));
    this.updateValue(value, true);
    this.clockButton.focus();
    this.expanded = false;
  }
  onHourKeyDown(event) {
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
          this.updateValue(getValidValueHourChange(this.value, this.clockType, event.key, this.hourInputElement.selectionStart, this.hourInputElement.value.length));
        }
        break;
      default:
        event.preventDefault();
    }
  }
  onMinuteKeyDown(event) {
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
        this.updateValue(getValidValueMinuteChange(this.value, event.key, this.minuteInputElement.selectionStart));
        break;
      }
      default:
        event.preventDefault();
    }
  }
  onAmPmButtonKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this.toggleAmPm(event);
        break;
    }
  }
  onListKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        this.expanded = false;
        this.clockButton.focus();
        break;
    }
  }
  toggleAmPm(event) {
    event.preventDefault();
    this.updateValue(incrementHour(this.value, 12), true);
  }
  getAmPmString() {
    return isAm(this.value) ? this.i18n('am') : this.i18n('pm');
  }
  renderNumberInput() {
    return (h("div", null, h("input", { class: "gux-input-time-hours", type: "text", disabled: this.disabled, value: getHourDisplayValue(this.value, this.clockType), onKeyDown: e => this.onHourKeyDown(e), "aria-label": this.i18n('hoursInput'), pattern: getHoursPattern(this.clockType), ref: el => (this.hourInputElement = el) }), h("span", { class: "gux-time-separator" }, this.i18n('time-separator')), h("input", { class: "gux-input-time-minutes", type: "text", disabled: this.disabled, value: getMinuteDisplayValue(this.value), onKeyDown: e => this.onMinuteKeyDown(e), "aria-label": this.i18n('minutesInput'), pattern: getMinutesPattern(), ref: el => (this.minuteInputElement = el) })));
  }
  renderAmPmSelector() {
    if (this.clockType === '12h') {
      return (h("button", { class: "gux-input-time-am-pm-selector", type: "button", disabled: this.disabled, "aria-label": this.i18n('toggleAmPM', { amOrPm: this.getAmPmString() }), onClick: (e) => this.toggleAmPm(e), onKeyDown: (e) => this.onAmPmButtonKeyDown(e) }, h("div", { class: {
          'gux-meridiem': true,
          'gux-visible': isAm(this.value)
        } }, this.i18n('am')), h("div", { class: {
          'gux-meridiem': true,
          'gux-visible': !isAm(this.value)
        } }, this.i18n('pm'))));
    }
  }
  renderClockButton() {
    return (h("button", { class: {
        'gux-clock-button': true,
        'gux-active': this.expanded
      }, type: "button", disabled: this.disabled, "aria-label": this.i18n('clockButton'), "aria-expanded": this.expanded.toString(), onClick: this.toggleDropdown.bind(this), ref: el => (this.clockButton = el) }, h("gux-icon", { decorative: true, "icon-name": "clock-outline" })));
  }
  renderTimeListItems() {
    return getTimeDisplayValues(this.interval, this.clockType).map(displayValue => {
      const value = getValue(displayValue, this.clockType, isAm(this.value));
      return (h("gux-list-item", { id: this.valueToId(value), onClick: () => this.handleClickDropdownValue(displayValue) }, displayValue));
    });
  }
  renderTarget() {
    return (h("div", { class: "gux-input-time", slot: "target" }, this.renderNumberInput(), this.renderAmPmSelector(), this.renderClockButton()));
  }
  renderPopup() {
    return (h("div", { slot: "popup", class: "gux-list-container", onKeyDown: (e) => this.onListKeyDown(e) }, h("gux-list", { ref: el => (this.listElement = el) }, this.renderTimeListItems())));
  }
  render() {
    return (h("gux-popup-beta", { class: {
        'gux-time-picker': true,
        'gux-error': this.hasError
      }, expanded: this.expanded, disabled: this.disabled }, this.renderTarget(), this.renderPopup()));
  }
  get root() { return getElement(this); }
};
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxTimePickerBeta.prototype, "onClickOutside", null);
GuxTimePickerBeta.style = guxTimePickerCss;

export { GuxTimePickerBeta as gux_time_picker_beta };
