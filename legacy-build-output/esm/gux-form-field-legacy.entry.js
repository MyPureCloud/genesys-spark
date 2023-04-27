import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { O as OnMutation } from './on-mutation-35d8145e.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { a as logWarn } from './log-error-3d08c2b1.js';
import { o as onRequiredChange } from './on-attribute-change-5fd8da7c.js';
import { p as preventBrowserValidationStyling } from './prevent-browser-validation-styling-d16c3f4c.js';
import { t as trackComponent } from './usage-55de2afe.js';

const guxFormFieldCss = "gux-form-field-legacy{display:block;color:#2e394c}gux-form-field-legacy .gux-label-and-input-and-error-container{margin:16px 0}gux-form-field-legacy .gux-label-and-input-and-error-container label{font-size:12px;font-weight:bold;line-height:20px}gux-form-field-legacy .gux-label-and-input-and-error-container input,gux-form-field-legacy .gux-label-and-input-and-error-container select{width:100%;font-size:12px}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-container input{overflow:hidden;text-overflow:ellipsis}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-error .gux-input-container{border-color:#ea0b0b}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-error textarea{border-color:#ea0b0b}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-error .gux-input-color-main-element{border-color:#ea0b0b}gux-form-field-legacy .gux-label-and-input-and-error-container .gux-input-and-error-container{flex-grow:1}gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside{display:flex;flex-direction:row}gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside .gux-label-container{position:relative;top:7px;width:fit-content;min-width:45px;margin-right:8px}gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside gux-input-range,gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside gux-input-select,gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside gux-input-text-like,gux-form-field-legacy .gux-label-and-input-and-error-container.gux-beside gux-input-search{flex:1 1 auto}gux-form-field-legacy .gux-label-and-input-and-error-container.gux-screenreader label{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}gux-form-field-legacy .gux-required::after{font-size:12px;color:#ea0b0b;content:' *'}gux-form-field-legacy .gux-error{display:none;margin:4px 0}gux-form-field-legacy .gux-error.gux-show{display:block}";

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
const GuxFormFieldLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.errorId = randomHTMLId('gux-form-field-error');
    this.labelId = randomHTMLId('gux-form-field-label');
    this.defaultInputId = randomHTMLId('gux-form-field');
    this.clearable = undefined;
    this.resize = undefined;
    this.displayUnits = undefined;
    this.valueInTooltip = undefined;
    this.labelPosition = undefined;
    this.slottedElementType = undefined;
    this.computedLabelPosition = 'above';
    this.required = true;
    this.hasError = false;
  }
  onMutation() {
    this.hasError = Boolean(this.root.querySelector('[slot="error"]'));
  }
  componentWillLoad() {
    this.input = this.root.querySelector('input[slot="input"], select[slot="input"], textarea[slot="input"]');
    this.label = this.root.querySelector('label[slot="label"]');
    this.slottedElementType =
      this.input.tagName.toLowerCase();
    this.required = this.input.required;
    this.requiredObserver = onRequiredChange(this.input, (required) => {
      this.required = required;
    });
    preventBrowserValidationStyling(this.input);
    const labelPositionVariant = this.labelPosition
      ? this.labelPosition.toLowerCase()
      : 'none';
    if (this.slottedElementType === 'input') {
      const type = this.input.getAttribute('type');
      trackComponent(this.root, {
        variant: `${this.slottedElementType}-${type}-${labelPositionVariant}`
      });
    }
    else {
      trackComponent(this.root, {
        variant: `${this.slottedElementType}-${labelPositionVariant}`
      });
    }
  }
  componentWillRender() {
    this.computedLabelPosition = this.getComputedLabelPosition(this.label, this.labelPosition);
    this.validateFormIds();
  }
  disconnectedCallback() {
    if (this.requiredObserver) {
      this.requiredObserver.disconnect();
    }
  }
  renderInputCheckbox(hasError) {
    return (h("div", null, h("gux-input-checkbox", { class: { 'gux-input-error': hasError } }, h("slot", { name: "input" }), h("slot", { name: "label" })), this.renderError(hasError)));
  }
  renderInputRadio() {
    return (h("gux-input-radio", null, h("slot", { name: "input" }), h("slot", { name: "label" })));
  }
  renderInputColor(hasError) {
    return (h("div", { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` }, this.renderLabel(this.required), h("div", { class: "gux-input-and-error-container" }, h("gux-input-color", { "gux-label-describedby": this.labelId, "gux-error-describedby": this.errorId, "gux-required": this.required, class: {
        'gux-input-error': hasError
      } }, h("slot", { name: "input" })), this.renderError(hasError))));
  }
  renderInputRange(displayUnits, valueInTooltip) {
    return (h("div", { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` }, this.renderLabel(this.required), h("gux-input-range", { "display-units": displayUnits, "value-in-tooltip": valueInTooltip }, h("slot", { name: "input" }))));
  }
  renderInputNumber(clearable, hasError) {
    return (h("div", { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` }, this.renderLabel(this.required), h("div", { class: "gux-input-and-error-container" }, h("gux-input-number", { class: {
        'gux-input-error': hasError
      }, slot: "input", clearable: clearable }, h("slot", { name: "input" })), this.renderError(hasError))));
  }
  renderInputSelect(hasError) {
    return (h("div", { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` }, this.renderLabel(this.required), h("div", { class: "gux-input-and-error-container" }, h("gux-input-select", { slot: "input", class: {
        'gux-input-error': hasError
      } }, h("slot", { name: "input" })), this.renderError(hasError))));
  }
  renderInputTextLike(clearable, hasError) {
    return (h("div", { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` }, this.renderLabel(this.required), h("div", { class: "gux-input-and-error-container" }, h("gux-input-text-like", { class: {
        'gux-input-error': hasError
      }, slot: "input", clearable: clearable }, h("slot", { name: "input" })), this.renderError(hasError))));
  }
  renderInputSearch(hasError) {
    return (h("div", { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` }, this.renderLabel(this.required), h("div", { class: "gux-input-and-error-container" }, h("gux-input-search", null, h("slot", { name: "input" })), this.renderError(hasError))));
  }
  renderInputTextArea(hasError) {
    return (h("div", { class: `gux-label-and-input-and-error-container gux-${this.computedLabelPosition}` }, this.renderLabel(this.required), h("div", { class: "gux-input-and-error-container" }, h("gux-input-textarea", { class: {
        'gux-input-error': hasError
      }, slot: "input", resize: this.resize }, h("slot", { name: "input" })), this.renderError(hasError))));
  }
  render() {
    const type = this.input.getAttribute('type');
    switch (this.slottedElementType) {
      case 'input':
        switch (type) {
          case 'checkbox':
            return this.renderInputCheckbox(this.hasError);
          case 'radio':
            return this.renderInputRadio();
          case 'color':
            return this.renderInputColor(this.hasError);
          case 'range':
            return this.renderInputRange(this.displayUnits, this.valueInTooltip);
          case 'email':
          case 'password':
          case 'text':
            return this.renderInputTextLike(this.clearable, this.hasError);
          case 'number':
            return this.renderInputNumber(this.clearable, this.hasError);
          case 'search':
            return this.renderInputSearch(this.hasError);
          default:
            return (h("div", null, h("slot", { name: "label" }), h("slot", { name: "input" }), h("slot", { name: "error" })));
        }
      case 'select':
        return this.renderInputSelect(this.hasError);
      case 'textarea':
        return this.renderInputTextArea(this.hasError);
      default:
        return (h("div", null, h("slot", { name: "label" }), h("slot", { name: "input" }), h("slot", { name: "error" })));
    }
  }
  validateFormIds() {
    if (this.label) {
      if (this.input.getAttribute('type') === 'color') {
        if (this.label.getAttribute('id')) {
          this.labelId = this.label.getAttribute('id');
        }
        this.label.setAttribute('id', this.labelId);
        return;
      }
      const inputHasId = !!this.input.hasAttribute('id');
      const labelHasFor = !!this.label.hasAttribute('for');
      if (!inputHasId && labelHasFor) {
        logWarn('gux-form-field', 'A "for" attribute has been provided on the label but there is no corresponding id on the input. Either provide an id on the input or omit the "for" attribute from the label. If there is no input id and no "for" attribute provided, the component will automatically generate an id and link it to the "for" attribute.');
      }
      else if (!inputHasId) {
        this.input.setAttribute('id', this.defaultInputId);
        this.label.setAttribute('for', this.defaultInputId);
      }
      else if (inputHasId && !labelHasFor) {
        const forId = this.input.getAttribute('id');
        this.label.setAttribute('for', forId);
      }
      else if (inputHasId &&
        labelHasFor &&
        this.input.getAttribute('id') !== this.label.getAttribute('for')) {
        logWarn('gux-form-field', 'The input id and label for attribute should match.');
      }
    }
    else {
      logWarn('gux-form-field', 'A label is required for this component. If a visual label is not needed for this use case, please add localized text for a screenreader and set the label-position attribute to "screenreader" to visually hide the label.');
    }
    if (this.hasErrorSlot()) {
      this.input.setAttribute('aria-describedby', this.errorId);
    }
    else if (this.input.getAttribute('aria-describedby') &&
      this.input
        .getAttribute('aria-describedby')
        .startsWith('gux-form-field-error')) {
      this.input.removeAttribute('aria-describedby');
    }
  }
  getComputedLabelPosition(label, labelPosition) {
    if (label) {
      if (['above', 'beside', 'screenreader'].includes(labelPosition)) {
        return labelPosition;
      }
      else if (label.offsetWidth > 1 && label.offsetWidth < 40) {
        return 'beside';
      }
      else {
        return 'above';
      }
    }
  }
  hasErrorSlot() {
    return !!this.root.querySelector('[slot="error"]');
  }
  renderLabel(required) {
    return (h("div", { class: {
        'gux-label-container': true,
        'gux-required': required
      } }, h("slot", { name: "label", slot: "label" })));
  }
  renderError(hasError) {
    return (h("div", { id: this.errorId, class: {
        'gux-error': true,
        'gux-show': hasError
      } }, h("gux-error-message-beta", null, h("slot", { name: "error" }))));
  }
  get root() { return getElement(this); }
};
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxFormFieldLegacy.prototype, "onMutation", null);
GuxFormFieldLegacy.style = guxFormFieldCss;

export { GuxFormFieldLegacy as gux_form_field_legacy };
