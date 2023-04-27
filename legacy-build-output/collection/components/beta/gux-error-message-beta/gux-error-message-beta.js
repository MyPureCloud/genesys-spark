import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot - Alternative slot for setting error message if named slot can not be used.
 * @slot error - Slot for error massage
 */
export class GuxErrorMessageBeta {
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("div", { class: "gux-container" }, h("gux-icon", { "icon-name": "alert-warning-octogon", decorative: true }), h("div", { class: "gux-message" }, h("slot", null), h("slot", { name: "error" }))));
  }
  static get is() { return "gux-error-message-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-error-message-beta.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-error-message-beta.css"]
    };
  }
  static get elementRef() { return "root"; }
}
