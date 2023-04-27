import { h, Host } from '@stencil/core';
export class GuxActionItem {
  constructor() {
    this.text = undefined;
    this.value = undefined;
    this.disabled = false;
  }
  handleClick() {
    this.onItemClicked();
  }
  onKeydown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.onItemClicked();
        return;
    }
  }
  onKeyup(event) {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        this.onItemClicked();
        return;
    }
  }
  onItemClicked() {
    if (!this.disabled) {
      this.press.emit(this.value);
    }
  }
  render() {
    return (h(Host, { role: "listitem" }, h("button", { disabled: this.disabled, onClick: () => this.onItemClicked(), class: {
        'gux-action-item': true,
        'gux-disabled': this.disabled
      } }, this.text, h("slot", null))));
  }
  static get is() { return "gux-action-item"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-action-item.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-action-item.css"]
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
          "text": ""
        },
        "attribute": "text",
        "reflect": false
      },
      "value": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "unknown",
          "resolved": "unknown",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
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
  static get events() {
    return [{
        "method": "press",
        "name": "press",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "unknown",
          "resolved": "unknown",
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
        "method": "onKeydown",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keyup",
        "method": "onKeyup",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
