import { h, Host } from '@stencil/core';
import { byClosestId, byId, first, last, next, previous } from './gux-list.service';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot - collection of gux-list-item, gux-list-divider elements
 */
const validFocusableItems = ['gux-list-item'];
export class GuxList {
  componentWillLoad() {
    trackComponent(this.root);
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        previous(this.root, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        first(this.root, validFocusableItems);
        break;
      case 'ArrowDown':
        event.preventDefault();
        next(this.root, validFocusableItems);
        break;
      case 'End':
        event.preventDefault();
        last(this.root, validFocusableItems);
        break;
    }
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusFirstItem() {
    first(this.root, validFocusableItems);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusItemById(id) {
    byId(this.root, validFocusableItems, id);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusItemByClosestId(id) {
    byClosestId(this.root, validFocusableItems, id);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusLastItem() {
    last(this.root, validFocusableItems);
  }
  renderFocusTarget() {
    return (h("span", { tabindex: "-1" }));
  }
  render() {
    return (h(Host, { role: "list" }, this.renderFocusTarget(), h("slot", null)));
  }
  static get is() { return "gux-list"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-list.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-list.css"]
    };
  }
  static get methods() {
    return {
      "guxFocusFirstItem": {
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
          "text": "",
          "tags": []
        }
      },
      "guxFocusItemById": {
        "complexType": {
          "signature": "(id: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "guxFocusItemByClosestId": {
        "complexType": {
          "signature": "(id: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "guxFocusLastItem": {
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
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "onKeyDown",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
