import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot - text
 */
export class GuxScreenReader {
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("span", { class: "gux-sr-only" }, h("slot", null)));
  }
  static get is() { return "gux-screen-reader-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-screen-reader.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-screen-reader.css"]
    };
  }
  static get elementRef() { return "root"; }
}
