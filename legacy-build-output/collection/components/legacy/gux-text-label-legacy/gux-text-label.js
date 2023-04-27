import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
let nextLabelId = 1;
export class GuxTextLabelLegacy {
  constructor() {
    this.label = undefined;
    this.position = 'above';
    this.id = this.generateId();
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.position });
  }
  componentDidLoad() {
    const labeledComponentSlot = this.labeledComponent.querySelector('*');
    if (typeof labeledComponentSlot.componentOnReady !== 'function' ||
      typeof labeledComponentSlot.setLabelledBy !== 'function') {
      // Only set labeled by if its supported by the contained element.
      labeledComponentSlot.setAttribute('aria-labelledby', this.id);
      return;
    }
    labeledComponentSlot.componentOnReady().then(() => {
      labeledComponentSlot.setLabelledBy(this.id);
    });
  }
  render() {
    return (h("div", { class: `gux-text-label-container gux-${this.position}` }, h("label", { class: "gux-label", id: this.id }, h("slot", { name: "label" }, this.label)), h("div", { class: "gux-labeled-component", ref: el => (this.labeledComponent = el) }, h("slot", null))));
  }
  generateId() {
    return 'gux-text-label-' + nextLabelId++;
  }
  static get is() { return "gux-text-label-legacy"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-text-label.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-text-label.css"]
    };
  }
  static get properties() {
    return {
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The string of text to use for the label.  If the 'label' slot is\nprovided, that dom will be used instead of this property."
        },
        "attribute": "label",
        "reflect": false
      },
      "position": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'above' | 'beside'",
          "resolved": "\"above\" | \"beside\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The position of the label relative to its contained element."
        },
        "attribute": "position",
        "reflect": false,
        "defaultValue": "'above'"
      }
    };
  }
  static get elementRef() { return "root"; }
}
