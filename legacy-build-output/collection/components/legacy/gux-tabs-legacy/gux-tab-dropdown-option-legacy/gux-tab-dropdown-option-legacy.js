import { h } from '@stencil/core';
export class GuxTabDropdownOptionLegacy {
  constructor() {
    this.optionId = undefined;
    this.iconName = undefined;
  }
  render() {
    return (h("button", { class: "tab-dropdown-option" }, h("gux-icon", { "icon-name": this.iconName, decorative: true }), h("span", null, h("slot", null))));
  }
  static get is() { return "gux-tab-dropdown-option-legacy"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tab-dropdown-option-legacy.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tab-dropdown-option-legacy.css"]
    };
  }
  static get properties() {
    return {
      "optionId": {
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
          "text": "unique id for the option"
        },
        "attribute": "option-id",
        "reflect": false
      },
      "iconName": {
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
          "text": "name of the gux-icon to display for the option"
        },
        "attribute": "icon-name",
        "reflect": false
      }
    };
  }
}
