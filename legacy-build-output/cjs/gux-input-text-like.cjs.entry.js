'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const setInputValue = require('./set-input-value-610d7da3.js');
const onAttributeChange = require('./on-attribute-change-37556263.js');
require('./get-closest-element-ab4b2eee.js');
require('./simulate-native-event-fe3e62da.js');

const clear = "Clear";
const componentResources = {
	clear: clear
};

const guxInputTextLikeCss = "gux-input-text-like{display:block}gux-input-text-like .gux-input-container{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:4px 8px 4px 12px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-text-like .gux-input-container.gux-disabled{opacity:0.5}gux-input-text-like .gux-input-container input{flex:1 1 auto;align-self:auto;order:0;color:#2e394c;background-color:#f6f7f9;border:none;outline:none}gux-input-text-like .gux-input-container input::placeholder{color:#596373;opacity:1}gux-input-text-like .gux-input-container .gux-clear-button{flex:0 1 auto;align-self:auto;order:0;padding:2px;margin-left:8px;color:#596373;background:transparent;border:none;border-radius:4px}gux-input-text-like .gux-input-container .gux-clear-button:not(:disabled):focus-visible,gux-input-text-like .gux-input-container .gux-clear-button:not(:disabled):hover{color:#2e394c;cursor:pointer}gux-input-text-like .gux-input-container .gux-clear-button gux-icon{width:12px;height:12px;margin:4px;border-radius:4px}gux-input-text-like .gux-input-container .gux-clear-button:focus{outline:none}gux-input-text-like .gux-input-container .gux-clear-button:focus-visible:enabled gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}gux-input-text-like .gux-input-container:focus-within{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px #75a8ff}";

const GuxInputTextLike = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.clearable = undefined;
    this.hasContent = false;
    this.disabled = undefined;
  }
  clearInput() {
    setInputValue.setInputValue(this.input, '', true);
  }
  setHasContent() {
    this.hasContent = Boolean(this.input.value);
  }
  renderClearButton() {
    if (this.clearable && this.hasContent && !this.disabled) {
      return (index.h("button", { class: "gux-clear-button", tabIndex: -1, type: "button", title: this.getI18nValue('clear'), disabled: this.disabled, onClick: this.clearInput.bind(this) }, index.h("gux-icon", { "icon-name": "close", decorative: true })));
    }
    return null;
  }
  async componentWillLoad() {
    this.getI18nValue = await index$1.buildI18nForComponent(this.root, componentResources);
    this.input = this.root.querySelector('input[slot="input"]');
    this.setHasContent();
    this.disabled = this.input.disabled;
    this.input.addEventListener('input', () => {
      this.setHasContent();
    });
    this.disabledObserver = onAttributeChange.onDisabledChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (index.h("div", { class: {
        'gux-input-container': true,
        'gux-disabled': this.disabled
      } }, index.h("slot", { name: "input" }), this.renderClearButton()));
  }
  get root() { return index.getElement(this); }
};
GuxInputTextLike.style = guxInputTextLikeCss;

exports.gux_input_text_like = GuxInputTextLike;
