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
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
import { hasSlot } from '@utils/dom/has-slot';
import { GuxFormFieldError, GuxFormFieldHelp } from '../../functional-components/functional-components';
import { trackComponent } from '@utils/tracking/usage';
import { validateFormIds } from '../../gux-form-field.service';
/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 * @slot help - Optional slot for help message
 */
export class GuxFormFieldCheckbox {
  constructor() {
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
    this.input = this.root.querySelector('input[type="checkbox"][slot="input"]');
    preventBrowserValidationStyling(this.input);
    this.disabled = calculateInputDisabledState(this.input);
    this.disabledObserver = onInputDisabledStateChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    validateFormIds(this.root, this.input);
  }
  static get is() { return "gux-form-field-checkbox"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-form-field-checkbox.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-form-field-checkbox.css"]
    };
  }
  static get states() {
    return {
      "disabled": {},
      "hasError": {},
      "hasHelp": {}
    };
  }
  static get elementRef() { return "root"; }
}
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxFormFieldCheckbox.prototype, "onMutation", null);
