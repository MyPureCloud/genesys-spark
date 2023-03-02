import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent, g as getDesiredLocale } from './index-0998c803.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { b as afterNextRender } from './after-next-render-ed0f7dcd.js';
import { g as getYearMonthObject, b as getCurrentISOYearMonth, a as getISOYearMonth } from './year-month-values-1b64c204.js';
import './get-closest-element-1597503c.js';

const changeYear = "Current year is {currentYear}, Click to change year to {changeYear}";
const translationResources = {
	changeYear: changeYear
};

const guxMonthCalendarCss = ".gux-month-calendar{flex-wrap:wrap;width:255px;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-month-calendar .gux-year-header{position:relative;display:flex;align-items:center;justify-content:space-between;height:16px;padding:16px;color:#fdfdfd;background-color:#2a60c8;border-top-left-radius:3px;border-top-right-radius:3px}.gux-month-calendar .gux-year-header button{color:#fdfdfd;cursor:pointer;background:none;border:none;outline:none}.gux-month-calendar .gux-year-header button:focus{border-radius:4px;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-month-calendar .gux-year-header button.gux-year-change:disabled{cursor:default;opacity:0.5}.gux-month-calendar .gux-year-header button gux-icon{width:16px;height:16px;pointer-events:none}.gux-month-calendar .gux-year-header .gux-year{font-family:Roboto, sans-serif;font-weight:400;font-weight:700}.gux-month-calendar .gux-months{padding:24px;background-color:#fdfdfd}.gux-month-calendar .gux-months button{width:65px;height:50px;margin:2px;text-align:center;cursor:pointer;background:none;border:none;border-radius:4px;outline:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-month-calendar .gux-months button:focus{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-month-calendar .gux-months button.gux-selected,.gux-month-calendar .gux-months button:hover{color:#fdfdfd;background-color:#2a60c8}.gux-month-calendar .gux-months button:disabled{color:#596373;pointer-events:none;background-color:#fdfdfd}";

const GuxMonthCalendar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
    this.min = undefined;
    this.max = undefined;
    this.year = undefined;
    this.locale = undefined;
  }
  onValueUpdate(newValue) {
    const { year } = getYearMonthObject(newValue);
    this.year = year;
  }
  /**
   * Focus a month
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus(iSOYearMonth) {
    iSOYearMonth = iSOYearMonth || getCurrentISOYearMonth();
    const { year } = getYearMonthObject(iSOYearMonth);
    this.year = year;
    afterNextRender(() => {
      const target = this.root.shadowRoot.querySelector(`gux-month-list-item[value="${iSOYearMonth}"]`);
      if (target) {
        target.focus();
      }
    });
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.locale = getDesiredLocale(this.root);
    if (this.value) {
      this.year = getYearMonthObject(this.value).year;
    }
    else {
      this.year = getYearMonthObject(getCurrentISOYearMonth()).year;
    }
  }
  updateValue(value) {
    this.value = value;
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
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
    const { year, month } = getYearMonthObject(value);
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
      (minISOYearMonth && getYearMonthObject(minISOYearMonth).year));
  }
  isNextYearGreaterThanMaxYear(year, maxISOYearMonth) {
    return ((parseInt(year) + 1).toString() >
      (maxISOYearMonth && getYearMonthObject(maxISOYearMonth).year));
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
    return (h("div", { class: "gux-year-header" }, h("button", { type: "button", class: "gux-year-change", onClick: () => this.changeYear(-1), disabled: this.isPreviousYearLessThanMinYear(this.year, this.min), ref: (el) => (this.previousYearElement = el) }, h("gux-icon", { "icon-name": "chevron-small-left", "screenreader-text": this.i18n('changeYear', {
        currentYear: parseInt(this.year),
        changeYear: parseInt(this.year) - 1
      }) })), h("div", { class: "gux-year" }, this.getYearLabel(this.year)), h("button", { type: "button", class: "gux-year-change", onClick: () => this.changeYear(1), disabled: this.isNextYearGreaterThanMaxYear(this.year, this.max), ref: (el) => (this.nextYearElement = el) }, h("gux-icon", { "icon-name": "chevron-small-right", "screenreader-text": this.i18n('changeYear', {
        currentYear: parseInt(this.year),
        changeYear: parseInt(this.year) + 1
      }) }))));
  }
  renderMonths() {
    const monthButtons = Array.from(new Array(12), (_, i) => String(i + 1).padStart(2, '0')).map(month => {
      const value = getISOYearMonth(this.year, month);
      return (h("gux-month-list-item", { value: value, selected: this.isSelectedMonth(value), "aria-selected": this.isAriaSelectedMonth(value), "aria-label": this.getMonthAriaLabel(value), onClick: () => this.onMonthClick(value), disabled: this.isOutOfBounds(value) }, this.getMonthShortName(this.year, month)));
    });
    return (h("gux-month-list", { tabIndex: 1, ref: (el) => (this.monthListElement = el) }, monthButtons));
  }
  renderTrapFocusEl() {
    return (h("span", { onFocus: () => this.doFocusTrap(), tabindex: "0" }));
  }
  render() {
    return (h("div", { class: "gux-month-calendar" }, this.renderHeader(), this.renderMonths(), this.renderTrapFocusEl()));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueUpdate"]
  }; }
};
GuxMonthCalendar.style = guxMonthCalendarCss;

export { GuxMonthCalendar as gux_month_calendar };
