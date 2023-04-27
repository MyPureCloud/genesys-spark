'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');

const guxListDividerCss = ":host{position:relative;display:flex;width:100%;height:1px;padding:0;margin:16px 0;line-height:32px;pointer-events:none;cursor:pointer;cursor:default;background-color:#c8cfda}";

const GuxListDivider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, { role: "presentation" }));
  }
};
GuxListDivider.style = guxListDividerCss;

exports.gux_list_divider = GuxListDivider;
