import { r as registerInstance, h, H as Host, g as getElement } from './index-816e34d8.js';
import { a as afterNextRenderTimeout } from './after-next-render-ed0f7dcd.js';
import { e as eventIsFrom } from './event-is-from-90b69768.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { t as tableResources } from './en-66f138f8.js';
import './get-closest-element-1597503c.js';

const guxTableSelectMenuCss = "gux-table-select-menu{display:inline-flex;font-weight:400}gux-table-select-menu .gux-select-menu-button{width:24px;height:24px;padding:0;color:#6b7585;background-color:inherit;border:none;border-radius:4px;outline:none}gux-table-select-menu .gux-select-menu-button:disabled{color:rgba(107, 117, 133, 0.5)}gux-table-select-menu .gux-select-menu-button:hover:not(gux-table-select-menu .gux-select-menu-button:disabled){color:#2e394c}gux-table-select-menu .gux-select-menu-button:focus-visible gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd;border-radius:4px}gux-table-select-menu .gux-select-menu-button gux-icon{width:16px;height:16px}";

const GuxTableSelectMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dropdownOptionsButtonId = randomHTMLId('gux-table-select-menu');
    this.hasSelectMenuOptions = false;
    this.dropdownDisabled = false;
    this.popoverHidden = true;
  }
  focusFirstItemInPopupList() {
    const listElement = this.root.querySelector('gux-list');
    afterNextRenderTimeout(() => {
      void (listElement === null || listElement === void 0 ? void 0 : listElement.guxFocusFirstItem());
    });
  }
  async componentWillLoad() {
    this.hasSelectMenuOptions = !!this.root.querySelector('[slot="select-menu-options"]');
    this.i18n = await buildI18nForComponent(this.root, tableResources, 'gux-table');
  }
  onKeydown(event) {
    var _a;
    switch (event.key) {
      case 'ArrowDown':
        if (eventIsFrom('.gux-select-menu-button', event)) {
          this.toggleOptions();
          this.focusFirstItemInPopupList();
        }
        break;
      case 'Enter':
        if (eventIsFrom('.gux-select-menu-button', event)) {
          void this.focusFirstItemInPopupList();
        }
        break;
      case 'Escape':
        if (eventIsFrom('gux-list', event)) {
          event.stopPropagation();
          this.popoverHidden = true;
          (_a = this.tableSelectMenuButtonElement) === null || _a === void 0 ? void 0 : _a.focus();
        }
        break;
      case 'Tab':
        this.popoverHidden = true;
        break;
    }
  }
  onKeyup(event) {
    switch (event.key) {
      case ' ':
        if (eventIsFrom('.gux-select-menu-button', event)) {
          this.focusFirstItemInPopupList();
        }
    }
  }
  toggleOptions() {
    this.popoverHidden = !this.popoverHidden;
  }
  renderSelectDropdown() {
    if (this.hasSelectMenuOptions) {
      return [
        h("button", { id: this.dropdownOptionsButtonId, "aria-haspopup": "listbox", "aria-expanded": (!this.popoverHidden).toString(), type: "button", class: "gux-select-menu-button", ref: el => (this.tableSelectMenuButtonElement = el), onClick: () => this.toggleOptions(), disabled: this.dropdownDisabled }, h("gux-icon", { "icon-name": "chevron-small-down", "screenreader-text": this.i18n('tableOptions') })),
        h("gux-table-select-popover", { for: this.dropdownOptionsButtonId, hidden: this.popoverHidden, closeOnClickOutside: true, onGuxdismiss: () => (this.popoverHidden = true) }, h("div", null, h("slot", { name: "select-menu-options" })))
      ];
    }
  }
  render() {
    return (h(Host, null, h("slot", null), this.renderSelectDropdown()));
  }
  get root() { return getElement(this); }
};
GuxTableSelectMenu.style = guxTableSelectMenuCss;

export { GuxTableSelectMenu as gux_table_select_menu };
