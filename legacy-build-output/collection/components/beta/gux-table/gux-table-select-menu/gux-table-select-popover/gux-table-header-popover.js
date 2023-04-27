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
import { OnClickOutside } from '../../../../../utils/decorator/on-click-outside';
import { onHiddenChange } from '../../../../../utils/dom/on-attribute-change';
/**
 * @slot - popover content
 */
export class GuxTableSelectPopover {
  constructor() {
    this.for = undefined;
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
    if (this.closeOnClickOutside && !this.hidden && !clickedForElement) {
      this.dismiss();
    }
  }
  runPopper() {
    const forElement = document.getElementById(this.for);
    if (this.popupElement) {
      this.popperInstance = createPopper(forElement, this.popupElement, {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [-20, 0]
            }
          }
        ],
        placement: 'bottom-start'
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
  render() {
    return (h("div", { ref: (el) => (this.popupElement = el), class: "gux-popover-wrapper" }, h("div", { class: "gux-popover-content" }, h("slot", null))));
  }
  static get is() { return "gux-table-select-popover"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-table-select-popover.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-table-select-popover.css"]
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
], GuxTableSelectPopover.prototype, "checkForClickOutside", null);
