import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../i18n';
import paginationResources from './i18n/en.json';
export class GuxPaginationItemsPerPage {
  constructor() {
    this.itemsPerPage = 25;
  }
  handleChange(event) {
    event.stopPropagation();
    const newItemsPerPageValue = parseInt(this.dropdownElement.value, 10);
    this.internalitemsperpagechange.emit(newItemsPerPageValue);
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, paginationResources);
  }
  getDropdown() {
    return (h("gux-dropdown", { ref: el => (this.dropdownElement = el), value: `${this.itemsPerPage}`, "aria-label": this.i18n('rangeSelected', {
        range: this.itemsPerPage
      }) }, h("gux-listbox", { "aria-label": this.i18n('itemsPerPage') }, h("gux-option", { value: "25" }, "25"), h("gux-option", { value: "50" }, "50"), h("gux-option", { value: "75" }, "75"), h("gux-option", { value: "100" }, "100"))));
  }
  render() {
    return (h("div", { class: "gux-pagination-items-per-page-container" }, h("div", { class: "gux-pagination-items-per-page-picker" }, this.getDropdown()), h("div", null, this.i18n('perPage'))));
  }
  static get is() { return "gux-pagination-items-per-page"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-pagination-items-per-page.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-pagination-items-per-page.css"]
    };
  }
  static get properties() {
    return {
      "itemsPerPage": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "GuxItemsPerPage",
          "resolved": "100 | 25 | 50 | 75",
          "references": {
            "GuxItemsPerPage": {
              "location": "import",
              "path": "../gux-pagination.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "items-per-page",
        "reflect": false,
        "defaultValue": "25"
      }
    };
  }
  static get events() {
    return [{
        "method": "internalitemsperpagechange",
        "name": "internalitemsperpagechange",
        "bubbles": false,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "change",
        "method": "handleChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
