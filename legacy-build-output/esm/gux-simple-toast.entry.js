import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';

const guxSimpleToastCss = ":host{position:relative;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;width:286px;margin-bottom:4px;color:#2e394c;background:#f6f7f9;border:1px solid;border-color:#b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-icon{flex:0 1 auto;align-self:auto;order:0;padding:8px 12px 8px 16px;margin:2px 0}.gux-icon.gux-alert{color:#ea0b0b}.gux-icon.gux-warning{color:#ffae00}.gux-icon.gux-positive{color:#3c8527}.gux-icon.gux-neutral{color:#203b73}.gux-icon ::slotted(gux-icon){width:16px;height:16px}.gux-message{flex:1 1 auto;align-self:center;order:0;margin:8px 0}.gux-dismiss{margin:4px 0}";

const GuxSimpleToast = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxdismiss = createEvent(this, "guxdismiss", 7);
    this.accent = 'neutral';
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
  }
  render() {
    return (h(Host, null, h("div", { class: `gux-icon gux-${this.accent}` }, h("slot", { name: "icon" })), h("gux-truncate-beta", { class: "gux-message", "max-lines": 2 }, h("slot", { name: "message" })), h("gux-dismiss-button", { class: "gux-dismiss", position: "inherit", onClick: this.onDismissClickHandler.bind(this) })));
  }
  onDismissClickHandler(event) {
    event.stopPropagation();
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
    }
  }
  get root() { return getElement(this); }
};
GuxSimpleToast.style = guxSimpleToastCss;

export { GuxSimpleToast as gux_simple_toast };
