'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const simulateNativeEvent = require('./simulate-native-event-fe3e62da.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const yearMonthValues = require('./year-month-values-f387f8d8.js');
require('./get-closest-element-ab4b2eee.js');

const changeYear = "Current year is {currentYear}, Click to change year to {changeYear}";
const translationResources = {
	changeYear: changeYear
};

const guxMonthCalendarCss = ".gux-month-calendar{flex-wrap:wrap;width:255px;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-month-calendar .gux-year-header{position:relative;display:flex;align-items:center;justify-content:space-between;height:16px;padding:16px;color:#fdfdfd;background-color:#2a60c8;border-top-left-radius:3px;border-top-right-radius:3px}.gux-month-calendar .gux-year-header button{color:#fdfdfd;cursor:pointer;background:none;border:none;outline:none}.gux-month-calendar .gux-year-header button:focus-visible{border-radius:4px;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-month-calendar .gux-year-header button.gux-year-change:disabled{cursor:default;opacity:0.5}.gux-month-calendar .gux-year-header button gux-icon{width:16px;height:16px;pointer-events:none}.gux-month-calendar .gux-year-header .gux-year{font-family:Roboto, sans-serif;font-weight:400;font-weight:700}.gux-month-calendar .gux-months{padding:24px;background-color:#fdfdfd}.gux-month-calendar .gux-months button{width:65px;height:50px;margin:2px;text-align:center;cursor:pointer;background:none;border:none;border-radius:4px;outline:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-month-calendar .gux-months button:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-month-calendar .gux-months button.gux-selected,.gux-month-calendar .gux-months button:hover{color:#fdfdfd;background-color:#2a60c8}.gux-month-calendar .gux-months button:disabled{color:#596373;pointer-events:none;background-color:#fdfdfd}";

const GuxMonthCalendar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = undefined;
    this.min = undefined;
    this.max = undefined;
    this.year = undefined;
    this.locale = undefined;
  }
  onValueUpdate(newValue) {
    const { year } = yearMonthValues.getYearMonthObject(newValue);
    this.year = year;
  }
  /**
   * Focus a month
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus(iSOYearMonth) {
    iSOYearMonth = iSOYearMonth || yearMonthValues.getCurrentISOYearMonth();
    const { year } = yearMonthValues.getYearMonthObject(iSOYearMonth);
    this.year = year;
    afterNextRender.afterNextRender(() => {
      const target = this.root.shadowRoot.querySelector(`gux-month-list-item[value="${iSOYearMonth}"]`);
      if (target) {
        target.focus();
      }
    });
  }
  async componentWillLoad() {
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
    this.locale = index$1.getDesiredLocale(this.root);
    if (this.value) {
      this.year = yearMonthValues.getYearMonthObject(this.value).year;
    }
    else {
      this.year = yearMonthValues.getYearMonthObject(yearMonthValues.getCurrentISOYearMonth()).year;
    }
  }
  updateValue(value) {
    this.value = value;
    simulateNativeEvent.simulateNativeEvent(this.root, 'input');
    simulateNativeEvent.simulateNativeEvent(this.root, 'change');
  }
  isOutOfBounds(value) {
    return (this.max && this.max < value) || (this.min && this.min > value);
  }
  onMonthClick(value) {
    if (this.isOutOfBounds(value)) {
      return;
    }
    this.updateValue(value);
  }
  getMonthAriaLabel(value) {
    const { year, month } = yearMonthValues.getYearMonthObject(value);
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(this.locale, { year: 'numeric', month: 'long' });
  }
  getYearLabel(year) {
    return new Date(Number(year), 5).toLocaleDateString(this.locale, {
      year: 'numeric'
    });
  }
  isSelectedMonth(value) {
    return value === this.value;
  }
  isAriaSelectedMonth(value) {
    if (this.isSelectedMonth(value)) {
      return 'true';
    }
    return false;
  }
  changeYear(increment) {
    this.year = (parseInt(this.year) + increment).toString();
  }
  isPreviousYearLessThanMinYear(year, minISOYearMonth) {
    return ((parseInt(year) - 1).toString() <
      (minISOYearMonth && yearMonthValues.getYearMonthObject(minISOYearMonth).year));
  }
  isNextYearGreaterThanMaxYear(year, maxISOYearMonth) {
    return ((parseInt(year) + 1).toString() >
      (maxISOYearMonth && yearMonthValues.getYearMonthObject(maxISOYearMonth).year));
  }
  getMonthShortName(year, month) {
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(this.locale, { month: 'short' });
  }
  doFocusTrap() {
    if (!this.previousYearElement.disabled) {
      this.previousYearElement.focus();
    }
    if (!this.nextYearElement.disabled) {
      this.nextYearElement.focus();
    }
    this.monthListElement.focus();
  }
  renderHeader() {
    return (index.h("div", { class: "gux-year-header" }, index.h("button", { type: "button", class: "gux-year-change", onClick: () => this.changeYear(-1), disabled: this.isPreviousYearLessThanMinYear(this.year, this.min), ref: (el) => (this.previousYearElement = el) }, index.h("gux-icon", { "icon-name": "chevron-small-left", "screenreader-text": this.i18n('changeYear', {
        currentYear: parseInt(this.year),
        changeYear: parseInt(this.year) - 1
      }) })), index.h("div", { class: "gux-year" }, this.getYearLabel(this.year)), index.h("button", { type: "button", class: "gux-year-change", onClick: () => this.changeYear(1), disabled: this.isNextYearGreaterThanMaxYear(this.year, this.max), ref: (el) => (this.nextYearElement = el) }, index.h("gux-icon", { "icon-name": "chevron-small-right", "screenreader-text": this.i18n('changeYear', {
        currentYear: parseInt(this.year),
        changeYear: parseInt(this.year) + 1
      }) }))));
  }
  renderMonths() {
    const monthButtons = Array.from(new Array(12), (_, i) => String(i + 1).padStart(2, '0')).map(month => {
      const value = yearMonthValues.getISOYearMonth(this.year, month);
      return (index.h("gux-month-list-item", { value: value, selected: this.isSelectedMonth(value), "aria-selected": this.isAriaSelectedMonth(value), "aria-label": this.getMonthAriaLabel(value), onClick: () => this.onMonthClick(value), disabled: this.isOutOfBounds(value) }, this.getMonthShortName(this.year, month)));
    });
    return (index.h("gux-month-list", { tabIndex: 1, ref: (el) => (this.monthListElement = el) }, monthButtons));
  }
  renderTrapFocusEl() {
    return (index.h("span", { onFocus: () => this.doFocusTrap(), tabindex: "0" }));
  }
  render() {
    return (index.h("div", { class: "gux-month-calendar" }, this.renderHeader(), this.renderMonths(), this.renderTrapFocusEl()));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["onValueUpdate"]
  }; }
};
GuxMonthCalendar.style = guxMonthCalendarCss;

exports.gux_month_calendar = GuxMonthCalendar;
