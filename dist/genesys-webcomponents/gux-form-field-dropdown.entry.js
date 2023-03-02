import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { c as calculateInputDisabledState, o as onInputDisabledStateChange } from './on-input-disabled-state-change-3ea76372.js';
import { O as OnMutation } from './on-mutation-59e1cbf1.js';
import { o as onRequiredChange } from './on-attribute-change-5fd8da7c.js';
import { h as hasSlot } from './has-slot-062ae63a.js';
import { G as GuxFormFieldContainer, a as GuxFormFieldLabel } from './functional-components-0b302a3e.js';
import { G as GuxFormFieldError, a as GuxFormFieldHelp, v as validateFormIds, g as getComputedLabelPosition } from './gux-form-field.service-ad9b681c.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import './random-html-id-8e3f658c.js';
import './log-error-3d08c2b1.js';
import './set-input-value-5adeaccc.js';
import './simulate-native-event-ac69961f.js';

const guxFormFieldDropdownCss = ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input.gux-disabled{pointer-events:none;opacity:0.5}";

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
const GuxFormFieldDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.labelPosition = undefined;
    this.computedLabelPosition = 'above';
    this.disabled = undefined;
    this.required = undefined;
    this.hasError = false;
    this.hasHelp = false;
  }
  watchValue(hasError) {
    const dropdownSlot = this.root.querySelector('gux-dropdown') ||
      this.root.querySelector('gux-dropdown-multi-beta');
    if (dropdownSlot) {
      dropdownSlot.hasError = hasError;
    }
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
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
    if (this.requiredObserver) {
      this.requiredObserver.disconnect();
    }
  }
  render() {
    return (h(GuxFormFieldContainer, { labelPosition: this.computedLabelPosition }, h(GuxFormFieldLabel, { position: this.computedLabelPosition, required: this.required }, h("slot", { name: "label", onSlotchange: () => this.setLabel() })), h("div", { class: "gux-input-and-error-container" }, h("div", { class: {
        'gux-input': true,
        'gux-input-error': this.hasError,
        'gux-disabled': this.disabled
      } }, h("slot", null)), h(GuxFormFieldError, { show: this.hasError }, h("slot", { name: "error" })), h(GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, h("slot", { name: "help" })))));
  }
  get variant() {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';
    const type = 'dropdown';
    return `${type}-${labelPositionVariant}`;
  }
  setInput() {
    this.dropdownElement =
      this.root.querySelector('gux-dropdown') ||
        this.root.querySelector('gux-dropdown-multi-beta');
    this.listboxElement =
      this.root.querySelector('gux-listbox') ||
        this.root.querySelector('gux-listbox-multi');
    this.disabled = calculateInputDisabledState(this.dropdownElement);
    this.required = this.dropdownElement.required;
    this.disabledObserver = onInputDisabledStateChange(this.dropdownElement, (disabled) => {
      this.disabled = disabled;
    });
    this.requiredObserver = onRequiredChange(this.dropdownElement, (required) => {
      this.required = required;
    });
    validateFormIds(this.root, this.listboxElement);
  }
  setLabel() {
    this.label = this.root.querySelector('label[slot="label"]');
    this.computedLabelPosition = getComputedLabelPosition(this.label, this.labelPosition);
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "hasError": ["watchValue"]
  }; }
};
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxFormFieldDropdown.prototype, "onMutation", null);
GuxFormFieldDropdown.style = guxFormFieldDropdownCss;

export { GuxFormFieldDropdown as gux_form_field_dropdown };
