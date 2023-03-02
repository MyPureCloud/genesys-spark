import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';

const guxInputTextareaCss = "gux-input-textarea{position:relative;display:block}gux-input-textarea .gux-resize-none textarea{resize:none}gux-input-textarea .gux-resize-auto{display:grid;overflow:hidden;word-break:normal;word-break:break-word;overflow-wrap:anywhere}gux-input-textarea .gux-resize-auto::after{grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;white-space:pre-wrap;visibility:hidden;content:attr(data-replicated-value) ' ';min-width:100%;max-width:100%;min-height:90px;padding:4px 12px;margin:0;border:1px solid #6b7585}gux-input-textarea .gux-resize-auto textarea{grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;overflow-x:hidden;resize:none}gux-input-textarea textarea{flex:1 1 auto;align-self:auto;order:0;font-family:inherit;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;color:#2e394c;background-color:#f6f7f9;background-image:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);min-width:100%;max-width:100%;min-height:90px;padding:4px 12px;margin:0;border:1px solid #6b7585}gux-input-textarea textarea::placeholder{color:#596373;opacity:1}gux-input-textarea textarea:focus-within{border-color:#2a60c8;box-shadow:0 0 4px rgba(117, 168, 255, 0.5)}gux-input-textarea textarea[disabled]{opacity:0.5}";

const GuxInputTextArea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.resize = 'none';
  }
  componentWillLoad() {
    this.input = this.root.querySelector('textarea[slot="input"]');
    this.input.addEventListener('input', () => {
      this.updateHeight();
    });
  }
  componentDidLoad() {
    this.updateHeight();
  }
  updateHeight() {
    if (this.resize === 'auto') {
      this.containerElement.dataset.replicatedValue = this.input.value;
      this.containerElement.style.maxHeight = this.input.style.maxHeight;
    }
  }
  render() {
    return (h("div", { ref: el => (this.containerElement = el), class: `gux-resize-${this.resize}` }, h("slot", { name: "input" })));
  }
  get root() { return getElement(this); }
};
GuxInputTextArea.style = guxInputTextareaCss;

export { GuxInputTextArea as gux_input_textarea };
