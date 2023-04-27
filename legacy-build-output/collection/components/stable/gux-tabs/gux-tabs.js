import { h, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot tab-list - Slot for gux-tab-list
 * @slot - collection of gux-tab-panel elements
 */
export class GuxTabs {
  constructor() {
    this.activeTab = undefined;
    this.orientation = 'horizontal';
    this.alignment = 'left';
    this.tabList = undefined;
    this.tabPanels = [];
  }
  watchActiveTab(newValue) {
    this.activateTab(newValue, this.tabList, this.tabPanels);
    this.guxactivetabchange.emit(newValue);
  }
  onInternalActivateTabPanel(event) {
    event.stopPropagation();
    const tabId = event.detail;
    this.activateTab(tabId, this.tabList, this.tabPanels);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxActivate(tabId) {
    this.activateTab(tabId, this.tabList, this.tabPanels);
  }
  onSlotchange() {
    const [tabListSlot, defaultSlot] = Array.from(this.root.shadowRoot.querySelectorAll('slot'));
    this.tabList = tabListSlot.assignedElements()[0];
    this.tabPanels = defaultSlot.assignedElements();
    this.activateTab(this.activeTab, this.tabList, this.tabPanels);
  }
  activateTab(tabId, tabList, panels) {
    if (tabId) {
      this.activeTab = tabId;
    }
    else {
      this.activeTab = panels[0].tabId;
    }
    void tabList.guxSetActive(this.activeTab);
    panels.forEach(panel => void panel.guxSetActive(panel.tabId === this.activeTab));
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h(Host, null, h("div", { class: `gux-tabs gux-${this.alignment} gux-${this.orientation}` }, h("slot", { name: "tab-list" }), h("div", { class: `gux-${this.alignment} gux-${this.orientation}` }, h("slot", { onSlotchange: this.onSlotchange.bind(this) })))));
  }
  static get is() { return "gux-tabs"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tabs.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tabs.css"]
    };
  }
  static get properties() {
    return {
      "activeTab": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "tabId of the currently selected tab"
        },
        "attribute": "active-tab",
        "reflect": false
      },
      "orientation": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxTabsOrientation",
          "resolved": "\"horizontal\" | \"vertical\"",
          "references": {
            "GuxTabsOrientation": {
              "location": "import",
              "path": "./gux-tabs-types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies horizontal or vertical orientation of tabs"
        },
        "attribute": "orientation",
        "reflect": false,
        "defaultValue": "'horizontal'"
      },
      "alignment": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxTabsAlignment",
          "resolved": "\"center\" | \"fullWidth\" | \"left\"",
          "references": {
            "GuxTabsAlignment": {
              "location": "import",
              "path": "./gux-tabs-types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies left aligned, centered, or full width tabs"
        },
        "attribute": "alignment",
        "reflect": false,
        "defaultValue": "'left'"
      }
    };
  }
  static get states() {
    return {
      "tabList": {},
      "tabPanels": {}
    };
  }
  static get events() {
    return [{
        "method": "guxactivetabchange",
        "name": "guxactivetabchange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggers when the active tab changes."
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
      "guxActivate": {
        "complexType": {
          "signature": "(tabId: string) => Promise<void>",
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
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "activeTab",
        "methodName": "watchActiveTab"
      }];
  }
  static get listeners() {
    return [{
        "name": "internalactivatetabpanel",
        "method": "onInternalActivateTabPanel",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
