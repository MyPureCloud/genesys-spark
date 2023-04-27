import { h, Host } from '@stencil/core';
/**
 * @slot - collection of menu-option, submenu elements
 */
export class GuxMenu {
  render() {
    return (h(Host, { role: "menu" }, h("slot", null), h("div", { class: "gux-arrow", "data-popper-arrow": true })));
  }
  static get is() { return "gux-menu"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-menu.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-menu.css"]
    };
  }
}
