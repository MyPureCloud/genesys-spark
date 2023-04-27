import { r as registerInstance, h } from './index-816e34d8.js';

const guxListDividerCss = ":host{position:relative;display:flex;height:32px;height:1px;padding:0;margin:16px 0;line-height:32px;pointer-events:none;cursor:pointer;background-color:#c8cfda}";

const GuxListDividerLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("span", { role: "presentation", class: "gux-list-item gux-divider", tabindex: -1 }));
  }
};
GuxListDividerLegacy.style = guxListDividerCss;

export { GuxListDividerLegacy as gux_list_divider_legacy };
