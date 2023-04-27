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
import { trackComponent } from '@utils/tracking/usage';
import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
export class GuxButtonMultiLegacy {
  constructor() {
    this.moveFocusDelay = 100;
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
          this.dropdownButton.focus();
        }
        break;
      case 'Tab': {
        this.isOpen = false;
        break;
      }
      case 'Enter':
        event.preventDefault();
        if (composedPath.includes(this.dropdownButton)) {
          this.isOpen = true;
          setTimeout(() => {
            void this.listElement.setFocusOnFirstItem();
          }, this.moveFocusDelay);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (composedPath.includes(this.dropdownButton)) {
          this.isOpen = true;
          setTimeout(() => {
            void this.listElement.setFocusOnFirstItem();
          }, this.moveFocusDelay);
        }
        break;
    }
  }
  handleKeyup(event) {
    const composedPath = event.composedPath();
    switch (event.key) {
      case ' ':
        event.preventDefault();
        if (composedPath.includes(this.dropdownButton)) {
          this.isOpen = true;
          setTimeout(() => {
            void this.listElement.setFocusOnFirstItem();
          }, this.moveFocusDelay);
        }
        break;
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
    }
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
  }
  render() {
    return (h("gux-popup", { expanded: this.isOpen, disabled: this.disabled }, h("div", { slot: "target", class: "gux-button-multi-container" }, h("gux-button-slot-beta", { class: "gux-dropdown-button", accent: this.accent }, h("button", { type: "button", disabled: this.disabled, ref: el => (this.dropdownButton = el), onClick: () => this.toggle(), "aria-haspopup": "true", "aria-expanded": this.isOpen.toString() }, h("span", null, this.text), h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })))), h("gux-action-list-legacy", { slot: "popup", ref: el => (this.listElement = el) }, h("slot", null))));
  }
  static get is() { return "gux-button-multi-legacy"; }
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
          "original": "GuxButtonAccent",
          "resolved": "\"primary\" | \"secondary\" | \"tertiary\"",
          "references": {
            "GuxButtonAccent": {
              "location": "import",
              "path": "../gux-action-button-legacy/gux-button.types"
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
], GuxButtonMultiLegacy.prototype, "onClickOutside", null);
