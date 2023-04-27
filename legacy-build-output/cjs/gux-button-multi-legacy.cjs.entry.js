'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const onClickOutside = require('./on-click-outside-2c616788.js');

const guxButtonMultiCss = ":host{display:block;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-button-multi-container .gux-dropdown-button button>*{vertical-align:middle}.gux-button-multi-container .gux-dropdown-button button gux-icon{width:16px;height:16px;margin-left:8px}";

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
const GuxButtonMultiLegacy = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.open = index.createEvent(this, "open", 7);
    this.close = index.createEvent(this, "close", 7);
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
    usage.trackComponent(this.root, { variant: this.accent });
  }
  render() {
    return (index.h("gux-popup", { expanded: this.isOpen, disabled: this.disabled }, index.h("div", { slot: "target", class: "gux-button-multi-container" }, index.h("gux-button-slot-beta", { class: "gux-dropdown-button", accent: this.accent }, index.h("button", { type: "button", disabled: this.disabled, ref: el => (this.dropdownButton = el), onClick: () => this.toggle(), "aria-haspopup": "true", "aria-expanded": this.isOpen.toString() }, index.h("span", null, this.text), index.h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })))), index.h("gux-action-list-legacy", { slot: "popup", ref: el => (this.listElement = el) }, index.h("slot", null))));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["watchDisabled"],
    "isOpen": ["watchValue"]
  }; }
};
__decorate([
  onClickOutside.OnClickOutside({ triggerEvents: 'mousedown' })
], GuxButtonMultiLegacy.prototype, "onClickOutside", null);
GuxButtonMultiLegacy.style = guxButtonMultiCss;

exports.gux_button_multi_legacy = GuxButtonMultiLegacy;
