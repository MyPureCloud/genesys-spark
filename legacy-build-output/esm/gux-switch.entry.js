import { r as registerInstance, h, H as Host, g as getElement } from './index-816e34d8.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { t as trackComponent } from './usage-55de2afe.js';

const guxSwitchCss = "gux-switch{display:flex;align-items:flex-end}";

const GuxSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
    this.layout = 'default';
    this.switchItems = [];
  }
  onClick(e) {
    e.stopPropagation();
    const switchItem = e.target.closest('gux-switch-item');
    if (switchItem && this.value !== switchItem.value) {
      this.value = switchItem.value;
      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }
  slotChanged() {
    this.switchItems = Array.from(this.root.children);
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.layout });
  }
  componentWillRender() {
    this.switchItems.forEach(switchItem => {
      switchItem.selected = switchItem.value === this.value;
    });
  }
  render() {
    return (h(Host, { role: "group", class: `gux-${this.layout}` }, h("slot", { onSlotchange: this.slotChanged.bind(this) })));
  }
  get root() { return getElement(this); }
};
GuxSwitch.style = guxSwitchCss;

export { GuxSwitch as gux_switch };
