import { r as registerInstance, h, j as Host, g as getElement } from './index-f583fcde.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { O as OnClickOutside } from './on-click-outside-c96e7b47.js';
import { b as afterNextRender } from './after-next-render-ed0f7dcd.js';
import { w as whenEventIsFrom } from './when-event-is-from-18667084.js';
import './get-closest-element-1597503c.js';

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
    registerInstance(this, hostRef);
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
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
};
__decorate([
  OnClickOutside({ triggerEvents: 'click' })
], GuxContextMenu.prototype, "onClickOutside", null);
GuxContextMenu.style = guxContextMenuCss;

export { GuxContextMenu as gux_context_menu_beta };
