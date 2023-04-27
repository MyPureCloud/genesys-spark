'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');

const guxMenuCss = "gux-menu{flex-direction:column;width:fit-content;padding:8px 0;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-menu .gux-arrow,gux-menu .gux-arrow::before{position:absolute;top:-3px;width:10px;height:10px;background:inherit}gux-menu .gux-arrow::before{visibility:visible;content:'';border-top:1px solid #b4bccb;border-left:1px solid #b4bccb;transform:rotate(45deg)}";

const GuxMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, { role: "menu" }, index.h("slot", null), index.h("div", { class: "gux-arrow", "data-popper-arrow": true })));
  }
};
GuxMenu.style = guxMenuCss;

exports.gux_menu = GuxMenu;
