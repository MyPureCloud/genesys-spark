import { Host, h } from '@stencil/core';
/**
 * @slot - hyperlink
 */
export class GuxSkipNavigationItem {
  render() {
    return (h(Host, { role: "listitem" }, h("slot", null)));
  }
  static get is() { return "gux-skip-navigation-item"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-skip-navigation-item.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-skip-navigation-item.css"]
    };
  }
}
