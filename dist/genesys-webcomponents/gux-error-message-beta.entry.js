import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const guxErrorMessageBetaCss = ".gux-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;font-size:11px;color:#2e394c}.gux-container gux-icon{flex:0 1 auto;align-self:auto;order:0;width:16px;height:16px;margin:0 4px;color:#ea0b0b}.gux-container .gux-message{flex:0 1 auto;align-self:auto;order:0}";

const GuxErrorMessageBeta = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("div", { class: "gux-container" }, h("gux-icon", { "icon-name": "alert-warning-octogon", decorative: true }), h("div", { class: "gux-message" }, h("slot", null), h("slot", { name: "error" }))));
  }
  get root() { return getElement(this); }
};
GuxErrorMessageBeta.style = guxErrorMessageBetaCss;

export { GuxErrorMessageBeta as gux_error_message_beta };
