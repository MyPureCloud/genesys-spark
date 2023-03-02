import { r as registerInstance, h, j as Host, g as getElement } from './index-f583fcde.js';
import { l as last, f as first, n as next, p as previous, a as focusMove } from './gux-list.service-d61fe8f6.js';

const guxMonthListCss = ":host{display:flex;flex-direction:row;flex-wrap:wrap;padding:12px 16px;background-color:#fdfdfd;border:1px solid #b4bccb}";

const validFocusableItems = ['gux-month-list-item'];
const GuxMonthList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        focusMove(this.root, validFocusableItems, -3);
        break;
      case 'ArrowDown':
        event.preventDefault();
        focusMove(this.root, validFocusableItems, 3);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        previous(this.root, validFocusableItems);
        break;
      case 'ArrowRight':
        event.preventDefault();
        next(this.root, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        first(this.root, validFocusableItems);
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
  renderFocusTarget() {
    return (h("span", { tabindex: "1" }));
  }
  render() {
    return (h(Host, { role: "list" }, this.renderFocusTarget(), h("slot", null)));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
};
GuxMonthList.style = guxMonthListCss;

export { GuxMonthList as gux_month_list };
