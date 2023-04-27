import { r as registerInstance, h, H as Host, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { O as OnClickOutside } from './on-click-outside-8fa334c9.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { b as afterNextRender } from './after-next-render-ed0f7dcd.js';
import './get-closest-element-1597503c.js';

const additionalActions = "Additional Actions";
const translationResources = {
	additionalActions: additionalActions
};

const guxTableToolbarMenuButtonCss = ":host{display:none;-webkit-user-select:none;user-select:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}:host(.gux-show-menu){display:block}>*{vertical-align:middle}.gux-menu-button button{color:#2e394c;cursor:grab;background-color:#e2e6ee;border:none}.gux-menu-button button gux-icon{width:16px;height:16px}.gux-list-container{width:fit-content;padding:8px 0;margin:0;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}";

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
const GuxTableToolbarMenuButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.showMenu = undefined;
    this.expanded = false;
  }
  handleKeyDown(event) {
    const composedPath = event.composedPath();
    switch (event.key) {
      case 'Escape':
        this.expanded = false;
        if (composedPath.includes(this.listElement)) {
          event.preventDefault();
          this.dropdownButton.focus();
        }
        break;
      case 'Tab': {
        this.expanded = false;
        break;
      }
      case 'ArrowDown':
      case 'Enter':
        if (composedPath.includes(this.dropdownButton)) {
          event.preventDefault();
          this.expanded = true;
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
          this.expanded = true;
          this.focusFirstItemInPopupList();
        }
        break;
      }
    }
  }
  toggle() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.focusPopupList();
    }
  }
  onClickOutside() {
    this.expanded = false;
  }
  focusPopupList() {
    afterNextRender(() => {
      this.listElement.focus();
    });
  }
  focusFirstItemInPopupList() {
    afterNextRender(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    trackComponent(this.root);
  }
  render() {
    return (h(Host, { class: { 'gux-show-menu': this.showMenu } }, h("gux-popup-beta", { expanded: this.expanded }, h("div", { slot: "target", class: "gux-toolbar-menu-container" }, h("gux-button-slot-beta", { class: "gux-menu-button" }, h("button", { type: "button", ref: el => (this.dropdownButton = el), onMouseUp: () => this.toggle(), "aria-haspopup": "true", "aria-expanded": this.expanded.toString() }, h("gux-icon", { "screenreader-text": this.i18n('additionalActions'), "icon-name": "menu-kebab-horizontal" })))), h("div", { class: "gux-list-container", slot: "popup" }, h("gux-list", { ref: el => (this.listElement = el) }, h("slot", null))))));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
};
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxTableToolbarMenuButton.prototype, "onClickOutside", null);
GuxTableToolbarMenuButton.style = guxTableToolbarMenuButtonCss;

export { GuxTableToolbarMenuButton as gux_table_toolbar_menu_button };
