'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const guxListbox_service = require('./gux-listbox.service-5bfece0e.js');
const index$1 = require('./index-c4441830.js');
const whenEventIsFrom = require('./when-event-is-from-69b5ca13.js');
const simulateNativeEvent = require('./simulate-native-event-fe3e62da.js');
const usage = require('./usage-da9572bf.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
require('./get-closest-element-ab4b2eee.js');

const add = "Add {name}";
const noMatches = "No matches";
const loading = "Loading...";
const translationResources = {
	add: add,
	noMatches: noMatches,
	loading: loading
};

const guxListboxMultiCss = ":host{box-sizing:border-box;display:block;max-height:20rem;padding:8px 0;margin:0;overflow-y:auto;color:#2e394c;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;outline:none}:host(:focus-visible){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-message-container{display:flex;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}.gux-message-container .gux-no-matches{box-sizing:border-box;height:32px;padding:8px 16px;color:#2e394c}";

const GuxListboxMulti = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internallistboxoptionsupdated = index.createEvent(this, "internallistboxoptionsupdated", 7);
    this.value = undefined;
    this.loading = false;
    this.filter = '';
    this.textInput = '';
    this.filterType = 'none';
    this.listboxOptions = [];
    this.allListboxOptionsFiltered = undefined;
    this.hasExactMatch = false;
  }
  onFocus() {
    guxListbox_service.setInitialActiveOption(this.root);
  }
  onBlur() {
    guxListbox_service.clearActiveOptions(this.root);
  }
  selectNewCustomOption(event) {
    this.updateValue(event.detail);
  }
  onKeydown(event) {
    var _a;
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if ((_a = this.optionCreateElement) === null || _a === void 0 ? void 0 : _a.active) {
          void this.optionCreateElement.guxEmitInternalCreateNewOption();
          afterNextRender.afterNextRender(() => {
            guxListbox_service.setInitialActiveOption(this.root);
          });
        }
        else {
          guxListbox_service.actOnActiveOption(this.root, value => this.updateValue(value));
        }
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
    var _a;
    switch (event.key) {
      case ' ':
        if ((_a = this.optionCreateElement) === null || _a === void 0 ? void 0 : _a.active) {
          void this.optionCreateElement.guxEmitInternalCreateNewOption();
          afterNextRender.afterNextRender(() => {
            guxListbox_service.setInitialActiveOption(this.root);
          });
        }
        else {
          guxListbox_service.actOnActiveOption(this.root, value => this.updateValue(value));
        }
        return;
    }
  }
  onMousemove() {
    guxListbox_service.clearActiveOptions(this.root);
  }
  onClick(event) {
    whenEventIsFrom.whenEventIsFrom('gux-option-multi', event, (option) => {
      guxListbox_service.onClickedOption(option, value => this.updateValue(value));
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSelectActive() {
    guxListbox_service.actOnActiveOption(this.root, value => this.updateValue(value));
  }
  getHasExactMatch() {
    let hasExactMatch = false;
    this.hasExactMatch = false;
    this.listboxOptions.forEach(listboxOption => {
      var _a, _b, _c;
      if (((_c = (_b = (_a = listboxOption
        .querySelector('[gux-slot-container]')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === null || _c === void 0 ? void 0 : _c.trim()) == this.textInput.toLowerCase().trim()) {
        hasExactMatch = true;
        this.hasExactMatch = true;
      }
    });
    return hasExactMatch;
  }
  updateOptionMultiCreateValue() {
    if (this.optionCreateElement) {
      this.optionCreateElement.value = this.textInput;
      this.optionCreateElement.filtered =
        !this.textInput || this.getHasExactMatch();
    }
  }
  // value as an array
  getSelectedValues() {
    if (this.value) {
      return this.value.split(',');
    }
    else {
      return [];
    }
  }
  updateOnSlotChange() {
    this.setListboxOptions();
    this.updateListboxOptions();
    guxListbox_service.setInitialActiveOption(this.root);
  }
  getOptionCreateElement() {
    this.optionCreateElement = this.root.querySelector('gux-create-option');
  }
  // get list of listbox option elements
  setListboxOptions() {
    this.listboxOptions = Array.from(this.root.children).filter(element => element.tagName === 'GUX-OPTION-MULTI');
    this.internallistboxoptionsupdated.emit();
  }
  updateListboxOptions() {
    this.listboxOptions.forEach(listboxOption => {
      listboxOption.selected = this.getSelectedValues().includes(listboxOption.value);
      if (this.filterType !== 'custom') {
        listboxOption.filtered = !listboxOption.textContent
          .toLowerCase()
          .startsWith(this.textInput.toLowerCase());
      }
    });
  }
  updateValue(newValue) {
    if (!this.getSelectedValues().includes(newValue)) {
      const newArray = [...this.getSelectedValues(), newValue];
      this.value = newArray.join(',');
    }
    else {
      this.value = this.getSelectedValues()
        .filter(e => e !== newValue)
        .join(',');
    }
    simulateNativeEvent.simulateNativeEvent(this.root, 'input');
    simulateNativeEvent.simulateNativeEvent(this.root, 'change');
  }
  async componentWillLoad() {
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
    this.setListboxOptions();
    this.getOptionCreateElement();
  }
  componentWillRender() {
    this.setListboxOptions();
    this.updateListboxOptions();
    this.allListboxOptionsFiltered =
      this.listboxOptions.filter(listboxOption => !listboxOption.filtered)
        .length === 0;
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
    if (this.allListboxOptionsFiltered) {
      return [
        index.h("div", { class: "gux-message-container" }, index.h("div", { class: "gux-no-matches" }, this.i18n('noMatches'))),
        this.renderHiddenSlot()
      ];
    }
  }
  renderCreateOptionSlot() {
    return (index.h("slot", { name: "create" }));
  }
  render() {
    if (this.loading) {
      return this.renderLoading();
    }
    return (index.h(index.Host, { role: "listbox", "aria-multiselectable": "true", tabindex: 0 }, index.h("slot", { onSlotchange: () => this.updateOnSlotChange() }), this.renderAllListboxOptionsFiltered(), this.renderCreateOptionSlot()));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "textInput": ["updateOptionMultiCreateValue"]
  }; }
};
GuxListboxMulti.style = guxListboxMultiCss;

exports.gux_listbox_multi = GuxListboxMulti;
