'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const getClosestElement = require('./get-closest-element-ab4b2eee.js');

const guxListItemCss = ":host{width:100%;outline:none}:host([disabled]){pointer-events:none}:host([disabled='false']){pointer-events:auto}::slotted(gux-icon){width:16px;height:16px;margin-right:8px;vertical-align:middle}button{all:unset;box-sizing:border-box;width:100%;min-height:32px;padding:8px 16px;color:#2e394c;word-wrap:break-word;cursor:pointer;border:none;outline:none}button:focus-visible:not(:disabled){color:#fdfdfd;background:#2a60c8}button:hover:not(:disabled){color:#fdfdfd;background:#2754ac}button:active:not(:disabled){color:#fdfdfd;background:#23478f}button:disabled{color:rgba(46, 57, 76, 0.5);cursor:default}";

const GuxListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.disabled = false;
  }
  onMouseup() {
    this.focusParentList();
  }
  onMouseover() {
    this.focusParentList();
  }
  focusParentList() {
    const parentList = getClosestElement.getClosestElement('gux-list', this.root);
    if (parentList && parentList.shadowRoot.activeElement === null) {
      this.root.blur();
      parentList.focus({
        preventScroll: true
      });
    }
  }
  render() {
    return (index.h(index.Host, { role: "listitem" }, index.h("button", { type: "button", tabIndex: -1, disabled: this.disabled }, index.h("slot", null))));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
};
GuxListItem.style = guxListItemCss;

exports.gux_list_item = GuxListItem;
