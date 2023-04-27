import { h, Host } from '@stencil/core';
import { createPopper } from '@popperjs/core';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { hideDelay, menuNavigation } from '../gux-menu.common';
/**
 * @slot - collection of menu-option, submenu elements
 */
export class GuxSubmenu {
  constructor() {
    this.label = undefined;
    this.isShown = false;
  }
  forceUpdate(isShown) {
    if (isShown) {
      if (this.popperInstance) {
        void this.popperInstance.update();
      }
    }
  }
  /**
   * Focus on the components button element
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus() {
    this.buttonElement.focus();
  }
  onKeydown(event) {
    menuNavigation(event, this.root);
    switch (event.key) {
      case 'Enter':
        event.stopPropagation();
        this.hideDelayTimeout = afterNextRenderTimeout(() => {
          this.focusOnSubmenu();
        });
        void this.guxFocus();
        break;
      case 'ArrowRight':
        event.stopPropagation();
        this.show();
        this.hideDelayTimeout = afterNextRenderTimeout(() => {
          this.focusOnSubmenu();
        });
        break;
      case 'ArrowLeft':
      case 'Escape':
        if (this.submenuContentElement.contains(event.target)) {
          event.stopPropagation();
        }
        void this.guxFocus();
        break;
    }
  }
  // Using 'keyup' here because the native click handler behavior
  // for buttons is triggered on keyup when using the space key
  onKeyup(event) {
    switch (event.key) {
      case ' ':
        event.stopPropagation();
        if (this.submenuContentElement.contains(document.activeElement)) {
          this.root.focus();
        }
        else {
          this.hideDelayTimeout = afterNextRenderTimeout(() => {
            this.focusOnSubmenu();
          });
        }
        break;
    }
  }
  onmouseenter() {
    this.show();
  }
  onMouseleave() {
    this.hide();
  }
  onClick(event) {
    if (this.submenuContentElement.contains(event.target)) {
      this.hide();
      return;
    }
    event.stopPropagation();
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
    this.popperInstance = createPopper(this.buttonElement, this.submenuElement, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [-8, 0]
          }
        },
        {
          name: 'flip',
          enabled: false
        }
      ],
      placement: 'right-start'
    });
  }
  destroyPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }
  focusOnSubmenu() {
    if (this.submenuContentElement.contains(document.activeElement)) {
      return;
    }
    const menuItems = Array.from(this.submenuContentElement.children);
    const nextFocusableElement = menuItems[0];
    void nextFocusableElement.guxFocus();
  }
  componentDidLoad() {
    this.runPopper();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    return (h(Host, null, h("button", { type: "button", class: "gux-submenu-button", role: "menuitem", tabIndex: -1, ref: el => (this.buttonElement = el), "aria-haspopup": "true", "aria-expanded": this.isShown.toString() }, h("span", { class: "gux-submenu-button-text" }, this.label), h("gux-icon", { class: "gux-submenu-open-icon", "icon-name": "chevron-small-right", decorative: true })), h("div", { ref: el => (this.submenuElement = el), class: {
        'gux-submenu-wrapper': true,
        'gux-shown': this.isShown
      } }, h("div", { role: "menu", class: "gux-submenu-content", ref: el => (this.submenuContentElement = el) }, h("slot", null)))));
  }
  static get is() { return "gux-submenu"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-submenu.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-submenu.css"]
    };
  }
  static get properties() {
    return {
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isShown": {}
    };
  }
  static get methods() {
    return {
      "guxFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Focus on the components button element",
          "tags": []
        }
      }
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
