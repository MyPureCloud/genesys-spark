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
import { forceUpdate, h } from '@stencil/core';
import libphonenumber, { PhoneNumberFormat } from 'google-libphonenumber';
import { trackComponent } from '@utils/tracking/usage';
import { regionCountryCodeMap } from './services/RegionCountryCodeMap';
import { buildI18nForComponent, getDesiredLocale } from '../../../i18n';
import countryResources from './i18n/en.json';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { getRegionObjects } from './services/region-map.service';
import { preventBrowserValidationStyling } from '@utils/dom/prevent-browser-validation-styling';
export class GuxPhoneInput {
  constructor() {
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.value = undefined;
    this.defaultRegion = 'US';
    this.labelId = undefined;
    this.hasError = false;
    this.disabled = false;
    this.required = false;
    this.region = undefined;
    this.expanded = false;
  }
  focusSelectedItemAfterRender(expanded) {
    if (expanded && this.listboxElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.listboxElement.focus();
        });
      });
    }
  }
  validateValue(newValue) {
    const selectedListboxOptionElement = this.getOptionElementByValue(newValue);
    if (selectedListboxOptionElement) {
      this.listboxElement.value = newValue;
      return;
    }
  }
  onInternallistboxoptionsupdated(event) {
    event.stopPropagation();
    forceUpdate(this.root);
  }
  onBlur(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onFocus(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onFocusout(event) {
    this.stopPropagationOfInternalFocusEvents(event);
    this.collapseListbox('noFocusChange');
  }
  onFocusin(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onClickOutside() {
    this.collapseListbox('noFocusChange');
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, countryResources);
    this.initialValueParse();
  }
  componentDidRender() {
    if (!this.listboxElement) {
      this.listboxElement = this.root.shadowRoot.querySelector('gux-listbox');
    }
  }
  componentDidLoad() {
    this.setValidation();
    this.setInput();
    this.setListBox();
  }
  componentWillRender() {
    trackComponent(this.root);
    this.validateValue(this.region);
  }
  initialValueParse() {
    if (this.value) {
      try {
        const phone = this.phoneUtil.parse(this.value);
        this.numberText = this.phoneUtil.format(phone, PhoneNumberFormat.NATIONAL);
        this.region = this.phoneUtil.getRegionCodeForNumber(phone);
      }
      catch (e) {
        if (this.numberText === undefined) {
          // only show error on initial render
          console.error('Number cannot be parsed');
          this.numberText = '';
          this.region = this.defaultRegion.toUpperCase();
        }
      }
    }
    else {
      this.numberText = '';
      this.region = this.defaultRegion.toUpperCase();
    }
  }
  onInputChange(number) {
    this.numberText = number;
    this.phoneNumberUpdated();
  }
  validatePhoneNumber() {
    if (this.value) {
      try {
        const phone = this.phoneUtil.parse(this.value);
        const isValid = phone &&
          this.phoneUtil.isValidNumberForRegion(phone, this.phoneUtil.getRegionCodeForNumber(phone));
        this.internalError.emit(!isValid);
      }
      catch (e) {
        if (this.numberText) {
          console.error('Number cannot be parsed');
          this.internalError.emit(true);
        }
      }
    }
  }
  phoneNumberUpdated() {
    if (this.numberText) {
      this.value = `+${this.phoneUtil.getCountryCodeForRegion(this.region)}${this.numberText.replace(/\D/, '')}`;
      this.input.emit(this.value);
    }
  }
  stopPropagationOfInternalFocusEvents(event) {
    if (this.root.contains(event.relatedTarget)) {
      return event.stopImmediatePropagation();
    }
  }
  getOptionElementByValue(value) {
    const listboxOptionElements = this.root.shadowRoot.querySelectorAll('gux-option');
    return Array.from(listboxOptionElements).find(listboxOptionElement => listboxOptionElement.value === value);
  }
  fieldButtonClick() {
    this.expanded = !this.expanded;
  }
  collapseListbox(focusChange) {
    if (this.expanded) {
      this.expanded = false;
    }
    if (focusChange === 'focusFieldButton') {
      this.fieldButtonElement.focus();
    }
  }
  updateRegion(newValue) {
    if (this.region !== newValue) {
      this.collapseListbox('focusFieldButton');
      this.region = newValue;
      this.phoneNumberUpdated();
    }
  }
  setValidation() {
    this.root.addEventListener('focusout', (event) => {
      event.stopPropagation();
      this.validatePhoneNumber();
    });
  }
  setInput() {
    this.inputElement = this.root.shadowRoot.querySelector('input[type="tel"]');
    preventBrowserValidationStyling(this.inputElement);
    this.inputElement.addEventListener('input', (event) => {
      event.stopPropagation();
      this.onInputChange(this.inputElement.value);
    });
    this.inputElement.addEventListener('focusin', (event) => {
      event.stopPropagation();
      this.collapseListbox('noFocusChange');
    });
  }
  setListBox() {
    this.listboxElement.addEventListener('input', (event) => {
      event.stopPropagation();
      this.updateRegion(event.target.value);
    });
    this.listboxElement.addEventListener('change', (event) => {
      event.stopPropagation();
    });
    this.listboxElement.addEventListener('focusout', (event) => {
      event.stopPropagation();
    });
    this.listboxElement.addEventListener('keydown', (event) => {
      event.stopPropagation();
      if (event.key === 'Tab') {
        /* calling setTimeout is a workaround as calling focus without it does not work */
        if (event.shiftKey) {
          setTimeout(() => this.fieldButtonElement.focus(), 0);
        }
        else {
          setTimeout(() => this.inputElement.focus(), 0);
        }
      }
      else if (event.key === 'Escape') {
        this.collapseListbox('noFocusChange');
      }
    });
  }
  renderCountryButton() {
    return (h("div", { class: "region-select" }, h("button", { type: "button", class: "gux-field gux-field-button", disabled: this.disabled, onClick: this.fieldButtonClick.bind(this), ref: el => (this.fieldButtonElement = el), "aria-haspopup": "listbox", "aria-expanded": this.expanded.toString() }, h("div", { class: "gux-field-content" }, this.renderButtonDisplay()), h("gux-icon", { class: "gux-expand-icon", iconName: "chevron-small-down", decorative: true }))));
  }
  renderButtonDisplay() {
    const selectedListboxOptionElement = this.getOptionElementByValue(this.region);
    const selectedRegion = selectedListboxOptionElement === null || selectedListboxOptionElement === void 0 ? void 0 : selectedListboxOptionElement.value;
    const countryCode = regionCountryCodeMap[selectedRegion] || '';
    return (h("div", { class: "gux-selected-option" }, h("gux-region-icon", { region: selectedRegion }), h("span", null, `+${countryCode}`)));
  }
  renderInput() {
    return (h("input", { id: 'tel-input', class: "phone-input", type: "tel", placeholder: this.phoneUtil.format(this.phoneUtil.getExampleNumber(this.region), PhoneNumberFormat.NATIONAL), value: this.numberText, disabled: this.disabled }));
  }
  renderTarget() {
    return (h("div", { class: {
        'target-container': true,
        'gux-error': this.hasError
      }, slot: "target" }, this.renderCountryButton(), this.renderInput()));
  }
  renderPopup() {
    const options = getRegionObjects(getDesiredLocale(this.root), this.i18n, this.phoneUtil).map(region => (h("gux-option", { value: region.code }, h("span", { class: "option-content" }, h("gux-region-icon", { region: region.code }), h("span", null, region.name), h("span", { class: "country-code" }, `+${region.countryCode}`)))));
    return (h("div", { slot: "popup", class: "gux-listbox-container" }, h("gux-listbox", { "aria-label": "country dropdown" }, options)));
  }
  render() {
    return (h("gux-popup-beta", { expanded: this.expanded, disabled: this.disabled }, this.renderTarget(), this.renderPopup()));
  }
  static get is() { return "gux-phone-input-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-phone-input.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-phone-input.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "value",
        "reflect": false
      },
      "defaultRegion": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "default-region",
        "reflect": false,
        "defaultValue": "'US'"
      },
      "labelId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label-id",
        "reflect": false
      },
      "hasError": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "has-error",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "required": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "required",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "region": {},
      "expanded": {}
    };
  }
  static get events() {
    return [{
        "method": "input",
        "name": "input",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "internalError",
        "name": "internalError",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "expanded",
        "methodName": "focusSelectedItemAfterRender"
      }];
  }
  static get listeners() {
    return [{
        "name": "internallistboxoptionsupdated",
        "method": "onInternallistboxoptionsupdated",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "blur",
        "method": "onBlur",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focus",
        "method": "onFocus",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusout",
        "method": "onFocusout",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusin",
        "method": "onFocusin",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxPhoneInput.prototype, "onClickOutside", null);
