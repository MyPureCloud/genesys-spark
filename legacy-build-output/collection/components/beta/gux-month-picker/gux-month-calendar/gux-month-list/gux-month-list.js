import { h, Host } from '@stencil/core';
import { first, focusMove, last, next, previous } from '../../../../stable/gux-list/gux-list.service';
const validFocusableItems = ['gux-month-list-item'];
/**
 * @slot - month name
 */
export class GuxMonthList {
  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        focusMove(this.root, validFocusableItems, -3);
        break;
      case 'ArrowDown':
        event.preventDefault();
        focusMove(this.root, validFocusableItems, 3);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        previous(this.root, validFocusableItems);
        break;
      case 'ArrowRight':
        event.preventDefault();
        next(this.root, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        first(this.root, validFocusableItems);
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
  renderFocusTarget() {
    return (h("span", { tabindex: "1" }));
  }
  render() {
    return (h(Host, { role: "list" }, this.renderFocusTarget(), h("slot", null)));
  }
  static get is() { return "gux-month-list"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-month-list.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-month-list.css"]
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
