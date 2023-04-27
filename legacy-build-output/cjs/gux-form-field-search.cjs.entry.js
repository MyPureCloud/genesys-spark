'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const onInputDisabledStateChange = require('./on-input-disabled-state-change-d66fb86b.js');
const onMutation = require('./on-mutation-83dff2a7.js');
const onAttributeChange = require('./on-attribute-change-37556263.js');
const preventBrowserValidationStyling = require('./prevent-browser-validation-styling-d21b1a56.js');
const hasSlot = require('./has-slot-2e73d6e7.js');
const guxFormField_service = require('./gux-form-field.service-6696052f.js');
const guxFormFieldContainer = require('./gux-form-field-container-aedc9ee2.js');
const usage = require('./usage-da9572bf.js');
require('./random-html-id-b86b61c0.js');
require('./log-error-ddbca3a0.js');
require('./set-input-value-610d7da3.js');
require('./simulate-native-event-fe3e62da.js');

const guxFormFieldSearchCss = ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(input){flex:1 1 auto;align-self:auto;order:0;width:100%;overflow:hidden;font-size:12px;color:#2e394c;text-overflow:ellipsis;background-color:#f6f7f9;border:none;outline:none}::slotted(input)::placeholder{color:#596373;opacity:1}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center}.gux-input-and-error-container .gux-input .gux-input-container{box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:center;order:0;width:100%;height:32px;padding:4px 8px;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-input-and-error-container .gux-input .gux-input-container.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-input .gux-input-container gux-icon[icon-name='search']{flex:0 0 auto;align-self:auto;order:0;width:16px;height:16px;margin-right:4px;color:#596373}.gux-input-and-error-container .gux-input .gux-input-container:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-input-and-error-container .gux-input.gux-input-error .gux-input-container{border-color:#ea0b0b}";

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
const GuxFormFieldSearch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.labelPosition = undefined;
    this.computedLabelPosition = 'above';
    this.clearable = true;
    this.disabled = undefined;
    this.required = undefined;
    this.hasContent = false;
    this.hasError = false;
    this.hasHelp = false;
  }
  onMutation() {
    this.hasError = hasSlot.hasSlot(this.root, 'error');
    this.hasHelp = hasSlot.hasSlot(this.root, 'help');
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxForceUpdate() {
    this.hasContent = guxFormField_service.hasContent(this.input);
    this.hasError = hasSlot.hasSlot(this.root, 'error');
    this.hasHelp = hasSlot.hasSlot(this.root, 'help');
    index.forceUpdate(this.root);
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
        'gux-input-error': this.hasError
      } }, index.h("div", { class: {
        'gux-input-container': true,
        'gux-disabled': this.disabled
      } }, index.h("gux-icon", { "icon-name": "search", decorative: true }), index.h("slot", { name: "input" }), this.clearable && this.hasContent && !this.disabled && (index.h("gux-form-field-input-clear-button", { onClick: () => guxFormField_service.clearInput(this.input) })))), index.h(guxFormField_service.GuxFormFieldError, { show: this.hasError }, index.h("slot", { name: "error" })), index.h(guxFormField_service.GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, index.h("slot", { name: "help" })))));
  }
  get variant() {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';
    const type = this.input.getAttribute('type');
    return `${type}-${labelPositionVariant}`;
  }
  setInput() {
    this.input = this.root.querySelector('input[type="search"][slot="input"]');
    this.hasContent = guxFormField_service.hasContent(this.input);
    preventBrowserValidationStyling.preventBrowserValidationStyling(this.input);
    this.input.addEventListener('input', () => {
      this.hasContent = guxFormField_service.hasContent(this.input);
    });
    this.disabled = onInputDisabledStateChange.calculateInputDisabledState(this.input);
    this.required = this.input.required;
    this.disabledObserver = onInputDisabledStateChange.onInputDisabledStateChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    this.requiredObserver = onAttributeChange.onRequiredChange(this.input, (required) => {
      this.required = required;
    });
    guxFormField_service.validateFormIds(this.root, this.input);
  }
  setLabel() {
    this.label = this.root.querySelector('label[slot="label"]');
    this.computedLabelPosition = guxFormField_service.getComputedLabelPosition(this.label, this.labelPosition);
  }
  get root() { return index.getElement(this); }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true })
], GuxFormFieldSearch.prototype, "onMutation", null);
GuxFormFieldSearch.style = guxFormFieldSearchCss;

exports.gux_form_field_search = GuxFormFieldSearch;
