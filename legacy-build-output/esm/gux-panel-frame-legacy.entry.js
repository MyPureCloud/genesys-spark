import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { h as hasSlot } from './has-slot-062ae63a.js';
import { t as trackComponent } from './usage-55de2afe.js';

const guxPanelFrameCss = ".gux-panel-container{box-sizing:border-box;display:flex;flex-direction:column;height:100%;padding:8px 15px;color:#2e394c;background-color:#fdfdfd;border:1px solid #e2e6ee}.gux-panel-container .gux-panel-header,.gux-panel-container .gux-panel-body,.gux-panel-container .gux-panel-footer{box-sizing:border-box;width:100%}.gux-panel-container .gux-panel-header{flex-shrink:0;padding:0 8px;border-bottom:1px solid #e2e6ee}.gux-panel-container .gux-panel-body{flex-grow:1;padding:8px;overflow-y:auto}.gux-panel-container .gux-panel-footer{flex-shrink:0;padding:12px 8px;border-top:1px solid #e2e6ee}";

const GuxPanelFrame = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  renderOptionalSlot(slotName) {
    if (hasSlot(this.root, slotName)) {
      switch (slotName) {
        case 'header':
          return (h("header", { class: "gux-panel-header" }, h("slot", { name: `${slotName}` })));
        case 'body':
          return (h("div", { class: "gux-panel-body" }, h("slot", { name: `${slotName}` })));
        case 'footer':
          return (h("footer", { class: "gux-panel-footer" }, h("slot", { name: `${slotName}` })));
      }
    }
  }
  render() {
    return (h("section", { class: "gux-panel-container" }, this.renderOptionalSlot('header'), this.renderOptionalSlot('body'), this.renderOptionalSlot('footer')));
  }
  get root() { return getElement(this); }
};
GuxPanelFrame.style = guxPanelFrameCss;

export { GuxPanelFrame as gux_panel_frame_legacy };
