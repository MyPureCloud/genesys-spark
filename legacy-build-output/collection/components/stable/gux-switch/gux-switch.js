import { h, Host } from '@stencil/core';
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot - list of gux-switch-item elements
 */
export class GuxSwitch {
  constructor() {
    this.value = undefined;
    this.layout = 'default';
    this.switchItems = [];
  }
  onClick(e) {
    e.stopPropagation();
    const switchItem = e.target.closest('gux-switch-item');
    if (switchItem && this.value !== switchItem.value) {
      this.value = switchItem.value;
      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }
  slotChanged() {
    this.switchItems = Array.from(this.root.children);
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.layout });
  }
  componentWillRender() {
    this.switchItems.forEach(switchItem => {
      switchItem.selected = switchItem.value === this.value;
    });
  }
  render() {
    return (h(Host, { role: "group", class: `gux-${this.layout}` }, h("slot", { onSlotchange: this.slotChanged.bind(this) })));
  }
  static get is() { return "gux-switch"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-switch.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-switch.css"]
    };
  }
  static get properties() {
    return {
      "value": {
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
          "text": ""
        },
        "attribute": "value",
        "reflect": false
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxSwitchAllowedLayouts",
          "resolved": "\"default\" | \"small\"",
          "references": {
            "GuxSwitchAllowedLayouts": {
              "location": "import",
              "path": "./gux-switch.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "layout",
        "reflect": false,
        "defaultValue": "'default'"
      }
    };
  }
  static get states() {
    return {
      "switchItems": {}
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "click",
        "method": "onClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
