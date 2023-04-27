'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const usage = require('./usage-da9572bf.js');
const guxMenu_common = require('./gux-menu.common-ada23b94.js');
const popper = require('./popper-6eb3f461.js');

const guxFlyoutMenuCss = ":host{z-index:var(--gux-zindex-popover, 2);color:#2e394c;cursor:default}:host(:focus){outline:none}:host(:focus-visible){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-flyout-menu-content{display:none;margin:0}.gux-flyout-menu-content.gux-shown{display:flex}.gux-arrow,.gux-arrow::before{position:absolute;top:-3px;width:10px;height:10px;background:inherit}.gux-arrow::before{visibility:visible;content:'';border-top:1px solid #b4bccb;border-left:1px solid #b4bccb;transform:rotate(45deg)}";

const GuxFlyoutMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.isShown = false;
  }
  forceUpdate(isShown) {
    if (isShown) {
      if (this.popperInstance) {
        void this.popperInstance.update();
      }
    }
  }
  onKeydown(event) {
    event.stopPropagation();
    if (this.isShown) {
      switch (event.key) {
        case 'Escape':
        case 'ArrowLeft':
        case 'ArrowUp':
          this.root.focus();
          return;
        case 'ArrowDown':
          event.preventDefault();
          this.focusOnMenu();
          return;
        case 'Enter':
          this.hideDelayTimeout = afterNextRender.afterNextRenderTimeout(() => {
            this.focusOnMenu();
          });
          return;
      }
    }
  }
  // Using 'keyup' here because the native click handler behavior
  // for buttons is triggered on keyup when using the space key
  onKeyup(event) {
    event.stopPropagation();
    switch (event.key) {
      case ' ':
        if (this.menuContentElement.contains(document.activeElement)) {
          this.root.focus();
        }
        else {
          this.hideDelayTimeout = afterNextRender.afterNextRenderTimeout(() => {
            this.focusOnMenu();
          });
        }
        return;
    }
  }
  onmouseenter() {
    this.show();
  }
  onMouseleave() {
    this.hide();
  }
  onClick(event) {
    if (event.detail !== 0) {
      this.hide();
    }
    this.root.focus();
  }
  onFocusin() {
    this.show();
  }
  onFocusout() {
    this.hide();
  }
  show() {
    clearTimeout(this.hideDelayTimeout);
    this.isShown = true;
  }
  hide() {
    if (this.isShown) {
      this.hideDelayTimeout = setTimeout(() => {
        this.isShown = false;
      }, guxMenu_common.hideDelay);
    }
  }
  runPopper() {
    this.popperInstance = popper.createPopper(this.targetElement, document.querySelector('gux-menu'), {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 16]
          }
        },
        {
          name: 'arrow',
          options: {
            padding: 16 // 16px from the edges of the popper
          }
        }
      ],
      placement: 'bottom-start'
    });
  }
  destroyPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }
  focusOnMenu() {
    if (this.menuContentElement.contains(document.activeElement)) {
      return;
    }
    const menu = this.root.querySelector('gux-menu');
    const menuItems = Array.from(menu.children);
    const nextFocusableElement = menuItems[0];
    void nextFocusableElement.guxFocus();
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  componentDidLoad() {
    this.runPopper();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    return (index.h(index.Host, { tabIndex: 0, "aria-haspopup": "true" }, index.h("span", { ref: el => (this.targetElement = el) }, index.h("slot", { name: "target" })), index.h("div", { class: {
        'gux-flyout-menu-content': true,
        'gux-shown': this.isShown
      }, ref: el => (this.menuContentElement = el) }, index.h("slot", { name: "menu" }))));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "isShown": ["forceUpdate"]
  }; }
};
GuxFlyoutMenu.style = guxFlyoutMenuCss;

exports.gux_flyout_menu_beta = GuxFlyoutMenu;
