import { h } from '@stencil/core';
export class GuxToggleSlider {
  constructor() {
    this.checked = false;
    this.disabled = false;
    this.guxAriaLabel = '';
    this.labelId = '';
    this.errorId = '';
  }
  componentDidLoad() {
    var _a, _b, _c;
    if (this.labelId) {
      (_a = this.checkboxElement) === null || _a === void 0 ? void 0 : _a.setAttribute('aria-labelledby', this.labelId);
    }
    else {
      (_b = this.checkboxElement) === null || _b === void 0 ? void 0 : _b.setAttribute('aria-label', this.guxAriaLabel);
    }
    if (this.errorId) {
      (_c = this.checkboxElement) === null || _c === void 0 ? void 0 : _c.setAttribute('aria-describedby', this.errorId);
    }
  }
  render() {
    return (h("div", { class: {
        'gux-toggle-slider': true,
        'gux-checked': this.checked,
        'gux-disabled': this.disabled
      }, role: "checkbox", "aria-checked": this.checked.toString(), "aria-disabled": this.disabled.toString(), tabindex: this.disabled ? '' : '0', ref: el => (this.checkboxElement = el) }, h("div", { class: "gux-slider" }, h("div", { class: "gux-switch" }, h("gux-icon", { "icon-name": "checkmark", decorative: true })))));
  }
  static get is() { return "gux-toggle-slider"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-toggle-slider.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-toggle-slider.css"]
    };
  }
  static get properties() {
    return {
      "checked": {
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
        "attribute": "checked",
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
      "guxAriaLabel": {
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
        "attribute": "gux-aria-label",
        "reflect": false,
        "defaultValue": "''"
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
        "reflect": false,
        "defaultValue": "''"
      },
      "errorId": {
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
        "attribute": "error-id",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
}
