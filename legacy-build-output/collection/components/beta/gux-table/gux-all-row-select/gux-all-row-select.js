import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../i18n';
import { randomHTMLId } from '../../../../utils/dom/random-html-id';
import tableResources from '../i18n/en.json';
export class GuxAllRowSelect {
  constructor() {
    this.id = randomHTMLId('gux-all-row-select');
    this.selected = false;
  }
  onCheck(event) {
    event.stopPropagation();
    const input = event.target;
    this.selected = input.checked;
    this.internalallrowselectchange.emit();
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async setIndeterminate(indeterminate = true) {
    this.inputElement.indeterminate = indeterminate;
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, tableResources, 'gux-table');
  }
  render() {
    return (h("gux-form-field-checkbox", null, h("input", { ref: el => (this.inputElement = el), slot: "input", id: this.id, type: "checkbox", checked: this.selected }), h("label", { slot: "label", htmlFor: this.id }, "\u200B", h("span", { class: "gux-label-text" }, this.i18n('selectAllTableRows')))));
  }
  static get is() { return "gux-all-row-select"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-all-row-select.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-all-row-select.css"]
    };
  }
  static get properties() {
    return {
      "selected": {
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
        "attribute": "selected",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "internalallrowselectchange",
        "name": "internalallrowselectchange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "setIndeterminate": {
        "complexType": {
          "signature": "(indeterminate?: boolean) => Promise<void>",
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
  static get listeners() {
    return [{
        "name": "input",
        "method": "onCheck",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
