import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../i18n';
import { randomHTMLId } from '../../../../utils/dom/random-html-id';
import tableResources from '../i18n/en.json';
export class GuxRowSelect {
  constructor() {
    this.id = randomHTMLId('gux-row-select');
    this.selected = false;
    this.disabled = undefined;
  }
  onCheck(event) {
    event.stopPropagation();
    const input = event.target;
    this.selected = input.checked;
    this.internalrowselectchange.emit();
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, tableResources, 'gux-table');
  }
  render() {
    return (h("gux-form-field-checkbox", null, h("input", { slot: "input", id: this.id, type: "checkbox", checked: this.selected, disabled: this.disabled }), h("label", { slot: "label", htmlFor: this.id }, "\u200B", h("span", { class: "gux-label-text" }, this.i18n('selectTableRow')))));
  }
  static get is() { return "gux-row-select"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-row-select.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-row-select.css"]
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
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "internalrowselectchange",
        "name": "internalrowselectchange",
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
