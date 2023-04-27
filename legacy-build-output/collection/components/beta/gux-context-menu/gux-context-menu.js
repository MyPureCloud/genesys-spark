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
import { h, Host } from '@stencil/core';
import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from 'i18n';
import translationResources from './i18n/en.json';
import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { afterNextRender } from '../../../utils/dom/after-next-render';
import { whenEventIsFrom } from '../../../utils/dom/when-event-is-from';
export class GuxContextMenu {
  constructor() {
    this.buttonId = randomHTMLId();
    this.screenreaderText = '';
    this.isOpen = false;
  }
  /**
   * Updates the state on click outside the element
   */
  onClickOutside() {
    this.isOpen = false;
  }
  // Note(E.Yankova): keydown handler
  // reference: https://www.w3.org/WAI/ARIA/apg/example-index/menu-button/menu-button-actions-active-descendant
  // section: "Keyboard Support" and "Menu"
  handleKeyDown(event) {
    const isListEvent = event.composedPath().includes(this.listElement);
    const isButtonEvent = event.composedPath().includes(this.button);
    switch (event.key) {
      case 'Escape': {
        if (isListEvent) {
          event.preventDefault();
          this.isOpen = false;
          this.button.focus();
        }
        break;
      }
      case 'Tab': {
        this.isOpen = false;
        break;
      }
      case 'ArrowDown':
      case 'Enter': {
        if (isButtonEvent && !this.isOpen) {
          event.preventDefault();
          this.isOpen = true;
          this.focusFirstListItem();
        }
        break;
      }
      case 'ArrowUp': {
        if (isButtonEvent && !this.isOpen) {
          event.preventDefault();
          this.isOpen = true;
          this.focusLastListItem();
        }
        break;
      }
    }
  }
  handleKeyup(event) {
    switch (event.key) {
      case ' ': {
        if (event.composedPath().includes(this.button)) {
          event.preventDefault();
          this.isOpen = true;
          this.focusFirstListItem();
        }
        break;
      }
    }
  }
  focusFirstListItem() {
    afterNextRender(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }
  focusLastListItem() {
    afterNextRender(() => {
      void this.listElement.guxFocusLastItem();
    });
  }
  onButtonClick() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.focusFirstListItem();
    }
  }
  onListClick(event) {
    whenEventIsFrom('gux-list-item', event, () => {
      this.isOpen = false;
      this.button.focus();
    });
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h(Host, null, h("gux-popup-beta", { expanded: this.isOpen }, h("div", { slot: "target", class: "gux-button-container" }, h("gux-button-slot-beta", { accent: "ghost" }, h("button", { type: "button", onClick: () => this.onButtonClick(), id: this.buttonId, ref: el => (this.button = el), "aria-haspopup": "true", "aria-expanded": this.isOpen.toString() }, h("gux-icon", { "icon-name": "menu-kebab-vertical", "screenreader-text": this.screenreaderText ||
        this.i18n('contextMenuScreenreaderText') })))), h("div", { slot: "popup", class: "gux-list-container" }, h("gux-list", { onClick: e => this.onListClick(e), ref: el => (this.listElement = el) }, h("slot", null))))));
  }
  static get is() { return "gux-context-menu-beta"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-context-menu.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-context-menu.css"]
    };
  }
  static get properties() {
    return {
      "screenreaderText": {
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
          "text": "Screenreader text for context menu button\ndefaults to \"context menu\""
        },
        "attribute": "screenreader-text",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
  static get states() {
    return {
      "isOpen": {}
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleKeyDown",
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
  OnClickOutside({ triggerEvents: 'click' })
], GuxContextMenu.prototype, "onClickOutside", null);
