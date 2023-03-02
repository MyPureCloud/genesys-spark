import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { s as setInputValue } from './set-input-value-5adeaccc.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { a as onDisabledChange } from './on-attribute-change-5fd8da7c.js';
import './get-closest-element-1597503c.js';

const clear = "Clear";
const increment = "Increment";
const decrement = "Decrement";
const componentResources = {
	clear: clear,
	increment: increment,
	decrement: decrement
};

const guxInputNumberCss = "gux-input-number{position:relative;display:block}gux-input-number .gux-input-number-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center}gux-input-number .gux-input-number-container.gux-disabled{opacity:0.5}gux-input-number .gux-input-number-container .gux-input-container{box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:center;order:0;width:100%;height:32px;padding:4px 12px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-number .gux-input-number-container .gux-input-container input{flex:1 1 auto;align-self:auto;order:0;color:#2e394c;text-align:right;background-color:#f6f7f9;border:none;outline:none;}gux-input-number .gux-input-number-container .gux-input-container input::placeholder{color:#596373;opacity:1}gux-input-number .gux-input-number-container .gux-input-container input::-webkit-outer-spin-button,gux-input-number .gux-input-number-container .gux-input-container input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}gux-input-number .gux-input-number-container .gux-input-container input[type='number']{-moz-appearance:textfield}gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none}gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button:not(:disabled):focus,gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button:not(:disabled):hover{color:#2a60c8;cursor:pointer}gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button gux-icon{width:12px;height:12px}gux-input-number .gux-input-number-container .gux-step-buttons-container{flex:0 1 16px;align-self:auto;order:0;margin:0 4px}gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none}gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button:not(:disabled):focus,gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button:not(:disabled):hover{color:#2a60c8;cursor:pointer}gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button gux-icon{width:10px;height:10px}gux-input-number .gux-input-number-container:focus-within .gux-input-container{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px rgba(117, 168, 255, 0.5)}";

const GuxInputNumber = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get root() { return getElement(this); }
};
GuxInputNumber.style = guxInputNumberCss;

export { GuxInputNumber as gux_input_number };
