import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../i18n';
import paginationResources from './i18n/en.json';
import { GuxPaginationButtonsService } from './gux-pagination-button-beta.service';
export class GuxPaginationButtonsBeta {
  constructor() {
    this.currentPage = undefined;
    this.totalPages = undefined;
    this.layout = 'advanced';
  }
  get onFirstPage() {
    return this.currentPage <= 1;
  }
  get onLastPage() {
    return this.currentPage >= this.totalPages;
  }
  handleClickFirst() {
    this.internalcurrentpagechange.emit(1);
  }
  handleClickPrevious() {
    this.internalcurrentpagechange.emit(this.currentPage - 1);
  }
  handleClickNext() {
    this.internalcurrentpagechange.emit(this.currentPage + 1);
  }
  handleClickLast() {
    this.internalcurrentpagechange.emit(this.totalPages);
  }
  handleClickPage(pageNumber) {
    this.internalcurrentpagechange.emit(pageNumber);
  }
  getPageListEnteries(currentPage, totalPages) {
    return GuxPaginationButtonsService.getPageList(currentPage, totalPages).reduce((acc, cv) => {
      if (cv.current) {
        return acc.concat((h("button", { class: "gux-pagination-buttons-list-current" }, cv.display)));
      }
      return acc.concat((h("button", { class: "gux-pagination-buttons-list-target", onClick: () => this.handleClickPage(cv.pageNumber) }, cv.display)));
    }, []);
  }
  getSmallPagePicker() {
    return (h("div", { class: 'gux-pagination-buttons-spacer' }));
  }
  getFullPagePicker() {
    return (h("div", { class: "gux-pagination-buttons-list-container" }, this.getPageListEnteries(this.currentPage, this.totalPages)));
  }
  getPagePicker(layout) {
    if (layout === 'simple') {
      return this.getSmallPagePicker();
    }
    return this.getFullPagePicker();
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, paginationResources);
  }
  render() {
    return (h("div", { class: `gux-pagination-buttons-container gux-${this.layout}` }, h("div", { class: "gux-pagination-buttons-group" }, h("gux-button-slot-beta", { accent: "secondary" }, h("button", { title: this.i18n('first'), disabled: this.onFirstPage, onClick: this.handleClickFirst.bind(this) }, h("gux-icon", { decorative: true, "icon-name": "chevron-double-left" }))), h("gux-button-slot-beta", { accent: "secondary" }, h("button", { title: this.i18n('previous'), disabled: this.onFirstPage, onClick: this.handleClickPrevious.bind(this) }, h("gux-icon", { decorative: true, "icon-name": "chevron-small-left" })))), this.getPagePicker(this.layout), h("div", { class: "gux-pagination-buttons-group" }, h("gux-button-slot-beta", { accent: "secondary" }, h("button", { title: this.i18n('next'), disabled: this.onLastPage, onClick: this.handleClickNext.bind(this) }, h("gux-icon", { decorative: true, "icon-name": "chevron-small-right" }))), h("gux-button-slot-beta", { accent: "secondary" }, h("button", { title: this.i18n('last'), disabled: this.onLastPage, onClick: this.handleClickLast.bind(this) }, h("gux-icon", { decorative: true, "icon-name": "chevron-double-right" }))))));
  }
  static get is() { return "gux-pagination-buttons-beta"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-pagination-buttons-beta.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-pagination-buttons-beta.css"]
    };
  }
  static get properties() {
    return {
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
        "reflect": false
      },
      "totalPages": {
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
        "attribute": "total-pages",
        "reflect": false
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxPaginationLayoutBeta",
          "resolved": "\"advanced\" | \"simple\"",
          "references": {
            "GuxPaginationLayoutBeta": {
              "location": "import",
              "path": "../gux-pagination-beta.types"
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
        "defaultValue": "'advanced'"
      }
    };
  }
  static get events() {
    return [{
        "method": "internalcurrentpagechange",
        "name": "internalcurrentpagechange",
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
}
