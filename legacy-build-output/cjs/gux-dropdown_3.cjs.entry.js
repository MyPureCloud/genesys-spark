'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const onClickOutside = require('./on-click-outside-2c616788.js');
const index$1 = require('./index-c4441830.js');
const simulateNativeEvent = require('./simulate-native-event-fe3e62da.js');
const onInputDisabledStateChange = require('./on-input-disabled-state-change-d66fb86b.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const usage = require('./usage-da9572bf.js');
const onMutation = require('./on-mutation-83dff2a7.js');
const guxListbox_service = require('./gux-listbox.service-5bfece0e.js');
const whenEventIsFrom = require('./when-event-is-from-69b5ca13.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
require('./get-closest-element-ab4b2eee.js');

const filterResults = "Type to filter dropdown results";
const noSelection = "Select...";
const dropdown = "Dropdown";
const translationResources$1 = {
	filterResults: filterResults,
	noSelection: noSelection,
	dropdown: dropdown
};

const guxDropdownCss = ":host{color:#2e394c}.gux-field,.gux-target-container-expanded{all:unset;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;height:32px;padding:6px 8px;font-family:inherit;font-size:12px;line-height:1.6667;cursor:pointer;background-color:#f6f7f9}.gux-error.gux-target-container-collapsed .gux-field-button,.gux-error.gux-target-container-expanded{border-color:#ea0b0b}.gux-field.gux-input-field{height:30px}.gux-field .gux-field-content{display:flex;flex:1 1 0;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start;min-width:0;height:100%}.gux-field .gux-field-content .gux-filter,.gux-field .gux-field-content .gux-selected-option,.gux-field .gux-field-content .gux-placeholder{flex:1 1 auto;align-self:auto;order:0;padding:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gux-field .gux-field-content .gux-filter{position:relative;height:100%}.gux-field .gux-field-content .gux-filter .gux-filter-input{all:unset;width:100%;color:transparent;caret-color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display{white-space:pre}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-text{color:#2e394c}.gux-field .gux-field-content .gux-filter .gux-filter-display .gux-filter-suggestion{color:#596373}.gux-field .gux-field-content .gux-filter .gux-filter-input,.gux-field .gux-field-content .gux-filter .gux-filter-display{position:absolute}.gux-field .gux-field-content .gux-placeholder{color:#596373}.gux-field .gux-expand-icon{flex:0 0 auto;align-self:auto;order:0;width:16px;height:16px;padding-left:8px;color:#596373}.gux-target-container-expanded{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-expanded:focus-visible,.gux-target-container-expanded:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-target-container-expanded .gux-filter-input{background-color:inherit;border:none}.gux-target-container-expanded .gux-filter-input:focus{border:none;outline:none}.gux-target-container-expanded .gux-field-button{width:auto;height:30px;padding:0 0 0 8px;margin:0;background:inherit;border:none;outline:none;box-shadow:none}.gux-target-container-expanded .gux-field-button:focus{outline:none}.gux-target-container-collapsed .gux-field-button{border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-target-container-collapsed .gux-field-button:focus-visible,.gux-target-container-collapsed .gux-field-button:focus-within{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-listbox-container{box-sizing:border-box;margin:0;color:#2e394c}.gux-selected-icon{display:flex;align-items:center}.gux-selected-icon gux-icon{width:16px;height:16px;padding-right:8px}";

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
    index.registerInstance(this, hostRef);
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
    this.expanded = false;
    this.filter = '';
  }
  watchExpanded(expanded) {
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
    index.forceUpdate(this.root);
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
    if (this.listboxElement) {
      afterNextRender.afterNextRender(() => {
        this.listboxElement.focus();
        if (this.isFilterable() && this.filterElement) {
          this.filterElement.focus();
        }
      });
    }
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
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources$1);
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
  get optionElements() {
    return guxListbox_service.getListOptions(this.listboxElement);
  }
  getOptionElementByValue(value) {
    return this.optionElements.find(optionElement => {
      return optionElement.value === value;
    });
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
      simulateNativeEvent.simulateNativeEvent(this.root, 'input');
      simulateNativeEvent.simulateNativeEvent(this.root, 'change');
    }
    this.collapseListbox('focusFieldButton');
  }
  getTypeaheadText(filter) {
    const filterLength = filter.length;
    if (filterLength > 0 && !this.loading) {
      const option = guxListbox_service.getSearchOption(this.listboxElement, filter);
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
      return (index.h("div", { class: "gux-selected-option" }, this.renderSelectedItem(selectedListboxOptionElement)));
    }
    return (index.h("div", { class: "gux-placeholder" }, this.placeholder || this.i18n('noSelection')));
  }
  /**
   * Renders the selection display for the selected item. This function needs a branch to handle
   * each type defined in GuxDropdownOptionType
   *
   * @param item The selected item. This can be any of the node types defined in GuxDropdownOptionType.
   * @returns Rendered selection details.
   */
  renderSelectedItem(item) {
    const tag = item.tagName.toLowerCase();
    switch (tag) {
      case 'gux-option':
        return (index.h("span", null, item.textContent));
      case 'gux-option-icon':
        return this.renderIconOption(item);
      default:
        // eslint-disable-next-line no-case-declarations
        const _exhaustiveCheck = tag;
        return _exhaustiveCheck;
    }
  }
  renderIconOption(iconOption) {
    let iconStyle = null;
    if (iconOption.iconColor !== null) {
      iconStyle = { color: iconOption.iconColor };
    }
    return (index.h("span", { class: "gux-selected-icon" }, index.h("gux-icon", { "icon-name": iconOption.iconName, style: iconStyle, decorative: true }), iconOption.textContent));
  }
  renderFilterInputField() {
    if (this.expanded && this.isFilterable()) {
      return (index.h("div", { class: "gux-field gux-input-field" }, index.h("div", { class: "gux-field-content" }, index.h("div", { class: "gux-filter" }, index.h("div", { class: "gux-filter-display" }, index.h("span", { class: "gux-filter-text" }, this.filter), index.h("span", { class: "gux-filter-suggestion" }, this.getTypeaheadText(this.filter))), index.h("div", { class: "input-and-dropdown-button" }, index.h("input", { onClick: this.fieldButtonClick.bind(this), class: "gux-filter-input", type: "text", "aria-label": this.i18n('filterResults'), ref: el => (this.filterElement = el), onInput: this.filterInput.bind(this), onKeyDown: this.filterKeydown.bind(this), onKeyUp: this.filterKeyup.bind(this) }))))));
    }
  }
  renderPopup() {
    return (index.h("div", { slot: "popup", class: "gux-listbox-container" }, index.h("slot", null)));
  }
  renderTarget() {
    return (index.h("div", { class: {
        'gux-target-container-expanded': this.expanded && this.isFilterable(),
        'gux-target-container-collapsed': !(this.expanded && this.isFilterable()),
        'gux-error': this.hasError
      }, slot: "target" }, this.renderFilterInputField(), index.h("button", { type: "button", class: "gux-field gux-field-button", disabled: onInputDisabledStateChange.calculateInputDisabledState(this.root), onClick: this.fieldButtonClick.bind(this), ref: el => (this.fieldButtonElement = el), "aria-haspopup": "listbox", "aria-expanded": this.expanded.toString() }, this.renderTargetContent(), this.renderRadialLoading(), index.h("gux-icon", { class: {
        'gux-expand-icon': true
      }, "screenreader-text": this.i18n('dropdown'), iconName: "chevron-small-down" }))));
  }
  renderTargetContent() {
    if (!(this.expanded && this.isFilterable())) {
      return (index.h("div", { class: "gux-field-content" }, this.renderTargetDisplay()));
    }
  }
  renderRadialLoading() {
    if (this.loading && !this.expanded) {
      return (index.h("gux-radial-loading", { context: "input" }));
    }
  }
  render() {
    return (index.h("gux-popup-beta", { expanded: this.expanded && (!this.loading || this.isFilterable()), disabled: this.disabled }, this.renderTarget(), this.renderPopup()));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["watchExpanded"],
    "value": ["watchValue"],
    "filter": ["handleFilter"]
  }; }
};
__decorate([
  onClickOutside.OnClickOutside({ triggerEvents: 'mousedown' })
], GuxDropdown.prototype, "onClickOutside", null);
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true })
], GuxDropdown.prototype, "onMutation", null);
GuxDropdown.style = guxDropdownCss;

