import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
export class GuxPagination {
  constructor() {
    this.currentPage = 1;
    this.totalItems = 0;
    this.itemsPerPage = 25;
    this.layout = 'full';
    this.totalPages = undefined;
  }
  setPage(page) {
    if (page <= 0) {
      this.setPage(1);
      return;
    }
    const totalPages = this.calculateTotalPages();
    if (page > totalPages) {
      this.setPage(totalPages);
      return;
    }
    this.currentPage = page;
    this.guxpaginationchange.emit({
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }
  calculateTotalPages() {
    return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
  }
  calculateCurrentPage() {
    const minCurrentPage = this.totalPages > 0 ? 1 : 0;
    return Math.max(minCurrentPage, Math.min(this.currentPage, this.totalPages));
  }
  handleInternalitemsperpagechange(event) {
    this.itemsPerPage = event.detail;
    this.setPage(1);
  }
  handleInternalcurrentpagechange(event) {
    this.setPage(event.detail);
  }
  getPaginationInfoElement(layout) {
    if (layout === 'expanded') {
      return null;
    }
    const content = [
      h("gux-pagination-item-counts", { "total-items": this.totalItems, "current-page": this.currentPage, "items-per-page": this.itemsPerPage })
    ];
    if (layout === 'full') {
      content.push(h("gux-pagination-items-per-page", { "items-per-page": this.itemsPerPage, onInternalitemsperpagechange: this.handleInternalitemsperpagechange.bind(this) }));
    }
    return (h("div", { class: "gux-pagination-info" }, content));
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.layout });
  }
  componentWillRender() {
    this.totalPages = this.calculateTotalPages();
    this.currentPage = this.calculateCurrentPage();
  }
  render() {
    return (h("div", { class: "gux-pagination-container" }, this.getPaginationInfoElement(this.layout), h("div", { class: "gux-pagination-change" }, h("gux-pagination-buttons", { layout: this.layout, "current-page": this.currentPage, "total-pages": this.totalPages, onInternalcurrentpagechange: this.handleInternalcurrentpagechange.bind(this) }))));
  }
  static get is() { return "gux-pagination"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-pagination.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-pagination.css"]
    };
  }
  static get properties() {
    return {
      "currentPage": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The currently select page. Changes are watched by the component."
        },
        "attribute": "current-page",
        "reflect": false,
        "defaultValue": "1"
      },
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
          "text": "The total number of items in the data set. Used to calculate total page count"
        },
        "attribute": "total-items",
        "reflect": false,
        "defaultValue": "0"
      },
      "itemsPerPage": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "GuxItemsPerPage",
          "resolved": "100 | 25 | 50 | 75",
          "references": {
            "GuxItemsPerPage": {
              "location": "import",
              "path": "./gux-pagination.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The max number of items on a page. Used to calculate total page count"
        },
        "attribute": "items-per-page",
        "reflect": false,
        "defaultValue": "25"
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxPaginationLayout",
          "resolved": "\"expanded\" | \"full\" | \"small\"",
          "references": {
            "GuxPaginationLayout": {
              "location": "import",
              "path": "./gux-pagination.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The pagination component can have different layouts to suit the available space"
        },
        "attribute": "layout",
        "reflect": false,
        "defaultValue": "'full'"
      }
    };
  }
  static get states() {
    return {
      "totalPages": {}
    };
  }
  static get events() {
    return [{
        "method": "guxpaginationchange",
        "name": "guxpaginationchange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "GuxPaginationState",
          "resolved": "{ currentPage: number; itemsPerPage: number; }",
          "references": {
            "GuxPaginationState": {
              "location": "import",
              "path": "./gux-pagination.types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "root"; }
}
