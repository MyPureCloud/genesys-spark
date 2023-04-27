import { h } from '@stencil/core';
/**
 * @slot input - Required slot for input[type="radio"]
 * @slot label - Required slot for label
 */
export class GuxInputRadio {
  render() {
    return (h("div", { class: "gux-input-radio-container" }, h("slot", { name: "input" }), h("slot", { name: "label" })));
  }
  static get is() { return "gux-input-radio"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-radio.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-radio.css"]
    };
  }
}
