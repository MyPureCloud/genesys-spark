import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import translationResources from './i18n/en.json';
/**
 * @slot - Slot for message.
 */
export class GuxAlert {
  constructor() {
    this.accent = 'info';
  }
  getIcon(accent) {
    switch (accent) {
      case 'info':
        return 'alert-info';
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning-triangle';
      case 'error':
        return 'alert-warning-octogon';
      default:
        return 'alert-info';
    }
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("div", { class: {
        'gux-inline-alert': true,
        [`gux-${this.accent}`]: true
      } }, h("gux-icon", { "icon-name": this.getIcon(this.accent), decorative: true }), h("div", { class: "gux-message-wrapper" }, h("div", { class: "gux-sr-only" }, this.i18n(this.accent)), h("slot", null))));
  }
  static get is() { return "gux-inline-alert-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-inline-alert.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-inline-alert.css"]
    };
  }
  static get properties() {
    return {
      "accent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxAlertAccent",
          "resolved": "\"error\" | \"info\" | \"success\" | \"warning\"",
          "references": {
            "GuxAlertAccent": {
              "location": "import",
              "path": "./gux-inline-alert.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "accent",
        "reflect": false,
        "defaultValue": "'info'"
      }
    };
  }
  static get elementRef() { return "root"; }
}
