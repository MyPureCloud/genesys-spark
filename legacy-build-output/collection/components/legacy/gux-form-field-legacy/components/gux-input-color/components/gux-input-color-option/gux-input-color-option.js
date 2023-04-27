import { h } from '@stencil/core';
export class GuxInputColorOption {
  constructor() {
    this.active = undefined;
    this.value = undefined;
  }
  render() {
    return (h("button", { type: "button", value: this.value, class: this.active ? 'gux-input-color-option-active' : '', disabled: !this.value, style: this.value && { 'background-color': this.value }, title: this.value, onClick: this.onColorOptionClickHandler.bind(this) }));
  }
  onColorOptionClickHandler() {
    this.colorSelect.emit(this.value);
  }
  static get is() { return "gux-input-color-option"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-color-option.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-color-option.css"]
    };
  }
  static get properties() {
    return {
      "active": {
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
          "text": "Indicate if the tile is active"
        },
        "attribute": "active",
        "reflect": false
      },
      "value": {
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
          "text": "Indicate the color of the tile, if undefined, tile will be blank and be disabled"
        },
        "attribute": "value",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "colorSelect",
        "name": "colorSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggers when a color is selected"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
}
