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
import { h, Host } from '@stencil/core';
import { calculateInputDisabledState } from '@utils/dom/calculate-input-disabled-state';
import { onInputDisabledStateChange } from '@utils/dom/on-input-disabled-state-change';
import { OnMutation } from '@utils/decorator/on-mutation';
import { onRequiredChange } from '@utils/dom/on-attribute-change';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { hasSlot } from '@utils/dom/has-slot';
import { GuxFormFieldHelp, GuxFormFieldError, GuxFormFieldLabel, GuxFormFieldContainer } from '../../functional-components/functional-components';
import { getComputedLabelPosition, validateFormIds } from '../../gux-form-field.service';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export class GuxFormField {
  constructor() {
    this.displayUnits = undefined;
    this.valueInTooltip = undefined;
    this.labelPosition = undefined;
    this.computedLabelPosition = 'above';
    this.disabled = undefined;
    this.required = undefined;
    this.hasError = false;
    this.hasHelp = false;
    this.value = undefined;
    this.active = undefined;
    this.valueWatcherId = undefined;
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
  onMutation() {
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }
  componentWillLoad() {
    this.setInput();
    this.setLabel();
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
    trackComponent(this.root, { variant: this.variant });
  }
  componentDidLoad() {
    this.updatePosition();
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
    if (this.requiredObserver) {
      this.requiredObserver.disconnect();
    }
    clearInterval(this.valueWatcherId);
  }
  render() {
    return (h(Host, { class: {
        'gux-active': this.active
      } }, h(GuxFormFieldContainer, { labelPosition: this.computedLabelPosition }, h(GuxFormFieldLabel, { position: this.computedLabelPosition, required: this.required }, h("slot", { name: "label", onSlotchange: () => this.setLabel() })), h("div", { class: "gux-input-and-error-container" }, this.renderRangeInput(), h(GuxFormFieldError, { show: this.hasError }, h("slot", { name: "error" })), h(GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, h("slot", { name: "help" }))))));
  }
  get variant() {
    return this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
  }
  setInput() {
    this.input = this.root.querySelector('input[type="range"][slot="input"]');
    preventBrowserValidationStyling(this.input);
    this.disabled = calculateInputDisabledState(this.input);
    this.required = this.input.required;
    this.value = this.input.value;
    this.disabledObserver = onInputDisabledStateChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    this.requiredObserver = onRequiredChange(this.input, (required) => {
      this.required = required;
    });
    clearInterval(this.valueWatcherId);
    this.valueWatcherId = setInterval(() => {
      if (this.value !== this.input.value) {
        this.updateValue(this.input.value);
      }
    }, 100);
    validateFormIds(this.root, this.input);
  }
  setLabel() {
    this.label = this.root.querySelector('label[slot="label"]');
    this.computedLabelPosition = getComputedLabelPosition(this.label, this.labelPosition);
  }
  renderRangeInput() {
    return (h("div", { class: {
        'gux-range-input-container': true,
        'gux-disabled': this.disabled
      } }, h("div", { class: "gux-range" }, h("div", { class: "gux-track" }, h("div", { class: "gux-progress", ref: el => (this.progressElement = el) })), h("slot", { name: "input" }), h("div", { class: {
        'gux-range-tooltip-container': true,
        'gux-hidden': !this.valueInTooltip
      }, ref: el => (this.sliderTooltipContainer = el) }, h("div", { class: "gux-range-tooltip", ref: el => (this.sliderTooltip = el) }, this.getDisplayValue()))), h("div", { class: {
        'gux-display': true,
        'gux-hidden': this.valueInTooltip
      } }, this.getDisplayValue())));
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
      const offset = placementPercentage - (placementPercentage / 8 / width) * 100;
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
  static get is() { return "gux-form-field-range"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-form-field-range.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-form-field-range.css"]
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
        "reflect": false
      },
      "labelPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxFormFieldLabelPosition",
          "resolved": "\"above\" | \"beside\" | \"screenreader\"",
          "references": {
            "GuxFormFieldLabelPosition": {
              "location": "import",
              "path": "../../gux-form-field.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label-position",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "computedLabelPosition": {},
      "disabled": {},
      "required": {},
      "hasError": {},
      "hasHelp": {},
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
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxFormField.prototype, "onMutation", null);
