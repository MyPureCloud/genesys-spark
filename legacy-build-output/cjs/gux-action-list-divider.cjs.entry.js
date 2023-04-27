'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');

const guxActionListDividerCss = ":host{position:relative;display:flex;height:1px;padding:0;margin:16px 0;line-height:32px;pointer-events:none;cursor:pointer;background-color:#c8cfda}";

const GuxActionListDivider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, { role: "presentation", tabIndex: -1 }));
  }
};
GuxActionListDivider.style = guxActionListDividerCss;

exports.gux_action_list_divider = GuxActionListDivider;
