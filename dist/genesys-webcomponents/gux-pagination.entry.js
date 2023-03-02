import { r as registerInstance, e as createEvent, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const guxPaginationCss = ":host{display:block;border-top:1px solid #e2e6ee}.gux-pagination-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:space-between;height:32px;margin-top:12px}.gux-pagination-container .gux-pagination-info{display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:flex-start;order:0}.gux-pagination-container .gux-pagination-info>*{flex:0 1 auto;align-self:auto;order:0}.gux-pagination-container .gux-pagination-change{flex:1 1 auto;align-self:auto;order:0;margin-left:16px}.gux-pagination-container .gux-pagination-change:first-child{margin-left:0}";

const GuxPagination = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxpaginationchange = createEvent(this, "guxpaginationchange", 7);
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
  get root() { return getElement(this); }
};
GuxPagination.style = guxPaginationCss;

export { GuxPagination as gux_pagination };
