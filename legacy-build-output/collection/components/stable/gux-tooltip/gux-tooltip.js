import { h, Host } from '@stencil/core';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
import { findElementById } from '@utils/dom/find-element-by-id';
import { afterNextRender } from '@utils/dom/after-next-render';
/**
 * @slot - Content of the tooltip
 */
export class GuxTooltip {
  constructor() {
    this.pointerenterHandler = () => this.show();
    this.pointerleaveHandler = () => this.hide();
    this.focusinHandler = () => this.show();
    this.focusoutHandler = () => this.hide();
    this.id = randomHTMLId('gux-tooltip');
    this.for = undefined;
    this.placement = 'bottom-start';
    this.isShown = false;
  }
  handleKeyDown(event) {
    if (event.key === 'Escape' && this.isShown) {
      this.hide();
    }
  }
  /*
   * Show tooltip
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async showTooltip() {
    this.show();
  }
  /*
   * Hide tooltip
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async hideTooltip() {
    this.hide();
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = autoUpdate(this.forElement, this.root, () => this.updatePosition(), {
      ancestorScroll: true,
      elementResize: true,
      animationFrame: false,
      ancestorResize: true
    });
  }
  updatePosition() {
    void computePosition(this.forElement, this.root, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: [offset(16), flip(), shift()]
    }).then(({ x, y, placement }) => {
      Object.assign(this.root.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      // data-placement is currently only used for e2e tests
      this.root.setAttribute('data-placement', placement);
    });
  }
  show() {
    this.isShown = true;
    afterNextRender(() => {
      this.runUpdatePosition();
    });
  }
  hide() {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
    this.isShown = false;
  }
  getForElement() {
    if (this.for) {
      this.forElement = findElementById(this.root, this.for);
    }
    else {
      this.forElement = this.root.parentElement;
    }
  }
  logForAttributeError() {
    if (this.root.isConnected) {
      console.error(`gux-tooltip: invalid element supplied to 'for': "${this.for}"`);
    }
  }
  connectedCallback() {
    this.getForElement();
    if (this.forElement) {
      this.forElement.setAttribute('aria-describedby', this.id);
      this.forElement.addEventListener('pointerenter', this.pointerenterHandler);
      this.forElement.addEventListener('pointerleave', this.pointerleaveHandler);
      this.forElement.addEventListener('focusin', this.focusinHandler);
      this.forElement.addEventListener('focusout', this.focusoutHandler);
    }
    else {
      this.logForAttributeError();
    }
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  disconnectedCallback() {
    var _a, _b, _c, _d, _e;
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
    (_a = this.forElement) === null || _a === void 0 ? void 0 : _a.removeAttribute('aria-describedby');
    (_b = this.forElement) === null || _b === void 0 ? void 0 : _b.removeEventListener('pointerenter', this.pointerenterHandler);
    (_c = this.forElement) === null || _c === void 0 ? void 0 : _c.removeEventListener('pointerleave', this.pointerleaveHandler);
    (_d = this.forElement) === null || _d === void 0 ? void 0 : _d.removeEventListener('focusin', this.focusinHandler);
    (_e = this.forElement) === null || _e === void 0 ? void 0 : _e.removeEventListener('focusout', this.focusoutHandler);
  }
  render() {
    return (h(Host, { id: this.id, class: { 'gux-show': this.isShown }, role: "tooltip" }, h("div", { class: "gux-container" }, h("slot", null))));
  }
  static get is() { return "gux-tooltip"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tooltip.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tooltip.css"]
    };
  }
  static get properties() {
    return {
      "for": {
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
          "text": "Indicates the id of the element the popover should anchor to. (If not supplied the parent element is used)"
        },
        "attribute": "for",
        "reflect": false
      },
      "placement": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "Placement",
          "resolved": "\"bottom\" | \"bottom-end\" | \"bottom-start\" | \"left\" | \"left-end\" | \"left-start\" | \"right\" | \"right-end\" | \"right-start\" | \"top\" | \"top-end\" | \"top-start\"",
          "references": {
            "Placement": {
              "location": "import",
              "path": "@floating-ui/dom"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Placement of the tooltip. Default is bottom-start"
        },
        "attribute": "placement",
        "reflect": false,
        "defaultValue": "'bottom-start'"
      }
    };
  }
  static get states() {
    return {
      "isShown": {}
    };
  }
  static get methods() {
    return {
      "showTooltip": {
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
      "hideTooltip": {
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
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleKeyDown",
        "target": "window",
        "capture": false,
        "passive": true
      }];
  }
}
