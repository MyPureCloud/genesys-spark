import { h } from '@stencil/core';
import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';
/**
 * @slot input - Required slot for select element
 */
export class GuxInputSelect {
  constructor() {
    this.disabled = undefined;
  }
  componentWillLoad() {
    this.input = this.root.querySelector('select[slot="input"]');
    this.disabled = this.input.disabled;
    this.disabledObserver = onDisabledChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (h("div", { class: {
        'gux-input-container': true,
        'gux-disabled': this.disabled
      } }, h("slot", { name: "input" }), h("gux-icon", { decorative: true, iconName: "ic-dropdown-arrow" })));
  }
  static get is() { return "gux-input-select"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-select.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-select.css"]
    };
  }
  static get states() {
    return {
      "disabled": {}
    };
  }
  static get elementRef() { return "root"; }
}
