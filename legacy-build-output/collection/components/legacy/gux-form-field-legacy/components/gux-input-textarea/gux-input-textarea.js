import { h } from '@stencil/core';
/**
 * @slot input - Required slot for textarea
 */
export class GuxInputTextArea {
  constructor() {
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
  static get is() { return "gux-input-textarea"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-textarea.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-textarea.css"]
    };
  }
  static get properties() {
    return {
      "resize": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxInputTextAreaResize",
          "resolved": "\"auto\" | \"manual\" | \"none\"",
          "references": {
            "GuxInputTextAreaResize": {
              "location": "import",
              "path": "./gux-input-textarea.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "resize",
        "reflect": false,
        "defaultValue": "'none'"
      }
    };
  }
  static get elementRef() { return "root"; }
}
