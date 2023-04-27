import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot - content
 */
export class GuxButton {
  constructor() {
    this.type = 'button';
    this.guxTitle = undefined;
    this.disabled = false;
    this.accent = 'secondary';
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
    this.makeSlotContentDisableable();
  }
  render() {
    return (h("button", { type: this.type, title: this.guxTitle, disabled: this.disabled, class: `gux-${this.accent}` }, h("slot", null)));
  }
  makeSlotContentDisableable() {
    this.root.shadowRoot.addEventListener('click', (event) => {
      if (this.disabled) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
      }
    });
    Array.from(this.root.children).forEach(slotElement => {
      slotElement.addEventListener('click', (event) => {
        if (this.disabled) {
          event.stopImmediatePropagation();
          event.stopPropagation();
          event.preventDefault();
        }
      });
    });
  }
  static get is() { return "gux-button"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-button.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-button.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxButtonType",
          "resolved": "\"button\" | \"reset\" | \"submit\"",
          "references": {
            "GuxButtonType": {
              "location": "import",
              "path": "./gux-button.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The component button type"
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'button'"
      },
      "guxTitle": {
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
          "text": "The component title"
        },
        "attribute": "gux-title",
        "reflect": false
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
          "text": "Indicate if the button is disabled or not"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "accent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxButtonAccent",
          "resolved": "\"danger\" | \"ghost\" | \"inline\" | \"primary\" | \"secondary\" | \"tertiary\"",
          "references": {
            "GuxButtonAccent": {
              "location": "import",
              "path": "./gux-button.types"
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
      }
    };
  }
  static get elementRef() { return "root"; }
}
