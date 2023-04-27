var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from '@stencil/core';
import { onMutation } from '@utils/dom/on-mutation';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../i18n';
import advancedDropDownResources from './i18n/en.json';
/**
 * @slot - collection of gux-dropdown-option elements
 */
export class GuxAdvancedDropdown {
  constructor() {
    this.disabled = false;
    this.placeholder = undefined;
    this.noFilter = false;
    this.filterDebounceTimeout = 500;
    this.dropdownHeight = '320px';
    this.srLabelledby = undefined;
    this.opened = undefined;
    this.currentlySelectedOption = undefined;
    this.selectionOptions = undefined;
  }
  watchValue(newValue) {
    if (this.opened && newValue) {
      this.closeDropdown(false);
    }
  }
  get value() {
    var _a;
    return (_a = this.currentlySelectedOption) === null || _a === void 0 ? void 0 : _a.text;
  }
  /**
   * Gets the currently selected values.
   *
   * @returns The array of selected values.
   */
  getSelectedValues() {
    // Once multi-select gets added there will
    // be multiple values selectable.
    return Promise.resolve([this.value]);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async setLabeledBy(id) {
    this.srLabelledby = id;
  }
  onClickOutside() {
    this.closeDropdown(false);
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, advancedDropDownResources);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.updateSelectionState();
    this.addOptionListener();
    this.slotObserver = onMutation(this.root, () => this.updateSelectionState());
  }
  disconnectedCallback() {
    if (this.slotObserver) {
      this.slotObserver.disconnect();
    }
  }
  render() {
    return (h("gux-popup-beta", { expanded: this.opened, disabled: this.disabled }, h("div", { slot: "target", class: "gux-select-field", onMouseDown: () => this.inputMouseDown() }, h("a", { ref: el => (this.inputBox = el), class: "gux-select-input", "aria-labelledby": this.srLabelledby, tabindex: "0", onKeyDown: e => this.inputKeyDown(e) }, this.placeholder && !this.value && (h("span", { class: "gux-select-placeholder", title: this.placeholder }, this.placeholder)), this.value && (h("span", { class: "gux-select-value", title: this.value }, this.value))), h("div", { class: "gux-icon-wrapper" }, h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" }))), h("div", { slot: "popup", class: "gux-advanced-dropdown-menu" }, h("div", { class: "gux-dropdown-menu-container" }, h("gux-form-field-search", { "label-position": "screenreader" }, h("label", { slot: "label" }, this.i18n('searchAria')), h("input", { slot: "input", type: "search", onInput: (event) => {
        this.handleSearchInput(event);
      }, ref: el => (this.searchInput = el) })), h("div", { class: "gux-dropdown-options", style: { maxHeight: this.dropdownHeight }, onKeyDown: e => this.optionsKeyDown(e) }, h("slot", null))))));
  }
  updateSelectionState() {
    this.selectionOptions = this.getSelectionOptions();
    this.currentlySelectedOption = this.selectionOptions.find(option => option.selected);
  }
  addOptionListener() {
    this.root.addEventListener('selectedChanged', (event) => this.handleSelectionChange(event));
  }
  handleSelectionChange({ target }) {
    const option = target;
    this.closeDropdown(true);
    if (this.currentlySelectedOption === option) {
      return;
    }
    if (this.currentlySelectedOption) {
      this.currentlySelectedOption.selected = false;
    }
    this.currentlySelectedOption = option;
    this.input.emit(option.value);
  }
  getSelectionOptions() {
    const options = this.root.querySelectorAll('gux-dropdown-option');
    return Array.from(options);
  }
  inputMouseDown() {
    if (this.disabled) {
      return;
    }
    if (this.opened) {
      this.closeDropdown(true);
    }
    else {
      this.openDropdown(false);
    }
  }
  getFocusIndex() {
    return this.selectionOptions.findIndex(option => {
      return option.matches(':focus');
    });
  }
  optionsKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault();
        const focusIndex = this.getFocusIndex();
        if (focusIndex > 0) {
          this.selectionOptions[focusIndex - 1].focus();
        }
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const focusIndex = this.getFocusIndex();
        if (focusIndex < this.selectionOptions.length - 1) {
          this.selectionOptions[focusIndex + 1].focus();
        }
        break;
      }
      case 'Home':
        if (!this.selectionOptions.length) {
          return;
        }
        this.selectionOptions[0].focus();
        break;
      case 'End':
        if (!this.selectionOptions.length) {
          return;
        }
        this.selectionOptions[this.selectionOptions.length - 1].focus();
        break;
      default:
    }
  }
  inputKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        this.openDropdown(true);
        break;
      default:
    }
  }
  handleSearchInput(event) {
    event.stopPropagation();
    clearTimeout(this.filterDebounceTimer);
    this.filterDebounceTimer = setTimeout(() => this.searchRequested(), this.filterDebounceTimeout);
  }
  searchRequested() {
    const value = this.searchInput.value;
    this.filter.emit(value);
    this.setFilteredOptions();
  }
  setFilteredOptions() {
    const value = this.searchInput.value;
    if (!this.noFilter) {
      for (const option of this.selectionOptions) {
        void option.shouldFilter(value).then(isFiltered => {
          option.filtered = isFiltered;
        });
      }
    }
  }
  changeFocusToSearch() {
    afterNextRenderTimeout(() => {
      this.searchInput.focus();
    });
  }
  openDropdown(focusSearch) {
    this.opened = true;
    if (focusSearch) {
      this.changeFocusToSearch();
    }
  }
  closeDropdown(focus) {
    this.opened = false;
    this.searchInput.value = '';
    this.setFilteredOptions();
    if (focus) {
      this.inputBox.focus();
    }
  }
  static get is() { return "gux-advanced-dropdown"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-advanced-dropdown.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-advanced-dropdown.css"]
    };
  }
  static get properties() {
    return {
      "disabled": {
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
          "text": "Disable the input and prevent interactions."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "placeholder": {
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
          "text": "The dropdown's placeholder."
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "noFilter": {
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
          "text": "Whether the list should filter its current options."
        },
        "attribute": "no-filter",
        "reflect": false,
        "defaultValue": "false"
      },
      "filterDebounceTimeout": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Timeout between filter input changed and event being emitted."
        },
        "attribute": "filter-debounce-timeout",
        "reflect": false,
        "defaultValue": "500"
      },
      "dropdownHeight": {
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
          "text": "CSS string used to set the maximum height of the dropdown option container. Default is set to 10 options as defined by UX."
        },
        "attribute": "dropdown-height",
        "reflect": false,
        "defaultValue": "'320px'"
      }
    };
  }
  static get states() {
    return {
      "srLabelledby": {},
      "opened": {},
      "currentlySelectedOption": {},
      "selectionOptions": {}
    };
  }
  static get events() {
    return [{
        "method": "input",
        "name": "input",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Fires when the value of the advanced dropdown changes."
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "filter",
        "name": "filter",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Fires when the filter of the advanced dropdown changes."
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
      "getSelectedValues": {
        "complexType": {
          "signature": "() => Promise<string[]>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<string[]>"
        },
        "docs": {
          "text": "Gets the currently selected values.",
          "tags": [{
              "name": "returns",
              "text": "The array of selected values."
            }]
        }
      },
      "setLabeledBy": {
        "complexType": {
          "signature": "(id: string) => Promise<void>",
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
      }
    };
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "disabled",
        "methodName": "watchValue"
      }];
  }
}
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxAdvancedDropdown.prototype, "onClickOutside", null);
