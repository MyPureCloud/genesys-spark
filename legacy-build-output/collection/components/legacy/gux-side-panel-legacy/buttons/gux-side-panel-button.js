import { h } from '@stencil/core';
export class GuxSidePanelButton {
  constructor() {
    this.icon = undefined;
    this.altText = undefined;
    this.isSelected = false;
  }
  get buttonClass() {
    return this.isSelected ? 'selected' : '';
  }
  render() {
    return (h("button", { "aria-label": this.altText, class: this.buttonClass }, h("gux-icon", { decorative: true, "icon-name": this.icon })));
  }
  static get is() { return "gux-side-panel-button"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-side-panel-button.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-side-panel-button.css"]
    };
  }
  static get properties() {
    return {
      "icon": {
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
        "attribute": "icon",
        "reflect": false
      },
      "altText": {
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
        "attribute": "alt-text",
        "reflect": false
      },
      "isSelected": {
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
        "attribute": "is-selected",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
}
