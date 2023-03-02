import { r as registerInstance, e as createEvent, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import './get-closest-element-1597503c.js';

const previous = "Previous";
const next = "Next";
const translationResources = {
	previous: previous,
	next: next
};

const guxPaginationCursorCss = ":host{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:space-between}";

const GuxPaginationCursor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxPaginationCursorchange = createEvent(this, "guxPaginationCursorchange", 7);
    this.hasPrevious = false;
    this.hasNext = false;
  }
  onButtonClick(paginationDetail) {
    if ((paginationDetail === 'previous' && this.hasPrevious) ||
      (paginationDetail === 'next' && this.hasNext)) {
      this.guxPaginationCursorchange.emit(paginationDetail);
    }
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return [
      h("gux-button-slot-beta", { accent: "secondary" }, h("button", { type: "button", title: this.i18n('previous'), disabled: !this.hasPrevious, onClick: () => this.onButtonClick('previous') }, h("gux-icon", { decorative: true, iconName: "chevron-small-left" }))),
      h("gux-button-slot-beta", { accent: "secondary" }, h("button", { type: "button", title: this.i18n('next'), disabled: !this.hasNext, onClick: () => this.onButtonClick('next') }, h("gux-icon", { decorative: true, iconName: "chevron-small-right" })))
    ];
  }
  get root() { return getElement(this); }
};
GuxPaginationCursor.style = guxPaginationCursorCss;

export { GuxPaginationCursor as gux_pagination_cursor };
