'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const guxList_service = require('./gux-list.service-abbcfc17.js');
const usage = require('./usage-da9572bf.js');

const guxListCss = ":host{display:flex;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start}";

/**
 * @slot - collection of gux-list-item, gux-list-divider elements
 */
const validFocusableItems = ['gux-list-item'];
const GuxList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        guxList_service.previous(this.root, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        guxList_service.first(this.root, validFocusableItems);
        break;
      case 'ArrowDown':
        event.preventDefault();
        guxList_service.next(this.root, validFocusableItems);
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
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusItemById(id) {
    guxList_service.byId(this.root, validFocusableItems, id);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusItemByClosestId(id) {
    guxList_service.byClosestId(this.root, validFocusableItems, id);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusLastItem() {
    guxList_service.last(this.root, validFocusableItems);
  }
  renderFocusTarget() {
    return (index.h("span", { tabindex: "-1" }));
  }
  render() {
    return (index.h(index.Host, { role: "list" }, this.renderFocusTarget(), index.h("slot", null)));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
};
GuxList.style = guxListCss;

exports.gux_list = GuxList;
