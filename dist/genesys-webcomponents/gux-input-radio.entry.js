import { r as registerInstance, h } from './index-f583fcde.js';

const guxInputRadioCss = "gux-input-radio{display:block;color:#2e394c}gux-input-radio .gux-input-radio-container{position:relative;padding-left:24px;line-height:24px}gux-input-radio input{position:absolute;z-index:-1;opacity:0}gux-input-radio label{display:inline-block;font-size:12px}gux-input-radio label::after{position:absolute;top:4px;left:4px;display:block;width:16px;height:16px;content:'';border-radius:50%}gux-input-radio input:focus-within~label::after{box-shadow:0 0 2px 1px #aac9ff, inset 0 0 2px 1px #aac9ff}gux-input-radio input:not(:checked)~label::after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%2377828f'/%3E%3C/svg%3E\")}gux-input-radio input:not(:checked):not(:disabled)~label:hover::after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%232a60c8'/%3E%3C/svg%3E\")}gux-input-radio input:checked~label::after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8.026 5.262a2.8 2.8 0 1 0 .001 5.601 2.8 2.8 0 0 0-.001-5.601zm0-2.2c-2.761 0-5 2.211-5 4.938s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%232a60c8'/%3E%3C/svg%3E\")}gux-input-radio input:disabled~label::after,gux-input-radio input:disabled~label{cursor:not-allowed;opacity:0.5}";

const GuxInputRadio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "gux-input-radio-container" }, h("slot", { name: "input" }), h("slot", { name: "label" })));
  }
};
GuxInputRadio.style = guxInputRadioCss;

export { GuxInputRadio as gux_input_radio };
