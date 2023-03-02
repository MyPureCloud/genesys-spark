import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { O as OnClickOutside } from './on-click-outside-c96e7b47.js';
import { b as buildI18nForComponent, g as getDesiredLocale } from './index-0998c803.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { b as afterNextRender } from './after-next-render-ed0f7dcd.js';
import { g as getYearMonthObject, a as getISOYearMonth, b as getCurrentISOYearMonth } from './year-month-values-1b64c204.js';
import './get-closest-element-1597503c.js';

const toggleCalendar = "Toggle month calendar view";
const month = "Month";
const year = "Year";
const unset = "Unset";
const translationResources = {
	toggleCalendar: toggleCalendar,
	month: month,
	year: year,
	unset: unset
};

const guxMonthPickerCss = ":host{display:inline-block}.gux-target{display:inline-flex;padding:4px 8px 4px 12px;cursor:pointer;background-color:#f6f7f9;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target .gux-display{display:inline-flex;min-width:100px;padding-right:8px;color:#2e394c}.gux-target .gux-display .gux-spinner{outline:none}.gux-target .gux-display .gux-spinner:not(:first-child){margin-left:4px}.gux-target .gux-display .gux-spinner:focus{background:#deeaff}.gux-target .gux-display .gux-spinner.gux-empty{color:#596373}.gux-target .gux-popup-toggle{justify-content:right;padding:2px;color:#596373;background:transparent;border:none;border-radius:4px}.gux-target .gux-popup-toggle:focus{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-target .gux-popup-toggle:not(:disabled):focus,.gux-target .gux-popup-toggle:not(:disabled):hover{color:#2e394c;cursor:pointer}.gux-target .gux-popup-toggle gux-icon{width:16px;height:16px}.gux-target .gux-popup-toggle.gux-expanded{color:#2a60c8}.gux-target .gux-popup-toggle.gux-expanded:not(:disabled):focus,.gux-target .gux-popup-toggle.gux-expanded:not(:disabled):hover{color:#2a60c8}";

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
const DateTimeFormats = { year: 'numeric', month: 'long' };
const YearFirstLocales = ['ar', 'he', 'ja', 'ko', 'zh-cn', 'zh-tw'];
const GuxMonthPicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
    this.min = undefined;
    this.max = undefined;
    this.disabled = false;
    this.expanded = false;
    this.locale = undefined;
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        this.expanded = false;
        this.calendarToggleButtonElement.focus();
        break;
    }
  }
  onValueUpdate(newValue) {
    if (this.isOutOfBounds(newValue)) {
      if (this.isBeforeMin(newValue)) {
        this.value = this.min;
      }
      else {
        this.value = this.max;
      }
    }
    else {
      this.value = newValue;
    }
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }
  onClickOutside() {
    this.expanded = false;
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.locale = getDesiredLocale(this.root);
  }
  isOutOfBounds(value) {
    return this.isBeforeMin(value) || this.isAfterMax(value);
  }
  isBeforeMin(value) {
    return this.min && this.min > value;
  }
  isAfterMax(value) {
    return this.max && this.max < value;
  }
  toggleCalendar() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      afterNextRender(() => {
        void this.monthCalendarElement.guxFocus(this.value);
      });
    }
  }
  onMonthCalendarInput() {
    this.value = this.monthCalendarElement.value;
    this.expanded = false;
    this.calendarToggleButtonElement.focus();
  }
  incrementMonth(delta) {
    if (this.value) {
      const { year: currentYear, month: currentMonth } = getYearMonthObject(this.value);
      const newMonth = (((parseInt(currentMonth) + 11 + delta) % 12) + 1)
        .toString()
        .padStart(2, '0');
      this.value = getISOYearMonth(currentYear, newMonth);
    }
    else {
      this.value = getCurrentISOYearMonth();
    }
  }
  incrementYear(delta) {
    if (this.value) {
      const { year: currentYear, month: currentMonth } = getYearMonthObject(this.value);
      const newYear = Math.max(Number(currentYear) + delta, 0).toString();
      this.value = getISOYearMonth(newYear, currentMonth);
    }
    else {
      this.value = getCurrentISOYearMonth();
    }
  }
  onSpinnerKeyDown(event, incrementor, nextFocusElement) {
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
  onSpinnerKeyUp(event) {
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
  onSpinnerClick() {
    this.expanded = true;
  }
  getSpinnerLabel(period) {
    if (this.value) {
      const { year, month } = getYearMonthObject(this.value);
      return new Date(Number(year), Number(month) - 1).toLocaleDateString(this.locale, { [period]: DateTimeFormats[period] });
    }
    return this.i18n(period);
  }
  getSpinnerValueNow(period) {
    return this.value ? getYearMonthObject(this.value)[period] : '0';
  }
  getSpinnerValueText() {
    if (this.value) {
      const { year, month } = getYearMonthObject(this.value);
      return new Date(Number(year), Number(month) - 1).toLocaleDateString(this.locale, { year: 'numeric', month: 'long' });
    }
    return this.i18n('unset');
  }
  renderMonthSpinnerButton() {
    return (h("div", { role: "spinbutton", class: {
        'gux-spinner': true,
        'gux-empty': Boolean(!this.value)
      }, tabIndex: this.disabled ? -1 : 0, onKeyDown: (e) => this.onSpinnerKeyDown(e, d => this.incrementMonth(d), this.yearSpinnerElement), onKeyUp: (e) => this.onSpinnerKeyUp(e), onClick: () => this.onSpinnerClick(), ref: (el) => (this.monthSpinnerElement = el), "aria-valuenow": this.getSpinnerValueNow('month'), "aria-valuetext": this.getSpinnerValueText(), "aria-valuemin": "1", "aria-valuemax": "12", "aria-label": this.i18n('month') }, this.getSpinnerLabel('month')));
  }
  renderYearSpinnerButton() {
    return (h("div", { role: "spinbutton", class: {
        'gux-spinner': true,
        'gux-empty': Boolean(!this.value)
      }, tabIndex: this.disabled ? -1 : 0, onKeyDown: (e) => this.onSpinnerKeyDown(e, d => this.incrementYear(d), this.monthSpinnerElement), onKeyUp: (e) => this.onSpinnerKeyUp(e), onClick: () => this.onSpinnerClick(), ref: (el) => (this.yearSpinnerElement = el), "aria-valuenow": this.getSpinnerValueNow('year'), "aria-valuetext": this.getSpinnerValueText(), "aria-valuemin": "0", "aria-label": this.i18n('year') }, this.getSpinnerLabel('year')));
  }
  renderSpinnerButtons() {
    if (YearFirstLocales.includes(this.locale)) {
      return (h("span", { class: "gux-display" }, this.renderYearSpinnerButton(), this.renderMonthSpinnerButton()));
    }
    return (h("span", { class: "gux-display" }, this.renderMonthSpinnerButton(), this.renderYearSpinnerButton()));
  }
  renderCalendarToggleButton() {
    return (h("button", { class: {
        'gux-popup-toggle': true,
        'gux-expanded': this.expanded
      }, ref: (el) => (this.calendarToggleButtonElement = el), type: "button", onClick: () => this.toggleCalendar(), disabled: this.disabled }, h("gux-icon", { "icon-name": "calendar", "screenreader-text": this.i18n('toggleCalendar') })));
  }
  renderTarget() {
    return (h("div", { class: "gux-target", slot: "target" }, this.renderSpinnerButtons(), this.renderCalendarToggleButton()));
  }
  renderPopup() {
    return (h("gux-month-calendar", { slot: "popup", ref: (el) => (this.monthCalendarElement = el), onInput: () => this.onMonthCalendarInput(), value: this.value, min: this.min, max: this.max }));
  }
  render() {
    return (h("gux-popup-beta", { expanded: this.expanded, disabled: this.disabled }, this.renderTarget(), this.renderPopup()));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueUpdate"]
  }; }
};
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxMonthPicker.prototype, "onClickOutside", null);
GuxMonthPicker.style = guxMonthPickerCss;

export { GuxMonthPicker as gux_month_picker_beta };
