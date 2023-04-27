'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
const onClickOutside = require('./on-click-outside-2c616788.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const whenEventIsFrom = require('./when-event-is-from-69b5ca13.js');
require('./get-closest-element-ab4b2eee.js');

const contextMenuScreenreaderText = "Context menu";
const translationResources = {
	contextMenuScreenreaderText: contextMenuScreenreaderText
};

const guxContextMenuCss = ":host{display:block;max-width:fit-content}gux-icon{width:16px;height:16px;color:#6b7585}.gux-list-container{width:128px;padding:8px 0;margin:0;text-align:left;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const GuxContextMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.buttonId = randomHtmlId.randomHTMLId();
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
    afterNextRender.afterNextRender(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }
  focusLastListItem() {
    afterNextRender.afterNextRender(() => {
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
    whenEventIsFrom.whenEventIsFrom('gux-list-item', event, () => {
      this.isOpen = false;
      this.button.focus();
    });
  }
  async componentWillLoad() {
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (index.h(index.Host, null, index.h("gux-popup-beta", { expanded: this.isOpen }, index.h("div", { slot: "target", class: "gux-button-container" }, index.h("gux-button-slot-beta", { accent: "ghost" }, index.h("button", { type: "button", onClick: () => this.onButtonClick(), id: this.buttonId, ref: el => (this.button = el), "aria-haspopup": "true", "aria-expanded": this.isOpen.toString() }, index.h("gux-icon", { "icon-name": "menu-kebab-vertical", "screenreader-text": this.screenreaderText ||
        this.i18n('contextMenuScreenreaderText') })))), index.h("div", { slot: "popup", class: "gux-list-container" }, index.h("gux-list", { onClick: e => this.onListClick(e), ref: el => (this.listElement = el) }, index.h("slot", null))))));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
};
__decorate([
  onClickOutside.OnClickOutside({ triggerEvents: 'click' })
], GuxContextMenu.prototype, "onClickOutside", null);
GuxContextMenu.style = guxContextMenuCss;

exports.gux_context_menu_beta = GuxContextMenu;
