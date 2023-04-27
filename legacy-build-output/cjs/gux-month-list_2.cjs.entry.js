'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const guxList_service = require('./gux-list.service-abbcfc17.js');
const getClosestElement = require('./get-closest-element-ab4b2eee.js');

const guxMonthListCss = ":host{display:flex;flex-direction:row;flex-wrap:wrap;padding:12px 16px;background-color:#fdfdfd;border:1px solid #b4bccb}";

const validFocusableItems = ['gux-month-list-item'];
const GuxMonthList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        guxList_service.focusMove(this.root, validFocusableItems, -3);
        break;
      case 'ArrowDown':
        event.preventDefault();
        guxList_service.focusMove(this.root, validFocusableItems, 3);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        guxList_service.previous(this.root, validFocusableItems);
        break;
      case 'ArrowRight':
        event.preventDefault();
        guxList_service.next(this.root, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        guxList_service.first(this.root, validFocusableItems);
        break;
      case 'End':
        event.preventDefault();
        guxList_service.last(this.root, validFocusableItems);
        break;
    }
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusFirstItem() {
    guxList_service.first(this.root, validFocusableItems);
  }
  renderFocusTarget() {
    return (index.h("span", { tabindex: "1" }));
  }
  render() {
    return (index.h(index.Host, { role: "list" }, this.renderFocusTarget(), index.h("slot", null)));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
};
GuxMonthList.style = guxMonthListCss;

const guxMonthListItemCss = ":host{flex:0 0 33.3%}:host([disabled]){pointer-events:none}:host([disabled='false']){pointer-events:auto}::slotted(gux-icon){width:16px;height:16px;margin-right:8px;vertical-align:middle}.gux-container{padding:4px}.gux-container button{all:unset;box-sizing:border-box;width:100%;height:49px;padding:8px 0;color:#2e394c;text-align:center;word-wrap:break-word;cursor:pointer;border:none;border-radius:4px;outline:none}.gux-container button.gux-selected{color:#fdfdfd;background:#2a60c8}.gux-container button:focus-visible:not(:disabled){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-container button:hover:not(:disabled){color:#fdfdfd;background:#2a60c8}.gux-container button:active:not(:disabled){color:#fdfdfd;background:#2a60c8}.gux-container button:disabled{color:rgba(46, 57, 76, 0.5);cursor:default}";

const GuxMonthListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = undefined;
    this.disabled = false;
    this.selected = false;
  }
  onMouseup() {
    this.focusParentList();
  }
  onMouseover() {
    this.focusParentList();
  }
  focusParentList() {
    const parentList = getClosestElement.getClosestElement('gux-month-list', this.root);
    if (parentList && parentList.shadowRoot.activeElement === null) {
      this.root.blur();
      parentList.focus();
    }
  }
  render() {
    return (index.h(index.Host, { role: "listitem", value: this.value }, index.h("div", { class: "gux-container" }, index.h("button", { class: { 'gux-selected': this.selected }, type: "button", tabIndex: -1, disabled: this.disabled }, index.h("slot", null)))));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
};
GuxMonthListItem.style = guxMonthListItemCss;

exports.gux_month_list = GuxMonthList;
exports.gux_month_list_item = GuxMonthListItem;
