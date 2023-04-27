import { h } from '@stencil/core';
export class GuxListDividerLegacy {
  render() {
    return (h("span", { role: "presentation", class: "gux-list-item gux-divider", tabindex: -1 }));
  }
  static get is() { return "gux-list-divider-legacy"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-list-divider.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-list-divider.css"]
    };
  }
}
