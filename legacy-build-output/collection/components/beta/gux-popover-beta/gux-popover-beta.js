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
import { h } from '@stencil/core';
import { autoUpdate, computePosition, arrow, flip, offset, shift } from '@floating-ui/dom';
import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { trackComponent } from '@utils/tracking/usage';
import { getSlot } from '@utils/dom/get-slot';
import { findElementById } from '@utils/dom/find-element-by-id';
/**
 * @slot - popover content
 * @slot title - Slot for popover title
 */
export class GuxPopoverBeta {
  constructor() {
    this.for = undefined;
    this.position = 'bottom';
    this.displayDismissButton = undefined;
    this.closeOnClickOutside = false;
    this.isOpen = false;
  }
  checkForClickOutside(event) {
    const clickPath = event.composedPath();
    const forElement = findElementById(this.root, this.for);
    const clickedForElement = clickPath.includes(forElement);
    if ((this.closeOnClickOutside || !this.displayDismissButton) &&
      this.isOpen &&
      !clickedForElement) {
      this.dismiss();
    }
  }
  get titleSlot() {
    return getSlot(this.root, 'title');
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = autoUpdate(findElementById(this.root, this.for), this.popupElement, () => this.updatePosition(), {
      ancestorScroll: true,
      elementResize: true,
      animationFrame: true,
      ancestorResize: true
    });
  }
  updatePosition() {
    const forElement = findElementById(this.root, this.for);
    // This is 13 because this makes the arrow look aligned
    const arrowLen = 13;
    if (this.popupElement) {
      void computePosition(forElement, this.popupElement, {
        placement: this.position,
        middleware: [
          offset(7),
          flip(),
          shift(),
          arrow({
            element: this.arrowElement,
            padding: 16
          })
        ]
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(this.popupElement.style, {
          left: `${x}px`,
          top: `${y}px`
        });
        const side = placement.split('-')[0];
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right'
        }[side];
        if (middlewareData.arrow) {
          const { x, y } = middlewareData.arrow;
          this.popupElement.setAttribute('data-placement', placement);
          Object.assign(this.arrowElement.style, {
            left: x != null ? `${x}px` : '',
            top: y != null ? `${y}px` : '',
            right: '',
            bottom: '',
            [staticSide]: `${-arrowLen / 2}px`,
            transform: 'rotate(45deg)'
          });
        }
      });
    }
  }
  dismiss() {
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.isOpen = false;
    }
  }
  connectedCallback() {
    trackComponent(this.root, { variant: this.position });
  }
  componentDidLoad() {
    if (this.isOpen) {
      this.runUpdatePosition();
    }
  }
  componentDidUpdate() {
    if (this.isOpen) {
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
  renderDismissButton() {
    if (this.displayDismissButton) {
      return (h("gux-dismiss-button", { onClick: this.dismiss.bind(this), position: "inherit" }));
    }
  }
  render() {
    return (h("div", { ref: (el) => (this.popupElement = el), class: {
        'gux-hidden': !this.isOpen,
        'gux-popover-wrapper': true
      }, "data-placement": true }, h("div", { ref: (el) => (this.arrowElement = el), class: "gux-arrow" }), h("div", { class: { 'gux-popover-header': Boolean(this.titleSlot) } }, h("slot", { name: "title" }), this.renderDismissButton()), h("div", { class: "gux-popover-content" }, h("slot", null))));
  }
  static get is() { return "gux-popover-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-popover-beta.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-popover-beta.css"]
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
          "text": "Indicates the id of the element the popover should anchor to"
        },
        "attribute": "for",
        "reflect": false
      },
      "position": {
        "type": "string",
        "mutable": false,
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
          "text": "Indicate position of popover element arrow (follow floating ui placement attribute api)"
        },
        "attribute": "position",
        "reflect": false,
        "defaultValue": "'bottom'"
      },
      "displayDismissButton": {
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
          "text": "Indicate if the dismiss button is displayed"
        },
        "attribute": "display-dismiss-button",
        "reflect": false
      },
      "closeOnClickOutside": {
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
          "text": "Close popover when the user clicks outside of its bounds"
        },
        "attribute": "close-on-click-outside",
        "reflect": false,
        "defaultValue": "false"
      },
      "isOpen": {
        "type": "boolean",
        "mutable": true,
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
        "attribute": "is-open",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "guxdismiss",
        "name": "guxdismiss",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Fired when a user dismisses the popover"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
}
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxPopoverBeta.prototype, "checkForClickOutside", null);
