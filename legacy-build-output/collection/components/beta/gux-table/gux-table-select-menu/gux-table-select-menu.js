import { h, Host } from '@stencil/core';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { eventIsFrom } from '@utils/dom/event-is-from';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { buildI18nForComponent } from '../../../../i18n';
import tableResources from '../i18n/en.json';
/**
 * @slot default - Required slot for gux-all-row-select element
 * @slot select-menu-options - Optional slot for gux-list containing gux-list-item children
 */
export class GuxTableSelectMenu {
  constructor() {
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
  static get is() { return "gux-table-select-menu"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-table-select-menu.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-table-select-menu.css"]
    };
  }
  static get properties() {
    return {
      "dropdownDisabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "dropdown-disabled",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "popoverHidden": {}
    };
  }
  static get elementRef() { return "root"; }
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
      }];
  }
}
