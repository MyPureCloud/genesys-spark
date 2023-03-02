import { r as registerInstance, e as createEvent, l as forceUpdate, h, g as getElement } from './index-f583fcde.js';
import { O as OnClickOutside } from './on-click-outside-c96e7b47.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { o as onInputDisabledStateChange, c as calculateInputDisabledState } from './on-input-disabled-state-change-3ea76372.js';
import { b as afterNextRender } from './after-next-render-ed0f7dcd.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { O as OnMutation } from './on-mutation-59e1cbf1.js';
import { g as getSearchOption } from './gux-listbox.service-54cf5ac6.js';
import './get-closest-element-1597503c.js';

const filterResults = "Type to filter dropdown results";
const noSelection = "Select...";
const dropdown = "Dropdown";
const translationResources = {
	filterResults: filterResults,
	noSelection: noSelection,
	dropdown: dropdown
};

const guxDropdownCss = ":host{color:#2e394c}.gux-field,.gux-target-container-expanded{all:unset;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:6px 8px 6px 6px;font-family:inherit;font-size:12px;line-height:1.6667;cursor:pointer;background-color:#f6f7f9}.gux-error.gux-target-container-collapsed .gux-field-button,.gux-error.gux-target-container-expanded{border-color:#ea0b0b}.gux-field.gux-input-field{height:30px}.gux-field .gux-field-content{display:flex;flex:1 1 0;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;min-width:0;height:100%}.gux-field .gux-field-content .gux-filter,.gux-field .gux-field-content .gux-selected-option,.gux-field .gux-field-content .gux-placeholder{flex:1 1 auto;align-self:auto;order:0;padding-left:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gux-field .gux-field-content .gux-filter{position:relative;height:100%}.gux-field .gux-field-content .gux-filter .gux-filter-input{all:unset;width:100%;color:transparent;caret-color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display{white-space:pre}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-text{color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-suggestion{color:#596373}.gux-field .gux-field-content .gux-filter .gux-filter-input,.gux-field .gux-field-content .gux-filter .gux-filter-display{position:absolute}.gux-field .gux-field-content .gux-placeholder{color:#596373}.gux-field .gux-expand-icon{flex:0 0 auto;align-self:auto;order:0;width:16px;height:16px;padding-left:8px;color:#596373}.gux-target-container-expanded{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-expanded:focus,.gux-target-container-expanded:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-target-container-expanded .gux-filter-input{background-color:inherit;border:none}.gux-target-container-expanded .gux-filter-input:focus{border:none;outline:none}.gux-target-container-expanded .gux-field-button{width:auto;height:30px;padding:0 0 0 8px;margin:0;background:inherit;border:none;outline:none;box-shadow:none}.gux-target-container-expanded .gux-field-button:focus{outline:none}.gux-target-container-collapsed .gux-field-button{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-collapsed .gux-field-button:focus,.gux-target-container-collapsed .gux-field-button:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-listbox-container{box-sizing:border-box;margin:0;color:#2e394c}";

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
const GuxDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxexpanded = createEvent(this, "guxexpanded", 7);
    this.guxcollapsed = createEvent(this, "guxcollapsed", 7);
    this.guxfilter = createEvent(this, "guxfilter", 7);
    this.value = undefined;
    this.disabled = false;
    this.required = false;
    this.loading = false;
    this.placeholder = undefined;
    this.filterable = false;
    this.filterType = 'none';
    this.hasError = false;
    this.expanded = false;
    this.filter = '';
  }
  focusSelectedItemAfterRender(expanded) {
    if (expanded && this.listboxElement) {
      afterNextRender(() => {
        this.listboxElement.focus();
        if (this.isFilterable()) {
          this.filterElement.focus();
        }
      });
    }
    if (!expanded) {
      this.filter = '';
    }
  }
  watchValue(newValue) {
    this.validateValue(newValue, this.listboxElement);
  }
  handleFilter(filter) {
    this.guxfilter.emit(filter);
  }
  onKeydown(event) {
    switch (event.key) {
      case 'Escape':
        if (this.isFilterable()) {
          if (document.activeElement === this.listboxElement) {
            return this.filterElement.focus();
          }
        }
        this.collapseListbox('focusFieldButton');
        return;
      case 'Tab':
        if (this.shiftTabFromFilterListbox(event)) {
          event.preventDefault();
          return this.filterElement.focus();
        }
        else if (this.shiftTabFromExpandedFilterInput(event)) {
          event.preventDefault();
          return this.collapseListbox('focusFieldButton');
        }
        else {
          this.collapseListbox('noFocusChange');
        }
        return;
      case 'ArrowDown':
        if (this.activeElementNotListbox()) {
          event.preventDefault();
          this.expanded = true;
        }
        return;
    }
  }
  onInternallistboxoptionsupdated(event) {
    event.stopPropagation();
    forceUpdate(this.root);
  }
  onBlur(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onFocus(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onFocusout(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onFocusin(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onClickOutside() {
    this.collapseListbox('noFocusChange');
  }
  onMutation() {
    var _a;
    if (this.listboxElement) {
      return;
    }
    this.listboxElement = (_a = this.root) === null || _a === void 0 ? void 0 : _a.querySelector('gux-listbox');
    this.applyListboxEventListeners();
  }
  onInternalExpanded(event) {
    event.stopPropagation();
    this.guxexpanded.emit();
  }
  onInternalCollapsed(event) {
    event.stopPropagation();
    this.guxcollapsed.emit();
  }
  connectedCallback() {
    var _a;
    this.listboxElement = (_a = this.root) === null || _a === void 0 ? void 0 : _a.querySelector('gux-listbox');
    if (this.listboxElement) {
      this.validateValue(this.value, this.listboxElement);
    }
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    onInputDisabledStateChange(this.root, () => {
      forceUpdate(this.root);
    });
  }
  componentDidLoad() {
    this.applyListboxEventListeners();
  }
  componentWillRender() {
    if (this.listboxElement) {
      this.validateValue(this.value, this.listboxElement);
      this.listboxElement.loading = this.loading;
      this.listboxElement.filterType = this.filterType;
      this.listboxElement.filter = this.filter;
    }
  }
  validateValue(newValue, listboxElement) {
    if (newValue === undefined) {
      if (listboxElement) {
        listboxElement.value = newValue;
      }
      return;
    }
    const selectedListboxOptionElement = this.getOptionElementByValue(newValue);
    if (selectedListboxOptionElement) {
      listboxElement.value = newValue;
      return;
    }
  }
  applyListboxEventListeners() {
    var _a, _b;
    (_a = this.listboxElement) === null || _a === void 0 ? void 0 : _a.addEventListener('input', (event) => {
      event.stopPropagation();
      this.updateValue(event.target.value);
    });
    (_b = this.listboxElement) === null || _b === void 0 ? void 0 : _b.addEventListener('change', (event) => {
      event.stopPropagation();
    });
  }
  stopPropagationOfInternalFocusEvents(event) {
    if (this.root.contains(event.relatedTarget)) {
      return event.stopImmediatePropagation();
    }
  }
  isFilterable() {
    return (this.filterable ||
      this.filterType === 'starts-with' ||
      this.filterType === 'custom');
  }
  getOptionElementByValue(value) {
    const listboxOptionElements = this.root.querySelectorAll('gux-option');
    return Array.from(listboxOptionElements).find(listboxOptionElement => listboxOptionElement.value === value);
  }
  fieldButtonClick() {
    this.expanded = !this.expanded;
  }
  filterInput(event) {
    event.stopPropagation();
    this.filter = this.filterElement.value;
  }
  shiftTabFromExpandedFilterInput(event) {
    return (event.shiftKey &&
      this.isFilterable() &&
      this.expanded &&
      !(document.activeElement === this.listboxElement));
  }
  shiftTabFromFilterListbox(event) {
    return (event.shiftKey &&
      this.isFilterable() &&
      document.activeElement === this.listboxElement);
  }
  activeElementNotListbox() {
    return document.activeElement !== this.listboxElement;
  }
  filterKeydown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.stopImmediatePropagation();
        this.listboxElement.focus();
        return;
      case 'Enter':
        void this.listboxElement.guxSelectActive();
        event.preventDefault();
        return;
    }
  }
  filterKeyup(event) {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        return;
    }
  }
  collapseListbox(focusChange) {
    if (this.expanded) {
      this.expanded = false;
    }
    if (focusChange === 'focusFieldButton') {
      this.fieldButtonElement.focus();
    }
  }
  updateValue(newValue) {
    if (this.value !== newValue) {
      this.value = newValue;
      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
    this.collapseListbox('focusFieldButton');
  }
  getTypeaheadText(filter) {
    const filterLength = filter.length;
    if (filterLength > 0 && !this.loading) {
      const option = getSearchOption(this.listboxElement, filter);
      if (option && this.filterType !== 'custom') {
        //The text content needs to be trimmed as white space can occur around the textContent if options are populated asynchronously.
        return option.textContent.trim().substring(filterLength);
      }
    }
    return '';
  }
  renderTargetDisplay() {
    const selectedListboxOptionElement = this.getOptionElementByValue(this.value);
    if (selectedListboxOptionElement) {
      return (h("div", { class: "gux-selected-option" }, selectedListboxOptionElement.textContent));
    }
    return (h("div", { class: "gux-placeholder" }, this.placeholder || this.i18n('noSelection')));
  }
  renderFilterInputField() {
    if (this.expanded && this.isFilterable()) {
      return (h("div", { class: "gux-field gux-input-field" }, h("div", { class: "gux-field-content" }, h("div", { class: "gux-filter" }, h("div", { class: "gux-filter-display" }, h("span", { class: "gux-filter-text" }, this.filter), h("span", { class: "gux-filter-suggestion" }, this.getTypeaheadText(this.filter))), h("div", { class: "input-and-dropdown-button" }, h("input", { onClick: this.fieldButtonClick.bind(this), class: "gux-filter-input", type: "text", "aria-label": this.i18n('filterResults'), ref: el => (this.filterElement = el), onInput: this.filterInput.bind(this), onKeyDown: this.filterKeydown.bind(this), onKeyUp: this.filterKeyup.bind(this) }))))));
    }
  }
  renderPopup() {
    return (h("div", { slot: "popup", class: "gux-listbox-container" }, h("slot", null)));
  }
  renderTarget() {
    return (h("div", { class: {
        'gux-target-container-expanded': this.expanded && this.isFilterable(),
        'gux-target-container-collapsed': !(this.expanded && this.isFilterable()),
        'gux-error': this.hasError
      }, slot: "target" }, this.renderFilterInputField(), h("button", { type: "button", class: "gux-field gux-field-button", disabled: calculateInputDisabledState(this.root), onClick: this.fieldButtonClick.bind(this), ref: el => (this.fieldButtonElement = el), "aria-haspopup": "listbox", "aria-expanded": this.expanded.toString() }, this.renderTargetContent(), this.renderRadialLoading(), h("gux-icon", { class: {
        'gux-expand-icon': true
      }, "screenreader-text": this.i18n('dropdown'), iconName: "chevron-small-down" }))));
  }
  renderTargetContent() {
    if (!(this.expanded && this.isFilterable())) {
      return (h("div", { class: "gux-field-content" }, this.renderTargetDisplay()));
    }
  }
  renderRadialLoading() {
    if (this.loading && !this.expanded) {
      return (h("gux-radial-loading", { context: "input" }));
    }
  }
  render() {
    return (h("gux-popup-beta", { expanded: this.expanded && (!this.loading || this.isFilterable()), disabled: this.disabled }, this.renderTarget(), this.renderPopup()));
  }
  static get delegatesFocus() { return true; }
  get root() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["focusSelectedItemAfterRender"],
    "value": ["watchValue"],
    "filter": ["handleFilter"]
  }; }
};
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxDropdown.prototype, "onClickOutside", null);
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxDropdown.prototype, "onMutation", null);
GuxDropdown.style = guxDropdownCss;

export { GuxDropdown as gux_dropdown };
