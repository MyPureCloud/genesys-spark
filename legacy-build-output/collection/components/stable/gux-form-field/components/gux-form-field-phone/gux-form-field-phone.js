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
import { trackComponent } from '@utils/tracking/usage';
import { GuxFormFieldFieldsetContainer } from '../../functional-components/gux-form-field-fieldset-container/gux-form-field-fieldset-container';
import { GuxFormFieldError } from '../../functional-components/gux-form-field-error/gux-form-field-error';
import { GuxFormFieldLegendLabel } from '../../functional-components/gux-form-field-legend-label/gux-form-field-legend-label';
import { hasSlot } from '@utils/dom/has-slot';
import { getSlotTextContent } from '@utils/dom/get-slot-text-content';
import { getComputedLabelPosition, validateFormIds } from '../../gux-form-field.service';
import componentResources from './i18n/en.json';
import { GuxFormFieldHelp } from '../../functional-components/gux-form-field-help/gux-form-field-help';
/**
 * @slot - Required slot for gux-phone-input-beta tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export class GuxFormFieldPhone {
  constructor() {
    this.labelPosition = undefined;
    this.computedLabelPosition = 'above';
    this.disabled = undefined;
    this.required = false;
    this.hasError = false;
    this.hasInternalError = false;
    this.hasHelp = false;
  }
  listenForInternalError(event) {
    this.hasInternalError = event.detail;
    this.watchValue(this.hasInternalError);
    this.phonevalidationerror.emit(this.hasInternalError);
  }
  watchValue(hasError) {
    const phoneInputSlot = this.root.querySelector('gux-phone-input-beta');
    if (phoneInputSlot) {
      phoneInputSlot.hasError = hasError;
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
    this.disabledObserver.disconnect();
    this.requiredObserver.disconnect();
  }
  render() {
    return (h(GuxFormFieldFieldsetContainer, { labelPosition: this.computedLabelPosition }, h(GuxFormFieldLegendLabel, { position: this.computedLabelPosition, required: this.required }, h("slot", { name: "label", onSlotchange: () => this.setLabel() }), this.renderScreenReaderText(this.getI18nValue('required'), this.required), this.renderScreenReaderText(getSlotTextContent(this.root, 'error'), this.hasError)), h("div", { class: "gux-input-and-error-container" }, h("div", { class: {
        'gux-input': true,
        'gux-input-error': this.hasError
      } }, h("div", { class: {
        'gux-input-container': true,
        'gux-disabled': this.disabled
      } }, h("slot", null))), h(GuxFormFieldError, { show: this.hasError }, h("slot", { name: "error" })), h(GuxFormFieldError, { show: this.hasInternalError }, h("span", null, this.getI18nValue('invalidPhoneNumber'))), h(GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, h("slot", { name: "help" })))));
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
    const type = 'phoneInput';
    return `${type}-${labelPositionVariant}`;
  }
  setInput() {
    this.phoneInputElement = this.root.querySelector('gux-phone-input-beta');
    this.disabled = this.phoneInputElement.disabled;
    this.required = this.phoneInputElement.required;
    this.disabledObserver = onDisabledChange(this.phoneInputElement, (disabled) => {
      this.disabled = disabled;
    });
    this.requiredObserver = onRequiredChange(this.phoneInputElement, (required) => {
      this.required = required;
    });
    validateFormIds(this.root, this.phoneInputElement);
  }
  setLabel() {
    this.label = this.root.querySelector('label[slot="label"]');
    this.computedLabelPosition = getComputedLabelPosition(this.label, this.labelPosition);
  }
  static get is() { return "gux-form-field-phone"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-form-field-phone.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-form-field-phone.css"]
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
      "hasInternalError": {},
      "hasHelp": {}
    };
  }
  static get events() {
    return [{
        "method": "phonevalidationerror",
        "name": "phonevalidationerror",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "hasError",
        "methodName": "watchValue"
      }];
  }
  static get listeners() {
    return [{
        "name": "internalError",
        "method": "listenForInternalError",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxFormFieldPhone.prototype, "onMutation", null);
