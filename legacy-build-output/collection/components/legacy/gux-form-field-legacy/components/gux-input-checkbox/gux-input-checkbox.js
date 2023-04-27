import { h } from '@stencil/core';
/**
 * @slot input - Required slot for input[type="checkbox"]
 * @slot label - Required slot for label
 */
export class GuxInputCheckbox {
  render() {
    return (h("div", { class: "gux-input-checkbox-container" }, h("slot", { name: "input" }), h("slot", { name: "label" })));
  }
  static get is() { return "gux-input-checkbox"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-checkbox.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-checkbox.css"]
    };
  }
}
