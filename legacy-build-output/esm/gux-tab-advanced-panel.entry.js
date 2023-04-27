import { r as registerInstance, c as createEvent, h } from './index-816e34d8.js';

const guxTabAdvancedPanelCss = "gux-tab-advanced-panel div[role='tabpanel']:focus{outline:none}gux-tab-advanced-panel div[role='tabpanel']:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}";

const GuxTabAdvancedPanel = class {
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
    return (h("div", { id: `gux-${this.tabId}-panel`, role: "tabpanel", "aria-labelledby": `gux-${this.tabId}-tab`, tabIndex: 0, hidden: !this.active, "aria-live": "assertive" }, h("slot", null)));
  }
  static get watchers() { return {
    "active": ["watchActivePanel"]
  }; }
};
GuxTabAdvancedPanel.style = guxTabAdvancedPanelCss;

export { GuxTabAdvancedPanel as gux_tab_advanced_panel };
