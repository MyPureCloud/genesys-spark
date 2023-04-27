import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../../i18n';
import setInputValue from '../../../../../utils/dom/set-input-value';
import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';
import componentResources from './i18n/en.json';
/**
 * @slot default - slot for input[type="search"]
 */
export class GuxInputSearch {
  constructor() {
    this.hasContent = false;
    this.disabled = undefined;
  }
  clearInput() {
    setInputValue(this.input, '', true);
  }
  setHasContent() {
    this.hasContent = Boolean(this.input.value);
  }
  renderSearchIcon() {
    return (h("gux-icon", { class: "gux-search-icon", "icon-name": "search", decorative: true }));
  }
  renderClearButton() {
    if (this.hasContent && !this.disabled) {
      return (h("button", { class: "gux-clear-button", tabIndex: -1, type: "button", title: this.getI18nValue('clear'), disabled: this.disabled, onClick: this.clearInput.bind(this) }, h("gux-icon", { "icon-name": "close", decorative: true })));
    }
    return null;
  }
  async componentWillLoad() {
    this.getI18nValue = await buildI18nForComponent(this.root, componentResources);
    this.input = this.root.querySelector('input[type="search"]');
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
      } }, this.renderSearchIcon(), h("slot", null), this.renderClearButton()));
  }
  static get is() { return "gux-input-search"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-search.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-search.css"]
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
