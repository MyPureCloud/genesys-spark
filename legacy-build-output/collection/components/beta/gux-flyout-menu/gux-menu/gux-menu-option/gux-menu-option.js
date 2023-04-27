import { h } from '@stencil/core';
import { menuNavigation } from '../gux-menu.common';
/**
 * @slot - text
 */
export class GuxMenuOption {
  /**
   * Focus on the components button element
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus() {
    this.buttonElement.focus();
  }
  onKeydown(event) {
    menuNavigation(event, this.root);
    switch (event.key) {
      case 'ArrowRight':
      case 'Enter':
        event.stopPropagation();
        break;
    }
  }
  render() {
    return (h("button", { type: "button", class: "gux-menu-option-button", role: "menuitem", "aria-haspopup": "false", tabIndex: -1, ref: el => (this.buttonElement = el) }, h("span", { class: "gux-menu-option-button-text" }, h("slot", null))));
  }
  static get is() { return "gux-menu-option"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-menu-option.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-menu-option.css"]
    };
  }
  static get methods() {
    return {
      "guxFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Focus on the components button element",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "onKeydown",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
