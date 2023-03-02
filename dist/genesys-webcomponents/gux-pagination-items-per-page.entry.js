import { r as registerInstance, e as createEvent, h, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import './get-closest-element-1597503c.js';

const perPage = "per page";
const itemsPerPage = "Items per page";
const paginationResources = {
	perPage: perPage,
	itemsPerPage: itemsPerPage
};

const guxPaginationItemsPerPageCss = "gux-pagination-items-per-page{color:#2e394c}gux-pagination-items-per-page .gux-pagination-items-per-page-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}gux-pagination-items-per-page .gux-pagination-items-per-page-container>div{flex:0 1 auto;align-self:auto;order:0;white-space:nowrap}gux-pagination-items-per-page .gux-pagination-items-per-page-container .gux-pagination-items-per-page-picker{margin:0 8px 0 16px}";

const GuxPaginationItemsPerPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internalitemsperpagechange = createEvent(this, "internalitemsperpagechange", 3);
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
    return (h("gux-dropdown", { ref: el => (this.dropdownElement = el), value: `${this.itemsPerPage}` }, h("gux-listbox", { "aria-label": this.i18n('itemsPerPage') }, h("gux-option", { value: "25" }, "25"), h("gux-option", { value: "50" }, "50"), h("gux-option", { value: "75" }, "75"), h("gux-option", { value: "100" }, "100"))));
  }
  render() {
    return (h("div", { class: "gux-pagination-items-per-page-container" }, h("div", { class: "gux-pagination-items-per-page-picker" }, this.getDropdown()), h("div", null, this.i18n('perPage'))));
  }
  get root() { return getElement(this); }
};
GuxPaginationItemsPerPage.style = guxPaginationItemsPerPageCss;

export { GuxPaginationItemsPerPage as gux_pagination_items_per_page };
