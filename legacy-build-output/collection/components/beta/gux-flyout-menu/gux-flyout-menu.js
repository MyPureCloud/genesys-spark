import { h, Host } from '@stencil/core';
import { createPopper } from '@popperjs/core';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
import { hideDelay } from './gux-menu/gux-menu.common';
/**
 * @slot target - target element
 * @slot menu - gux-menu element
 */
export class GuxFlyoutMenu {
  constructor() {
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
          this.hideDelayTimeout = afterNextRenderTimeout(() => {
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
          this.hideDelayTimeout = afterNextRenderTimeout(() => {
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
      }, hideDelay);
    }
  }
  runPopper() {
    this.popperInstance = createPopper(this.targetElement, document.querySelector('gux-menu'), {
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
    trackComponent(this.root);
  }
  componentDidLoad() {
    this.runPopper();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    return (h(Host, { tabIndex: 0, "aria-haspopup": "true" }, h("span", { ref: el => (this.targetElement = el) }, h("slot", { name: "target" })), h("div", { class: {
        'gux-flyout-menu-content': true,
        'gux-shown': this.isShown
      }, ref: el => (this.menuContentElement = el) }, h("slot", { name: "menu" }))));
  }
  static get is() { return "gux-flyout-menu-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-flyout-menu.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-flyout-menu.css"]
    };
  }
  static get states() {
    return {
      "isShown": {}
    };
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "isShown",
        "methodName": "forceUpdate"
      }];
  }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "onKeydown",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keyup",
        "method": "onKeyup",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "mouseenter",
        "method": "onmouseenter",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "mouseleave",
        "method": "onMouseleave",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "click",
        "method": "onClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusin",
        "method": "onFocusin",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusout",
        "method": "onFocusout",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
