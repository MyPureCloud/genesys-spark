import { r as registerInstance, h, H as Host, g as getElement } from './index-816e34d8.js';
import { l as last, n as next, f as first, p as previous, b as byId, c as byClosestId } from './gux-list.service-d61fe8f6.js';
import { t as trackComponent } from './usage-55de2afe.js';

const guxListCss = ":host{display:flex;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start}";

/**
 * @slot - collection of gux-list-item, gux-list-divider elements
 */
const validFocusableItems = ['gux-list-item'];
const GuxList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        previous(this.root, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        first(this.root, validFocusableItems);
        break;
      case 'ArrowDown':
        event.preventDefault();
        next(this.root, validFocusableItems);
        break;
      case 'End':
        event.preventDefault();
        last(this.root, validFocusableItems);
        break;
    }
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusFirstItem() {
    first(this.root, validFocusableItems);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusItemById(id) {
    byId(this.root, validFocusableItems, id);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusItemByClosestId(id) {
    byClosestId(this.root, validFocusableItems, id);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusLastItem() {
    last(this.root, validFocusableItems);
  }
  renderFocusTarget() {
    return (h("span", { tabindex: "-1" }));
  }
  render() {
    return (h(Host, { role: "list" }, this.renderFocusTarget(), h("slot", null)));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
};
GuxList.style = guxListCss;

export { GuxList as gux_list };
