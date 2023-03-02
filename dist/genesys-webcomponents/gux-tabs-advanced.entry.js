import { r as registerInstance, e as createEvent, h, j as Host, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const guxTabsAdvancedCss = "gux-tabs-advanced{-custom-noop:noop}";

const GuxTabsAdvanced = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxactivetabchange = createEvent(this, "guxactivetabchange", 7);
    this.tabList = undefined;
    this.tabPanels = [];
    this.activeTab = undefined;
  }
  watchActiveTab(newValue) {
    this.guxactivetabchange.emit(newValue);
  }
  onInternalActivateTabPanel(event) {
    event.stopPropagation();
    const tabId = event.detail;
    this.activateTab(tabId, this.tabList, this.tabPanels);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxActivate(tabId) {
    this.activateTab(tabId, this.tabList, this.tabPanels);
  }
  onSlotchange() {
    const [tabListSlot, defaultSlot] = Array.from(this.root.shadowRoot.querySelectorAll('slot'));
    this.tabList =
      tabListSlot.assignedElements()[0];
    this.tabPanels =
      defaultSlot.assignedElements();
    this.activateTab(this.activeTab, this.tabList, this.tabPanels);
  }
  activateTab(tabId, tabList, panels) {
    var _a;
    if (tabId) {
      this.activeTab = tabId;
    }
    else {
      this.activeTab = (_a = tabList === null || tabList === void 0 ? void 0 : tabList.querySelector('gux-tab-advanced')) === null || _a === void 0 ? void 0 : _a.getAttribute('tab-id');
    }
    void tabList.guxSetActive(this.activeTab);
    panels.forEach(panel => void panel.guxSetActive(panel.tabId === this.activeTab));
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h(Host, null, h("div", { class: "gux-tabs" }, h("slot", { name: "tab-list" }), h("div", null, h("slot", { onSlotchange: this.onSlotchange.bind(this) })))));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "activeTab": ["watchActiveTab"]
  }; }
};
GuxTabsAdvanced.style = guxTabsAdvancedCss;

export { GuxTabsAdvanced as gux_tabs_advanced };
