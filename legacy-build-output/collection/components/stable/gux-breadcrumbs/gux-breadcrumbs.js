import { h, forceUpdate } from '@stencil/core';
import { buildI18nForComponent } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import breadcrumbsResources from './i18n/en.json';
/**
 * @slot - collection of gux-breadcrumb-item elements
 */
export class GuxBreadcrumbs {
  constructor() {
    this.accent = 'primary';
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
  }
  async componentWillRender() {
    this.i18n = await buildI18nForComponent(this.root, breadcrumbsResources);
  }
  onSlotChange() {
    Array.from(this.root.children).forEach(child => forceUpdate(child));
  }
  render() {
    return (h("nav", { "aria-label": this.i18n('breadcrumbs'), class: "gux-breadcrumbs-container" }, h("slot", { onSlotchange: this.onSlotChange.bind(this) })));
  }
  static get is() { return "gux-breadcrumbs"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-breadcrumbs.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-breadcrumbs.css"]
    };
  }
  static get properties() {
    return {
      "accent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxBreadcrumbAccent",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "GuxBreadcrumbAccent": {
              "location": "import",
              "path": "./gux-breadcrumbs.types"
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
        "defaultValue": "'primary'"
      }
    };
  }
  static get elementRef() { return "root"; }
}
