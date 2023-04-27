import { h, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot icon - Required slot for gux-icon
 * @slot title - Required slot for the action toast title
 * @slot message - Required slot for the action toast message
 * @slot negative-button - Required slot for the action toast negative button
 * @slot positive-button - Required slot for the action toast positive button
 */
export class GuxActionToast {
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h(Host, null, h("div", { class: "gux-header" }, h("div", { class: "gux-icon" }, h("slot", { name: "icon" })), h("div", { class: "gux-title" }, h("slot", { name: "title" }))), h("div", { class: "gux-message" }, h("slot", { name: "message" })), h("div", { class: "gux-action-buttons" }, h("div", { class: "gux-positive-button" }, h("slot", { name: "positive-button" })), h("div", { class: "gux-negative-button" }, h("slot", { name: "negative-button" })))));
  }
  static get is() { return "gux-action-toast"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-action-toast.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-action-toast.css"]
    };
  }
  static get elementRef() { return "root"; }
}
