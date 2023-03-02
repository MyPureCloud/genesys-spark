import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import './get-closest-element-1597503c.js';

const itemCountDisplay = "{firstItem, number} - {lastItem, number}";
const totalItems = " of {totalItems, number}";
const paginationResources = {
	itemCountDisplay: itemCountDisplay,
	totalItems: totalItems
};

const guxPaginationItemCountsBetaCss = "gux-pagination-item-counts-beta{color:#2e394c}gux-pagination-item-counts-beta .gux-pagination-item-counts-container{margin-right:16px;white-space:nowrap}gux-pagination-item-counts-beta .gux-pagination-item-counts-container .gux-pagination-item-counts-range{font-weight:bold}";

const GuxPaginationItemCountsBeta = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  getPaginationItemCountsRange() {
    if (this.totalItems) {
      return (h("span", null, this.i18n('totalItems', { totalItems: this.totalItems })));
    }
  }
  render() {
    return (h("div", { class: "gux-pagination-item-counts-container" }, h("span", { class: "gux-pagination-item-counts-range" }, this.i18n('itemCountDisplay', {
      firstItem: this.firstItem,
      lastItem: this.lastItem
    })), this.getPaginationItemCountsRange()));
  }
  get root() { return getElement(this); }
};
GuxPaginationItemCountsBeta.style = guxPaginationItemCountsBetaCss;

export { GuxPaginationItemCountsBeta as gux_pagination_item_counts_beta };
