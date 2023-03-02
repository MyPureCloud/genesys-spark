import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { m as menuNavigation } from './gux-menu.common-4a871a5c.js';

const guxMenuOptionCss = "gux-menu-option{display:block;flex:1 1 auto;align-self:auto}gux-menu-option .gux-menu-option-button{all:unset;width:100%;width:125px;height:32px;padding:0 16px;line-height:32px;color:#2e394c;background-color:#fdfdfd}gux-menu-option .gux-menu-option-button:focus-within,gux-menu-option .gux-menu-option-button:hover{color:#fdfdfd;background-color:#2a60c8}gux-menu-option .gux-menu-option-button:enabled{cursor:pointer}gux-menu-option .gux-menu-option-button .gux-menu-option-button-text{display:block;overflow-x:hidden;text-overflow:ellipsis;white-space:nowrap}";

const GuxMenuOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
      case 'ArrowRight':
      case 'Enter':
        event.stopPropagation();
        break;
    }
  }
  render() {
    return (h("button", { type: "button", class: "gux-menu-option-button", role: "menuitem", "aria-haspopup": "false", tabIndex: -1, ref: el => (this.buttonElement = el) }, h("span", { class: "gux-menu-option-button-text" }, h("slot", null))));
  }
  get root() { return getElement(this); }
};
GuxMenuOption.style = guxMenuOptionCss;

export { GuxMenuOption as gux_menu_option };
