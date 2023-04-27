var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { forceUpdate, h } from '@stencil/core';
import { OnMutation } from '../../../utils/decorator/on-mutation';
import { OnResize } from '../../../utils/decorator/on-resize';
import { getTextContentFromNodes } from '../../../utils/dom/get-text-content-from-nodes';
/**
 * @slot - text node or element containing text to truncate
 */
export class GuxTruncate {
  constructor() {
    this.maxLines = undefined;
  }
  async setShowTooltip() {
    var _a;
    await ((_a = this.tooltipElement) === null || _a === void 0 ? void 0 : _a.showTooltip());
  }
  async setHideTooltip() {
    var _a;
    await ((_a = this.tooltipElement) === null || _a === void 0 ? void 0 : _a.hideTooltip());
  }
  onMutation() {
    forceUpdate(this.root);
  }
  onResize() {
    forceUpdate(this.root);
  }
  getTooltipContent() {
    return getTextContentFromNodes(Array.from(this.root.childNodes)) || '';
  }
  needsTruncation() {
    const slotContainerElement = this.root.shadowRoot.querySelector('.gux-truncate-slot-container');
    return ((slotContainerElement === null || slotContainerElement === void 0 ? void 0 : slotContainerElement.scrollWidth) > (slotContainerElement === null || slotContainerElement === void 0 ? void 0 : slotContainerElement.offsetWidth) ||
      (slotContainerElement === null || slotContainerElement === void 0 ? void 0 : slotContainerElement.scrollHeight) > (slotContainerElement === null || slotContainerElement === void 0 ? void 0 : slotContainerElement.offsetHeight));
  }
  renderTooltip() {
    if (this.needsTruncation()) {
      return (h("gux-tooltip", { "aria-hidden": "true", ref: el => (this.tooltipElement = el) }, this.getTooltipContent()));
    }
    return null;
  }
  render() {
    var _a;
    return (h("div", { class: {
        'gux-truncate-multi-line': Boolean(this.maxLines)
      } }, h("span", { class: "gux-truncate-slot-container", style: { webkitLineClamp: (_a = this.maxLines) === null || _a === void 0 ? void 0 : _a.toString() } }, h("slot", null)), this.renderTooltip()));
  }
  static get is() { return "gux-truncate-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-truncate.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-truncate.css"]
    };
  }
  static get properties() {
    return {
      "maxLines": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Lines to wrap before truncating"
        },
        "attribute": "max-lines",
        "reflect": false
      }
    };
  }
  static get methods() {
    return {
      "setShowTooltip": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "setHideTooltip": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
}
__decorate([
  OnMutation({ childList: true, subtree: true, characterData: true })
], GuxTruncate.prototype, "onMutation", null);
__decorate([
  OnResize()
], GuxTruncate.prototype, "onResize", null);
