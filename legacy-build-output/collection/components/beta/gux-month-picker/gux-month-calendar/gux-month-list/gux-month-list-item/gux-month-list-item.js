import { h, Host } from '@stencil/core';
import { getClosestElement } from '../../../../../../utils/dom/get-closest-element';
export class GuxMonthListItem {
  constructor() {
    this.value = undefined;
    this.disabled = false;
    this.selected = false;
  }
  onMouseup() {
    this.focusParentList();
  }
  onMouseover() {
    this.focusParentList();
  }
  focusParentList() {
    const parentList = getClosestElement('gux-month-list', this.root);
    if (parentList && parentList.shadowRoot.activeElement === null) {
      this.root.blur();
      parentList.focus();
    }
  }
  render() {
    return (h(Host, { role: "listitem", value: this.value }, h("div", { class: "gux-container" }, h("button", { class: { 'gux-selected': this.selected }, type: "button", tabIndex: -1, disabled: this.disabled }, h("slot", null)))));
  }
  static get is() { return "gux-month-list-item"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-month-list-item.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-month-list-item.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxISOYearMonth",
          "resolved": "`${string}-${string}`",
          "references": {
            "GuxISOYearMonth": {
              "location": "import",
              "path": "../../../../../../utils/date/year-month-values"
            }
          }
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
      },
      "selected": {
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
        "attribute": "selected",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "mouseup",
        "method": "onMouseup",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "mouseover",
        "method": "onMouseover",
        "target": undefined,
        "capture": false,
        "passive": true
      }];
  }
}
