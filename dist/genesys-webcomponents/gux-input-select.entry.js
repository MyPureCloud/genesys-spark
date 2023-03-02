import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { a as onDisabledChange } from './on-attribute-change-5fd8da7c.js';

const guxInputSelectCss = "gux-input-select{position:relative;display:block}gux-input-select .gux-input-container{position:relative;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-select .gux-input-container.gux-disabled{pointer-events:none;opacity:0.5}gux-input-select .gux-input-container:hover gux-icon{color:#2a60c8}gux-input-select .gux-input-container select{flex:1 1 auto;align-self:auto;order:0;height:32px;padding:0 32px 0 12px;margin:0;color:#2e394c;background-color:#f6f7f9;border:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);-moz-appearance:none;-webkit-appearance:none;appearance:none}gux-input-select .gux-input-container gux-icon{position:absolute;top:0;right:0;width:16px;height:16px;margin:8px;pointer-events:none}gux-input-select .gux-input-container:focus-within{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px #75a8ff}";

const GuxInputSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get root() { return getElement(this); }
};
GuxInputSelect.style = guxInputSelectCss;

export { GuxInputSelect as gux_input_select };
