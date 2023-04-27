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
import { createPopper } from '@popperjs/core';
import { h } from '@stencil/core';
import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { onHiddenChange } from '../../../utils/dom/on-attribute-change';
import { trackComponent } from '@utils/tracking/usage';
import { getSlot } from '@utils/dom/get-slot';
/**
 * @slot - popover content
 * @slot title - Slot for popover title
 */
export class GuxPopover {
  constructor() {
    this.for = undefined;
    this.position = 'bottom';
    this.displayDismissButton = undefined;
    this.closeOnClickOutside = false;
    this.hidden = true;
  }
  hiddenHandler(hidden) {
    if (!hidden && !this.popperInstance) {
      this.runPopper();
    }
    else if (!hidden && this.popperInstance) {
      this.popperInstance.forceUpdate();
    }
  }
  checkForClickOutside(event) {
    const clickPath = event.composedPath();
    const forElement = document.getElementById(this.for);
    const clickedForElement = clickPath.includes(forElement);
    if ((this.closeOnClickOutside || !this.displayDismissButton) &&
      !this.hidden &&
      !clickedForElement) {
      this.dismiss();
    }
  }
  get titleSlot() {
    return getSlot(this.root, 'title');
  }
  runPopper() {
    const forElement = document.getElementById(this.for);
    if (!forElement) {
      console.error(`gux-popover: invalid "for" attribute. No element in page with the id "${this.for}"`);
    }
    else if (this.popupElement) {
      this.popperInstance = createPopper(forElement, this.popupElement, {
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              gpuAcceleration: false
            }
          },
          {
            name: 'offset',
            options: {
              offset: [0, 7]
            }
          },
          {
            name: 'arrow',
            options: {
              padding: 16
            }
          }
        ],
        placement: this.position
      });
    }
  }
  destroyPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }
  dismiss() {
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.setAttribute('hidden', '');
    }
  }
  connectedCallback() {
    trackComponent(this.root, { variant: this.position });
    this.hiddenObserver = onHiddenChange(this.root, (hidden) => {
      this.hidden = hidden;
    });
    this.hidden = this.root.hidden;
  }
  componentDidLoad() {
    this.runPopper();
  }
  disconnectedCallback() {
    this.destroyPopper();
    if (this.hiddenObserver) {
      this.hiddenObserver.disconnect();
    }
  }
  renderDismissButton() {
    if (this.displayDismissButton) {
      return (h("gux-dismiss-button", { onClick: this.dismiss.bind(this), position: "inherit" }));
    }
  }
  render() {
    return (h("div", { ref: (el) => (this.popupElement = el), class: "gux-popover-wrapper" }, h("div", { class: "gux-arrow", "data-popper-arrow": true }), h("div", { class: { 'gux-popover-header': Boolean(this.titleSlot) } }, h("slot", { name: "title" }), this.renderDismissButton()), h("div", { class: "gux-popover-content" }, h("slot", null))));
  }
  static get is() { return "gux-popover"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-popover.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-popover.css"]
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
          "original": "PopperPosition",
          "resolved": "\"bottom\" | \"bottom-end\" | \"bottom-start\" | \"left\" | \"left-end\" | \"left-start\" | \"right\" | \"right-end\" | \"right-start\" | \"top\" | \"top-end\" | \"top-start\"",
          "references": {
            "PopperPosition": {
              "location": "import",
              "path": "./gux-popover.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicate position of popover element arrow (follow popper js position attribute api)"
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
      }
    };
  }
  static get states() {
    return {
      "hidden": {}
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
  static get watchers() {
    return [{
        "propName": "hidden",
        "methodName": "hiddenHandler"
      }];
  }
}
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxPopover.prototype, "checkForClickOutside", null);
