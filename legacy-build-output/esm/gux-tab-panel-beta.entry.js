import { r as registerInstance, c as createEvent, h, H as Host } from './index-816e34d8.js';

const guxTabPanelBetaCss = ":host(:focus){outline:none}:host(:focus-visible){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}";

const GuxTabPanelBeta = class {
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
    return (h(Host, { id: `gux-${this.tabId}-panel`, role: "tabpanel", "aria-labelledby": `gux-${this.tabId}-tab`, tabIndex: 0, hidden: !this.active }, h("slot", null)));
  }
  static get watchers() { return {
    "active": ["watchActivePanel"]
  }; }
};
GuxTabPanelBeta.style = guxTabPanelBetaCss;

export { GuxTabPanelBeta as gux_tab_panel_beta };
