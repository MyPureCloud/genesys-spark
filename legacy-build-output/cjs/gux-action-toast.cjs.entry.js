'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxActionToastCss = ":host{display:flex;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:stretch;justify-content:flex-start;width:270px;padding:20px 24px;margin-bottom:4px;color:#2e394c;background:#f6f7f9;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-header{display:flex;flex:0 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:flex-start;order:0;font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:18px;line-height:24px}.gux-header .gux-icon{flex:0 1 auto;align-self:auto;order:0;color:#1da8b3}.gux-header .gux-icon ::slotted(gux-icon){width:32px !important;height:32px !important}.gux-header .gux-title{flex:1 1 auto;align-self:auto;order:0;margin:0 0 0 8px}.gux-message{flex:0 1 auto;align-self:auto;order:0;margin:16px 0;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-message ::slotted(dl){display:flex;flex-direction:row;flex-wrap:wrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;margin:0}.gux-action-buttons{display:flex;flex:0 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;align-self:auto;justify-content:space-between;order:0}.gux-action-buttons .gux-negative-button{flex:0 1 auto;align-self:auto;order:0}.gux-action-buttons .gux-positive-button{flex:0 1 auto;align-self:auto;order:0}.gux-action-buttons{display:flex;flex:0 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;align-self:auto;justify-content:space-between;order:0}.gux-action-buttons .gux-negative-button{flex:0 1 auto;align-self:auto;order:0}.gux-action-buttons .gux-positive-button{flex:0 1 auto;align-self:auto;order:0}";

const GuxActionToast = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "gux-header" }, index.h("div", { class: "gux-icon" }, index.h("slot", { name: "icon" })), index.h("div", { class: "gux-title" }, index.h("slot", { name: "title" }))), index.h("div", { class: "gux-message" }, index.h("slot", { name: "message" })), index.h("div", { class: "gux-action-buttons" }, index.h("div", { class: "gux-positive-button" }, index.h("slot", { name: "positive-button" })), index.h("div", { class: "gux-negative-button" }, index.h("slot", { name: "negative-button" })))));
  }
  get root() { return index.getElement(this); }
};
GuxActionToast.style = guxActionToastCss;

exports.gux_action_toast = GuxActionToast;
