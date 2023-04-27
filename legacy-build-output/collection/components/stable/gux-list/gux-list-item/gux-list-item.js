import { h, Host } from '@stencil/core';
import { getClosestElement } from '../../../../utils/dom/get-closest-element';
/**
 * @slot - text
 */
export class GuxListItem {
  constructor() {
    this.disabled = false;
  }
  onMouseup() {
    this.focusParentList();
  }
  onMouseover() {
    this.focusParentList();
  }
  focusParentList() {
    const parentList = getClosestElement('gux-list', this.root);
    if (parentList && parentList.shadowRoot.activeElement === null) {
      this.root.blur();
      parentList.focus({
        preventScroll: true
      });
    }
  }
  render() {
    return (h(Host, { role: "listitem" }, h("button", { type: "button", tabIndex: -1, disabled: this.disabled }, h("slot", null))));
  }
  static get is() { return "gux-list-item"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
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
