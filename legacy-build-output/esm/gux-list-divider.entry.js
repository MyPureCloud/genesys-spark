import { r as registerInstance, h, H as Host } from './index-816e34d8.js';

const guxListDividerCss = ":host{position:relative;display:flex;width:100%;height:1px;padding:0;margin:16px 0;line-height:32px;pointer-events:none;cursor:pointer;cursor:default;background-color:#c8cfda}";

const GuxListDivider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { role: "presentation" }));
  }
};
GuxListDivider.style = guxListDividerCss;

export { GuxListDivider as gux_list_divider };
