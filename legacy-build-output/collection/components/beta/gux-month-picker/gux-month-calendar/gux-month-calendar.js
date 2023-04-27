import { h } from '@stencil/core';
import { buildI18nForComponent, getDesiredLocale } from '../../../../i18n';
import simulateNativeEvent from '../../../../utils/dom/simulate-native-event';
import { afterNextRender } from '../../../../utils/dom/after-next-render';
import { getISOYearMonth, getCurrentISOYearMonth, getYearMonthObject } from '../../../../utils/date/year-month-values';
import translationResources from './i18n/en.json';
export class GuxMonthCalendar {
  constructor() {
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
  static get is() { return "gux-month-calendar"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-month-calendar.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-month-calendar.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "GuxISOYearMonth",
          "resolved": "`${string}-${string}`",
          "references": {
            "GuxISOYearMonth": {
              "location": "import",
              "path": "../../../../utils/date/year-month-values"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The current selected year and month in ISO8601 format (yyyy-mm)"
        },
        "attribute": "value",
        "reflect": false
      },
      "min": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxISOYearMonth",
          "resolved": "`${string}-${string}`",
          "references": {
            "GuxISOYearMonth": {
              "location": "import",
              "path": "../../../../utils/date/year-month-values"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The min year and month selectable in ISO8601 format (yyyy-mm)"
        },
        "attribute": "min",
        "reflect": false
      },
      "max": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxISOYearMonth",
          "resolved": "`${string}-${string}`",
          "references": {
            "GuxISOYearMonth": {
              "location": "import",
              "path": "../../../../utils/date/year-month-values"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The max year and month selectable in ISO8601 format (yyyy-mm)"
        },
        "attribute": "max",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "year": {},
      "locale": {}
    };
  }
  static get methods() {
    return {
      "guxFocus": {
        "complexType": {
          "signature": "(iSOYearMonth: GuxISOYearMonth) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "GuxISOYearMonth": {
              "location": "import",
              "path": "../../../../utils/date/year-month-values"
            },
            "HTMLButtonElement": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Focus a month",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "onValueUpdate"
      }];
  }
}
