'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxTabsCss = ".gux-tabs.gux-vertical{display:flex;height:100%}";

const GuxTabs = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxactivetabchange = index.createEvent(this, "guxactivetabchange", 7);
    this.activeTab = undefined;
    this.orientation = 'horizontal';
    this.alignment = 'left';
    this.tabList = undefined;
    this.tabPanels = [];
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
    this.tabList = tabListSlot.assignedElements()[0];
    this.tabPanels = defaultSlot.assignedElements();
    this.activateTab(this.activeTab, this.tabList, this.tabPanels);
  }
  activateTab(tabId, tabList, panels) {
    if (tabId) {
      this.activeTab = tabId;
    }
    else {
      this.activeTab = panels[0].tabId;
    }
    void tabList.guxSetActive(this.activeTab);
    panels.forEach(panel => void panel.guxSetActive(panel.tabId === this.activeTab));
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: `gux-tabs gux-${this.alignment} gux-${this.orientation}` }, index.h("slot", { name: "tab-list" }), index.h("div", { class: `gux-${this.alignment} gux-${this.orientation}` }, index.h("slot", { onSlotchange: this.onSlotchange.bind(this) })))));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "activeTab": ["watchActiveTab"]
  }; }
};
GuxTabs.style = guxTabsCss;

exports.gux_tabs = GuxTabs;
