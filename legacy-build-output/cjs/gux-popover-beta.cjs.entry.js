'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const floatingUi_dom_esm = require('./floating-ui.dom.esm-ecb2a154.js');
const onClickOutside = require('./on-click-outside-2c616788.js');
const usage = require('./usage-da9572bf.js');
const getSlot = require('./get-slot-097ade01.js');
const findElementById = require('./find-element-by-id-7a79ceeb.js');

const guxPopoverBetaCss = ".gux-popover-wrapper{position:absolute;top:0;left:0;z-index:var(--gux-zindex-popover, 2);display:inline-block;padding:16px;color:#2e394c;background-color:#fdfdfd;border-radius:4px;box-shadow:0 3px 14px rgba(46, 57, 76, 0.22)}.gux-popover-wrapper.gux-hidden{display:none}.gux-popover-wrapper .gux-arrow{position:absolute;width:10px;height:10px;background:inherit}.gux-popover-wrapper[data-placement='bottom'] .gux-arrow,.gux-popover-wrapper[data-placement='bottom-start'] .gux-arrow,.gux-popover-wrapper[data-placement='bottom-end'] .gux-arrow{border-top:1px solid #b4bccb;border-left:1px solid #b4bccb}.gux-popover-wrapper[data-placement='top'] .gux-arrow,.gux-popover-wrapper[data-placement='top-start'] .gux-arrow,.gux-popover-wrapper[data-placement='top-end'] .gux-arrow{border-right:1px solid #b4bccb;border-bottom:1px solid #b4bccb}.gux-popover-wrapper[data-placement='left'] .gux-arrow,.gux-popover-wrapper[data-placement='left-start'] .gux-arrow,.gux-popover-wrapper[data-placement='left-end'] .gux-arrow{border-top:1px solid #b4bccb;border-right:1px solid #b4bccb}.gux-popover-wrapper[data-placement='right'] .gux-arrow,.gux-popover-wrapper[data-placement='right-start'] .gux-arrow,.gux-popover-wrapper[data-placement='right-end'] .gux-arrow{border-bottom:1px solid #b4bccb;border-left:1px solid #b4bccb}.gux-popover-wrapper .gux-popover-header{font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700;display:flex;flex-direction:row;align-content:center;align-items:center;justify-content:space-between;padding-bottom:16px}.gux-popover-wrapper gux-dismiss-button{float:right}";

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
const GuxPopoverBeta = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxdismiss = index.createEvent(this, "guxdismiss", 7);
    this.for = undefined;
    this.position = 'bottom';
    this.displayDismissButton = undefined;
    this.closeOnClickOutside = false;
    this.isOpen = false;
  }
  checkForClickOutside(event) {
    const clickPath = event.composedPath();
    const forElement = findElementById.findElementById(this.root, this.for);
    const clickedForElement = clickPath.includes(forElement);
    if ((this.closeOnClickOutside || !this.displayDismissButton) &&
      this.isOpen &&
      !clickedForElement) {
      this.dismiss();
    }
  }
  get titleSlot() {
    return getSlot.getSlot(this.root, 'title');
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = floatingUi_dom_esm.autoUpdate(findElementById.findElementById(this.root, this.for), this.popupElement, () => this.updatePosition(), {
      ancestorScroll: true,
      elementResize: true,
      animationFrame: true,
      ancestorResize: true
    });
  }
  updatePosition() {
    const forElement = findElementById.findElementById(this.root, this.for);
    // This is 13 because this makes the arrow look aligned
    const arrowLen = 13;
    if (this.popupElement) {
      void floatingUi_dom_esm.computePosition(forElement, this.popupElement, {
        placement: this.position,
        middleware: [
          floatingUi_dom_esm.offset(7),
          floatingUi_dom_esm.flip(),
          floatingUi_dom_esm.shift(),
          floatingUi_dom_esm.arrow({
            element: this.arrowElement,
            padding: 16
          })
        ]
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(this.popupElement.style, {
          left: `${x}px`,
          top: `${y}px`
        });
        const side = placement.split('-')[0];
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right'
        }[side];
        if (middlewareData.arrow) {
          const { x, y } = middlewareData.arrow;
          this.popupElement.setAttribute('data-placement', placement);
          Object.assign(this.arrowElement.style, {
            left: x != null ? `${x}px` : '',
            top: y != null ? `${y}px` : '',
            right: '',
            bottom: '',
            [staticSide]: `${-arrowLen / 2}px`,
            transform: 'rotate(45deg)'
          });
        }
      });
    }
  }
  dismiss() {
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.isOpen = false;
    }
  }
  connectedCallback() {
    usage.trackComponent(this.root, { variant: this.position });
  }
  componentDidLoad() {
    if (this.isOpen) {
      this.runUpdatePosition();
    }
  }
  componentDidUpdate() {
    if (this.isOpen) {
      this.runUpdatePosition();
    }
    else if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }
  disconnectedCallback() {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }
  renderDismissButton() {
    if (this.displayDismissButton) {
      return (index.h("gux-dismiss-button", { onClick: this.dismiss.bind(this), position: "inherit" }));
    }
  }
  render() {
    return (index.h("div", { ref: (el) => (this.popupElement = el), class: {
        'gux-hidden': !this.isOpen,
        'gux-popover-wrapper': true
      }, "data-placement": true }, index.h("div", { ref: (el) => (this.arrowElement = el), class: "gux-arrow" }), index.h("div", { class: { 'gux-popover-header': Boolean(this.titleSlot) } }, index.h("slot", { name: "title" }), this.renderDismissButton()), index.h("div", { class: "gux-popover-content" }, index.h("slot", null))));
  }
  get root() { return index.getElement(this); }
};
__decorate([
  onClickOutside.OnClickOutside({ triggerEvents: 'mousedown' })
], GuxPopoverBeta.prototype, "checkForClickOutside", null);
GuxPopoverBeta.style = guxPopoverBetaCss;

exports.gux_popover_beta = GuxPopoverBeta;
