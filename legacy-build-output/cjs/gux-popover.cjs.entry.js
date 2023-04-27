'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const onClickOutside = require('./on-click-outside-2c616788.js');
const onAttributeChange = require('./on-attribute-change-37556263.js');
const usage = require('./usage-da9572bf.js');
const getSlot = require('./get-slot-097ade01.js');
const popper = require('./popper-6eb3f461.js');

const guxPopoverCss = ":host{color:#2e394c}.gux-popover-wrapper{z-index:var(--gux-zindex-popover, 2);display:inline-block;padding:16px;background-color:#fdfdfd;border-radius:4px;box-shadow:0 3px 14px rgba(46, 57, 76, 0.22)}.gux-popover-wrapper .gux-arrow,.gux-popover-wrapper .gux-arrow::before{position:absolute;width:10px;height:10px;background:inherit}.gux-popover-wrapper .gux-arrow{visibility:hidden}.gux-popover-wrapper .gux-arrow::before{visibility:visible;content:'';transform:rotate(45deg)}.gux-popover-wrapper[data-popper-placement='bottom'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='bottom-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='bottom-end'] .gux-arrow{top:-5px}.gux-popover-wrapper[data-popper-placement='top'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='top-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='top-end'] .gux-arrow{bottom:-5px}.gux-popover-wrapper[data-popper-placement='left'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='left-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='left-end'] .gux-arrow{right:-5px}.gux-popover-wrapper[data-popper-placement='right'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='right-start'] .gux-arrow,.gux-popover-wrapper[data-popper-placement='right-end'] .gux-arrow{left:-5px}.gux-popover-wrapper .gux-popover-header{font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700;display:flex;flex-direction:row;align-content:center;align-items:center;justify-content:space-between;padding-bottom:16px}.gux-popover-wrapper gux-dismiss-button{float:right}";

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
const GuxPopover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxdismiss = index.createEvent(this, "guxdismiss", 7);
    this.for = undefined;
    this.position = 'bottom';
    this.displayDismissButton = undefined;
    this.closeOnClickOutside = false;
    this.hidden = true;
  }
  hiddenHandler(hidden) {
    if (!hidden && !this.popperInstance) {
      this.runPopper();
    }
    else if (!hidden && this.popperInstance) {
      this.popperInstance.forceUpdate();
    }
  }
  checkForClickOutside(event) {
    const clickPath = event.composedPath();
    const forElement = document.getElementById(this.for);
    const clickedForElement = clickPath.includes(forElement);
    if ((this.closeOnClickOutside || !this.displayDismissButton) &&
      !this.hidden &&
      !clickedForElement) {
      this.dismiss();
    }
  }
  get titleSlot() {
    return getSlot.getSlot(this.root, 'title');
  }
  runPopper() {
    const forElement = document.getElementById(this.for);
    if (!forElement) {
      console.error(`gux-popover: invalid "for" attribute. No element in page with the id "${this.for}"`);
    }
    else if (this.popupElement) {
      this.popperInstance = popper.createPopper(forElement, this.popupElement, {
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              gpuAcceleration: false
            }
          },
          {
            name: 'offset',
            options: {
              offset: [0, 7]
            }
          },
          {
            name: 'arrow',
            options: {
              padding: 16
            }
          }
        ],
        placement: this.position
      });
    }
  }
  destroyPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }
  dismiss() {
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.setAttribute('hidden', '');
    }
  }
  connectedCallback() {
    usage.trackComponent(this.root, { variant: this.position });
    this.hiddenObserver = onAttributeChange.onHiddenChange(this.root, (hidden) => {
      this.hidden = hidden;
    });
    this.hidden = this.root.hidden;
  }
  componentDidLoad() {
    this.runPopper();
  }
  disconnectedCallback() {
    this.destroyPopper();
    if (this.hiddenObserver) {
      this.hiddenObserver.disconnect();
    }
  }
  renderDismissButton() {
    if (this.displayDismissButton) {
      return (index.h("gux-dismiss-button", { onClick: this.dismiss.bind(this), position: "inherit" }));
    }
  }
  render() {
    return (index.h("div", { ref: (el) => (this.popupElement = el), class: "gux-popover-wrapper" }, index.h("div", { class: "gux-arrow", "data-popper-arrow": true }), index.h("div", { class: { 'gux-popover-header': Boolean(this.titleSlot) } }, index.h("slot", { name: "title" }), this.renderDismissButton()), index.h("div", { class: "gux-popover-content" }, index.h("slot", null))));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "hidden": ["hiddenHandler"]
  }; }
};
__decorate([
  onClickOutside.OnClickOutside({ triggerEvents: 'mousedown' })
], GuxPopover.prototype, "checkForClickOutside", null);
GuxPopover.style = guxPopoverCss;

exports.gux_popover = GuxPopover;
