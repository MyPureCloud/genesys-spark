import { r as registerInstance, h, g as getElement, c as createEvent } from './index-816e34d8.js';

// Default color values
const defaultColors = [
  '#203B73',
  '#75A8FF',
  '#8452CF',
  '#1DA8B3',
  '#B5B5EB',
  '#CC3EBE',
  '#5E6782',
  '#FF8FDD',
  '#868C1E',
  '#DDD933'
];

const guxColorSelectCss = "gux-color-select{display:inline-block;color:#2e394c}gux-color-select>div{box-sizing:border-box;padding:20px 0 12px;margin-top:2px;background-color:#f6f7f9;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-color-select .gux-input-color-matrix{display:flex;flex-wrap:wrap;align-content:flex-start;width:120px;padding:0 20px 8px;margin:0}gux-color-select .gux-input-color-matrix>*{display:none}gux-color-select .gux-input-color-matrix>gux-input-color-option{display:inline-block}";

const GuxColorSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get root() { return getElement(this); }
};
GuxColorSelect.style = guxColorSelectCss;

const guxInputColorOptionCss = "gux-input-color-option{color:#2e394c}gux-input-color-option>button{display:inline-block;flex:0 0 16px;width:16px;height:16px;padding:0;margin:4px;font-size:0;line-height:0;cursor:pointer;border:none}gux-input-color-option>button:not(:disabled):hover,gux-input-color-option>button:focus-visible,gux-input-color-option>button.gux-input-color-option-active,gux-input-color-option>button:active{border:1px white solid;outline:1px solid #2a60c8}gux-input-color-option>button:disabled{cursor:default;background-color:#fdfdfd;border:1px solid #2e394c;opacity:0.5}gux-input-color-option button::-moz-focus-inner{border:none}";

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

export { GuxColorSelect as gux_color_select, GuxInputColorOption as gux_input_color_option };
