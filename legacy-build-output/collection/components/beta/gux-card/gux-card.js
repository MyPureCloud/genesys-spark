import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot - Content of card.
 */
export class GuxCard {
  constructor() {
    this.accent = 'outline';
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("div", { class: {
        'gux-card': true,
        [`gux-${this.accent}`]: true
      } }, h("slot", null)));
  }
  static get is() { return "gux-card-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-card.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-card.css"]
    };
  }
  static get properties() {
    return {
      "accent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxCardAccent",
          "resolved": "\"filled\" | \"outline\" | \"raised\"",
          "references": {
            "GuxCardAccent": {
              "location": "import",
              "path": "./gux-card.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Card Accent."
        },
        "attribute": "accent",
        "reflect": false,
        "defaultValue": "'outline'"
      }
    };
  }
  static get elementRef() { return "root"; }
}
