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
import { buildI18nForComponent } from '../../../../../i18n';
import { OnMutation } from '@utils/decorator/on-mutation';
import { onDisabledChange, onRequiredChange } from '@utils/dom/on-attribute-change';
import { hasSlot } from '@utils/dom/has-slot';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';
import { GuxFormFieldHelp, GuxFormFieldError, GuxFormFieldFieldsetContainer, GuxFormFieldLegendLabel } from '../../functional-components/functional-components';
import { getComputedLabelPosition, validateFormIds } from '../../gux-form-field.service';
import { trackComponent } from '@utils/tracking/usage';
import componentResources from './i18n/en.json';
/**
 * @slot Required slot for gux-time-picker-beta tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export class GuxFormFieldTimePicker {
  constructor() {
    this.labelPosition = undefined;
    this.computedLabelPosition = 'above';
    this.disabled = undefined;
    this.required = undefined;
    this.hasError = false;
    this.hasHelp = false;
  }
  watchValue(hasError) {
    const timePickerSlot = this.root.querySelector('gux-time-picker-beta');
    if (timePickerSlot) {
      timePickerSlot.hasError = hasError;
    }
  }
  onMutation() {
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }
  async componentWillLoad() {
    this.getI18nValue = await buildI18nForComponent(this.root, componentResources);
    this.setInput();
    this.setLabel();
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
    trackComponent(this.root, { variant: this.variant });
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
    if (this.requiredObserver) {
      this.requiredObserver.disconnect();
    }
  }
  render() {
    return (h(GuxFormFieldFieldsetContainer, { labelPosition: this.computedLabelPosition }, h(GuxFormFieldLegendLabel, { position: this.computedLabelPosition, required: this.required }, h("slot", { name: "label", onSlotchange: () => this.setLabel() }), this.renderScreenReaderText(this.getI18nValue('required'), this.required), this.renderScreenReaderText(getSlotTextContent(this.root, 'error'), this.hasError)), h("div", { class: "gux-input-and-error-container" }, h("div", { class: {
        'gux-input': true,
        'gux-input-error': this.hasError
      } }, h("div", { class: {
        'gux-time-picker-container': true,
        'gux-disabled': this.disabled
      } }, h("slot", null))), h(GuxFormFieldError, { show: this.hasError }, h("slot", { name: "error" })), h(GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, h("slot", { name: "help" })))));
  }
  renderScreenReaderText(text, condition = true) {
    if (condition) {
      return (h("gux-screen-reader-beta", null, text));
    }
  }
  get variant() {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';
    const type = 'timePicker';
    return `${type}-${labelPositionVariant}`;
  }
  setInput() {
    this.timePickerElement = this.root.querySelector('gux-time-picker-beta');
    this.disabled = this.timePickerElement.disabled;
    this.required = this.timePickerElement.required;
    this.disabledObserver = onDisabledChange(this.timePickerElement, (disabled) => {
      this.disabled = disabled;
    });
    this.requiredObserver = onRequiredChange(this.timePickerElement, (required) => {
      this.required = required;
    });
    validateFormIds(this.root, this.timePickerElement);
  }
  setLabel() {
    this.label = this.root.querySelector('label[slot="label"]');
    this.computedLabelPosition = getComputedLabelPosition(this.label, this.labelPosition);
  }
  static get is() { return "gux-form-field-time-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-form-field-time-picker.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-form-field-time-picker.css"]
    };
  }
  static get properties() {
    return {
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
      "hasHelp": {}
    };
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "hasError",
        "methodName": "watchValue"
      }];
  }
}
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxFormFieldTimePicker.prototype, "onMutation", null);
