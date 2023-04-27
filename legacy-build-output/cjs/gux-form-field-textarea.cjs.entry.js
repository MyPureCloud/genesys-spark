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

const guxFormFieldTextareaCss = ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(textarea){flex:1 1 auto;align-self:auto;order:0;font-family:inherit;color:#2e394c;resize:vertical;background-color:#f6f7f9;background-image:none;border:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;min-height:90px;padding:4px 12px;margin:0}::slotted(textarea)::placeholder{color:#596373;opacity:1}::slotted(textarea)[disabled]{opacity:0.5}::slotted(textarea)::placeholder{color:#596373;opacity:1}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-input{position:relative;display:flex;border:1px solid #6b7585;border-radius:4px;outline:none}.gux-input-and-error-container .gux-input:focus-within{border-color:#2a60c8;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-input-and-error-container .gux-input.gux-input-error{border-color:#ea0b0b}.gux-input-and-error-container .gux-input.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-input.gux-resize-none ::slotted(textarea){resize:none}.gux-input-and-error-container .gux-input.gux-resize-auto{display:grid;overflow:hidden;word-break:normal;word-break:break-word;overflow-wrap:anywhere}.gux-input-and-error-container .gux-input.gux-resize-auto::after{grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;white-space:pre-wrap;visibility:hidden;content:attr(data-replicated-value) ' ';min-height:90px;padding:4px 12px;margin:0}.gux-input-and-error-container .gux-input.gux-resize-auto ::slotted(textarea){grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;overflow-x:hidden;resize:none}";

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
const GuxFormFieldTextarea = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.resize = undefined;
    this.labelPosition = undefined;
    this.computedLabelPosition = 'above';
    this.disabled = undefined;
    this.required = true;
    this.hasError = false;
    this.hasHelp = false;
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
  componentDidLoad() {
    this.updateHeight(this.textareaContainerElement, this.input, this.resize);
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
    return (index.h(guxFormFieldContainer.GuxFormFieldContainer, { labelPosition: this.computedLabelPosition }, index.h(guxFormFieldContainer.GuxFormFieldLabel, { position: this.computedLabelPosition, required: this.required }, index.h("slot", { name: "label", onSlotchange: () => this.setLabel() })), index.h("div", { class: "gux-input-and-error-container" }, index.h("div", { ref: el => (this.textareaContainerElement = el), class: {
        'gux-input': true,
        [`gux-resize-${this.resize}`]: true,
        'gux-disabled': this.disabled,
        'gux-input-error': this.hasError
      } }, index.h("slot", { name: "input" })), index.h(guxFormField_service.GuxFormFieldError, { show: this.hasError }, index.h("slot", { name: "error" })), index.h(guxFormField_service.GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, index.h("slot", { name: "help" })))));
  }
  get variant() {
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';
    return `${this.resize}-${labelPositionVariant}`;
  }
  setInput() {
    this.input = this.root.querySelector('textarea[slot="input"]');
    preventBrowserValidationStyling.preventBrowserValidationStyling(this.input);
    this.updateHeight(this.textareaContainerElement, this.input, this.resize);
    this.input.addEventListener('input', () => {
      this.updateHeight(this.textareaContainerElement, this.input, this.resize);
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
  updateHeight(container, input, resize) {
    if (resize === 'auto') {
      if (container) {
        container.dataset.replicatedValue = input.value;
        container.style.maxHeight = input.style.maxHeight;
      }
    }
  }
  get root() { return index.getElement(this); }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true })
], GuxFormFieldTextarea.prototype, "onMutation", null);
GuxFormFieldTextarea.style = guxFormFieldTextareaCss;

exports.gux_form_field_textarea = GuxFormFieldTextarea;
