import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
export class GuxSidePanel {
  constructor() {
    this.isOpen = false;
    this.position = 'left';
  }
  get containerClass() {
    return `gux-${this.position} gux-${this.isOpen ? 'open' : 'closed'}`;
  }
  get contentClass() {
    return `gux-panel-content gux-${this.isOpen ? 'open' : 'closed'}`;
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.position });
  }
  render() {
    return (h("aside", { class: this.containerClass }, h("div", { class: "gux-panel-icons" }, h("slot", { name: "side-panel-icons" })), h("div", { class: this.contentClass }, h("slot", { name: "side-panel-content" }))));
  }
  static get is() { return "gux-side-panel-legacy"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-side-panel.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-side-panel.css"]
    };
  }
  static get properties() {
    return {
      "isOpen": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Open or close the content"
        },
        "attribute": "is-open",
        "reflect": false,
        "defaultValue": "false"
      },
      "position": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'left' | 'right'",
          "resolved": "\"left\" | \"right\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The position of the side panel"
        },
        "attribute": "position",
        "reflect": false,
        "defaultValue": "'left'"
      }
    };
  }
  static get elementRef() { return "root"; }
}
