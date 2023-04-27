'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const hasSlot = require('./has-slot-2e73d6e7.js');
const usage = require('./usage-da9572bf.js');

const guxPanelFrameCss = ".gux-panel-container{box-sizing:border-box;display:flex;flex-direction:column;height:100%;padding:8px 15px;color:#2e394c;background-color:#fdfdfd;border:1px solid #e2e6ee}.gux-panel-container .gux-panel-header,.gux-panel-container .gux-panel-body,.gux-panel-container .gux-panel-footer{box-sizing:border-box;width:100%}.gux-panel-container .gux-panel-header{flex-shrink:0;padding:0 8px;border-bottom:1px solid #e2e6ee}.gux-panel-container .gux-panel-body{flex-grow:1;padding:8px;overflow-y:auto}.gux-panel-container .gux-panel-footer{flex-shrink:0;padding:12px 8px;border-top:1px solid #e2e6ee}";

const GuxPanelFrame = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  renderOptionalSlot(slotName) {
    if (hasSlot.hasSlot(this.root, slotName)) {
      switch (slotName) {
        case 'header':
          return (index.h("header", { class: "gux-panel-header" }, index.h("slot", { name: `${slotName}` })));
        case 'body':
          return (index.h("div", { class: "gux-panel-body" }, index.h("slot", { name: `${slotName}` })));
        case 'footer':
          return (index.h("footer", { class: "gux-panel-footer" }, index.h("slot", { name: `${slotName}` })));
      }
    }
  }
  render() {
    return (index.h("section", { class: "gux-panel-container" }, this.renderOptionalSlot('header'), this.renderOptionalSlot('body'), this.renderOptionalSlot('footer')));
  }
  get root() { return index.getElement(this); }
};
GuxPanelFrame.style = guxPanelFrameCss;

exports.gux_panel_frame_legacy = GuxPanelFrame;
