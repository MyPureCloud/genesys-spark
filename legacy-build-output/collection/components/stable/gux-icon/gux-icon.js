import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { getBaseSvgHtml, getRootIconName, validateProps } from './gux-icon.service';
export class GuxIcon {
  constructor() {
    this.iconName = undefined;
    this.decorative = false;
    this.screenreaderText = '';
    this.svgHtml = undefined;
  }
  async prepIcon(iconName) {
    if (iconName) {
      const rootIconName = getRootIconName(iconName);
      this.baseSvgHtml = await getBaseSvgHtml(rootIconName);
      this.svgHtml = this.getSvgWithAriaAttributes(this.baseSvgHtml);
    }
  }
  watchDecorative(decorative) {
    this.validateProps(decorative, this.screenreaderText);
    this.svgHtml = this.getSvgWithAriaAttributes(this.baseSvgHtml);
  }
  watchScreenreaderText(screenreaderText) {
    this.validateProps(this.decorative, screenreaderText);
    this.svgHtml = this.getSvgWithAriaAttributes(this.baseSvgHtml);
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: getRootIconName(this.iconName) });
    await this.prepIcon(this.iconName);
  }
  componentDidLoad() {
    this.validateProps(this.decorative, this.screenreaderText);
  }
  validateProps(decorative, screenreaderText) {
    // skip validation if root is not attached to DOM
    if (!this.root.isConnected) {
      return;
    }
    validateProps(decorative, screenreaderText);
  }
  getSvgWithAriaAttributes(svgText) {
    const svgElement = new DOMParser().parseFromString(svgText, 'image/svg+xml')
      .firstChild;
    if (this.decorative) {
      svgElement.setAttribute('aria-hidden', String(this.decorative));
    }
    else {
      svgElement.setAttribute('aria-hidden', 'false');
    }
    if (this.screenreaderText) {
      svgElement.setAttribute('aria-label', this.screenreaderText);
    }
    else {
      svgElement.removeAttribute('aria-label');
    }
    return svgElement.outerHTML;
  }
  render() {
    return (this.svgHtml && (h("div", { class: "gux-icon-container", innerHTML: this.svgHtml })));
  }
  static get is() { return "gux-icon"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-icon.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-icon.css"]
    };
  }
  static get assetsDirs() { return ["icons"]; }
  static get properties() {
    return {
      "iconName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "(string & {}) | GuxIconIconName",
          "resolved": "GuxIconIconName | (string & {})",
          "references": {
            "GuxIconIconName": {
              "location": "import",
              "path": "./gux-icon.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicate which icon to display"
        },
        "attribute": "icon-name",
        "reflect": false
      },
      "decorative": {
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
          "text": "Indicate whether the icon should be ignored by accessibility tools or not"
        },
        "attribute": "decorative",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Localized text describing the intent of this icon (not required if `decorative=true`)"
        },
        "attribute": "screenreader-text",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
  static get states() {
    return {
      "svgHtml": {}
    };
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "iconName",
        "methodName": "prepIcon"
      }, {
        "propName": "decorative",
        "methodName": "watchDecorative"
      }, {
        "propName": "screenreaderText",
        "methodName": "watchScreenreaderText"
      }];
  }
}
