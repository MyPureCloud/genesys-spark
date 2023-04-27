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

const guxFormFieldRangeCss = ".gux-form-field-container{margin:var(--gux-form-field-container-margin-top, 16px) 0 var(--gux-form-field-container-margin-bottom, 16px) 0}.gux-form-field-container.gux-beside{display:flex;flex-direction:row}.gux-form-field-error{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;line-height:20px;color:#2e394c}.gux-form-field-error.gux-show{display:flex}.gux-form-field-error gux-icon{flex:0 1 auto;align-self:auto;order:0;min-width:16px;min-height:16px;margin:2px 4px 0 0;color:#ea0b0b}.gux-form-field-error .gux-message{flex:0 1 auto;align-self:auto;order:0}.gux-form-field-label.gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}.gux-form-field-label.gux-beside{position:relative;top:8px;width:fit-content;min-width:45px;margin-right:8px}.gux-form-field-label.gux-above{margin-bottom:8px}.gux-form-field-label.gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}.gux-form-field-help{display:none;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:4px 0;font-size:12px;font-weight:400;line-height:20px;color:#6b7585}.gux-form-field-help.gux-show{display:flex}.gux-form-field-help .gux-message{flex:0 1 auto;align-self:none;order:0}:host{display:block;color:#2e394c}::slotted(label){font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:12px;line-height:16px}::slotted(input[type='range']){position:absolute;width:100%;height:2px;margin:6px 0;margin-top:calc(-1 * (12px / 2 + 2px));background:transparent;-webkit-appearance:none}.gux-input-and-error-container{flex-grow:1}.gux-input-and-error-container .gux-range-input-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;height:32px;font-size:12px}.gux-input-and-error-container .gux-range-input-container.gux-disabled{opacity:0.5}.gux-input-and-error-container .gux-range-input-container .gux-range{position:relative;flex:1 1 auto;align-self:center;order:0}.gux-input-and-error-container .gux-range-input-container .gux-range:hover .gux-range-tooltip,.gux-input-and-error-container .gux-range-input-container .gux-range:focus-within .gux-range-tooltip{visibility:visible}.gux-input-and-error-container .gux-range-input-container .gux-range .gux-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad}.gux-input-and-error-container .gux-range-input-container .gux-range .gux-track .gux-progress{height:2px;background-color:#2a60c8}.gux-input-and-error-container .gux-range-input-container .gux-display{flex:0 1 auto;align-self:auto;order:0;height:32px;margin:0 0 0 16px;line-height:32px;text-align:right}.gux-input-and-error-container .gux-range-input-container .gux-display.gux-hidden{display:none}.gux-input-and-error-container .gux-range-tooltip-container{position:absolute;top:-50px;width:100%;height:32px;pointer-events:none}.gux-input-and-error-container .gux-range-tooltip-container.gux-hidden{display:none}.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px;position:absolute;z-index:var(--gux-zindex-tooltip, 1);display:flex;align-items:center;justify-content:center;width:50px;height:32px;margin-left:-20px;visibility:hidden;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip::after,.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip::before{position:absolute;top:100%;left:50%;width:0;height:0;pointer-events:none;content:' ';border:solid transparent}.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip::after{margin-left:-4px;border-width:4px;border-top-color:#fdfdfd}.gux-input-and-error-container .gux-range-tooltip-container .gux-range-tooltip::before{margin-left:-6px;border-width:6px;border-top-color:#b4bccb}";

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
const GuxFormField = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.displayUnits = undefined;
    this.valueInTooltip = undefined;
    this.labelPosition = undefined;
    this.computedLabelPosition = 'above';
    this.disabled = undefined;
    this.required = undefined;
    this.hasError = false;
    this.hasHelp = false;
    this.value = undefined;
    this.active = undefined;
    this.valueWatcherId = undefined;
  }
  onInput(e) {
    const input = e.target;
    this.updateValue(input.value);
  }
  onMousedown() {
    if (!this.disabled) {
      this.active = true;
    }
  }
  onMouseup() {
    this.active = false;
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
    this.updatePosition();
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
    if (this.requiredObserver) {
      this.requiredObserver.disconnect();
    }
    clearInterval(this.valueWatcherId);
  }
  render() {
    return (index.h(index.Host, { class: {
        'gux-active': this.active
      } }, index.h(guxFormFieldContainer.GuxFormFieldContainer, { labelPosition: this.computedLabelPosition }, index.h(guxFormFieldContainer.GuxFormFieldLabel, { position: this.computedLabelPosition, required: this.required }, index.h("slot", { name: "label", onSlotchange: () => this.setLabel() })), index.h("div", { class: "gux-input-and-error-container" }, this.renderRangeInput(), index.h(guxFormField_service.GuxFormFieldError, { show: this.hasError }, index.h("slot", { name: "error" })), index.h(guxFormField_service.GuxFormFieldHelp, { show: !this.hasError && this.hasHelp }, index.h("slot", { name: "help" }))))));
  }
  get variant() {
    return this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
  }
  setInput() {
    this.input = this.root.querySelector('input[type="range"][slot="input"]');
    preventBrowserValidationStyling.preventBrowserValidationStyling(this.input);
    this.disabled = onInputDisabledStateChange.calculateInputDisabledState(this.input);
    this.required = this.input.required;
    this.value = this.input.value;
    this.disabledObserver = onInputDisabledStateChange.onInputDisabledStateChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    this.requiredObserver = onAttributeChange.onRequiredChange(this.input, (required) => {
      this.required = required;
    });
    clearInterval(this.valueWatcherId);
    this.valueWatcherId = setInterval(() => {
      if (this.value !== this.input.value) {
        this.updateValue(this.input.value);
      }
    }, 100);
    guxFormField_service.validateFormIds(this.root, this.input);
  }
  setLabel() {
    this.label = this.root.querySelector('label[slot="label"]');
    this.computedLabelPosition = guxFormField_service.getComputedLabelPosition(this.label, this.labelPosition);
  }
  renderRangeInput() {
    return (index.h("div", { class: {
        'gux-range-input-container': true,
        'gux-disabled': this.disabled
      } }, index.h("div", { class: "gux-range" }, index.h("div", { class: "gux-track" }, index.h("div", { class: "gux-progress", ref: el => (this.progressElement = el) })), index.h("slot", { name: "input" }), index.h("div", { class: {
        'gux-range-tooltip-container': true,
        'gux-hidden': !this.valueInTooltip
      }, ref: el => (this.sliderTooltipContainer = el) }, index.h("div", { class: "gux-range-tooltip", ref: el => (this.sliderTooltip = el) }, this.getDisplayValue()))), index.h("div", { class: {
        'gux-display': true,
        'gux-hidden': this.valueInTooltip
      } }, this.getDisplayValue())));
  }
  updateValue(newValue) {
    this.value = newValue;
    this.updatePosition();
  }
  updatePosition() {
    const value = Number(this.input.value || 0);
    const min = Number(this.input.min || 0);
    const max = Number(this.input.max || 100);
    const placementPercentage = ((value - min) / (max - min)) * 100;
    if (this.sliderTooltip) {
      const width = this.sliderTooltipContainer.offsetWidth;
      const offset = placementPercentage - (placementPercentage / 8 / width) * 100;
      this.sliderTooltip.style.left = `${offset}%`;
    }
    this.progressElement.style.width = `${placementPercentage}%`;
  }
  getDisplayValue() {
    if (this.displayUnits) {
      return `${this.value}${this.displayUnits}`;
    }
    return this.value;
  }
  get root() { return index.getElement(this); }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true })
], GuxFormField.prototype, "onMutation", null);
GuxFormField.style = guxFormFieldRangeCss;

exports.gux_form_field_range = GuxFormField;
