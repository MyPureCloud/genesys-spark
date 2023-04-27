'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const previous = "Previous";
const next = "Next";
const translationResources = {
	previous: previous,
	next: next
};

const guxPaginationCursorCss = ":host{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:space-between}";

const GuxPaginationCursor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxPaginationCursorchange = index.createEvent(this, "guxPaginationCursorchange", 7);
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
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return [
      index.h("gux-button-slot-beta", { accent: "secondary" }, index.h("button", { type: "button", title: this.i18n('previous'), disabled: !this.hasPrevious, onClick: () => this.onButtonClick('previous') }, index.h("gux-icon", { decorative: true, iconName: "chevron-small-left" }))),
      index.h("gux-button-slot-beta", { accent: "secondary" }, index.h("button", { type: "button", title: this.i18n('next'), disabled: !this.hasNext, onClick: () => this.onButtonClick('next') }, index.h("gux-icon", { decorative: true, iconName: "chevron-small-right" })))
    ];
  }
  get root() { return index.getElement(this); }
};
GuxPaginationCursor.style = guxPaginationCursorCss;

exports.gux_pagination_cursor = GuxPaginationCursor;
