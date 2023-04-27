import { h, writeTask } from '@stencil/core';
import { eventIsFrom } from '@utils/dom/event-is-from';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { buildI18nForComponent } from '../../../../i18n';
import tabsResources from '../i18n/en.json';
/**
 * @slot default - gux-icon (optional) and text node (required)
 * @slot dropdown-options - optional slot for tab options, must slot a gux-list element with gux-list-item children
 */
export class GuxTabAdvanced {
  constructor() {
    this.dropdownOptionsButtonId = randomHTMLId();
    this.tabTitle = '';
    this.focusinFromClick = false;
    this.tabId = undefined;
    this.active = false;
    this.guxDisabled = false;
    this.popoverHidden = true;
    this.hasAnimated = false;
  }
  onFocusin(event) {
    if (!this.focusinFromClick &&
      event.target.classList.contains('gux-tab-button')) {
      void this.tooltipTitleElement.setShowTooltip();
    }
  }
  onFocusout(event) {
    if (!this.root.querySelector('.gux-tab').contains(event.relatedTarget)) {
      this.popoverHidden = true;
    }
    if (event.target.classList.contains('gux-tab-button')) {
      void this.tooltipTitleElement.setHideTooltip();
    }
    this.focusinFromClick = false;
  }
  onKeydown(event) {
    switch (event.key) {
      case 'ArrowDown':
      case 'Enter':
        if (eventIsFrom('.gux-tab-options-button', event)) {
          event.preventDefault();
          this.popoverHidden = false;
          this.focusFirstItemInPopupList();
        }
        break;
      case 'Escape':
        if (eventIsFrom('gux-list[slot="dropdown-options"]', event)) {
          event.stopPropagation();
          this.popoverHidden = true;
          afterNextRenderTimeout(() => {
            var _a;
            (_a = this.tabOptionsButtonElement) === null || _a === void 0 ? void 0 : _a.focus();
          });
        }
        break;
    }
  }
  onKeyup(event) {
    switch (event.key) {
      case ' ':
        if (eventIsFrom('.gux-tab-options-button', event)) {
          this.focusFirstItemInPopupList();
        }
    }
  }
  onClick(event) {
    if (eventIsFrom('.gux-tab-options-button', event)) {
      return;
    }
    if (!this.active && !this.guxDisabled) {
      this.internalactivatetabpanel.emit(this.tabId);
    }
  }
  onMouseDown() {
    this.focusinFromClick = true;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSetActive(active) {
    this.active = active;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxGetActive() {
    return this.active;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus() {
    this.buttonElement.focus();
  }
  get hasDropdownOptions() {
    return Boolean(this.root.querySelector('gux-list[slot="dropdown-options"]'));
  }
  focusFirstItemInPopupList() {
    const listElement = this.root.querySelector('gux-list[slot="dropdown-options"]');
    afterNextRenderTimeout(() => {
      void (listElement === null || listElement === void 0 ? void 0 : listElement.guxFocusFirstItem());
    });
  }
  toggleOptions() {
    this.popoverHidden = !this.popoverHidden;
  }
  onSelectDropdownOption(e) {
    this.popoverHidden = true;
    e.stopPropagation();
    afterNextRenderTimeout(() => {
      this.tabOptionsButtonElement.focus();
    });
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, tabsResources, 'gux-tabs-advanced');
  }
  componentDidLoad() {
    this.tabTitle = this.root
      .querySelector('gux-tooltip-title')
      .textContent.trim();
    if (!this.hasAnimated) {
      writeTask(() => {
        this.root.querySelector('.gux-tab').classList.add('gux-show');
        this.hasAnimated = true;
      });
    }
  }
  popoverOnClick(e) {
    e.stopPropagation();
  }
  getDropdownOptions() {
    if (this.hasDropdownOptions) {
      return [
        h("button", { id: this.dropdownOptionsButtonId, "aria-expanded": (!this.popoverHidden).toString(), type: "button", class: "gux-tab-options-button", ref: el => (this.tabOptionsButtonElement = el), onClick: () => this.toggleOptions(), tabIndex: this.active ? 0 : -1, disabled: this.guxDisabled }, h("gux-icon", { "icon-name": "menu-kebab-vertical", "screenreader-text": this.i18n('options', {
            tabTitle: this.tabTitle
          }) })),
        h("gux-popover-list", { position: "top-end", for: this.dropdownOptionsButtonId, displayDismissButton: false, hidden: this.popoverHidden, closeOnClickOutside: true, onGuxdismiss: () => (this.popoverHidden = true), onClick: (e) => this.popoverOnClick(e), onFocusout: e => e.stopImmediatePropagation() }, h("div", { class: "gux-dropdown-option-container", onClick: (e) => this.onSelectDropdownOption(e) }, h("slot", { name: "dropdown-options" })))
      ];
    }
    return null;
  }
  render() {
    return [
      h("div", { class: {
          'gux-tab': true,
          'gux-selected': this.active,
          'gux-dropdown-options': this.hasDropdownOptions,
          'gux-disabled': this.guxDisabled
        } }, h("button", { class: "gux-tab-button", type: "button", role: "tab", "aria-selected": this.active.toString(), "aria-disabled": this.guxDisabled.toString(), "aria-controls": `gux-${this.tabId}-panel`, ref: el => (this.buttonElement = el), tabIndex: this.active ? 0 : -1, id: `gux-${this.tabId}-tab` }, h("gux-tooltip-title", { ref: el => (this.tooltipTitleElement = el) }, h("span", null, h("slot", null)))), this.getDropdownOptions())
    ];
  }
  static get is() { return "gux-tab-advanced"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tab-advanced.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tab-advanced.css"]
    };
  }
  static get properties() {
    return {
      "tabId": {
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
          "text": "unique id for the tab"
        },
        "attribute": "tab-id",
        "reflect": false
      },
      "guxDisabled": {
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
        "attribute": "gux-disabled",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "active": {},
      "popoverHidden": {},
      "hasAnimated": {}
    };
  }
  static get events() {
    return [{
        "method": "internalactivatetabpanel",
        "name": "internalactivatetabpanel",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "guxSetActive": {
        "complexType": {
          "signature": "(active: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "guxGetActive": {
        "complexType": {
          "signature": "() => Promise<boolean>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<boolean>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
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
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
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
      }, {
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
        "name": "click",
        "method": "onClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "mousedown",
        "method": "onMouseDown",
        "target": undefined,
        "capture": false,
        "passive": true
      }];
  }
}
