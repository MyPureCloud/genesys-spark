import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';

const guxNotificationToastCss = ":host{position:relative;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;width:294px;padding:16px 8px 16px 16px;margin-bottom:4px;color:#2e394c;background:#f6f7f9;border:1px solid #b4bccb;border-color:#b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}.gux-icon{flex:0 1 auto;align-self:auto;order:0;margin:4px}.gux-icon ::slotted(gux-icon){width:24px !important;height:24px !important}.gux-icon.gux-alert{color:#ea0b0b}.gux-icon.gux-warning{color:#ffae00}.gux-icon.gux-positive{color:#3c8527}.gux-icon.gux-neutral{color:#203b73}.gux-content{display:flex;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;align-self:auto;justify-content:flex-start;order:0;margin:0 12px 0 8px;color:#2e394c}.gux-content .gux-title,.gux-content .gux-message{flex:1 1 auto;align-self:auto;order:0}.gux-content .gux-title{font-family:Roboto, sans-serif;font-weight:400;font-size:14px;line-height:20px}";

const GuxNotificationToast = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxdismiss = createEvent(this, "guxdismiss", 7);
    this.accent = 'neutral';
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
  }
  render() {
    return (h(Host, null, h("div", { class: `gux-icon gux-${this.accent}` }, h("slot", { name: "icon" })), h("div", { class: "gux-content" }, h("gux-truncate-beta", { class: "gux-title", "max-lines": 1 }, h("slot", { name: "title" })), h("gux-truncate-beta", { class: "gux-message", "max-lines": 2 }, h("slot", { name: "message" }))), h("gux-dismiss-button", { onClick: this.onDismissClickHandler.bind(this) })));
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
GuxNotificationToast.style = guxNotificationToastCss;

export { GuxNotificationToast as gux_notification_toast };
