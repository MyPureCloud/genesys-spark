import { r as registerInstance, e as createEvent, h, g as getElement } from './index-f583fcde.js';
import { O as OnClickOutside } from './on-click-outside-c96e7b47.js';
import { w as whenEventIsFrom } from './when-event-is-from-18667084.js';
import { a as afterNextRenderTimeout } from './after-next-render-ed0f7dcd.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import './get-closest-element-1597503c.js';

const actionButtonDropdown = "Dropdown for {buttonTitle}";
const defaultResources = {
	actionButtonDropdown: actionButtonDropdown
};

const guxActionButtonCss = ":host{display:block;-webkit-user-select:none;user-select:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-action-button-container{min-width:128px}.gux-action-button-container>*{vertical-align:middle}.gux-action-button-container .gux-action-button{width:calc(100% - 33px);margin-right:1px}.gux-action-button-container .gux-action-button button{width:100%;max-width:none;text-align:center;border-top-right-radius:0;border-bottom-right-radius:0}.gux-action-button-container .gux-dropdown-button button{width:32px;min-width:0;padding:0;border-top-left-radius:0;border-bottom-left-radius:0}.gux-action-button-container .gux-dropdown-button button gux-icon{width:16px;height:16px}.gux-action-button-container .gux-list-container{padding:8px 0;margin:0;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}";

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
const GuxActionButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.open = createEvent(this, "open", 7);
    this.close = createEvent(this, "close", 7);
    this.actionClick = createEvent(this, "actionClick", 7);
    this.type = 'button';
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
  onClickOutside(event) {
    if (event.relatedTarget === null) {
      this.isOpen = false;
    }
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
      this.listElement.focus && this.listElement.focus();
    });
  }
  focusFirstItemInPopupList() {
    afterNextRenderTimeout(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }
  onActionClick() {
    if (!this.disabled) {
      this.isOpen = false;
      this.actionClick.emit();
    }
  }
  onListClick(event) {
    whenEventIsFrom('gux-list-item', event, () => {
      this.isOpen = false;
      this.dropdownButton.focus();
    });
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.type });
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
  }
  render() {
    return (h("div", { class: "gux-action-button-container" }, h("gux-popup-beta", { expanded: this.isOpen, disabled: this.disabled }, h("div", { slot: "target", class: "gux-action-button-container" }, h("gux-button-slot-beta", { class: "gux-action-button", accent: this.accent }, h("button", { type: this.type, disabled: this.disabled, onClick: () => this.onActionClick() }, this.text)), h("gux-button-slot-beta", { class: "gux-dropdown-button", accent: this.accent }, h("button", { type: "button", disabled: this.disabled, ref: el => (this.dropdownButton = el), onMouseUp: () => this.toggle(), "aria-haspopup": "true", "aria-expanded": this.isOpen.toString(), "aria-label": this.i18n('actionButtonDropdown', {
        buttonTitle: this.text
      }) }, h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })))), h("div", { class: "gux-list-container", slot: "popup" }, h("gux-list", { onClick: (e) => this.onListClick(e), ref: el => (this.listElement = el) }, h("slot", null))))));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["watchDisabled"],
    "isOpen": ["watchValue"]
  }; }
};
__decorate([
  OnClickOutside({ triggerEvents: 'click' })
], GuxActionButton.prototype, "onClickOutside", null);
GuxActionButton.style = guxActionButtonCss;

export { GuxActionButton as gux_action_button };
