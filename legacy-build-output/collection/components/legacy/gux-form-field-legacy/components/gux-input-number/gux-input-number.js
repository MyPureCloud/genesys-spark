import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../../i18n';
import setInputValue from '../../../../../utils/dom/set-input-value';
import simulateNativeEvent from '../../../../../utils/dom/simulate-native-event';
import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';
import componentResources from './i18n/en.json';
/**
 * @slot input - Required slot for input[type="radio"]
 */
export class GuxInputNumber {
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
  simulateNativeInputAndChangeEvents() {
    simulateNativeEvent(this.input, 'input');
    simulateNativeEvent(this.input, 'change');
  }
  stepUp() {
    if (this.input.value === '') {
      setInputValue(this.input, this.input.min || '0', false);
    }
    else {
      this.input.stepUp();
      this.simulateNativeInputAndChangeEvents();
    }
  }
  stepDown() {
    if (this.input.value === '') {
      setInputValue(this.input, this.input.min || '0', false);
    }
    else {
      this.input.stepDown();
      this.simulateNativeInputAndChangeEvents();
    }
  }
  renderClearButton() {
    if (this.clearable && this.hasContent && !this.disabled) {
      return (h("button", { class: "gux-clear-button", tabIndex: -1, type: "button", title: this.getI18nValue('clear'), disabled: this.disabled, onClick: this.clearInput.bind(this) }, h("gux-icon", { "icon-name": "close", decorative: true })));
    }
    return null;
  }
  renderStepButtons() {
    return (h("div", { class: "gux-step-buttons-container" }, h("button", { class: "gux-step-button", tabIndex: -1, type: "button", title: this.getI18nValue('increment'), disabled: this.disabled, onClick: () => this.stepUp() }, h("gux-icon", { "icon-name": "chevron-small-up", decorative: true })), h("button", { class: "gux-step-button", tabIndex: -1, type: "button", title: this.getI18nValue('decrement'), disabled: this.disabled, onClick: () => this.stepDown() }, h("gux-icon", { "icon-name": "chevron-small-down", decorative: true }))));
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
        'gux-input-number-container': true,
        'gux-disabled': this.disabled
      } }, h("div", { class: "gux-input-container" }, h("slot", { name: "input" }), this.renderClearButton()), this.renderStepButtons()));
  }
  static get is() { return "gux-input-number"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-number.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-number.css"]
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
