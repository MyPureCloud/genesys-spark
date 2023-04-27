import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { t as trackComponent } from './usage-55de2afe.js';
import './get-closest-element-1597503c.js';

const info = "Information alert with message";
const success = "Success alert with message";
const warning = "Warning alert with message";
const error = "Error alert with message";
const translationResources = {
	info: info,
	success: success,
	warning: warning,
	error: error
};

const guxInlineAlertCss = ":host{display:block}.gux-inline-alert{display:flex;flex-direction:row;flex-wrap:nowrap;gap:8px;align-items:center;justify-content:flex-start;padding:4px 8px;border-radius:4px;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-inline-alert gux-icon{flex-shrink:0;align-self:flex-start;width:16px;height:16px;margin-top:2px}.gux-inline-alert gux-tooltip-title{white-space:nowrap}.gux-inline-alert .gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-inline-alert.gux-info{color:#4c5667;background-color:#f6f7f9;border:1px solid #d7dce5}.gux-inline-alert.gux-error{color:#8f0707;background-color:#fceaea;border:1px solid #f8b2b2}.gux-inline-alert.gux-warning{color:#976700;background-color:#fdf8ec;border:1px solid #fce5b1}.gux-inline-alert.gux-success{color:#205a10;background-color:#eefcea;border:1px solid #c2deb9}";

const GuxAlert = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.accent = 'info';
  }
  getIcon(accent) {
    switch (accent) {
      case 'info':
        return 'alert-info';
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning-triangle';
      case 'error':
        return 'alert-warning-octogon';
      default:
        return 'alert-info';
    }
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("div", { class: {
        'gux-inline-alert': true,
        [`gux-${this.accent}`]: true
      } }, h("gux-icon", { "icon-name": this.getIcon(this.accent), decorative: true }), h("div", { class: "gux-message-wrapper" }, h("div", { class: "gux-sr-only" }, this.i18n(this.accent)), h("slot", null))));
  }
  get root() { return getElement(this); }
};
GuxAlert.style = guxInlineAlertCss;

export { GuxAlert as gux_inline_alert_beta };
