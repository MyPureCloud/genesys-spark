'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxPaginationCss = ":host{display:block;border-top:1px solid #e2e6ee}.gux-pagination-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:space-between;height:32px;margin-top:12px}.gux-pagination-container .gux-pagination-info{display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:flex-start;order:0}.gux-pagination-container .gux-pagination-info>*{flex:0 1 auto;align-self:auto;order:0}.gux-pagination-container .gux-pagination-change{flex:1 1 auto;align-self:auto;order:0;margin-left:16px}.gux-pagination-container .gux-pagination-change:first-child{margin-left:0}";

const GuxPagination = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxpaginationchange = index.createEvent(this, "guxpaginationchange", 7);
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
      index.h("gux-pagination-item-counts", { "total-items": this.totalItems, "current-page": this.currentPage, "items-per-page": this.itemsPerPage })
    ];
    if (layout === 'full') {
      content.push(index.h("gux-pagination-items-per-page", { "items-per-page": this.itemsPerPage, onInternalitemsperpagechange: this.handleInternalitemsperpagechange.bind(this) }));
    }
    return (index.h("div", { class: "gux-pagination-info" }, content));
  }
  componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.layout });
  }
  componentWillRender() {
    this.totalPages = this.calculateTotalPages();
    this.currentPage = this.calculateCurrentPage();
  }
  render() {
    return (index.h("div", { class: "gux-pagination-container" }, this.getPaginationInfoElement(this.layout), index.h("div", { class: "gux-pagination-change" }, index.h("gux-pagination-buttons", { layout: this.layout, "current-page": this.currentPage, "total-pages": this.totalPages, onInternalcurrentpagechange: this.handleInternalcurrentpagechange.bind(this) }))));
  }
  get root() { return index.getElement(this); }
};
GuxPagination.style = guxPaginationCss;

exports.gux_pagination = GuxPagination;
