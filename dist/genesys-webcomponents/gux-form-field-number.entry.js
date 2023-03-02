import { r as registerInstance, l as forceUpdate, h, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { c as calculateInputDisabledState, o as onInputDisabledStateChange } from './on-input-disabled-state-change-3ea76372.js';
import { O as OnMutation } from './on-mutation-59e1cbf1.js';
import { o as onRequiredChange } from './on-attribute-change-5fd8da7c.js';
import { p as preventBrowserValidationStyling } from './prevent-browser-validation-styling-d16c3f4c.js';
import { s as setInputValue } from './set-input-value-5adeaccc.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { h as hasSlot } from './has-slot-062ae63a.js';
import { G as GuxFormFieldContainer, a as GuxFormFieldLabel } from './functional-components-0b302a3e.js';
import { h as hasContent, c as clearInput, G as GuxFormFieldError, a as GuxFormFieldHelp, v as validateFormIds, g as getComputedLabelPosition } from './gux-form-field.service-ad9b681c.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import './get-closest-element-1597503c.js';
import './random-html-id-8e3f658c.js';
import './log-error-3d08c2b1.js';

const increment = "Increment";
const decrement = "Decrement";
const componentResources = {
	increment: increment,
	decrement: decrement
};

const guxFormFieldNumberCss = ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(input){flex:1 1 auto;align-self:auto;order:0;width:100%;overflow:hidden;font-size:12px;color:#2e394c;text-align:right;text-overflow:ellipsis;background-color:#f6f7f9;border:none;outline:none}::slotted(input)::placeholder{color:#596373;opacity:1}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;width:100%}.gux-input-and-error-container .gux-input .gux-input-container{box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:center;order:0;width:100%;height:32px;padding:4px 12px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-input-and-error-container .gux-input .gux-input-container.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-input .gux-input-container.gux-clear{padding-right:0}.gux-input-and-error-container .gux-input .gux-input-container:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-input-and-error-container .gux-input.gux-input-error .gux-input-container{border-color:#ea0b0b}.gux-step-buttons-container{flex:0 1 14px;align-self:auto;order:0;margin:0 4px}.gux-step-buttons-container .gux-step-button{display:flex;flex:0 1 auto;align-items:center;align-self:auto;justify-content:center;order:0;padding:0;color:#596373;background:transparent;border:none}.gux-step-buttons-container .gux-step-button:not(:disabled):focus,.gux-step-buttons-container .gux-step-button:not(:disabled):hover{color:#2a60c8;cursor:pointer}.gux-step-buttons-container .gux-step-button gux-icon{flex:0 0 auto;width:14px;height:14px}";

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
const GuxFormFieldNumber = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.clearable = undefined;
    this.labelPosition = undefined;
    this.computedLabelPosition = 'above';
    this.disabled = undefined;
    this.required = undefined;
    this.hasContent = false;
    this.hasError = false;
    this.hasHelp = false;
  }
  onMutation() {
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxForceUpdate() {
    this.hasContent = hasContent(this.input);
    this.hasError = hasSlot(this.root, 'error');
    this.hasHelp = hasSlot(this.root, 'help');
    forceUpdate(this.root);
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
    const showClearButton = this.clearable && this.hasContent && !this.disabled;
    return (h(GuxFormFieldContainer, { labelPosition: this.computedLabelPosition }, h(GuxFormFieldLabel, { position: this.computedLabelPosition, required: this.required }, h("slot", { name: "label", onSlotchange: () => this.setLabel() })), h("div", { class: "gux-input-and-error-container" }, h("div", { class: {
        'gux-input': true,
        'gux-input-error': this.hasError
      }, part: "input-section" }, h("div", { class: {
        'gux-input-container': true,
        'gux-disabled': this.disabled,
        'gux-clear': showClearButton
      } }, h("slot", { name: "input", onSlotchange: () => this.setInput() }), showClearButton && (h("gux-form-field-input-clear-button", { onClick: () => clearInput(this.input) }))), this.renderStepButtons(this.input, this.getI18nValue, this.disabled)), h(GuxFormFieldError, { show: this.hasError }, h("slot", { name: "error" })), h(GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, h("slot", { name: "help" })))));
  }
  get variant() {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';
    const clearableVariant = this.clearable ? 'clearable' : 'unclearable';
    return `${clearableVariant}-${labelPositionVariant}`;
  }
  setInput() {
    this.input = this.root.querySelector('input[type="number"][slot="input"]');
    this.hasContent = hasContent(this.input);
    preventBrowserValidationStyling(this.input);
    this.input.addEventListener('input', () => {
      this.hasContent = hasContent(this.input);
    });
    this.disabled = calculateInputDisabledState(this.input);
    this.required = this.input.required;
    this.disabledObserver = onInputDisabledStateChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    this.requiredObserver = onRequiredChange(this.input, (required) => {
      this.required = required;
    });
    validateFormIds(this.root, this.input);
  }
  setLabel() {
    this.label = this.root.querySelector('label[slot="label"]');
    this.computedLabelPosition = getComputedLabelPosition(this.label, this.labelPosition);
  }
  renderStepButtons(input, getI18nValue, disabled) {
    return (h("div", { class: "gux-step-buttons-container" }, h("button", { class: "gux-step-button", tabIndex: -1, type: "button", title: getI18nValue('increment'), disabled: disabled, onClick: () => this.stepUp(input) }, h("gux-icon", { "icon-name": "chevron-small-up", decorative: true })), h("button", { class: "gux-step-button", tabIndex: -1, type: "button", title: getI18nValue('decrement'), disabled: disabled, onClick: () => this.stepDown(input) }, h("gux-icon", { "icon-name": "chevron-small-down", decorative: true }))));
  }
  stepDown(input) {
    if (input.value === '') {
      setInputValue(input, input.min || '0', false);
    }
    else {
      input.stepDown();
      this.simulateNativeInputAndChangeEvents(input);
    }
  }
  stepUp(input) {
    if (input.value === '') {
      setInputValue(input, input.min || '0', false);
    }
    else {
      input.stepUp();
      this.simulateNativeInputAndChangeEvents(input);
    }
  }
  simulateNativeInputAndChangeEvents(input) {
    simulateNativeEvent(input, 'input');
    simulateNativeEvent(input, 'change');
  }
  get root() { return getElement(this); }
};
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxFormFieldNumber.prototype, "onMutation", null);
GuxFormFieldNumber.style = guxFormFieldNumberCss;

export { GuxFormFieldNumber as gux_form_field_number };
