import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../i18n';
import paginationResources from './i18n/en.json';
export class GuxPaginationItemCounts {
  constructor() {
    this.totalItems = 0;
    this.currentPage = 0;
    this.itemsPerPage = 25;
  }
  get firstItem() {
    if (this.totalItems < 1) {
      return 0;
    }
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }
  get lastItem() {
    if (this.totalItems < 1) {
      return 0;
    }
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, paginationResources);
  }
  render() {
    return (h("div", { class: "gux-pagination-item-counts-container" }, h("span", { class: "gux-pagination-item-counts-range" }, this.i18n('itemCountDisplay', {
      firstItem: this.firstItem,
      lastItem: this.lastItem
    })), h("span", null, this.i18n('totalItems', { totalItems: this.totalItems }))));
  }
  static get is() { return "gux-pagination-item-counts"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-pagination-item-counts.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-pagination-item-counts.css"]
    };
  }
  static get properties() {
    return {
      "totalItems": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "total-items",
        "reflect": false,
        "defaultValue": "0"
      },
      "currentPage": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "current-page",
        "reflect": false,
        "defaultValue": "0"
      },
      "itemsPerPage": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
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
  static get elementRef() { return "root"; }
}
