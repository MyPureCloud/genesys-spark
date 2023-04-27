'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');

const guxOptionCss = "gux-option-legacy gux-text-highlight mark{font-weight:700;color:inherit;background-color:inherit}";

const GuxOptionLegacy = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = undefined;
    this.disabled = undefined;
    this.text = undefined;
    this.selected = undefined;
  }
  updateParentSelection() {
    void this.getParentGuxDropdown().setSelected();
  }
  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  shouldFilter(searchInput) {
    if (!searchInput) {
      return Promise.resolve(false);
    }
    return Promise.resolve(!this.text.toLowerCase().startsWith(searchInput.toLowerCase()));
  }
  getParentGuxDropdown() {
    return this.root.closest('gux-dropdown-legacy');
  }
  componentWillLoad() {
    if (!this.text) {
      this.text = this.root.textContent;
    }
  }
  hostData() {
    return {
      tabindex: '0'
    };
  }
  __stencil_render() {
    return (index.h("div", { title: this.text }, index.h("span", { ref: el => (this.slotContent = el), style: { display: 'none' } }, index.h("slot", null)), this.text));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "selected": ["updateParentSelection"]
  }; }
  render() { return index.h(index.Host, this.hostData(), this.__stencil_render()); }
};
GuxOptionLegacy.style = guxOptionCss;

exports.gux_option_legacy = GuxOptionLegacy;
