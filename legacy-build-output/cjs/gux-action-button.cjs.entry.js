'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const onClickOutside = require('./on-click-outside-2c616788.js');
const whenEventIsFrom = require('./when-event-is-from-69b5ca13.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const guxActionButtonAccent = [
  'primary',
  'secondary',
  'tertiary',
  'danger'
];
function getGuxActionButtonAccent(maybeGuxActionButtonAccent) {
  if (guxActionButtonAccent.find(validType => validType === maybeGuxActionButtonAccent)) {
    return maybeGuxActionButtonAccent;
  }
  return 'secondary';
}

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
    index.registerInstance(this, hostRef);
    this.open = index.createEvent(this, "open", 7);
    this.close = index.createEvent(this, "close", 7);
    this.actionClick = index.createEvent(this, "actionClick", 7);
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
    afterNextRender.afterNextRenderTimeout(() => {
      this.listElement.focus && this.listElement.focus();
    });
  }
  focusFirstItemInPopupList() {
    afterNextRender.afterNextRenderTimeout(() => {
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
    whenEventIsFrom.whenEventIsFrom('gux-list-item', event, () => {
      this.isOpen = false;
      this.dropdownButton.focus();
    });
  }
  async componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.type });
    this.i18n = await index$1.buildI18nForComponent(this.root, defaultResources);
  }
  render() {
    return (index.h("div", { class: "gux-action-button-container" }, index.h("gux-popup-beta", { expanded: this.isOpen, disabled: this.disabled }, index.h("div", { slot: "target", class: "gux-action-button-container" }, index.h("gux-button-slot-beta", { class: "gux-action-button", accent: getGuxActionButtonAccent(this.accent) }, index.h("button", { type: this.type, disabled: this.disabled, onClick: () => this.onActionClick() }, this.text)), index.h("gux-button-slot-beta", { class: "gux-dropdown-button", accent: getGuxActionButtonAccent(this.accent) }, index.h("button", { type: "button", disabled: this.disabled, ref: el => (this.dropdownButton = el), onMouseUp: () => this.toggle(), "aria-haspopup": "true", "aria-expanded": this.isOpen.toString(), "aria-label": this.i18n('actionButtonDropdown', {
        buttonTitle: this.text
      }) }, index.h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })))), index.h("div", { class: "gux-list-container", slot: "popup" }, index.h("gux-list", { onClick: (e) => this.onListClick(e), ref: el => (this.listElement = el) }, index.h("slot", null))))));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["watchDisabled"],
    "isOpen": ["watchValue"]
  }; }
};
__decorate([
  onClickOutside.OnClickOutside({ triggerEvents: 'click' })
], GuxActionButton.prototype, "onClickOutside", null);
GuxActionButton.style = guxActionButtonCss;

exports.gux_action_button = GuxActionButton;
