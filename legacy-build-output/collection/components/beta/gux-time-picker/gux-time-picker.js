var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from '@stencil/core';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { afterNextRender } from '@utils/dom/after-next-render';
import { buildI18nForComponent } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import translationResources from './i18n/en.json';
import { getHourDisplayValue, getHoursPattern, getLocaleClockType, getMinuteDisplayValue, getMinutesPattern, getTimeDisplayValues, getValidValueHourChange, getValidValueMinuteChange, getValue, incrementHour, incrementMinute, isAm } from './gux-time-picker.service';
export class GuxTimePickerBeta {
  constructor() {
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
    return (h("div", { class: "gux-input-time-container" }, h("input", { class: "gux-input-time-hours", type: "text", disabled: this.disabled, value: getHourDisplayValue(this.value, this.clockType), onKeyDown: e => this.onHourKeyDown(e), "aria-label": this.i18n('hoursInput'), pattern: getHoursPattern(this.clockType), ref: el => (this.hourInputElement = el) }), h("span", { class: "gux-time-separator" }, this.i18n('time-separator')), h("input", { class: "gux-input-time-minutes", type: "text", disabled: this.disabled, value: getMinuteDisplayValue(this.value), onKeyDown: e => this.onMinuteKeyDown(e), "aria-label": this.i18n('minutesInput'), pattern: getMinutesPattern(), ref: el => (this.minuteInputElement = el) })));
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
  static get is() { return "gux-time-picker-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-time-picker.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-time-picker.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "GuxISOHourMinute",
          "resolved": "`${string}:${string}`",
          "references": {
            "GuxISOHourMinute": {
              "location": "import",
              "path": "./gux-time-picker.type"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "'00:00'"
      },
      "interval": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "GuxMinuteInterval",
          "resolved": "15 | 30 | 60",
          "references": {
            "GuxMinuteInterval": {
              "location": "import",
              "path": "./gux-time-picker.type"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "interval",
        "reflect": false,
        "defaultValue": "60"
      },
      "step": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "GuxMinuteStep",
          "resolved": "1 | 10 | 15 | 20 | 30 | 5 | 60",
          "references": {
            "GuxMinuteStep": {
              "location": "import",
              "path": "./gux-time-picker.type"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "step",
        "reflect": false,
        "defaultValue": "1"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "required": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "required",
        "reflect": false,
        "defaultValue": "false"
      },
      "hasError": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "has-error",
        "reflect": false,
        "defaultValue": "false"
      },
      "clockType": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "GuxClockType",
          "resolved": "\"12h\" | \"24h\"",
          "references": {
            "GuxClockType": {
              "location": "import",
              "path": "./gux-time-picker.type"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "clock-type",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "expanded": {}
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "focus",
        "method": "onFocus",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "blur",
        "method": "onBlur",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keydown",
        "method": "handleKeydown",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxTimePickerBeta.prototype, "onClickOutside", null);
