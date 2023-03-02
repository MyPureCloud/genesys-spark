import { r as registerInstance, h, j as Host } from './index-f583fcde.js';

const guxActionListDividerCss = ":host{position:relative;display:flex;height:1px;padding:0;margin:16px 0;line-height:32px;pointer-events:none;cursor:pointer;background-color:#c8cfda}";

const GuxActionListDivider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { role: "presentation", tabIndex: -1 }));
  }
};
GuxActionListDivider.style = guxActionListDividerCss;

export { GuxActionListDivider as gux_action_list_divider };
