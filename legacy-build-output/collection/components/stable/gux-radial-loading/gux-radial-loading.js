import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import modalComponentResources from './i18n/en.json';
export class GuxRadialLoading {
  constructor() {
    this.context = 'modal';
    this.screenreaderText = '';
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.context });
    this.getI18nValue = await buildI18nForComponent(this.root, modalComponentResources);
  }
  render() {
    return (h("div", { role: "progressbar", "aria-label": this.screenreaderText || this.getI18nValue('loading'), class: `gux-spinner-container gux-${this.context}` }, h("div", { role: "presentation", class: "gux-spin-circle" })));
  }
  static get is() { return "gux-radial-loading"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-radial-loading.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-radial-loading.css"]
    };
  }
  static get properties() {
    return {
      "context": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxRadialLoadingContext",
          "resolved": "\"full-page\" | \"input\" | \"modal\"",
          "references": {
            "GuxRadialLoadingContext": {
              "location": "import",
              "path": "./gux-radial-loading.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The display context the component is in."
        },
        "attribute": "context",
        "reflect": false,
        "defaultValue": "'modal'"
      },
      "screenreaderText": {
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
          "text": "Localized text to provide an accessible label for the component.\nIf no screenreader text is provided, the localized string \"Loading\" will be used by default."
        },
        "attribute": "screenreader-text",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
  static get elementRef() { return "root"; }
}
