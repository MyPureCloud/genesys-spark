'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const onInputDisabledStateChange = require('./on-input-disabled-state-change-d66fb86b.js');
const onMutation = require('./on-mutation-83dff2a7.js');
const onAttributeChange = require('./on-attribute-change-37556263.js');
const hasSlot = require('./has-slot-2e73d6e7.js');
const guxFormField_service = require('./gux-form-field.service-6696052f.js');
const guxFormFieldContainer = require('./gux-form-field-container-aedc9ee2.js');
const usage = require('./usage-da9572bf.js');
require('./random-html-id-b86b61c0.js');
require('./log-error-ddbca3a0.js');
require('./set-input-value-610d7da3.js');
require('./simulate-native-event-fe3e62da.js');

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
    index.registerInstance(this, hostRef);
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
    this.hasError = hasSlot.hasSlot(this.root, 'error');
    this.hasHelp = hasSlot.hasSlot(this.root, 'help');
  }
  componentWillLoad() {
    this.setInput();
    this.setLabel();
    this.hasError = hasSlot.hasSlot(this.root, 'error');
    this.hasHelp = hasSlot.hasSlot(this.root, 'help');
    usage.trackComponent(this.root, { variant: this.variant });
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
    return (index.h(guxFormFieldContainer.GuxFormFieldContainer, { labelPosition: this.computedLabelPosition }, index.h(guxFormFieldContainer.GuxFormFieldLabel, { position: this.computedLabelPosition, required: this.required }, index.h("slot", { name: "label", onSlotchange: () => this.setLabel() })), index.h("div", { class: "gux-input-and-error-container" }, index.h("div", { class: {
        'gux-input': true,
        'gux-input-error': this.hasError,
        'gux-disabled': this.disabled
      } }, index.h("slot", null)), index.h(guxFormField_service.GuxFormFieldError, { show: this.hasError }, index.h("slot", { name: "error" })), index.h(guxFormField_service.GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, index.h("slot", { name: "help" })))));
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
    this.disabled = onInputDisabledStateChange.calculateInputDisabledState(this.dropdownElement);
    this.required = this.dropdownElement.required;
    this.disabledObserver = onInputDisabledStateChange.onInputDisabledStateChange(this.dropdownElement, (disabled) => {
      this.disabled = disabled;
    });
    this.requiredObserver = onAttributeChange.onRequiredChange(this.dropdownElement, (required) => {
      this.required = required;
    });
    guxFormField_service.validateFormIds(this.root, this.listboxElement);
  }
  setLabel() {
    this.label = this.root.querySelector('label[slot="label"]');
    this.computedLabelPosition = guxFormField_service.getComputedLabelPosition(this.label, this.labelPosition);
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "hasError": ["watchValue"]
  }; }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true })
], GuxFormFieldDropdown.prototype, "onMutation", null);
GuxFormFieldDropdown.style = guxFormFieldDropdownCss;

exports.gux_form_field_dropdown = GuxFormFieldDropdown;
