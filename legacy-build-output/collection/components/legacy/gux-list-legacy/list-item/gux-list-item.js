import { h, Host } from '@stencil/core';
export class GuxListItemLegacy {
  constructor() {
    this.text = undefined;
    this.value = undefined;
    this.strategy = undefined;
  }
  handleClick() {
    this.onItemClicked();
  }
  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onItemClicked();
    }
  }
  render() {
    return (h(Host, { role: "listitem" }, h("span", { class: "gux-list-item" }, this.text && (h("gux-text-highlight", { class: "gux-text", text: this.text, strategy: this.strategy })), h("slot", null))));
  }
  onItemClicked() {
    this.emitPress();
  }
  emitPress() {
    this.press.emit(this.value);
  }
  static get is() { return "gux-list-item-legacy"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-list-item.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-list-item.css"]
    };
  }
  static get properties() {
    return {
      "text": {
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
          "text": "The value to display."
        },
        "attribute": "text",
        "reflect": false
      },
      "value": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The value associated with this item."
        },
        "attribute": "value",
        "reflect": false
      },
      "strategy": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxTextHighlightStrategy",
          "resolved": "\"contains\" | \"fuzzy\" | \"start\"",
          "references": {
            "GuxTextHighlightStrategy": {
              "location": "import",
              "path": "../../../stable/gux-text-highlight/gux-text-highlight.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "How the item should be highlighted."
        },
        "attribute": "strategy",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "press",
        "name": "press",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when the list item is clicked, or enter/space is pressed."
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get listeners() {
    return [{
        "name": "click",
        "method": "handleClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keydown",
        "method": "handleKeyDown",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
