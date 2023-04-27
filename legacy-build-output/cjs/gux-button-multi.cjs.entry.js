'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const onClickOutside = require('./on-click-outside-2c616788.js');
const whenEventIsFrom = require('./when-event-is-from-69b5ca13.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const usage = require('./usage-da9572bf.js');

const guxButtonMultiAccent = ['primary', 'secondary', 'tertiary'];
function getGuxButtonMultiAccent(maybeGuxButtonMultiAccent) {
  if (guxButtonMultiAccent.find(validType => validType === maybeGuxButtonMultiAccent)) {
    return maybeGuxButtonMultiAccent;
  }
  return 'secondary';
}

const guxButtonMultiCss = ":host{display:block;-webkit-user-select:none;user-select:none;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-button-multi-container .gux-dropdown-button button{display:inline-flex;align-items:center}.gux-button-multi-container .gux-dropdown-button button gux-icon{width:16px;height:16px;margin-left:8px}.gux-list-container{padding:8px 0;margin:0;list-style:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}";

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
const GuxButtonMulti = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.open = index.createEvent(this, "open", 7);
    this.close = index.createEvent(this, "close", 7);
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
    afterNextRender.afterNextRenderTimeout(() => {
      this.listElement.focus();
    });
  }
  focusFirstItemInPopupList() {
    afterNextRender.afterNextRenderTimeout(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }
  onListClick(event) {
    whenEventIsFrom.whenEventIsFrom('gux-list-item', event, () => {
      this.isOpen = false;
      this.dropdownButton.focus();
    });
  }
  componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.accent });
  }
  render() {
    return (index.h("gux-popup-beta", { expanded: this.isOpen }, index.h("div", { slot: "target", class: "gux-button-multi-container" }, index.h("gux-button-slot-beta", { class: "gux-dropdown-button", accent: getGuxButtonMultiAccent(this.accent) }, index.h("button", { type: "button", disabled: this.disabled, ref: el => (this.dropdownButton = el), onMouseUp: () => this.toggle(), "aria-haspopup": "true", "aria-expanded": this.isOpen.toString() }, index.h("slot", { name: "title" }, this.text), index.h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })))), index.h("div", { class: "gux-list-container", slot: "popup" }, index.h("gux-list", { onClick: (e) => this.onListClick(e), ref: el => (this.listElement = el) }, index.h("slot", null)))));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["watchDisabled"],
    "isOpen": ["watchValue"]
  }; }
};
__decorate([
  onClickOutside.OnClickOutside({ triggerEvents: 'mousedown' })
], GuxButtonMulti.prototype, "onClickOutside", null);
GuxButtonMulti.style = guxButtonMultiCss;

exports.gux_button_multi = GuxButtonMulti;
