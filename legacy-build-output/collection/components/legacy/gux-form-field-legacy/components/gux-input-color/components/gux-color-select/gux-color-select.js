import { h } from '@stencil/core';
import { defaultColors } from './colors';
/**
 * @slot input - Required slot for input[type="color"]
 */
export class GuxColorSelect {
  constructor() {
    this.color = undefined;
  }
  onColorSelect(event) {
    const colorOptionElement = event.target;
    this.color = colorOptionElement.value;
    this.input.value = colorOptionElement.value;
    this.input.dispatchEvent(new Event('input', {
      bubbles: true,
      cancelable: true
    }));
    this.input.dispatchEvent(new Event('change', {
      bubbles: true
    }));
  }
  componentWillLoad() {
    this.input = this.root.querySelector('input[slot="input"]');
    this.color = this.input.value;
  }
  render() {
    return [
      h("div", { hidden: true }, h("slot", { name: "input" })),
      h("div", null, h("div", { class: "gux-input-color-matrix" }, this.renderDefaultTiles()))
    ];
  }
  renderDefaultTiles() {
    return defaultColors.map((color, index) => (h("gux-input-color-option", { key: `${color}-${index}`, value: color, active: this.color.toLowerCase() === color.toLowerCase() })));
  }
  static get is() { return "gux-color-select"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-color-select.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-color-select.css"]
    };
  }
  static get states() {
    return {
      "color": {}
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "colorSelect",
        "method": "onColorSelect",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
