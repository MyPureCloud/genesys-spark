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
import { forceUpdate, h } from '@stencil/core';
import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { whenEventIsFrom } from '../../../utils/dom/when-event-is-from';
import { trackComponent } from '@utils/tracking/usage';
import { OnMutation } from '../../../utils/decorator/on-mutation';
export class GuxDropdownLegacy {
  constructor() {
    this.inputIsFocused = false;
    this.valueEdited = false;
    this.mode = 'default';
    this.disabled = false;
    this.value = '';
    this.placeholder = undefined;
    this.filterable = undefined;
    this.opened = undefined;
    this.forcedGhostValue = undefined;
    this.srLabeledBy = undefined;
  }
  emitChange(value) {
    this.change.emit(value);
  }
  onClickOutside(e) {
    if (!e.relatedTarget || !this.root.contains(e.relatedTarget)) {
      this.opened = false;
      this.forcedGhostValue = '';
      const selectionOptions = this.getSelectionOptions();
      const match = selectionOptions.some(item => {
        return item.text === this.value;
      });
      if (!match) {
        this.value = '';
      }
    }
  }
  async setLabeledBy(id) {
    this.srLabeledBy = id;
  }
  async setSelected() {
    const selectionOptions = this.getSelectionOptions();
    const selectedOptionIndex = selectionOptions
      .map(selectionOption => selectionOption.selected)
      .lastIndexOf(true);
    if (selectedOptionIndex >= 0) {
      const option = selectionOptions[selectedOptionIndex];
      this.value = option.text;
      return;
    }
    const selectedOption = selectionOptions.find(selectionOption => this.value === selectionOption.value);
    if (selectedOption) {
      this.value = selectedOption.text;
      return;
    }
    this.value = '';
  }
  onMutation() {
    forceUpdate(this.root);
    void this.setSelected();
  }
  // TODO: Fix the keyboard navigation I broke
  onKeyDown(event) {
    const selectionOptions = this.getSelectionOptions();
    const focusIndex = this.getFocusIndex(selectionOptions);
    switch (event.key) {
      case 'ArrowUp':
        // prevent arrow key from triggering a page scroll
        event.preventDefault();
        if (focusIndex > 0) {
          selectionOptions[focusIndex - 1].focus();
        }
        break;
      case 'ArrowDown':
        // prevent arrow key from triggering a page scroll
        event.preventDefault();
        if (this.inputIsFocused) {
          this.opened = true;
        }
        if (focusIndex < selectionOptions.length - 1) {
          selectionOptions[focusIndex + 1].focus();
        }
        break;
      case 'Home':
        if (!selectionOptions.length) {
          return;
        }
        selectionOptions[0].focus();
        break;
      case 'End':
        if (!selectionOptions.length) {
          return;
        }
        selectionOptions[selectionOptions.length - 1].focus();
        break;
      case 'Escape':
        this.textFieldElement.focus();
        this.opened = false;
        break;
      case 'Tab':
        this.textFieldElement.focus();
        this.opened = false;
        break;
      case 'Enter':
      case 'Space':
        break;
      default:
        this.valueEdited = true;
        if (!this.filterable) {
          const arr = selectionOptions.filter(item => {
            return item.text.startsWith(event.key);
          });
          if (arr[0]) {
            arr[0].focus();
          }
        }
    }
  }
  setValue(text, value) {
    this.value = text;
    this.opened = false;
    this.valueEdited = false;
    this.emitChange(value);
  }
  _clickHandler() {
    if (!this.disabled) {
      this.opened = !this.opened;
    }
  }
  _focusHandler() {
    this.inputIsFocused = true;
  }
  _optionFocusedHandler(e) {
    whenEventIsFrom('gux-option-legacy', e, elem => {
      const option = elem;
      this.forcedGhostValue =
        this.value + option.text.substring(this.value.length);
    });
  }
  optionSelectedHandler(e) {
    whenEventIsFrom('gux-option-legacy', e, elem => {
      const option = elem;
      const selectionOptions = this.getSelectionOptions();
      selectionOptions.forEach(selectionOption => {
        if (selectionOption === option) {
          selectionOption.selected = true;
          this.setValue(selectionOption.text, selectionOption.value || selectionOption.text);
        }
        else {
          selectionOption.selected = false;
        }
      });
    });
  }
  optionKeyDownHandler(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      this.optionSelectedHandler(e);
    }
  }
  _blurHandler() {
    this.inputIsFocused = false;
    this.forcedGhostValue = '';
  }
  _inputHandler(inputEvent) {
    this.value = inputEvent.target.value;
    this.opened = true;
  }
  getFilteredItems() {
    const selectionOptions = this.getSelectionOptions();
    if (this.filterable) {
      const arr = selectionOptions.filter(item => {
        return item.text.toLowerCase().startsWith(this.value.toLowerCase());
      });
      return arr;
    }
    else {
      return selectionOptions;
    }
  }
  getSuggestionText(filter = '') {
    this.searchHighlightAndFilter(this.value);
    const filterLength = filter.length;
    const firstFilteredItem = this.getFilteredItems().length
      ? this.getFilteredItems()[0].text
      : '';
    if (filterLength > 0) {
      const option = firstFilteredItem;
      if (option) {
        return this.opened && this.filterable
          ? option.substring(filterLength)
          : '';
      }
    }
    return '';
  }
  componentWillLoad() {
    trackComponent(this.root, {
      variant: this.filterable ? 'filterable' : 'full'
    });
  }
  componentDidLoad() {
    void this.setSelected();
    if (!this.filterable) {
      this.textFieldElement.readOnly = true;
    }
  }
  getSelectionOptions() {
    const result = [];
    const options = this.root.getElementsByClassName('gux-options')[0];
    if (!options) {
      return [];
    }
    const childrenElements = Array.from(options.children);
    childrenElements.forEach(child => {
      if (child.matches('gux-option-legacy')) {
        result.push(child);
      }
    });
    return result;
  }
  render() {
    return (h("div", { class: `gux-dropdown gux-${this.mode} ${this.disabled ? 'gux-disabled' : ''} ${this.opened ? 'gux-active' : ''}`, onKeyDown: e => this.onKeyDown(e) }, h("div", { class: "gux-select-field" }, h("span", { class: `gux-filter-suggestion ${this.opened ? 'gux-active' : ''}`, "aria-hidden": "true" }, h("span", { class: "gux-filter-text" }, this.value), h("span", { class: "gux-filter-typeahead" }, this.getSuggestionText(this.value))), h("gux-input-text-like", null, h("input", { placeholder: this.placeholder, slot: "input", value: this.value, "aria-labelledby": this.srLabeledBy, disabled: this.disabled, ref: ref => (this.textFieldElement = ref), onMouseDown: () => {
        this._clickHandler();
      }, onFocus: () => {
        this._focusHandler();
      }, onBlur: () => {
        this._blurHandler();
      }, onInput: e => {
        this._inputHandler(e);
      } })), h("button", { class: "gux-dropdown-indicator", "aria-hidden": "true", tabindex: "-1", type: "button" }, h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" }))), h("div", { class: `gux-options ${this.opened ? 'gux-opened' : ''}`, onClick: this.optionSelectedHandler.bind(this), onFocusin: this._optionFocusedHandler.bind(this), onKeyDown: this.optionKeyDownHandler.bind(this) }, h("slot", null))));
  }
  getFocusIndex(selectionOptions) {
    return selectionOptions.findIndex(option => {
      return option.matches(':focus');
    });
  }
  searchHighlightAndFilter(searchInput) {
    const selectionOptions = this.getSelectionOptions();
    if (selectionOptions) {
      for (const option of selectionOptions) {
        void option.shouldFilter(searchInput).then(isFiltered => {
          if (this.filterable && isFiltered && this.valueEdited) {
            option.classList.add('gux-filtered');
          }
          else {
            option.classList.remove('gux-filtered');
          }
        });
      }
    }
  }
  static get is() { return "gux-dropdown-legacy"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-dropdown.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-dropdown.css"]
    };
  }
  static get properties() {
    return {
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'default' | 'page' | 'palette'",
          "resolved": "\"default\" | \"page\" | \"palette\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Sets the select mode (default, page or palette)."
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "'default'"
      },
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
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicate the dropdown input value"
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "''"
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
          "text": "The dropdown placeholder."
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "filterable": {
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
          "text": "Whether the user can filter or not."
        },
        "attribute": "filterable",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "opened": {},
      "forcedGhostValue": {},
      "srLabeledBy": {}
    };
  }
  static get events() {
    return [{
        "method": "change",
        "name": "change",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when selection is changed."
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
      },
      "setSelected": {
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
}
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxDropdownLegacy.prototype, "onClickOutside", null);
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxDropdownLegacy.prototype, "onMutation", null);
