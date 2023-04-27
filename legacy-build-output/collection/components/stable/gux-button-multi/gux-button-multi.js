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
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { whenEventIsFrom } from '@utils/dom/when-event-is-from';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
import { getGuxButtonMultiAccent } from './gux-button-multi.types';
/**
 * @slot title - slot for icon and button text
 */
export class GuxButtonMulti {
  constructor() {
    this.text = undefined;
    this.disabled = false;
    this.accent = 'secondary';
    this.isOpen = false;
  }
  handleKeydown(event) {
    const composedPath = event.composedPath();
    switch (event.key) {
      case 'Escape':
        this.isOpen = false;
        if (composedPath.includes(this.listElement)) {
          event.preventDefault();
          this.dropdownButton.focus();
        }
        break;
      case 'Tab': {
        this.isOpen = false;
        break;
      }
      case 'ArrowDown':
      case 'Enter':
        if (composedPath.includes(this.dropdownButton)) {
          event.preventDefault();
          this.isOpen = true;
          this.focusFirstItemInPopupList();
        }
        break;
    }
  }
  handleKeyup(event) {
    switch (event.key) {
      case ' ': {
        const composedPath = event.composedPath();
        if (composedPath.includes(this.dropdownButton)) {
          this.isOpen = true;
          this.focusFirstItemInPopupList();
        }
        break;
      }
    }
  }
  watchDisabled(disabled) {
    if (disabled) {
      this.isOpen = false;
    }
  }
  watchValue(isOpen) {
    if (isOpen) {
      this.open.emit();
    }
    else {
      this.close.emit();
    }
  }
  onClickOutside() {
    this.isOpen = false;
  }
  toggle() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.focusPopupList();
      }
    }
  }
  focusPopupList() {
    afterNextRenderTimeout(() => {
      this.listElement.focus();
    });
  }
  focusFirstItemInPopupList() {
    afterNextRenderTimeout(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }
  onListClick(event) {
    whenEventIsFrom('gux-list-item', event, () => {
      this.isOpen = false;
      this.dropdownButton.focus();
    });
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
  }
  render() {
    return (h("gux-popup-beta", { expanded: this.isOpen }, h("div", { slot: "target", class: "gux-button-multi-container" }, h("gux-button-slot-beta", { class: "gux-dropdown-button", accent: getGuxButtonMultiAccent(this.accent) }, h("button", { type: "button", disabled: this.disabled, ref: el => (this.dropdownButton = el), onMouseUp: () => this.toggle(), "aria-haspopup": "true", "aria-expanded": this.isOpen.toString() }, h("slot", { name: "title" }, this.text), h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })))), h("div", { class: "gux-list-container", slot: "popup" }, h("gux-list", { onClick: (e) => this.onListClick(e), ref: el => (this.listElement = el) }, h("slot", null)))));
  }
  static get is() { return "gux-button-multi"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-button-multi.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-button-multi.css"]
    };
  }
  static get properties() {
    return {
      "text": {
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
          "text": "The component text."
        },
        "attribute": "text",
        "reflect": false
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
          "text": "Disables the action button."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "accent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxButtonMultiAccent",
          "resolved": "\"primary\" | \"secondary\" | \"tertiary\"",
          "references": {
            "GuxButtonMultiAccent": {
              "location": "import",
              "path": "./gux-button-multi.types"
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
        "defaultValue": "'secondary'"
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
          "text": "It is used to open or not the list."
        },
        "attribute": "is-open",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "open",
        "name": "open",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggered when the menu is open"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "close",
        "name": "close",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggered when the menu is close"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "disabled",
        "methodName": "watchDisabled"
      }, {
        "propName": "isOpen",
        "methodName": "watchValue"
      }];
  }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleKeydown",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keyup",
        "method": "handleKeyup",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxButtonMulti.prototype, "onClickOutside", null);
