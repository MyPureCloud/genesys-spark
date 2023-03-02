import { r as registerInstance, e as createEvent, h, j as Host, g as getElement } from './index-f583fcde.js';
import { s as setInitialActiveOption, c as clearActiveOptions, a as setLastOptionActive, b as setFirstOptionActive, h as hasPreviousOption, d as setPreviousOptionActive, e as hasNextOption, f as setNextOptionActive, i as actOnActiveOption, j as goToOption, o as onClickedOption, m as matchOption } from './gux-listbox.service-54cf5ac6.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { w as whenEventIsFrom } from './when-event-is-from-18667084.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import './get-closest-element-1597503c.js';

const noMatches = "No matches";
const loading = "Loading...";
const translationResources = {
	noMatches: noMatches,
	loading: loading
};

const guxListboxCss = ":host{box-sizing:border-box;display:block;max-height:20rem;padding:8px 0;margin:0;overflow-y:auto;color:#2e394c;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;outline:none}:host(:focus){outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-message-container{display:flex;flex-direction:column;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}.gux-message-container .gux-no-matches{box-sizing:border-box;height:32px;padding:8px 16px;color:#2e394c}";

const GuxListbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internallistboxoptionsupdated = createEvent(this, "internallistboxoptionsupdated", 7);
    this.value = undefined;
    this.filter = '';
    this.filterType = 'none';
    this.loading = false;
    this.selectedValues = [];
    this.listboxOptions = [];
    this.allListboxOptionsFiltered = undefined;
  }
  onFocus() {
    setInitialActiveOption(this.root);
  }
  onBlur() {
    clearActiveOptions(this.root);
  }
  onKeydown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        actOnActiveOption(this.root, value => this.updateValue(value));
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
    switch (event.key) {
      case ' ':
        actOnActiveOption(this.root, value => this.updateValue(value));
        return;
    }
  }
  onMousemove() {
    clearActiveOptions(this.root);
  }
  onClick(event) {
    whenEventIsFrom('gux-option', event, (option) => {
      onClickedOption(option, value => this.updateValue(value));
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSelectActive() {
    actOnActiveOption(this.root, value => this.updateValue(value));
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
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.setListboxOptions();
  }
  componentWillRender() {
    this.listboxOptions.forEach(listboxOption => {
      listboxOption.selected = listboxOption.value === this.value;
      if (this.filterType !== 'custom') {
        listboxOption.filtered = !matchOption(listboxOption, this.filter);
      }
    });
    this.allListboxOptionsFiltered =
      this.listboxOptions.filter(listboxOption => !listboxOption.filtered)
        .length === 0;
    if (!this.allListboxOptionsFiltered && this.filter) {
      setFirstOptionActive(this.root);
    }
    else {
      clearActiveOptions(this.root);
    }
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
    return [
      h("div", { class: "gux-message-container" }, h("div", { class: "gux-no-matches" }, this.i18n('noMatches'))),
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
    return (h(Host, { role: "listbox", tabindex: 0 }, h("slot", { onSlotchange: () => this.setListboxOptions() })));
  }
  get root() { return getElement(this); }
};
GuxListbox.style = guxListboxCss;

export { GuxListbox as gux_listbox };
