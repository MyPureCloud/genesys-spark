'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const page = "Page";
const totalPages = " of {totalPages, number}";
const first = "First";
const previous = "Previous";
const next = "Next";
const last = "Last";
const pageInputLabel = "Page {currentPage, number} of {totalPages, number}";
const paginationResources$2 = {
	page: page,
	totalPages: totalPages,
	first: first,
	previous: previous,
	next: next,
	last: last,
	pageInputLabel: pageInputLabel
};

class GuxPaginationButtonsService {
  static getPageList(currentPage, totalPages) {
    if (totalPages <= 10) {
      return [...Array(totalPages).keys()].map(index => {
        const pageNumber = index + 1;
        return {
          pageNumber,
          display: String(pageNumber),
          current: pageNumber === currentPage
        };
      });
    }
    if (currentPage <= 5) {
      const startPageList = [...Array(6).keys()].map(index => {
        const pageNumber = index + 1;
        return {
          pageNumber,
          display: String(pageNumber),
          current: pageNumber === currentPage
        };
      });
      return [
        ...startPageList,
        {
          pageNumber: 7,
          display: '...',
          current: false
        },
        {
          pageNumber: totalPages,
          display: String(totalPages),
          current: false
        }
      ];
    }
    if (currentPage > totalPages - 5) {
      const endPageList = [...Array(6).keys()].map(index => {
        const pageNumber = index + totalPages - 5;
        return {
          pageNumber,
          display: String(pageNumber),
          current: pageNumber === currentPage
        };
      });
      return [
        {
          pageNumber: 1,
          display: '1',
          current: false
        },
        {
          pageNumber: totalPages - 6,
          display: '...',
          current: false
        },
        ...endPageList
      ];
    }
    const middlePageList = [...Array(5).keys()].map(index => {
      const pageNumber = index + currentPage - 2;
      return {
        pageNumber,
        display: String(pageNumber),
        current: pageNumber === currentPage
      };
    });
    return [
      {
        pageNumber: 1,
        display: '1',
        current: false
      },
      {
        pageNumber: currentPage - 3,
        display: '...',
        current: false
      },
      ...middlePageList,
      {
        pageNumber: currentPage + 3,
        display: '...',
        current: false
      },
      {
        pageNumber: totalPages,
        display: String(totalPages),
        current: false
      }
    ];
  }
}

const guxPaginationButtonsBetaCss = "gux-pagination-buttons-beta{color:#2e394c}gux-pagination-buttons-beta .gux-pagination-buttons-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-end}gux-pagination-buttons-beta .gux-pagination-buttons-container>div{flex:0 1 auto;align-self:auto;order:0}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-group{white-space:nowrap}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-group gux-button-slot-beta:not(:first-of-type){margin-left:8px}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-input-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;margin:0 16px}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-input-container>div{flex:0 1 auto;align-self:auto;order:0;white-space:nowrap}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-input-container .gux-pagination-buttons-input{width:60px;margin:0 8px}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-input-container .gux-pagination-buttons-input input{width:inherit;text-align:center}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-current,gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-target{height:32px;padding:0 8px;margin:0;background:inherit;border:none}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-current:focus-visible,gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-target:focus-visible{border:3px solid #aac9ff;border-radius:5px;outline:none}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-current{font-weight:600}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-list-container .gux-pagination-buttons-list-target{color:#2a60c8;cursor:pointer}gux-pagination-buttons-beta .gux-pagination-buttons-container .gux-pagination-buttons-spacer{width:8px}";

const GuxPaginationButtonsBeta = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internalcurrentpagechange = index.createEvent(this, "internalcurrentpagechange", 3);
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
        return acc.concat((index.h("button", { class: "gux-pagination-buttons-list-current" }, cv.display)));
      }
      return acc.concat((index.h("button", { class: "gux-pagination-buttons-list-target", onClick: () => this.handleClickPage(cv.pageNumber) }, cv.display)));
    }, []);
  }
  getSmallPagePicker() {
    return (index.h("div", { class: 'gux-pagination-buttons-spacer' }));
  }
  getFullPagePicker() {
    return (index.h("div", { class: "gux-pagination-buttons-list-container" }, this.getPageListEnteries(this.currentPage, this.totalPages)));
  }
  getPagePicker(layout) {
    if (layout === 'simple') {
      return this.getSmallPagePicker();
    }
    return this.getFullPagePicker();
  }
  async componentWillLoad() {
    this.i18n = await index$1.buildI18nForComponent(this.root, paginationResources$2);
  }
  render() {
    return (index.h("div", { class: `gux-pagination-buttons-container gux-${this.layout}` }, index.h("div", { class: "gux-pagination-buttons-group" }, index.h("gux-button-slot-beta", { accent: "secondary" }, index.h("button", { title: this.i18n('first'), disabled: this.onFirstPage, onClick: this.handleClickFirst.bind(this) }, index.h("gux-icon", { decorative: true, "icon-name": "chevron-double-left" }))), index.h("gux-button-slot-beta", { accent: "secondary" }, index.h("button", { title: this.i18n('previous'), disabled: this.onFirstPage, onClick: this.handleClickPrevious.bind(this) }, index.h("gux-icon", { decorative: true, "icon-name": "chevron-small-left" })))), this.getPagePicker(this.layout), index.h("div", { class: "gux-pagination-buttons-group" }, index.h("gux-button-slot-beta", { accent: "secondary" }, index.h("button", { title: this.i18n('next'), disabled: this.onLastPage, onClick: this.handleClickNext.bind(this) }, index.h("gux-icon", { decorative: true, "icon-name": "chevron-small-right" }))), index.h("gux-button-slot-beta", { accent: "secondary" }, index.h("button", { title: this.i18n('last'), disabled: this.onLastPage, onClick: this.handleClickLast.bind(this) }, index.h("gux-icon", { decorative: true, "icon-name": "chevron-double-right" }))))));
  }
  get root() { return index.getElement(this); }
};
GuxPaginationButtonsBeta.style = guxPaginationButtonsBetaCss;

