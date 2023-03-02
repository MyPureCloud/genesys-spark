import { r as registerInstance, e as createEvent, h, g as getElement } from './index-f583fcde.js';
import { c as createPopper } from './index-bfc8356b.js';
import { O as OnClickOutside } from './on-click-outside-c96e7b47.js';
import { b as onHiddenChange } from './on-attribute-change-5fd8da7c.js';

const guxTableSelectPopoverCss = ":host{color:#2e394c}.gux-popover-wrapper{z-index:var(--gux-zindex-popover, 2);display:inline-block;padding:8px 0;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}";

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
const GuxTableSelectPopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxdismiss = createEvent(this, "guxdismiss", 7);
    this.for = undefined;
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
    if (this.closeOnClickOutside && !this.hidden && !clickedForElement) {
      this.dismiss();
    }
  }
  runPopper() {
    const forElement = document.getElementById(this.for);
    if (this.popupElement) {
      this.popperInstance = createPopper(forElement, this.popupElement, {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [-20, 0]
            }
          }
        ],
        placement: 'bottom-start'
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
    this.hiddenObserver = onHiddenChange(this.root, (hidden) => {
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
  render() {
    return (h("div", { ref: (el) => (this.popupElement = el), class: "gux-popover-wrapper" }, h("div", { class: "gux-popover-content" }, h("slot", null))));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "hidden": ["hiddenHandler"]
  }; }
};
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxTableSelectPopover.prototype, "checkForClickOutside", null);
GuxTableSelectPopover.style = guxTableSelectPopoverCss;

export { GuxTableSelectPopover as gux_table_select_popover };
