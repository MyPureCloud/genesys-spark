'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxErrorMessageBetaCss = ".gux-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;font-size:11px;color:#2e394c}.gux-container gux-icon{flex:0 1 auto;align-self:auto;order:0;width:16px;height:16px;margin:0 4px;color:#ea0b0b}.gux-container .gux-message{flex:0 1 auto;align-self:auto;order:0}";

const GuxErrorMessageBeta = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    return (index.h("div", { class: "gux-container" }, index.h("gux-icon", { "icon-name": "alert-warning-octogon", decorative: true }), index.h("div", { class: "gux-message" }, index.h("slot", null), index.h("slot", { name: "error" }))));
  }
  get root() { return index.getElement(this); }
};
GuxErrorMessageBeta.style = guxErrorMessageBetaCss;

exports.gux_error_message_beta = GuxErrorMessageBeta;