/**
 * This list of valid option tags lets us derive both a union type for the tags
 * and a CSS selector for matching them in the DOM.
 */
const optionTypes = ['gux-option', 'gux-option-icon'];
/**
 * Useful CSS selector generated from the list of option tags.
 */
const optionTagSelector = optionTypes.join(',');

const noMatches = "No matches";
const loading = "Loading...";
const translationResources = {
	noMatches: noMatches,
	loading: loading
};

const guxListboxCss = ":host{box-sizing:border-box;display:block;max-height:20rem;padding:8px 0;margin:0;overflow-y:auto;color:#2e394c;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;outline:none}:host(:focus){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-message-container{display:flex;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}.gux-message-container .gux-no-matches{box-sizing:border-box;height:32px;padding:8px 16px;color:#2e394c}";

const GuxListbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internallistboxoptionsupdated = index.createEvent(this, "internallistboxoptionsupdated", 7);
    this.value = undefined;
    this.filter = '';
    this.filterType = 'none';
    this.loading = false;
    this.selectedValues = [];
    this.listboxOptions = [];
    this.allListboxOptionsFiltered = undefined;
  }
  onFocus() {
    guxListbox_service.setInitialActiveOption(this.root);
  }
  onBlur() {
    guxListbox_service.clearActiveOptions(this.root);
  }
  onKeydown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        guxListbox_service.actOnActiveOption(this.root, value => this.updateValue(value));
        return;
      case 'ArrowDown':
        event.preventDefault();
        if (guxListbox_service.hasNextOption(this.root)) {
          event.stopPropagation();
          guxListbox_service.setNextOptionActive(this.root);
        }
        else {
          guxListbox_service.setFirstOptionActive(this.root);
        }
        return;
      case 'ArrowUp': {
        event.preventDefault();
        if (guxListbox_service.hasPreviousOption(this.root)) {
          event.stopPropagation();
          guxListbox_service.setPreviousOptionActive(this.root);
        }
        else {
          guxListbox_service.setLastOptionActive(this.root);
        }
        return;
      }
      case 'Home': {
        event.preventDefault();
        guxListbox_service.setFirstOptionActive(this.root);
        return;
      }
      case 'End': {
        event.preventDefault();
        guxListbox_service.setLastOptionActive(this.root);
        return;
      }
      case ' ': {
        event.preventDefault();
        return;
      }
    }
    if (event.key.length === 1) {
      guxListbox_service.goToOption(this.root, event.key);
      return;
    }
  }
  onKeyup(event) {
    switch (event.key) {
      case ' ':
        guxListbox_service.actOnActiveOption(this.root, value => this.updateValue(value));
        return;
    }
  }
  onMousemove() {
    guxListbox_service.clearActiveOptions(this.root);
  }
  onClick(event) {
    // If it's got a value attribute, that's good enough.
    whenEventIsFrom.whenEventIsFrom(optionTagSelector, event, (option) => {
      guxListbox_service.onClickedOption(option, value => this.updateValue(value));
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSelectActive() {
    guxListbox_service.actOnActiveOption(this.root, value => this.updateValue(value));
  }
  setListboxOptions() {
    if (this.value) {
      this.selectedValues = this.value.split(',');
    }
    this.listboxOptions = Array.from(this.root.children);
    this.internallistboxoptionsupdated.emit();
  }
  updateValue(newValue) {
    if (this.value !== newValue) {
      this.value = newValue;
    }
    simulateNativeEvent.simulateNativeEvent(this.root, 'input');
    simulateNativeEvent.simulateNativeEvent(this.root, 'change');
  }
  async componentWillLoad() {
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
    this.setListboxOptions();
  }
  componentWillRender() {
    this.listboxOptions.forEach(listboxOption => {
      listboxOption.selected = listboxOption.value === this.value;
      if (this.filterType !== 'custom') {
        listboxOption.filtered = !guxListbox_service.matchOption(listboxOption, this.filter);
      }
    });
    this.allListboxOptionsFiltered =
      this.listboxOptions.filter(listboxOption => !listboxOption.filtered)
        .length === 0;
    if (!this.allListboxOptionsFiltered && this.filter) {
      guxListbox_service.setFirstOptionActive(this.root);
    }
    else {
      guxListbox_service.clearActiveOptions(this.root);
    }
  }
  // The slot must always be rendered so onSlotchange can be called
  renderHiddenSlot() {
    return (index.h("div", { hidden: true }, index.h("slot", { onSlotchange: () => this.setListboxOptions() })));
  }
  renderLoading() {
    return [
      index.h("div", { class: "gux-message-container" }, index.h("gux-radial-loading", { context: "modal" }), index.h("span", null, this.i18n('loading'))),
      this.renderHiddenSlot()
    ];
  }
  renderAllListboxOptionsFiltered() {
    return [
      index.h("div", { class: "gux-message-container" }, index.h("div", { class: "gux-no-matches" }, this.i18n('noMatches'))),
      this.renderHiddenSlot()
    ];
  }
  render() {
    if (this.loading) {
      return this.renderLoading();
    }
    if (this.allListboxOptionsFiltered) {
      return this.renderAllListboxOptionsFiltered();
    }
    return (index.h(index.Host, { role: "listbox", tabindex: 0 }, index.h("slot", { onSlotchange: () => this.setListboxOptions() })));
  }
  get root() { return index.getElement(this); }
};
GuxListbox.style = guxListboxCss;

const guxOptionCss = "gux-option{box-sizing:border-box;display:flex;min-height:32px;padding:6px 8px;color:#2e394c;word-wrap:break-word;cursor:pointer}gux-option.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-option.gux-selected{background:#deeaff}gux-option.gux-active,gux-option.gux-hovered:not(:disabled){color:#fdfdfd;background:#2a60c8}gux-option.gux-filtered{display:none}";

const GuxOption = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = undefined;
    this.active = false;
    this.selected = false;
    this.disabled = false;
    this.filtered = false;
    this.hovered = false;
  }
  onmouseenter() {
    this.hovered = true;
  }
  onMouseleave() {
    this.hovered = false;
  }
  componentWillLoad() {
    this.root.id = this.root.id || randomHtmlId.randomHTMLId('gux-option');
  }
  getAriaSelected() {
    if (this.disabled) {
      return false;
    }
    return this.selected ? 'true' : 'false';
  }
  render() {
    return (index.h(index.Host, { role: "option", class: {
        'gux-active': this.active,
        'gux-disabled': this.disabled,
        'gux-filtered': this.filtered,
        'gux-hovered': this.hovered,
        'gux-selected': this.selected
      }, "aria-selected": this.getAriaSelected(), "aria-disabled": this.disabled.toString() }, index.h("slot", null)));
  }
  get root() { return index.getElement(this); }
};
GuxOption.style = guxOptionCss;

exports.gux_dropdown = GuxDropdown;
exports.gux_listbox = GuxListbox;
exports.gux_option = GuxOption;
