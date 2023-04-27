import { r as registerInstance, h, g as getElement, H as Host } from './index-816e34d8.js';

const guxOptionCss = "gux-option-legacy gux-text-highlight mark{font-weight:700;color:inherit;background-color:inherit}";

const GuxOptionLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h("div", { title: this.text }, h("span", { ref: el => (this.slotContent = el), style: { display: 'none' } }, h("slot", null)), this.text));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "selected": ["updateParentSelection"]
  }; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
GuxOptionLegacy.style = guxOptionCss;

export { GuxOptionLegacy as gux_option_legacy };