const itemCountDisplay = "{firstItem, number} - {lastItem, number}";
const totalItems = " of {totalItems, number}";
const paginationResources$1 = {
	itemCountDisplay: itemCountDisplay,
	totalItems: totalItems
};

const guxPaginationItemCountsBetaCss = "gux-pagination-item-counts-beta{color:#2e394c}gux-pagination-item-counts-beta .gux-pagination-item-counts-container{margin-right:16px;white-space:nowrap}gux-pagination-item-counts-beta .gux-pagination-item-counts-container .gux-pagination-item-counts-range{font-weight:bold}";

const GuxPaginationItemCountsBeta = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    this.i18n = await index$1.buildI18nForComponent(this.root, paginationResources$1);
  }
  getPaginationItemCountsRange() {
    if (this.totalItems) {
      return (index.h("span", null, this.i18n('totalItems', { totalItems: this.totalItems })));
    }
  }
  render() {
    return (index.h("div", { class: "gux-pagination-item-counts-container" }, index.h("span", { class: "gux-pagination-item-counts-range" }, this.i18n('itemCountDisplay', {
      firstItem: this.firstItem,
      lastItem: this.lastItem
    })), this.getPaginationItemCountsRange()));
  }
  get root() { return index.getElement(this); }
};
GuxPaginationItemCountsBeta.style = guxPaginationItemCountsBetaCss;

const perPage = "per page";
const itemsPerPage = "Items per page";
const rangeSelected = "Items per page dropdown, {range} selected";
const paginationResources = {
	perPage: perPage,
	itemsPerPage: itemsPerPage,
	rangeSelected: rangeSelected
};

const guxPaginationItemsPerPageBetaCss = "gux-pagination-items-per-page-beta{color:#2e394c}gux-pagination-items-per-page-beta .gux-pagination-items-per-page-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}gux-pagination-items-per-page-beta .gux-pagination-items-per-page-container>div{flex:0 1 auto;align-self:auto;order:0;white-space:nowrap}gux-pagination-items-per-page-beta .gux-pagination-items-per-page-container .gux-pagination-items-per-page-picker{margin-right:8px}gux-pagination-items-per-page-beta .gux-pagination-items-per-page-container gux-dropdown div.gux-dropdown .gux-options.gux-opened{bottom:100%;display:flex;flex-direction:column-reverse}";

const GuxPaginationItemsPerPageBeta = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internalitemsperpagechange = index.createEvent(this, "internalitemsperpagechange", 3);
    this.itemsPerPage = 25;
  }
  handleChange(event) {
    event.stopPropagation();
    const newItemsPerPageValue = parseInt(this.dropdownElement.value, 10);
    this.internalitemsperpagechange.emit(newItemsPerPageValue);
  }
  async componentWillLoad() {
    this.i18n = await index$1.buildI18nForComponent(this.root, paginationResources);
  }
  getDropdown() {
    return (index.h("gux-dropdown", { ref: el => (this.dropdownElement = el), value: `${this.itemsPerPage}`, "aria-label": this.i18n('rangeSelected', {
        range: this.itemsPerPage
      }) }, index.h("gux-listbox", { "aria-label": this.i18n('itemsPerPage') }, index.h("gux-option", { value: "25" }, "25"), index.h("gux-option", { value: "50" }, "50"), index.h("gux-option", { value: "75" }, "75"), index.h("gux-option", { value: "100" }, "100"))));
  }
  render() {
    return (index.h("div", { class: "gux-pagination-items-per-page-container" }, index.h("div", { class: "gux-pagination-items-per-page-picker" }, this.getDropdown()), index.h("div", null, this.i18n('perPage'))));
  }
  get root() { return index.getElement(this); }
};
GuxPaginationItemsPerPageBeta.style = guxPaginationItemsPerPageBetaCss;

exports.gux_pagination_buttons_beta = GuxPaginationButtonsBeta;
exports.gux_pagination_item_counts_beta = GuxPaginationItemCountsBeta;
exports.gux_pagination_items_per_page_beta = GuxPaginationItemsPerPageBeta;
