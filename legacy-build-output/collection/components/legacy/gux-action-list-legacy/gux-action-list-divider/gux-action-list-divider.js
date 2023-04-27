import { h, Host } from '@stencil/core';
export class GuxActionListDivider {
  render() {
    return (h(Host, { role: "presentation", tabIndex: -1 }));
  }
  static get is() { return "gux-action-list-divider"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-action-list-divider.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-action-list-divider.css"]
    };
  }
}
