import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../../i18n';
import setInputValue from '../../../../../utils/dom/set-input-value';
import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';
import componentResources from './i18n/en.json';
/**
 * @slot input - Required slot for input[type="text" | type="email" | type="password"]
 */
export class GuxInputTextLike {
  constructor() {
    this.clearable = undefined;
    this.hasContent = false;
    this.disabled = undefined;
  }
  clearInput() {
    setInputValue(this.input, '', true);
  }
  setHasContent() {
    this.hasContent = Boolean(this.input.value);
  }
  renderClearButton() {
    if (this.clearable && this.hasContent && !this.disabled) {
      return (h("button", { class: "gux-clear-button", tabIndex: -1, type: "button", title: this.getI18nValue('clear'), disabled: this.disabled, onClick: this.clearInput.bind(this) }, h("gux-icon", { "icon-name": "close", decorative: true })));
    }
    return null;
  }
  async componentWillLoad() {
    this.getI18nValue = await buildI18nForComponent(this.root, componentResources);
    this.input = this.root.querySelector('input[slot="input"]');
    this.setHasContent();
    this.disabled = this.input.disabled;
    this.input.addEventListener('input', () => {
      this.setHasContent();
    });
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
      } }, h("slot", { name: "input" }), this.renderClearButton()));
  }
  static get is() { return "gux-input-text-like"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-text-like.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-text-like.css"]
    };
  }
  static get properties() {
    return {
      "clearable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "clearable",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "hasContent": {},
      "disabled": {}
    };
  }
  static get elementRef() { return "root"; }
}
