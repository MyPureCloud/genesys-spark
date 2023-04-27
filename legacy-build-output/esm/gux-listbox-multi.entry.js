import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-816e34d8.js';
import { s as setInitialActiveOption, c as clearActiveOptions, a as setLastOptionActive, b as setFirstOptionActive, h as hasPreviousOption, d as setPreviousOptionActive, e as hasNextOption, f as setNextOptionActive, i as actOnActiveOption, j as goToOption, o as onClickedOption } from './gux-listbox.service-534dc33f.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { w as whenEventIsFrom } from './when-event-is-from-18667084.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { b as afterNextRender } from './after-next-render-ed0f7dcd.js';
import './get-closest-element-1597503c.js';

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
    registerInstance(this, hostRef);
    this.internallistboxoptionsupdated = createEvent(this, "internallistboxoptionsupdated", 7);
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
    setInitialActiveOption(this.root);
  }
  onBlur() {
    clearActiveOptions(this.root);
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
          afterNextRender(() => {
            setInitialActiveOption(this.root);
          });
        }
        else {
          actOnActiveOption(this.root, value => this.updateValue(value));
        }
        return;
      case 'ArrowDown':
        event.preventDefault();
        if (hasNextOption(this.root)) {
          event.stopPropagation();
          setNextOptionActive(this.root);
        }
        else {
          setFirstOptionActive(this.root);
        }
        return;
      case 'ArrowUp': {
        event.preventDefault();
        if (hasPreviousOption(this.root)) {
          event.stopPropagation();
          setPreviousOptionActive(this.root);
        }
        else {
          setLastOptionActive(this.root);
        }
        return;
      }
      case 'Home': {
        event.preventDefault();
        setFirstOptionActive(this.root);
        return;
      }
      case 'End': {
        event.preventDefault();
        setLastOptionActive(this.root);
        return;
      }
      case ' ': {
        event.preventDefault();
        return;
      }
    }
    if (event.key.length === 1) {
      goToOption(this.root, event.key);
      return;
    }
  }
  onKeyup(event) {
    var _a;
    switch (event.key) {
      case ' ':
        if ((_a = this.optionCreateElement) === null || _a === void 0 ? void 0 : _a.active) {
          void this.optionCreateElement.guxEmitInternalCreateNewOption();
          afterNextRender(() => {
            setInitialActiveOption(this.root);
          });
        }
        else {
          actOnActiveOption(this.root, value => this.updateValue(value));
        }
        return;
    }
  }
  onMousemove() {
    clearActiveOptions(this.root);
  }
  onClick(event) {
    whenEventIsFrom('gux-option-multi', event, (option) => {
      onClickedOption(option, value => this.updateValue(value));
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSelectActive() {
    actOnActiveOption(this.root, value => this.updateValue(value));
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
    setInitialActiveOption(this.root);
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
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
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
    return (h("div", { hidden: true }, h("slot", { onSlotchange: () => this.setListboxOptions() })));
  }
  renderLoading() {
    return [
      h("div", { class: "gux-message-container" }, h("gux-radial-loading", { context: "modal" }), h("span", null, this.i18n('loading'))),
      this.renderHiddenSlot()
    ];
  }
  renderAllListboxOptionsFiltered() {
    if (this.allListboxOptionsFiltered) {
      return [
        h("div", { class: "gux-message-container" }, h("div", { class: "gux-no-matches" }, this.i18n('noMatches'))),
        this.renderHiddenSlot()
      ];
    }
  }
  renderCreateOptionSlot() {
    return (h("slot", { name: "create" }));
  }
  render() {
    if (this.loading) {
      return this.renderLoading();
    }
    return (h(Host, { role: "listbox", "aria-multiselectable": "true", tabindex: 0 }, h("slot", { onSlotchange: () => this.updateOnSlotChange() }), this.renderAllListboxOptionsFiltered(), this.renderCreateOptionSlot()));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "textInput": ["updateOptionMultiCreateValue"]
  }; }
};
GuxListboxMulti.style = guxListboxMultiCss;

export { GuxListboxMulti as gux_listbox_multi };
