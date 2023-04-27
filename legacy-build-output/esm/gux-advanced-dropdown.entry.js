import { r as registerInstance, c as createEvent, h, g as getElement } from './index-816e34d8.js';
import { o as onMutation } from './on-mutation-d500715c.js';
import { O as OnClickOutside } from './on-click-outside-8fa334c9.js';
import { a as afterNextRenderTimeout } from './after-next-render-ed0f7dcd.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import './get-closest-element-1597503c.js';

const searchAria = "Search";
const advancedDropDownResources = {
	searchAria: searchAria
};

const guxAdvancedDropdownCss = ":host{color:#2e394c}gux-popup-beta{display:block;margin:4px 0}gux-popup-beta .gux-select-field{position:relative;width:100%;height:32px}gux-popup-beta .gux-select-field a.gux-select-input{position:absolute;top:0;right:0;bottom:0;left:0;padding:6px 24px 6px 12px;overflow:hidden;color:#2e394c;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-popup-beta .gux-select-field a.gux-select-input .gux-select-placeholder,gux-popup-beta .gux-select-field a.gux-select-input .gux-select-value{line-height:20px}gux-popup-beta .gux-select-field a.gux-select-input .gux-select-placeholder{color:#596373}gux-popup-beta .gux-select-field a.gux-select-input:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(117, 168, 255, 0.5)}gux-popup-beta .gux-select-field .gux-icon-wrapper{position:absolute;top:1px;right:8px;bottom:0;display:flex;align-items:center;overflow:hidden;cursor:pointer}gux-popup-beta .gux-select-field .gux-icon-wrapper gux-icon{width:16px;height:16px;color:#596373}gux-popup-beta .gux-select-field:hover .gux-icon-wrapper gux-icon{color:#2e394c}gux-popup-beta .gux-advanced-dropdown-menu{width:100%;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 0 2px 0 rgba(32, 41, 55, 0.24);box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-popup-beta .gux-advanced-dropdown-menu .gux-dropdown-menu-container gux-form-field-search{margin:8px 16px}gux-popup-beta .gux-advanced-dropdown-menu .gux-dropdown-menu-container gux-form-field-search input::-webkit-search-cancel-button,gux-popup-beta .gux-advanced-dropdown-menu .gux-dropdown-menu-container gux-form-field-search input::-webkit-search-results-button,gux-popup-beta .gux-advanced-dropdown-menu .gux-dropdown-menu-container gux-form-field-search input::-webkit-calendar-picker-indicator{display:none;-webkit-appearance:none}gux-popup-beta .gux-dropdown-options{padding:8px 0;margin:0;overflow-y:auto;color:#2e394c;background:#fdfdfd;border-radius:4px;box-shadow:none}";

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
const GuxAdvancedDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.input = createEvent(this, "input", 7);
    this.filter = createEvent(this, "filter", 7);
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
    }
  }
  inputKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        this.openDropdown(true);
        break;
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
  get root() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["watchValue"]
  }; }
};
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxAdvancedDropdown.prototype, "onClickOutside", null);
GuxAdvancedDropdown.style = guxAdvancedDropdownCss;

export { GuxAdvancedDropdown as gux_advanced_dropdown };
