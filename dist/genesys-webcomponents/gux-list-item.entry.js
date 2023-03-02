import { r as registerInstance, h, j as Host, g as getElement } from './index-f583fcde.js';
import { g as getClosestElement } from './get-closest-element-1597503c.js';

const guxListItemCss = ":host{width:100%;outline:none}:host([disabled]){pointer-events:none}:host([disabled='false']){pointer-events:auto}::slotted(gux-icon){width:16px;height:16px;margin-right:8px;vertical-align:middle}button{all:unset;box-sizing:border-box;width:100%;min-height:32px;padding:8px 16px;color:#2e394c;word-wrap:break-word;cursor:pointer;border:none;outline:none}button:focus:not(:disabled){color:#fdfdfd;background:#2a60c8}button:hover:not(:disabled){color:#fdfdfd;background:#2754ac}button:active:not(:disabled){color:#fdfdfd;background:#23478f}button:disabled{color:rgba(46, 57, 76, 0.5);cursor:default}";

const GuxListItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.disabled = false;
  }
  onMouseup() {
    this.focusParentList();
  }
  onMouseover() {
    this.focusParentList();
  }
  focusParentList() {
    const parentList = getClosestElement('gux-list', this.root);
    if (parentList && parentList.shadowRoot.activeElement === null) {
      this.root.blur();
      parentList.focus({
        preventScroll: true
      });
    }
  }
  render() {
    return (h(Host, { role: "listitem" }, h("button", { type: "button", tabIndex: -1, disabled: this.disabled }, h("slot", null))));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
};
GuxListItem.style = guxListItemCss;

export { GuxListItem as gux_list_item };
