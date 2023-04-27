import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../i18n';
import translationResources from './i18n/en.json';
export class GuxDismissButton {
  constructor() {
    this.position = 'absolute';
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.position });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("button", { class: this.position == 'inherit' ? 'gux-inherit' : undefined, type: "button", title: this.i18n('dismiss') }, h("gux-icon", { "icon-name": "close", "screenreader-text": this.i18n('dismiss') })));
  }
  static get is() { return "gux-dismiss-button"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-dismiss-button.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-dismiss-button.css"]
    };
  }
  static get properties() {
    return {
      "position": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxDismissButtonPosition",
          "resolved": "\"absolute\" | \"inherit\"",
          "references": {
            "GuxDismissButtonPosition": {
              "location": "import",
              "path": "./gux-dismiss-button.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "position",
        "reflect": false,
        "defaultValue": "'absolute'"
      }
    };
  }
  static get elementRef() { return "root"; }
}
