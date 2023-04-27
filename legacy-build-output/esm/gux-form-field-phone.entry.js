import { r as registerInstance, c as createEvent, h, g as getElement } from './index-816e34d8.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { O as OnMutation } from './on-mutation-35d8145e.js';
import { a as onDisabledChange, o as onRequiredChange } from './on-attribute-change-5fd8da7c.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { G as GuxFormFieldLegendLabel, g as getSlotTextContent, a as GuxFormFieldFieldsetContainer } from './get-slot-text-content-d96faef2.js';
import { G as GuxFormFieldError, a as GuxFormFieldHelp, v as validateFormIds, g as getComputedLabelPosition } from './gux-form-field.service-9e7fef65.js';
import { h as hasSlot } from './has-slot-062ae63a.js';
import './get-closest-element-1597503c.js';
import './random-html-id-8e3f658c.js';
import './log-error-3d08c2b1.js';
import './set-input-value-5adeaccc.js';
import './simulate-native-event-ac69961f.js';

const required = "Required";
const invalidPhoneNumber = "Number is not valid";
const componentResources = {
	required: required,
	invalidPhoneNumber: invalidPhoneNumber
};

const guxFormFieldPhoneCss = ".gux-form-field-fieldset-container{min-width:0;padding:0;margin:var(--gux-form-field-fieldset-container-margin-top, 16px) 0 var(--gux-form-field-fieldset-container-margin-bottom, 16px) 0;border:none}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-legend-label{padding:0}.gux-form-field-legend-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-legend-label.gux-beside{position:relative;top:8px;float:left;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-legend-label.gux-above{margin-bottom:8px}.gux-form-field-legend-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}.gux-input-and-error-container{flex-grow:1}";

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
const GuxFormFieldPhone = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.phonevalidationerror = createEvent(this, "phonevalidationerror", 7);
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
  get root() { return getElement(this); }
  static get watchers() { return {
    "hasError": ["watchValue"]
  }; }
};
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxFormFieldPhone.prototype, "onMutation", null);
GuxFormFieldPhone.style = guxFormFieldPhoneCss;

export { GuxFormFieldPhone as gux_form_field_phone };
