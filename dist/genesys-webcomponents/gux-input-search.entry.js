import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { s as setInputValue } from './set-input-value-5adeaccc.js';
import { a as onDisabledChange } from './on-attribute-change-5fd8da7c.js';
import './get-closest-element-1597503c.js';
import './simulate-native-event-ac69961f.js';

const clear = "Clear";
const componentResources = {
	clear: clear
};

const guxInputSearchCss = "gux-input-search{position:relative;display:block}gux-input-search .gux-input-container{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;gap:4px;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:4px 8px 4px 8px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-search .gux-input-container.gux-disabled{opacity:0.5}gux-input-search .gux-input-container .gux-search-icon{flex:0 0 auto;align-self:auto;order:0;width:20px;height:20px;color:#596373}gux-input-search .gux-input-container input{flex:1 1 auto;align-self:auto;order:0;overflow:hidden;color:#2e394c;background-color:#f6f7f9;border:none;outline:none}gux-input-search .gux-input-container input::placeholder{color:#596373;opacity:1}gux-input-search .gux-input-container input::-webkit-search-cancel-button,gux-input-search .gux-input-container input::-webkit-search-results-button,gux-input-search .gux-input-container input::-webkit-calendar-picker-indicator{display:none;-webkit-appearance:none}gux-input-search .gux-input-container .gux-clear-button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none}gux-input-search .gux-input-container .gux-clear-button:not(:disabled):focus,gux-input-search .gux-input-container .gux-clear-button:not(:disabled):hover{color:#2e394c;cursor:pointer}gux-input-search .gux-input-container .gux-clear-button gux-icon{width:12px;height:12px;border-radius:4px}gux-input-search .gux-input-container .gux-clear-button:focus{outline:none}gux-input-search .gux-input-container .gux-clear-button:focus:enabled gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}gux-input-search .gux-input-container:focus-within{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px #75a8ff}";

const GuxInputSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get root() { return getElement(this); }
};
GuxInputSearch.style = guxInputSearchCss;

export { GuxInputSearch as gux_input_search };
