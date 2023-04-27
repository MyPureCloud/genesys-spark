import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';

const guxCardCss = ":host{display:block;width:fit-content}.gux-card{box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;padding:16px;background-color:#fdfdfd;border:1px solid #e2e6ee;border-radius:4px}.gux-card.gux-outline{background-color:#fdfdfd}.gux-card.gux-filled{background-color:#f6f7f9}.gux-card.gux-raised{box-shadow:0 0 2px rgba(32, 41, 55, 0.16)}";

const GuxCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.accent = 'outline';
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("div", { class: {
        'gux-card': true,
        [`gux-${this.accent}`]: true
      } }, h("slot", null)));
  }
  get root() { return getElement(this); }
};
GuxCard.style = guxCardCss;

export { GuxCard as gux_card_beta };
