import { r as registerInstance, c as createEvent, f as forceUpdate, h, g as getElement } from './index-816e34d8.js';
import { O as OnClickOutside } from './on-click-outside-8fa334c9.js';
import { w as whenEventIsFrom } from './when-event-is-from-18667084.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { O as OnMutation } from './on-mutation-35d8145e.js';

const guxDropdownCss = "gux-dropdown-legacy .gux-hidden{display:none}gux-dropdown-legacy div.gux-dropdown{position:relative;margin:4px 0}gux-dropdown-legacy div.gux-dropdown.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-dropdown-legacy div.gux-dropdown .gux-select-field{position:relative;width:100%;height:32px}gux-dropdown-legacy div.gux-dropdown .gux-select-field .gux-filter-suggestion{position:absolute;box-sizing:border-box;width:100%;height:32px;padding:6px 25px 6px 14px;overflow:hidden;font-size:12px;line-height:1.6667;text-overflow:ellipsis;white-space:nowrap;pointer-events:none}gux-dropdown-legacy div.gux-dropdown .gux-select-field .gux-filter-suggestion .gux-filter-text{color:#2e394c}gux-dropdown-legacy div.gux-dropdown .gux-select-field .gux-filter-suggestion .gux-filter-typeahead{color:#596373}gux-dropdown-legacy div.gux-dropdown .gux-select-field gux-input-text-like>div{margin:0}gux-dropdown-legacy div.gux-dropdown .gux-select-field gux-input-text-like input{width:100%;padding-right:25px;font-size:12px;text-overflow:ellipsis;cursor:pointer;background-color:transparent}gux-dropdown-legacy div.gux-dropdown .gux-select-field gux-input-text-like.gux-unclearable button{display:none}gux-dropdown-legacy div.gux-dropdown .gux-select-field button.gux-dropdown-indicator{position:absolute;top:1px;right:3px;bottom:0;display:block;overflow:hidden;pointer-events:none;cursor:pointer;background:none;border:none;outline:none}gux-dropdown-legacy div.gux-dropdown .gux-select-field button.gux-dropdown-indicator gux-icon{width:16px;height:16px;color:#596373}gux-dropdown-legacy div.gux-dropdown .gux-select-field:hover button.gux-dropdown-indicator gux-icon,gux-dropdown-legacy div.gux-dropdown .gux-select-field:focus-within button.gux-dropdown-indicator gux-icon{color:#2e394c}gux-dropdown-legacy div.gux-dropdown .gux-options{position:absolute;z-index:var(--gux-zindex-popup, 1);display:none;width:100%;padding:8px 0;margin-top:2px;overflow-y:auto;color:#2e394c;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-dropdown-legacy div.gux-dropdown .gux-options.gux-opened{display:block}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy{position:relative;display:flex;height:32px;padding:0 16px;line-height:32px;cursor:pointer}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy>div{position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy>div .gux-filter-suggestion{position:absolute}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy[disabled]{pointer-events:none;cursor:default;opacity:0.5}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy.gux-filtered{display:none}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy:not([disabled])[selected]{color:#2e394c;background:#deeaff}gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy:not([disabled]):hover,gux-dropdown-legacy div.gux-dropdown .gux-options>gux-option-legacy:not([disabled]):focus-visible{color:#fdfdfd;background:#2a60c8}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field{height:48px}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field .gux-filter-suggestion{height:48px;padding:2px 25px 4px 11px;overflow:hidden;line-height:1.6667;white-space:nowrap;font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field gux-input-text-like div.gux-input-container{height:48px}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field gux-input-text-like input{font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px;height:48px;line-height:1.6667;color:transparent;border:none;border-bottom:2px solid transparent;caret-color:#2e394c}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field gux-input-text-like input:focus-visible{border:none;border-bottom:2px solid rgba(117, 168, 255, 0.5);box-shadow:none}gux-dropdown-legacy div.gux-dropdown.gux-page.gux-active .gux-select-field gux-input-text-like input:focus{border-bottom:1px solid #2a60c8}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field{height:52px}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field .gux-filter-suggestion{height:52px;padding:9px 25px 4px 11px;overflow:hidden;line-height:1.6667;white-space:nowrap;font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:18px;line-height:24px}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like div.gux-input-container{height:52px}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like input{font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:18px;line-height:24px;height:52px;line-height:1.6667;border:none;border-bottom:2px solid transparent}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like input:focus-visible{border:none;border-bottom:2px solid rgba(117, 168, 255, 0.5);box-shadow:none}gux-dropdown-legacy div.gux-dropdown.gux-palette.gux-active .gux-select-field gux-input-text-like input:focus{border-bottom:1px solid #2a60c8}gux-dropdown-legacy:hover gux-icon,gux-dropdown-legacy:focus-visible gux-icon{color:#2e394c}.gux-dropdown-light-theme div.gux-dropdown .gux-select-field .gux-filter-suggestion{color:#596373}.gux-dropdown-light-theme div.gux-dropdown .gux-select-field gux-input-text-like input{color:transparent;caret-color:#2e394c;border-color:#6b7585}.gux-dropdown-light-theme div.gux-dropdown .gux-select-field button.gux-dropdown-indicator{color:#596373}.gux-dropdown-light-theme div.gux-dropdown.gux-page .gux-select-field .gux-filter-suggestion{color:#8a97ad;background-color:#fdfdfd}.gux-dropdown-light-theme div.gux-dropdown.gux-page .gux-select-field gux-input-text-like input{border-bottom:1px solid #6b7585}.gux-dropdown-light-theme div.gux-dropdown.gux-page.gux-active gux-input-text-like input{border-bottom:1px solid #75a8ff}.gux-dropdown-light-theme div.gux-dropdown.gux-palette .gux-select-field .gux-filter-suggestion{color:#8a97ad;background-color:#fdfdfd}.gux-dropdown-light-theme div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like input{border-bottom:1px solid #6b7585}.gux-dropdown-light-theme div.gux-dropdown.gux-palette.gux-active gux-input-text-like input{border-bottom:1px solid #75a8ff}gux-dropdown-legacy div.gux-dropdown .gux-select-field .gux-filter-suggestion{color:#596373}gux-dropdown-legacy div.gux-dropdown .gux-select-field gux-input-text-like input{color:transparent;caret-color:#2e394c;border-color:#6b7585}gux-dropdown-legacy div.gux-dropdown .gux-select-field button.gux-dropdown-indicator{color:#596373}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field .gux-filter-suggestion{color:#8a97ad;background-color:#fdfdfd}gux-dropdown-legacy div.gux-dropdown.gux-page .gux-select-field gux-input-text-like input{border-bottom:1px solid #6b7585}gux-dropdown-legacy div.gux-dropdown.gux-page.gux-active gux-input-text-like input{border-bottom:1px solid #75a8ff}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field .gux-filter-suggestion{color:#8a97ad;background-color:#fdfdfd}gux-dropdown-legacy div.gux-dropdown.gux-palette .gux-select-field gux-input-text-like input{border-bottom:1px solid #6b7585}gux-dropdown-legacy div.gux-dropdown.gux-palette.gux-active gux-input-text-like input{border-bottom:1px solid #75a8ff}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const GuxDropdownLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.change = createEvent(this, "change", 7);
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
  get root() { return getElement(this); }
};
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxDropdownLegacy.prototype, "onClickOutside", null);
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxDropdownLegacy.prototype, "onMutation", null);
GuxDropdownLegacy.style = guxDropdownCss;

export { GuxDropdownLegacy as gux_dropdown_legacy };
