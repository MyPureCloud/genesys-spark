import { h, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot icon - Required slot for gux-icon
 * @slot message - Required slot for the simple toast message
 */
export class GuxSimpleToast {
  constructor() {
    this.accent = 'neutral';
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
  }
  render() {
    return (h(Host, null, h("div", { class: `gux-icon gux-${this.accent}` }, h("slot", { name: "icon" })), h("gux-truncate-beta", { class: "gux-message", "max-lines": 2 }, h("slot", { name: "message" })), h("gux-dismiss-button", { class: "gux-dismiss", position: "inherit", onClick: this.onDismissClickHandler.bind(this) })));
  }
  onDismissClickHandler(event) {
    event.stopPropagation();
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
    }
  }
  static get is() { return "gux-simple-toast"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-simple-toast.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-simple-toast.css"]
    };
  }
  static get properties() {
    return {
      "accent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxSimpleToastAccent",
          "resolved": "\"alert\" | \"neutral\" | \"positive\" | \"warning\"",
          "references": {
            "GuxSimpleToastAccent": {
              "location": "import",
              "path": "./gux-simple-toast.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The component accent."
        },
        "attribute": "accent",
        "reflect": false,
        "defaultValue": "'neutral'"
      }
    };
  }
  static get events() {
    return [{
        "method": "guxdismiss",
        "name": "guxdismiss",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
}
