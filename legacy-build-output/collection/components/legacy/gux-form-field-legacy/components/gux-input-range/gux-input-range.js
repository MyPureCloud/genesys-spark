import { h } from '@stencil/core';
import { setInterval, clearInterval } from 'requestanimationframe-timer';
import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';
/**
 * @slot input - Required slot for input[type="range"]
 */
export class GuxInputRange {
  constructor() {
    this.displayUnits = undefined;
    this.disabled = undefined;
    this.value = undefined;
    this.active = undefined;
    this.valueWatcherId = undefined;
    this.valueInTooltip = false;
  }
  onInput(e) {
    const input = e.target;
    this.updateValue(input.value);
  }
  onMousedown() {
    if (!this.disabled) {
      this.active = true;
    }
  }
  onMouseup() {
    this.active = false;
  }
  updateValue(newValue) {
    this.value = newValue;
    this.updatePosition();
  }
  updatePosition() {
    const value = Number(this.input.value || 0);
    const min = Number(this.input.min || 0);
    const max = Number(this.input.max || 100);
    const placementPercentage = ((value - min) / (max - min)) * 100;
    if (this.sliderTooltip) {
      const width = this.sliderTooltipContainer.offsetWidth;
      // Round tooltip position to the tenths place to prevent snapshot inconsistencies
      const offset = Math.round((placementPercentage / 100 - placementPercentage / 8 / width) * 1000) / 10;
      this.sliderTooltip.style.left = `${offset}%`;
    }
    this.progressElement.style.width = `${placementPercentage}%`;
  }
  getDisplayValue() {
    if (this.displayUnits) {
      return `${this.value}${this.displayUnits}`;
    }
    return this.value;
  }
  // Using componentWillLoad() instead of connectedCallback() here to fix
  // a bug caused by a race condition. Refer to COMUI-541 for details
  componentWillLoad() {
    this.input = this.root.querySelector('input[slot="input"]');
    this.disabled = this.input.disabled;
    this.value = this.input.value;
    this.disabledObserver = onDisabledChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    this.valueWatcherId = setInterval(() => {
      if (this.value !== this.input.value) {
        this.updateValue(this.input.value);
      }
    }, 100);
  }
  componentDidLoad() {
    this.updatePosition();
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
    clearInterval(this.valueWatcherId);
  }
  render() {
    return (h("div", { class: {
        'gux-container': true,
        'gux-disabled': this.disabled
      } }, h("div", { class: {
        'gux-range': true,
        'gux-active': this.active
      } }, h("div", { class: "gux-track" }, h("div", { class: "gux-progress", ref: el => (this.progressElement = el) })), h("slot", { name: "input" }), h("div", { class: {
        'gux-range-tooltip-container': true,
        'gux-hidden': !this.valueInTooltip
      }, ref: el => (this.sliderTooltipContainer = el) }, h("div", { class: "gux-range-tooltip", ref: el => (this.sliderTooltip = el) }, this.getDisplayValue()))), h("div", { class: {
        'gux-display': true,
        'gux-hidden': this.valueInTooltip
      } }, this.getDisplayValue())));
  }
  static get is() { return "gux-input-range"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-range.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-range.css"]
    };
  }
  static get properties() {
    return {
      "displayUnits": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "display-units",
        "reflect": false
      },
      "valueInTooltip": {
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
        "attribute": "value-in-tooltip",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "disabled": {},
      "value": {},
      "active": {},
      "valueWatcherId": {}
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "input",
        "method": "onInput",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusin",
        "method": "onMousedown",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "mousedown",
        "method": "onMousedown",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "focusout",
        "method": "onMouseup",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "mouseup",
        "method": "onMouseup",
        "target": undefined,
        "capture": false,
        "passive": true
      }];
  }
}
