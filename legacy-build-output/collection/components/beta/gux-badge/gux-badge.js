import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../i18n';
import translationResources from './i18n/en.json';
/**
 * @slot - Required slot for label
 */
export class GuxBadge {
  constructor() {
    this.color = 'neutral';
    this.bold = false;
    this.label = undefined;
  }
  onSlotChange(event) {
    const slotAssignedNodes = event.composedPath()[0].assignedNodes();
    this.label = slotAssignedNodes
      .map(nodeItem => nodeItem.textContent)
      .join('');
  }
  renderBadgeTitle() {
    return (h("gux-tooltip-title", null, h("span", null, h("slot", { "aria-hidden": "true", onSlotchange: this.onSlotChange.bind(this) }))));
  }
  renderSrText() {
    return (h("div", { class: "gux-sr-only" }, this.i18n(this.getVariant(), {
      label: this.label
    })));
  }
  getVariant() {
    return `${this.color}${this.bold ? '-bold' : ''}`;
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("div", { class: {
        'gux-badge': true,
        [`gux-${this.color}`]: true,
        'gux-bold': this.bold
      } }, this.renderBadgeTitle(), this.renderSrText()));
  }
  static get is() { return "gux-badge-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-badge.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-badge.css"]
    };
  }
  static get properties() {
    return {
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxBadgeColor",
          "resolved": "\"green\" | \"inherit\" | \"neutral\" | \"red\" | \"yellow\"",
          "references": {
            "GuxBadgeColor": {
              "location": "import",
              "path": "./gux-badge.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Badge background color."
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'neutral'"
      },
      "bold": {
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
          "text": "Bold badge."
        },
        "attribute": "bold",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "label": {}
    };
  }
  static get elementRef() { return "root"; }
}
