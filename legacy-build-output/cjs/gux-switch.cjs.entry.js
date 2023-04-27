'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const simulateNativeEvent = require('./simulate-native-event-fe3e62da.js');
const usage = require('./usage-da9572bf.js');

const guxSwitchCss = "gux-switch{display:flex;align-items:flex-end}";

const GuxSwitch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = undefined;
    this.layout = 'default';
    this.switchItems = [];
  }
  onClick(e) {
    e.stopPropagation();
    const switchItem = e.target.closest('gux-switch-item');
    if (switchItem && this.value !== switchItem.value) {
      this.value = switchItem.value;
      simulateNativeEvent.simulateNativeEvent(this.root, 'input');
      simulateNativeEvent.simulateNativeEvent(this.root, 'change');
    }
  }
  slotChanged() {
    this.switchItems = Array.from(this.root.children);
  }
  componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.layout });
  }
  componentWillRender() {
    this.switchItems.forEach(switchItem => {
      switchItem.selected = switchItem.value === this.value;
    });
  }
  render() {
    return (index.h(index.Host, { role: "group", class: `gux-${this.layout}` }, index.h("slot", { onSlotchange: this.slotChanged.bind(this) })));
  }
  get root() { return index.getElement(this); }
};
GuxSwitch.style = guxSwitchCss;

exports.gux_switch = GuxSwitch;
