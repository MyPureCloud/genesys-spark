'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const onInputDisabledStateChange = require('./on-input-disabled-state-change-d66fb86b.js');
const onMutation = require('./on-mutation-83dff2a7.js');
const preventBrowserValidationStyling = require('./prevent-browser-validation-styling-d21b1a56.js');
const hasSlot = require('./has-slot-2e73d6e7.js');
const guxFormField_service = require('./gux-form-field.service-6696052f.js');
const usage = require('./usage-da9572bf.js');
require('./random-html-id-b86b61c0.js');
require('./log-error-ddbca3a0.js');
require('./set-input-value-610d7da3.js');
require('./simulate-native-event-fe3e62da.js');

const guxFormFieldRadioCss = ".gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}:host(.gux-disabled){cursor:not-allowed;opacity:0.5}:host(.gux-disabled) ::slotted(label){cursor:not-allowed}.gux-input-label{display:flex;flex-direction:row}.gux-input-label .gux-label{display:flex;flex-direction:column}::slotted(input[type='radio']){display:inline-grid;width:16px;height:16px;margin:4px;text-align:center;vertical-align:middle;cursor:pointer;border:0;-webkit-appearance:none;appearance:none;outline:none}::slotted(input[type='radio'])::before{grid-area:1;content:'';border-radius:50%}::slotted(input[type='radio']:focus-visible)::before{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}::slotted(input[type='radio']:not(:checked))::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%2377828f'/%3E%3C/svg%3E\")}::slotted(input[type='radio']:not(:checked):not(:disabled):hover)::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%232a60c8'/%3E%3C/svg%3E\")}::slotted(input[type='radio']:checked)::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8.026 5.262a2.8 2.8 0 1 0 .001 5.601 2.8 2.8 0 0 0-.001-5.601zm0-2.2c-2.761 0-5 2.211-5 4.938s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%232a60c8'/%3E%3C/svg%3E\")}::slotted(input[type='radio']:disabled)::before{cursor:not-allowed;opacity:0.5}::slotted(label){display:inline-block;font-size:12px;line-height:24px;vertical-align:middle}";

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
const GuxFormFieldRadio = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.disabled = undefined;
    this.hasError = false;
    this.hasHelp = false;
  }
  onMutation() {
    this.hasError = hasSlot.hasSlot(this.root, 'error');
    this.hasHelp = hasSlot.hasSlot(this.root, 'help');
  }
  componentWillLoad() {
    this.setInput();
    this.hasError = hasSlot.hasSlot(this.root, 'error');
    this.hasHelp = hasSlot.hasSlot(this.root, 'help');
    usage.trackComponent(this.root);
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (index.h(index.Host, { class: {
        'gux-input-error': this.hasError,
        'gux-disabled': this.disabled
      } }, index.h("div", { class: "gux-form-field-container" }, index.h("div", { class: "gux-input-label" }, index.h("div", { class: "gux-input" }, index.h("slot", { name: "input", onSlotchange: () => this.setInput() })), index.h("div", { class: "gux-label" }, index.h("slot", { name: "label" }), index.h(guxFormField_service.GuxFormFieldError, { show: this.hasError }, index.h("slot", { name: "error" })), index.h(guxFormField_service.GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, index.h("slot", { name: "help" })))))));
  }
  setInput() {
    this.input = this.root.querySelector('input[type="radio"][slot="input"]');
    preventBrowserValidationStyling.preventBrowserValidationStyling(this.input);
    this.disabled = onInputDisabledStateChange.calculateInputDisabledState(this.input);
    this.disabledObserver = onInputDisabledStateChange.onInputDisabledStateChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    guxFormField_service.validateFormIds(this.root, this.input);
  }
  get root() { return index.getElement(this); }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true })
], GuxFormFieldRadio.prototype, "onMutation", null);
GuxFormFieldRadio.style = guxFormFieldRadioCss;

exports.gux_form_field_radio = GuxFormFieldRadio;
