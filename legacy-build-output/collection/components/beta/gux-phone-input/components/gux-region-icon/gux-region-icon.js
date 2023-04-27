import { getAssetPath, h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
export class GuxRegionIcon {
  constructor() {
    this.region = undefined;
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  render() {
    var _a;
    const regionFlagImgPath = getAssetPath('assets/sprites/region-flags.png');
    return (h("span", { class: 'flag flag-' + ((_a = this.region) === null || _a === void 0 ? void 0 : _a.toLowerCase()), style: { backgroundImage: `url(${regionFlagImgPath})` } }));
  }
  static get is() { return "gux-region-icon"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["assets/sprites/region-flags.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["./assets/sprites/region-flags.css"]
    };
  }
  static get assetsDirs() { return ["assets"]; }
  static get properties() {
    return {
      "region": {
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
          "text": ""
        },
        "attribute": "region",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "root"; }
}
