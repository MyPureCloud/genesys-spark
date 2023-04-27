import { h, readTask } from '@stencil/core';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
const minAdvancedSpacerWidth = 24;
export class GuxPaginationBeta {
  constructor() {
    this.reinstateLayoutBreakpoint = 0;
    this.layout = 'advanced';
    this.currentPage = 1;
    this.totalItems = 0;
    this.itemsPerPage = 25;
    this.totalPages = undefined;
    this.displayedLayout = undefined;
  }
  setPage(page) {
    if (page <= 0) {
      this.setPage(1);
      return;
    }
    const totalPages = this.calculateTotalPages(this.totalItems, this.itemsPerPage);
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
  handleInternalitemsperpagechange(event) {
    this.itemsPerPage = event.detail;
    this.setPage(1);
  }
  handleInternalcurrentpagechange(event) {
    this.setPage(event.detail);
  }
  calculateTotalPages(totalItems, itemsPerPage) {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }
  calculateCurrentPage(totalPages, currentPage) {
    const minCurrentPage = totalPages > 0 ? 1 : 0;
    return Math.max(minCurrentPage, Math.min(currentPage, totalPages));
  }
  checkPaginationContainerWidthForLayout() {
    readTask(() => {
      const container = this.root.shadowRoot.querySelector('.gux-pagination-container');
      const spacer = this.root.shadowRoot.querySelector('.gux-pagination-spacer');
      const containerWidth = container.clientWidth;
      const spacerWidth = spacer.clientWidth;
      if (spacerWidth < minAdvancedSpacerWidth &&
        this.displayedLayout !== 'simple') {
        this.reinstateLayoutBreakpoint = containerWidth;
        this.displayedLayout = 'simple';
      }
      else if (containerWidth > this.reinstateLayoutBreakpoint) {
        this.reinstateLayoutBreakpoint = 0;
        this.displayedLayout = this.layout;
      }
    });
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.layout });
  }
  componentWillRender() {
    this.totalPages = this.calculateTotalPages(this.totalItems, this.itemsPerPage);
    this.currentPage = this.calculateCurrentPage(this.totalPages, this.currentPage);
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.root.shadowRoot.querySelector('.gux-pagination-container'));
    }
  }
  componentDidLoad() {
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => this.checkPaginationContainerWidthForLayout());
    }
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.root.shadowRoot.querySelector('.gux-pagination-container'));
    }
    afterNextRenderTimeout(() => {
      this.checkPaginationContainerWidthForLayout();
    }, 500);
  }
  render() {
    return (h("div", { class: "gux-pagination-container" }, h("div", { class: "gux-pagination-info" }, h("gux-pagination-item-counts-beta", { "total-items": this.totalItems, "current-page": this.currentPage, "items-per-page": this.itemsPerPage }), this.displayedLayout === 'advanced' && (h("gux-pagination-items-per-page-beta", { "items-per-page": this.itemsPerPage, onInternalitemsperpagechange: this.handleInternalitemsperpagechange.bind(this) }))), h("div", { class: "gux-pagination-spacer" }), h("div", { class: "gux-pagination-change" }, h("gux-pagination-buttons-beta", { layout: this.displayedLayout, "current-page": this.currentPage, "total-pages": this.totalPages, onInternalcurrentpagechange: this.handleInternalcurrentpagechange.bind(this) }))));
  }
  static get is() { return "gux-pagination-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-pagination-beta.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-pagination-beta.css"]
    };
  }
  static get properties() {
    return {
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxPaginationLayoutBeta",
          "resolved": "\"advanced\" | \"simple\"",
          "references": {
            "GuxPaginationLayoutBeta": {
              "location": "import",
              "path": "./gux-pagination-beta.types"
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
        "defaultValue": "'advanced'"
      },
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
              "path": "../../stable/gux-pagination/gux-pagination.types"
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
      }
    };
  }
  static get states() {
    return {
      "totalPages": {},
      "displayedLayout": {}
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
              "path": "../../stable/gux-pagination/gux-pagination.types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "root"; }
}
