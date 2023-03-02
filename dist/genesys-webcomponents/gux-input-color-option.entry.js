import { r as registerInstance, e as createEvent, h } from './index-f583fcde.js';

const guxInputColorOptionCss = "gux-input-color-option{color:#2e394c}gux-input-color-option>button{display:inline-block;flex:0 0 16px;width:16px;height:16px;padding:0;margin:4px;font-size:0;line-height:0;cursor:pointer;border:none}gux-input-color-option>button:not(:disabled):hover,gux-input-color-option>button:focus,gux-input-color-option>button.gux-input-color-option-active,gux-input-color-option>button:active{border:1px white solid;outline:1px solid #2a60c8}gux-input-color-option>button:disabled{cursor:default;background-color:#fdfdfd;border:1px solid #2e394c;opacity:0.5}gux-input-color-option button::-moz-focus-inner{border:none}";

const GuxInputColorOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.colorSelect = createEvent(this, "colorSelect", 7);
    this.active = undefined;
    this.value = undefined;
  }
  render() {
    return (h("button", { type: "button", value: this.value, class: this.active ? 'gux-input-color-option-active' : '', disabled: !this.value, style: this.value && { 'background-color': this.value }, title: this.value, onClick: this.onColorOptionClickHandler.bind(this) }));
  }
  onColorOptionClickHandler() {
    this.colorSelect.emit(this.value);
  }
};
GuxInputColorOption.style = guxInputColorOptionCss;

export { GuxInputColorOption as gux_input_color_option };
