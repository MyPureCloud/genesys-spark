import { h, Host } from '@stencil/core';
import { randomHTMLId } from '../../../../../utils/dom/random-html-id';
/**
 * @slot - text
 */
export class GuxOption {
  constructor() {
    this.value = undefined;
    this.active = false;
    this.selected = false;
    this.disabled = false;
    this.filtered = false;
    this.hovered = false;
  }
  onmouseenter() {
    this.hovered = true;
  }
  onMouseleave() {
    this.hovered = false;
  }
  componentWillLoad() {
    this.root.id = this.root.id || randomHTMLId('gux-option');
  }
  getAriaSelected() {
    if (this.disabled) {
      return false;
    }
    return this.selected ? 'true' : 'false';
  }
  render() {
    return (h(Host, { role: "option", class: {
        'gux-active': this.active,
        'gux-disabled': this.disabled,
        'gux-filtered': this.filtered,
        'gux-hovered': this.hovered,
        'gux-selected': this.selected
      }, "aria-selected": this.getAriaSelected(), "aria-disabled": this.disabled.toString() }, h("slot", null)));
  }
  static get is() { return "gux-option"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-option.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-option.css"]
    };
  }
  static get properties() {
    return {
      "value": {
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
        "attribute": "value",
        "reflect": false
      },
      "active": {
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
        "attribute": "active",
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
      "filtered": {
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
        "attribute": "filtered",
        "reflect": false,
        "defaultValue": "false"
      },
      "hovered": {
        "type": "boolean",
        "mutable": true,
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
        "attribute": "hovered",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "mouseenter",
        "method": "onmouseenter",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "mouseleave",
        "method": "onMouseleave",
        "target": undefined,
        "capture": false,
        "passive": true
      }];
  }
}
