'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxTabsAdvancedCss = "gux-tabs-advanced{-custom-noop:noop}";

const GuxTabsAdvanced = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxactivetabchange = index.createEvent(this, "guxactivetabchange", 7);
    this.tabList = undefined;
    this.tabPanels = [];
    this.activeTab = undefined;
  }
  watchActiveTab(newValue) {
    this.activateTab(newValue, this.tabList, this.tabPanels);
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
    usage.trackComponent(this.root);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "gux-tabs" }, index.h("slot", { name: "tab-list" }), index.h("div", null, index.h("slot", { onSlotchange: this.onSlotchange.bind(this) })))));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "activeTab": ["watchActiveTab"]
  }; }
};
GuxTabsAdvanced.style = guxTabsAdvancedCss;

exports.gux_tabs_advanced = GuxTabsAdvanced;
