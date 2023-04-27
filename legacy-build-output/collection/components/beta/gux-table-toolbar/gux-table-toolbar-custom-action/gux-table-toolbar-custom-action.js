import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot text - Slot for action text.
 * @slot icon - Slot for icon.
 */
export class GuxTableToolbarCustomAction {
  constructor() {
    this.iconOnly = false;
    this.accent = 'secondary';
    this.disabled = false;
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("gux-button-slot-beta", { accent: this.accent }, h("button", { disabled: this.disabled, type: "button", class: "gux-action-title" }, h("slot", { name: "icon" }), h("span", { class: { 'gux-sr-only': this.iconOnly } }, h("slot", { name: "text" })))));
  }
  static get is() { return "gux-table-toolbar-custom-action"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-table-toolbar-custom-action.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-table-toolbar-custom-action.css"]
    };
  }
  static get properties() {
    return {
      "iconOnly": {
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
        "attribute": "icon-only",
        "reflect": false,
        "defaultValue": "false"
      },
      "accent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxTableToolbarActionAccent",
          "resolved": "\"ghost\" | \"primary\" | \"secondary\"",
          "references": {
            "GuxTableToolbarActionAccent": {
              "location": "import",
              "path": "../gux-table-toolbar-action-accents.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "accent",
        "reflect": false,
        "defaultValue": "'secondary'"
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
      }
    };
  }
  static get elementRef() { return "root"; }
}
