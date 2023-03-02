import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const guxCardCss = ":host{box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;width:fit-content;padding:16px;background-color:#fdfdfd;border:1px solid #e2e6ee;border-radius:4px}:host([accent='outline']){background-color:#fdfdfd}:host([accent='filled']){background-color:#f6f7f9}:host([accent='raised']){box-shadow:0 0 2px rgba(32, 41, 55, 0.16)}";

const GuxCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.accent = 'outline';
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("slot", null));
  }
  get root() { return getElement(this); }
};
GuxCard.style = guxCardCss;

export { GuxCard as gux_card_beta };
