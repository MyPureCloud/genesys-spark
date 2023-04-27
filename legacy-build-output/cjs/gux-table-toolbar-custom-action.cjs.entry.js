'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxTableToolbarCustomActionCss = ".gux-sr-only{display:flex}.gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-action-title{display:flex;flex-direction:row;gap:8px;align-items:center}.gux-action-title slot[name='icon']::slotted(gux-icon){width:16px;height:16px}";

const GuxTableToolbarCustomAction = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.iconOnly = false;
    this.accent = 'secondary';
    this.disabled = false;
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    return (index.h("gux-button-slot-beta", { accent: this.accent }, index.h("button", { disabled: this.disabled, type: "button", class: "gux-action-title" }, index.h("slot", { name: "icon" }), index.h("span", { class: { 'gux-sr-only': this.iconOnly } }, index.h("slot", { name: "text" })))));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
};
GuxTableToolbarCustomAction.style = guxTableToolbarCustomActionCss;

exports.gux_table_toolbar_custom_action = GuxTableToolbarCustomAction;
