import { r as registerInstance, h, j as Host, g as getElement } from './index-f583fcde.js';
import { c as calculateInputDisabledState, o as onInputDisabledStateChange } from './on-input-disabled-state-change-3ea76372.js';
import { O as OnMutation } from './on-mutation-59e1cbf1.js';
import { p as preventBrowserValidationStyling } from './prevent-browser-validation-styling-d16c3f4c.js';
import { h as hasSlot } from './has-slot-062ae63a.js';
import './functional-components-0b302a3e.js';
import { G as GuxFormFieldError, a as GuxFormFieldHelp, v as validateFormIds } from './gux-form-field.service-ad9b681c.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import './random-html-id-8e3f658c.js';
import './log-error-3d08c2b1.js';
import './set-input-value-5adeaccc.js';
import './simulate-native-event-ac69961f.js';

const guxFormFieldRadioCss = ".gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}:host(.gux-disabled){cursor:not-allowed;opacity:0.5}:host(.gux-disabled) ::slotted(label){cursor:not-allowed}.gux-input-label{display:flex;flex-direction:row}.gux-input-label .gux-label{display:flex;flex-direction:column}::slotted(input[type='radio']){display:inline-grid;width:16px;height:16px;margin:4px;text-align:center;vertical-align:middle;cursor:pointer;border:0;-webkit-appearance:none;appearance:none;outline:none}::slotted(input[type='radio'])::before{grid-area:1;content:'';border-radius:50%}::slotted(input[type='radio']:focus-within)::before{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}::slotted(input[type='radio']:not(:checked))::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%2377828f'/%3E%3C/svg%3E\")}::slotted(input[type='radio']:not(:checked):not(:disabled):hover)::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%232a60c8'/%3E%3C/svg%3E\")}::slotted(input[type='radio']:checked)::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8.026 5.262a2.8 2.8 0 1 0 .001 5.601 2.8 2.8 0 0 0-.001-5.601zm0-2.2c-2.761 0-5 2.211-5 4.938s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%232a60c8'/%3E%3C/svg%3E\")}::slotted(input[type='radio']:disabled)::before{cursor:not-allowed;opacity:0.5}::slotted(label){display:inline-block;font-size:12px;line-height:24px;vertical-align:middle}";

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
    registerInstance(this, hostRef);
    this.disabled = undefined;
    this.hasError = false;
    this.hasHelp = false;
  }
  onMutation() {
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }
  componentWillLoad() {
    this.setInput();
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
    trackComponent(this.root);
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (h(Host, { class: {
        'gux-input-error': this.hasError,
        'gux-disabled': this.disabled
      } }, h("div", { class: "gux-form-field-container" }, h("div", { class: "gux-input-label" }, h("div", { class: "gux-input" }, h("slot", { name: "input", onSlotchange: () => this.setInput() })), h("div", { class: "gux-label" }, h("slot", { name: "label" }), h(GuxFormFieldError, { show: this.hasError }, h("slot", { name: "error" })), h(GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, h("slot", { name: "help" })))))));
  }
  setInput() {
    this.input = this.root.querySelector('input[type="radio"][slot="input"]');
    preventBrowserValidationStyling(this.input);
    this.disabled = calculateInputDisabledState(this.input);
    this.disabledObserver = onInputDisabledStateChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    validateFormIds(this.root, this.input);
  }
  get root() { return getElement(this); }
};
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxFormFieldRadio.prototype, "onMutation", null);
GuxFormFieldRadio.style = guxFormFieldRadioCss;

export { GuxFormFieldRadio as gux_form_field_radio };
