import { h, Host } from '@stencil/core';
export class GuxListDivider {
  render() {
    return (h(Host, { role: "presentation" }));
  }
  static get is() { return "gux-list-divider"; }
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
