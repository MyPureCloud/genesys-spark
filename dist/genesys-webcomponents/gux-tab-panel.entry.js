import { r as registerInstance, e as createEvent, h } from './index-f583fcde.js';

const guxTabPanelCss = "gux-tab-panel div[role='tabpanel']:focus{outline:none}gux-tab-panel div[role='tabpanel']:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}";

const GuxTabPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxactivepanelchange = createEvent(this, "guxactivepanelchange", 7);
    this.tabId = undefined;
    this.active = false;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSetActive(active) {
    this.active = active;
  }
  watchActivePanel() {
    if (this.active === true) {
      this.guxactivepanelchange.emit(this.tabId);
    }
  }
  render() {
    return (h("div", { id: `gux-${this.tabId}-panel`, role: "tabpanel", "aria-labelledby": `gux-${this.tabId}-tab`, tabIndex: 0, hidden: !this.active }, h("slot", null)));
  }
  static get watchers() { return {
    "active": ["watchActivePanel"]
  }; }
};
GuxTabPanel.style = guxTabPanelCss;

export { GuxTabPanel as gux_tab_panel };
