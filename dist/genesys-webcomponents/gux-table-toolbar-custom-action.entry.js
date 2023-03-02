import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const guxTableToolbarCustomActionCss = ".gux-sr-only{display:flex}.gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-action-title{display:flex;flex-direction:row;gap:8px;align-items:center}.gux-action-title slot[name='icon']::slotted(gux-icon){width:16px;height:16px}";

const GuxTableToolbarCustomAction = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconOnly = false;
    this.accent = 'secondary';
    this.disabled = false;
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("gux-button-slot-beta", { accent: this.accent }, h("button", { disabled: this.disabled, type: "button", class: "gux-action-title" }, h("slot", { name: "icon" }), h("span", { class: { 'gux-sr-only': this.iconOnly } }, h("slot", { name: "text" })))));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
};
GuxTableToolbarCustomAction.style = guxTableToolbarCustomActionCss;

export { GuxTableToolbarCustomAction as gux_table_toolbar_custom_action };
