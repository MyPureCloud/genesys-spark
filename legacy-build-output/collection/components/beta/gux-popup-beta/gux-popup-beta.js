import { h } from '@stencil/core';
import { autoUpdate, computePosition, flip, offset, size } from '@floating-ui/dom';
/**
 * @slot target - Required slot for target
 * @slot popup - Required slot for popup
 */
export class GuxPopupBeta {
  constructor() {
    this.expanded = false;
    this.disabled = false;
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = autoUpdate(this.targetElementContainer, this.popupElementContainer, () => this.updatePosition(), {
      ancestorScroll: true,
      elementResize: true,
      animationFrame: true,
      ancestorResize: true
    });
  }
  updatePosition() {
    if (this.targetElementContainer && this.popupElementContainer) {
      const popupElementContainer = this.popupElementContainer;
      void computePosition(this.targetElementContainer, this.popupElementContainer, {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [
          offset(2),
          size({
            apply({ rects }) {
              Object.assign(popupElementContainer.style, {
                width: `${rects.reference.width}px`
              });
            }
          }),
          flip()
        ]
      }).then(({ x, y }) => {
        Object.assign(this.popupElementContainer.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }
  }
  onExpandedChange(expanded) {
    if (expanded) {
      this.internalexpanded.emit();
    }
    else {
      this.internalcollapsed.emit();
    }
  }
  componentDidLoad() {
    if (this.expanded) {
      this.runUpdatePosition();
    }
  }
  componentDidUpdate() {
    if (this.expanded) {
      this.runUpdatePosition();
    }
    else if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }
  disconnectedCallback() {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }
  render() {
    return (h("div", { class: {
        'gux-target-container': true,
        'gux-disabled': this.disabled
      }, ref: (el) => (this.targetElementContainer = el) }, h("slot", { name: "target" }), h("div", { class: {
        'gux-popup-container': true,
        'gux-expanded': this.expanded && !this.disabled
      }, ref: (el) => (this.popupElementContainer = el) }, h("slot", { name: "popup" }))));
  }
  static get is() { return "gux-popup-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-popup-beta.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-popup-beta.css"]
    };
  }
  static get properties() {
    return {
      "expanded": {
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
          "text": ""
        },
        "attribute": "expanded",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
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
          "text": ""
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "internalexpanded",
        "name": "internalexpanded",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This event will run when the popup transitions to an expanded state."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "internalcollapsed",
        "name": "internalcollapsed",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This event will run when the popup transitions to a collapsed state."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "expanded",
        "methodName": "onExpandedChange"
      }];
  }
}
