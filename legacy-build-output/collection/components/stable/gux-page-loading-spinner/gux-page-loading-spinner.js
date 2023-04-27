import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
export class GuxPageLoadingSpinner {
  constructor() {
    this.screenreaderText = undefined;
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    return (h("gux-radial-loading", { class: "gux-spinner", "screenreader-text": this.screenreaderText, context: "full-page" }));
  }
  static get is() { return "gux-page-loading-spinner"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-page-loading-spinner.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-page-loading-spinner.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Localized text to provide an accessible label for the component.\nIf no screenreader text is provided, the localized string \"Loading\" will be used by default"
        },
        "attribute": "screenreader-text",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "root"; }
}
