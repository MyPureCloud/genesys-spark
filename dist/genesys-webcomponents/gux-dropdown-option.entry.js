import { r as registerInstance, e as createEvent, h, g as getElement, j as Host } from './index-f583fcde.js';

const guxDropdownOptionCss = "gux-dropdown-option{position:relative;display:flex;height:var(--option-height);padding:0 16px;line-height:32px;cursor:pointer}gux-dropdown-option div.gux-dropdown-option{position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}gux-dropdown-option div.gux-dropdown-option .gux-ghost{position:absolute}gux-dropdown-option[filtered]{display:none}gux-dropdown-option[disabled]{pointer-events:none;cursor:default;opacity:0.5}gux-dropdown-option[disabled='false']{pointer-events:auto;cursor:pointer;opacity:1}gux-dropdown-option:not(:disabled)[selected]{color:#2e394c;background:#deeaff}gux-dropdown-option:not(:disabled):hover,gux-dropdown-option:not(:disabled):focus{color:#fdfdfd;background:#2a60c8}";

// RegExp escape string from http://stackoverflow.com/a/3561711/23528
const escapeRegexStr = /[-/\\^$*+?.()|[\]{}]/g;
function escapeRegex(input) {
  return input.replace(escapeRegexStr, '\\$&');
}
const GuxDropdownOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selectedChanged = createEvent(this, "selectedChanged", 7);
    this.value = undefined;
    this.disabled = undefined;
    this.filtered = undefined;
    this.selected = undefined;
    this.text = undefined;
    this.highlight = undefined;
  }
  /**
   * Gets the value rendered by the drop down item.
   */
  getDisplayedValue() {
    return Promise.resolve(this.text);
  }
  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  shouldFilter(searchInput) {
    this.highlight = searchInput;
    this.highlightIndex = -1;
    if (!searchInput) {
      return Promise.resolve(false);
    }
    const regex = new RegExp(escapeRegex(searchInput), 'gi');
    const regexResult = regex.exec(this.text);
    const filter = regexResult === null;
    if (!filter) {
      this.highlightIndex = regexResult.index;
    }
    return Promise.resolve(filter);
  }
  componentDidLoad() {
    this.root.onclick = () => {
      this.onItemClicked();
    };
    this.root.onkeydown = (e) => {
      switch (e.key) {
        case ' ':
        case 'Enter':
          this.selected = true;
          this.selectedChanged.emit(this.value);
          break;
      }
    };
  }
  hostData() {
    return {
      tabindex: '0'
    };
  }
  __stencil_render() {
    return (h("div", { class: "gux-dropdown-option", title: this.text }, this.textWithHighlights()));
  }
  textWithHighlights() {
    if (!this.highlight || !this.text) {
      return (h("span", null, this.text));
    }
    if (this.highlightIndex < 0) {
      return (h("span", null, this.text));
    }
    const preface = this.text.substring(0, this.highlightIndex);
    const actualHighlight = this.text.substring(this.highlightIndex, this.highlightIndex + this.highlight.length);
    const suffix = this.text.substring(preface.length + this.highlight.length);
    return (h("span", null, preface, h("strong", null, actualHighlight), suffix));
  }
  onItemClicked() {
    this.selected = true;
    this.selectedChanged.emit(this.value);
  }
  get root() { return getElement(this); }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
GuxDropdownOption.style = guxDropdownOptionCss;

export { GuxDropdownOption as gux_dropdown_option };
