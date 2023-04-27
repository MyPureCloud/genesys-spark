'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');

const guxSkipNavigationItemCss = ":host{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}:host(:focus-within){position:inherit;top:inherit;left:inherit;width:inherit;height:inherit;overflow:inherit}::slotted(a){padding:12px;font-size:2rem;background-color:#fdfdfd;box-shadow:0 8px 24px rgba(32, 41, 55, 0.4), 0 0 0 1px #fdfdfd, 0 0 0 4px #aac9ff !important}";

const GuxSkipNavigationItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, { role: "listitem" }, index.h("slot", null)));
  }
  static get delegatesFocus() { return true; }
};
GuxSkipNavigationItem.style = guxSkipNavigationItemCss;

exports.gux_skip_navigation_item = GuxSkipNavigationItem;
