'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const onClickOutside = require('./on-click-outside-2c616788.js');
const index$1 = require('./index-c4441830.js');
const simulateNativeEvent = require('./simulate-native-event-fe3e62da.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const onInputDisabledStateChange = require('./on-input-disabled-state-change-d66fb86b.js');
const usage = require('./usage-da9572bf.js');
const guxListbox_service = require('./gux-listbox.service-5bfece0e.js');
const onMutation = require('./on-mutation-83dff2a7.js');
require('./get-closest-element-ab4b2eee.js');

const textInputResults = "Type to filter dropdown results";
const noSelection = "Select...";
const dropdown = "Dropdown";
const numberSelected = "{numberSelected} selected";
const pressEnterToCreate = "Press Enter to create new option, {textInputValue}";
const translationResources = {
	textInputResults: textInputResults,
	noSelection: noSelection,
	dropdown: dropdown,
	numberSelected: numberSelected,
	pressEnterToCreate: pressEnterToCreate
};

const guxDropdownMultiCss = ":host{color:#2e394c}.gux-dropdown-container{position:relative}.gux-error.gux-target-container-collapsed .gux-field-button,.gux-error.gux-target-container-expanded{border-color:#ea0b0b}.gux-field,.gux-target-container-expanded{all:unset;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:6px 0 6px 6px;font-family:inherit;font-size:12px;line-height:1.6667;cursor:pointer;background-color:#f6f7f9}.gux-field.gux-input-field{height:30px;cursor:text}.gux-field .gux-field-content{position:relative;display:flex;flex:1 1 0;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;min-width:0;height:100%}.gux-field .gux-field-content .gux-filter,.gux-field .gux-field-content .gux-selected-option,.gux-field .gux-field-content .gux-placeholder{flex:1 1 auto;align-self:auto;order:0;padding-left:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gux-field .gux-field-content .gux-filter .gux-sr-only:not(:focus):not(:active),.gux-field .gux-field-content .gux-selected-option .gux-sr-only:not(:focus):not(:active),.gux-field .gux-field-content .gux-placeholder .gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}.gux-field .gux-field-content .gux-filter{position:relative;height:100%;padding-left:0}.gux-field .gux-field-content .gux-filter .gux-filter-input{all:unset;width:100%;color:transparent;caret-color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display{white-space:pre}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-text{color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-suggestion{color:#596373}.gux-field .gux-field-content .gux-filter .gux-filter-input,.gux-field .gux-field-content .gux-filter .gux-filter-display{position:absolute}.gux-field .gux-field-content .gux-placeholder{color:#596373}.gux-field .gux-expand-icon{flex:0 0 auto;align-self:auto;order:0;width:16px;height:16px;padding:0 8px;color:#596373}.gux-target-container-expanded{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-expanded:focus-visible,.gux-target-container-expanded:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-target-container-expanded .gux-filter-input{background-color:inherit;border:none}.gux-target-container-expanded .gux-filter-input:focus{border:none;outline:none}.gux-target-container-expanded .gux-field-button{width:auto;height:30px;padding:0 0 0 8px;margin:0;background:inherit;border:none;outline:none;box-shadow:none}.gux-target-container-expanded .gux-field-button:focus{outline:none}.gux-target-container-collapsed .gux-field-button{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-collapsed .gux-field-button:focus-visible,.gux-target-container-collapsed .gux-field-button:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-listbox-container{box-sizing:border-box;margin:0;color:#2e394c}.gux-error-message-container{display:none;margin:4px 0}.gux-error-message-container.gux-show{display:flex}";

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
const GuxDropdownMulti = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxcreateoption = index.createEvent(this, "guxcreateoption", 7);
    this.guxexpanded = index.createEvent(this, "guxexpanded", 7);
    this.guxcollapsed = index.createEvent(this, "guxcollapsed", 7);
    this.guxfilter = index.createEvent(this, "guxfilter", 7);
    this.value = undefined;
    this.disabled = false;
    this.required = false;
    this.loading = false;
    this.placeholder = undefined;
    this.filterable = false;
    this.filterType = 'none';
    this.hasError = false;
    this.hasCreate = false;
    this.expanded = false;
    this.textInput = '';
  }
  onMutation() {
    var _a;
    if (this.listboxElement) {
      return;
    }
    this.listboxElement = (_a = this.root) === null || _a === void 0 ? void 0 : _a.querySelector('gux-listbox-multi');
    this.applyListboxEventListeners();
  }
  /**
   * Listens for expanded event emitted by gux-popup.
   */
  onInternalExpanded(event) {
    event.stopPropagation();
    this.guxexpanded.emit();
  }
  /**
   * Listens for collapsed event emitted by gux-popup.
   */
  onInternalCollapsed(event) {
    event.stopPropagation();
    this.guxcollapsed.emit();
  }
  focusSelectedItemAfterRender(expanded) {
    if (expanded && this.listboxElement) {
      afterNextRender.afterNextRender(() => {
        if (this.hasTextInput()) {
          this.textInputElement.focus();
        }
        else {
          this.listboxElement.focus();
        }
      });
    }
    if (!expanded) {
      this.textInput = '';
    }
  }
  watchValue(newValue) {
    this.validateValue(newValue, this.listboxElement);
  }
  handleFilter(filter) {
    this.guxfilter.emit(filter);
  }
  /**
   * Returns an array of the selected values
   */
  getSelectedValues() {
    var _a;
    return Promise.resolve(((_a = this.value) === null || _a === void 0 ? void 0 : _a.split(',')) || []);
  }
  onKeydown(event) {
    switch (event.key) {
      case 'Escape':
        if (this.hasTextInput()) {
          if (document.activeElement === this.listboxElement) {
            return this.textInputElement.focus();
          }
        }
        this.collapseListbox('focusFieldButton');
        return;
      case 'Tab':
        if (this.shiftTabFromFilterListbox(event)) {
          event.preventDefault();
          return this.textInputElement.focus();
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
      case 'Enter':
        if (this.canCreateNewOption() && this.isActiveElement()) {
          this.emitCreateOption();
        }
    }
  }
  /**
   * force update when slotted gux-listbox-multi listbox options change
   */
  onInternallistboxoptionsupdated(event) {
    event.stopPropagation();
    index.forceUpdate(this.root);
  }
  /**
   * clear selected options when gux-dropdown-multi-tag emits event
   */
  onClearselected(event) {
    event.stopPropagation();
    this.updateValue('');
    if (this.listboxElement) {
      this.listboxElement.value = undefined;
    }
    this.validateValue(this.value, this.listboxElement);
    this.fieldButtonElement.focus();
  }
  /**
   * emit guxcreateoption event when gux-create-option emits create event
   */
  onCreatenewoption(event) {
    event.stopPropagation();
    this.emitCreateOption();
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
  connectedCallback() {
    var _a;
    this.listboxElement = (_a = this.root) === null || _a === void 0 ? void 0 : _a.querySelector('gux-listbox-multi');
    if (this.listboxElement) {
      this.validateValue(this.value, this.listboxElement);
      this.hasCreate = !!this.root.querySelector('gux-create-option');
    }
  }
  async componentWillLoad() {
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
    onInputDisabledStateChange.onInputDisabledStateChange(this.root, () => {
      index.forceUpdate(this.root);
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
      this.listboxElement.textInput = this.textInput;
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
    this.value = undefined;
  }
  hasTextInput() {
    return this.isFilterable() || this.hasCreate;
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
  isFilterable() {
    return (this.filterable ||
      this.filterType === 'custom' ||
      this.filterType === 'starts-with');
  }
  stopPropagationOfInternalFocusEvents(event) {
    if (this.root.contains(event.relatedTarget)) {
      return event.stopImmediatePropagation();
    }
  }
  getOptionElementByValue(value) {
    const listboxOptionElements = Array.from(this.root.querySelectorAll('gux-option-multi'));
    const values = value ? value.split(',') : undefined;
    if (values) {
      return listboxOptionElements.filter(element => values.includes(element.value));
    }
    return;
  }
  fieldButtonClick() {
    this.expanded = !this.expanded;
  }
  fieldButtonInputClick() {
    if (!this.expanded) {
      this.expanded = !this.expanded;
    }
  }
  filterInput(event) {
    event.stopPropagation();
    this.textInput = this.textInputElement.value;
  }
  shiftTabFromExpandedFilterInput(event) {
    return (event.shiftKey &&
      this.hasTextInput() &&
      this.expanded &&
      !(document.activeElement === this.listboxElement));
  }
  shiftTabFromFilterListbox(event) {
    return (event.shiftKey &&
      this.hasTextInput() &&
      document.activeElement === this.listboxElement);
  }
  emitCreateOption() {
    this.guxcreateoption.emit(this.textInput);
    this.textInput = '';
    this.textInputElement.value = '';
  }
  /**
   * check if able to create new option from text input value
   */
  canCreateNewOption() {
    return (this.hasCreate && this.textInput && !this.listboxElement.hasExactMatch);
  }
  isActiveElement() {
    return document.activeElement === this.root;
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
      simulateNativeEvent.simulateNativeEvent(this.root, 'input');
      simulateNativeEvent.simulateNativeEvent(this.root, 'change');
    }
  }
  getTypeaheadText(textInput) {
    var _a;
    const textInputLength = textInput.length;
    if (textInputLength > 0 && !this.loading) {
      const option = guxListbox_service.getSearchOption(this.listboxElement, textInput);
      if (option && this.filterType !== 'custom') {
        const optionSlotTextContent = (_a = option.querySelector('[gux-slot-container]')) === null || _a === void 0 ? void 0 : _a.textContent;
        return optionSlotTextContent === null || optionSlotTextContent === void 0 ? void 0 : optionSlotTextContent.substring(textInputLength);
      }
      return '';
    }
  }
  renderTargetDisplay() {
    return (index.h("div", { class: "gux-placeholder" }, this.placeholder || this.i18n('noSelection'), this.getSrSelectedText()));
  }
  getSrSelectedText() {
    const selectedListboxOptionElement = this.getOptionElementByValue(this.value);
    if (selectedListboxOptionElement === null || selectedListboxOptionElement === void 0 ? void 0 : selectedListboxOptionElement.length) {
      return (index.h("span", { class: "gux-sr-only" }, this.i18n('numberSelected', {
        numberSelected: selectedListboxOptionElement.length.toString()
      })));
    }
  }
  getInputAriaLabel() {
    return this.canCreateNewOption() && this.isActiveElement()
      ? this.i18n('pressEnterToCreate', { textInputValue: this.textInput })
      : this.i18n('textInputResults');
  }
  renderTag() {
    const selectedListboxOptionElement = this.getOptionElementByValue(this.value);
    if (selectedListboxOptionElement === null || selectedListboxOptionElement === void 0 ? void 0 : selectedListboxOptionElement.length) {
      return (index.h("gux-dropdown-multi-tag", { disabled: this.disabled, "number-selected": selectedListboxOptionElement.length }));
    }
  }
  renderFilterInputField() {
    if (this.expanded && this.hasTextInput()) {
      return (index.h("div", { class: "gux-field gux-input-field" }, index.h("div", { class: "gux-field-content" }, index.h("div", { class: "gux-filter" }, index.h("div", { class: "gux-filter-display" }, index.h("span", { class: "gux-filter-text" }, this.textInput), index.h("span", { class: "gux-filter-suggestion" }, this.getTypeaheadText(this.textInput))), index.h("div", { class: "input-and-dropdown-button" }, index.h("input", { onClick: this.fieldButtonInputClick.bind(this), placeholder: this.placeholder || this.i18n('noSelection'), class: "gux-filter-input", type: "text", "aria-label": this.getInputAriaLabel(), ref: el => (this.textInputElement = el), onInput: this.filterInput.bind(this), onKeyDown: this.filterKeydown.bind(this), onKeyUp: this.filterKeyup.bind(this) }))))));
    }
  }
  renderPopup() {
    return (index.h("div", { slot: "popup", class: "gux-listbox-container" }, index.h("slot", null)));
  }
  renderTarget() {
    return (index.h("div", { class: {
        'gux-target-container': true,
        'gux-target-container-expanded': this.expanded && this.hasTextInput(),
        'gux-target-container-collapsed': !(this.expanded && this.hasTextInput()),
        'gux-error': this.hasError
      }, slot: "target" }, this.renderFilterInputField(), index.h("button", { type: "button", class: "gux-field gux-field-button", disabled: this.disabled, onClick: this.fieldButtonClick.bind(this), ref: el => (this.fieldButtonElement = el), "aria-haspopup": "listbox", "aria-expanded": this.expanded.toString() }, this.renderTargetContent(), this.renderTag(), this.renderRadialLoading(), index.h("gux-icon", { class: {
        'gux-expand-icon': true
      }, "screenreader-text": this.i18n('dropdown'), iconName: "chevron-small-down" }))));
  }
  renderTargetContent() {
    if (!(this.expanded && this.hasTextInput())) {
      return (index.h("div", { class: "gux-field-content" }, this.renderTargetDisplay()));
    }
  }
  renderRadialLoading() {
    if (this.loading && !this.expanded) {
      return (index.h("gux-radial-loading", { context: "input" }));
    }
  }
  render() {
    return [
      index.h("div", { class: "gux-dropdown-container" }, index.h("gux-popup-beta", { expanded: this.expanded && (!this.loading || this.isFilterable()), disabled: this.disabled }, this.renderTarget(), this.renderPopup()))
    ];
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["focusSelectedItemAfterRender"],
    "value": ["watchValue"],
    "textInput": ["handleFilter"]
  }; }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true })
], GuxDropdownMulti.prototype, "onMutation", null);
__decorate([
  onClickOutside.OnClickOutside({ triggerEvents: 'mousedown' })
], GuxDropdownMulti.prototype, "onClickOutside", null);
GuxDropdownMulti.style = guxDropdownMultiCss;

exports.gux_dropdown_multi_beta = GuxDropdownMulti;
