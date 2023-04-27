import { h } from '@stencil/core';
/**
 * @slot - text
 */
export class GuxTab {
  constructor() {
    this.tabId = undefined;
    this.guxDisabled = false;
    this.active = false;
  }
  onClick() {
    if (!this.active && !this.guxDisabled) {
      this.internalactivatetabpanel.emit(this.tabId);
    }
  }
  onFocusin() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    void this.tooltipTitleElement.setShowTooltip();
  }
  onFocusout() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    void this.tooltipTitleElement.setHideTooltip();
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSetActive(active) {
    this.active = active;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus() {
    this.buttonElement.focus();
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxGetActive() {
    return this.active;
  }
  render() {
    return (h("button", { class: {
        'gux-disabled': this.guxDisabled,
        'gux-tab': true,
        'gux-active': this.active
      }, type: "button", "aria-disabled": this.guxDisabled.toString(), id: `gux-${this.tabId}-tab`, role: "tab", "aria-controls": `gux-${this.tabId}-panel`, "aria-selected": this.active.toString(), tabIndex: this.active ? 0 : -1, ref: el => (this.buttonElement = el) }, h("gux-tooltip-title", { ref: el => (this.tooltipTitleElement = el) }, h("span", null, h("slot", null)))));
  }
  static get is() { return "gux-tab"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tab.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tab.css"]
    };
  }
  static get properties() {
    return {
      "tabId": {
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
          "text": "Tab id for the tab"
        },
        "attribute": "tab-id",
        "reflect": false
      },
      "guxDisabled": {
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
          "text": "Specifies if tab is disabled"
        },
        "attribute": "gux-disabled",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "active": {}
    };
  }
  static get events() {
    return [{
        "method": "internalactivatetabpanel",
        "name": "internalactivatetabpanel",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "guxSetActive": {
        "complexType": {
          "signature": "(active: boolean) => Promise<void>",
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
          "text": "",
          "tags": []
        }
      },
      "guxGetActive": {
        "complexType": {
          "signature": "() => Promise<boolean>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<boolean>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get listeners() {
    return [{
        "name": "click",
        "method": "onClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusin",
        "method": "onFocusin",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusout",
        "method": "onFocusout",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
