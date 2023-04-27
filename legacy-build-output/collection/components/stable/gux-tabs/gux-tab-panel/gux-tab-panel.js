import { h } from '@stencil/core';
/**
 * @slot - content
 */
export class GuxTabPanel {
  constructor() {
    this.tabId = undefined;
    this.active = false;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSetActive(active) {
    this.active = active;
  }
  watchActivePanel() {
    if (this.active === true) {
      this.guxactivepanelchange.emit(this.tabId);
    }
  }
  render() {
    return (h("div", { id: `gux-${this.tabId}-panel`, role: "tabpanel", "aria-labelledby": `gux-${this.tabId}-tab`, tabIndex: 0, hidden: !this.active }, h("slot", null)));
  }
  static get is() { return "gux-tab-panel"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tab-panel.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tab-panel.css"]
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
          "text": "Tab id of the tab that is associated with the panel"
        },
        "attribute": "tab-id",
        "reflect": false
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
        "method": "guxactivepanelchange",
        "name": "guxactivepanelchange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggers when the active panel changes"
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
      }
    };
  }
  static get watchers() {
    return [{
        "propName": "active",
        "methodName": "watchActivePanel"
      }];
  }
}
