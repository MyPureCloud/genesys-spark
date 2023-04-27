'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const eventIsFrom = require('./event-is-from-ad1044f2.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const index$1 = require('./index-c4441830.js');
const en = require('./en-dc1f49b7.js');
require('./get-closest-element-ab4b2eee.js');

const guxTableSelectMenuCss = "gux-table-select-menu{display:inline-flex;font-weight:400}gux-table-select-menu .gux-select-menu-button{width:24px;height:24px;padding:0;color:#6b7585;background-color:inherit;border:none;border-radius:4px;outline:none}gux-table-select-menu .gux-select-menu-button:disabled{color:rgba(107, 117, 133, 0.5)}gux-table-select-menu .gux-select-menu-button:hover:not(gux-table-select-menu .gux-select-menu-button:disabled){color:#2e394c}gux-table-select-menu .gux-select-menu-button:focus-visible gux-icon{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd;border-radius:4px}gux-table-select-menu .gux-select-menu-button gux-icon{width:16px;height:16px}";

const GuxTableSelectMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dropdownOptionsButtonId = randomHtmlId.randomHTMLId('gux-table-select-menu');
    this.hasSelectMenuOptions = false;
    this.dropdownDisabled = false;
    this.popoverHidden = true;
  }
  focusFirstItemInPopupList() {
    const listElement = this.root.querySelector('gux-list');
    afterNextRender.afterNextRenderTimeout(() => {
      void (listElement === null || listElement === void 0 ? void 0 : listElement.guxFocusFirstItem());
    });
  }
  async componentWillLoad() {
    this.hasSelectMenuOptions = !!this.root.querySelector('[slot="select-menu-options"]');
    this.i18n = await index$1.buildI18nForComponent(this.root, en.tableResources, 'gux-table');
  }
  onKeydown(event) {
    var _a;
    switch (event.key) {
      case 'ArrowDown':
        if (eventIsFrom.eventIsFrom('.gux-select-menu-button', event)) {
          this.toggleOptions();
          this.focusFirstItemInPopupList();
        }
        break;
      case 'Enter':
        if (eventIsFrom.eventIsFrom('.gux-select-menu-button', event)) {
          void this.focusFirstItemInPopupList();
        }
        break;
      case 'Escape':
        if (eventIsFrom.eventIsFrom('gux-list', event)) {
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
        if (eventIsFrom.eventIsFrom('.gux-select-menu-button', event)) {
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
        index.h("button", { id: this.dropdownOptionsButtonId, "aria-haspopup": "listbox", "aria-expanded": (!this.popoverHidden).toString(), type: "button", class: "gux-select-menu-button", ref: el => (this.tableSelectMenuButtonElement = el), onClick: () => this.toggleOptions(), disabled: this.dropdownDisabled }, index.h("gux-icon", { "icon-name": "chevron-small-down", "screenreader-text": this.i18n('tableOptions') })),
        index.h("gux-table-select-popover", { for: this.dropdownOptionsButtonId, hidden: this.popoverHidden, closeOnClickOutside: true, onGuxdismiss: () => (this.popoverHidden = true) }, index.h("div", null, index.h("slot", { name: "select-menu-options" })))
      ];
    }
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null), this.renderSelectDropdown()));
  }
  get root() { return index.getElement(this); }
};
GuxTableSelectMenu.style = guxTableSelectMenuCss;

exports.gux_table_select_menu = GuxTableSelectMenu;
