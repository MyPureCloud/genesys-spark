import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-816e34d8.js';
import { t as trackComponent } from './usage-55de2afe.js';

const guxListItemCss = ":host:focus-visible .gux-list-item,:host:active .gux-list-item,:host:hover:not([disabled]) .gux-list-item{color:#fdfdfd;background:#2a60c8}:host(:focus-visible) .gux-list-item,:host(:active) .gux-list-item,:host(:hover:not([disabled])) .gux-list-item{color:#fdfdfd;background:#2a60c8}:host([disabled]) .gux-list-item{pointer-events:none;cursor:default;opacity:0.5}.gux-list-item{display:flex;height:max-content;padding:0 16px;line-height:32px;word-wrap:break-word;cursor:pointer}.gux-list-item .gux-text{width:100%}";

const GuxListItemLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.press = createEvent(this, "press", 7);
    this.text = undefined;
    this.value = undefined;
    this.strategy = undefined;
  }
  handleClick() {
    this.onItemClicked();
  }
  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onItemClicked();
    }
  }
  render() {
    return (h(Host, { role: "listitem" }, h("span", { class: "gux-list-item" }, this.text && (h("gux-text-highlight", { class: "gux-text", text: this.text, strategy: this.strategy })), h("slot", null))));
  }
  onItemClicked() {
    this.emitPress();
  }
  emitPress() {
    this.press.emit(this.value);
  }
};
GuxListItemLegacy.style = guxListItemCss;

const guxListCss = ".gux-list-items-container{padding:8px 0;margin:0;list-style:none;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}";

const validChildren = [
  'gux-list-item-legacy:not([disabled])',
  'gux-action-item:not([disabled])'
].join(',');
const GuxListLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.changed = createEvent(this, "changed", 7);
    /**
     * Using a mutation observer because component loading order is not quite right.
     * In this case we are attempting to update a component that updates a component.
     * What ends up happening is that there is no hook to make sure all components have loaded.
     * When the DOM load order gets fixed we should be able to remove this logic.
     * https://github.com/ionic-team/stencil/issues/1261
     */
    this.observer = new MutationObserver(() => {
      this.performHighlight(this.highlight);
    });
    this.value = undefined;
    this.highlight = undefined;
    this.selectedIndex = -1;
  }
  emitChanged(value) {
    this.changed.emit(value);
  }
  itemSelected(ev) {
    if (!ev.detail) {
      return;
    }
    this.value = ev.detail;
  }
  valueHandler(newValue) {
    this.emitChanged(newValue);
  }
  /*
   * Sets focus to the fist item in the list.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async setFocusOnFirstItem() {
    this.selectedIndex = 0;
    this.updateTabIndexes();
  }
  /*
   * Sets focus to the last item in the list.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async setFocusOnLastItem() {
    const filteredList = this.getFilteredList();
    this.selectedIndex = filteredList.length - 1;
    this.updateTabIndexes();
  }
  /**
   * Returns whether the last item in the list is selected.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async isLastItemSelected() {
    const filteredList = this.getFilteredList();
    return this.selectedIndex === filteredList.length - 1;
  }
  /**
   * Returns whether the first item in the list is selected.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async isFirstItemSelected() {
    return this.selectedIndex <= 0;
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  /**
   * Once the component is loaded
   */
  componentDidLoad() {
    this.performHighlight(this.highlight);
    this.observer.observe(this.root, { childList: true, subtree: true });
  }
  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  render() {
    this.performHighlight(this.highlight);
    this.updateTabIndexes();
    return (h("div", { class: "gux-list-items-container", role: "list", tabindex: 0, onKeyDown: e => this.onKeyDown(e) }, h("slot", null)));
  }
  onKeyDown(event) {
    const validKeys = ['ArrowUp', 'ArrowDown', 'End', 'Home'];
    if (!validKeys.includes(event.key)) {
      return;
    }
    const filteredList = this.getFilteredList();
    let newIndex = -1;
    switch (event.key) {
      case 'ArrowUp':
        if (this.selectedIndex !== 0) {
          event.preventDefault();
          newIndex = this.selectedIndex - 1;
          event.stopPropagation();
        }
        else if (!this.isCommandPaletteList()) {
          event.preventDefault();
          newIndex = filteredList.length - 1;
        }
        break;
      case 'Home':
        if (this.selectedIndex) {
          newIndex = 0;
        }
        break;
      case 'ArrowDown':
        if (this.selectedIndex !== filteredList.length - 1) {
          event.preventDefault();
          newIndex = this.selectedIndex + 1;
          event.stopPropagation();
        }
        else if (!this.isCommandPaletteList()) {
          event.preventDefault();
          newIndex = 0;
          event.stopPropagation();
        }
        break;
      case 'End':
        if (this.selectedIndex !== filteredList.length - 1) {
          newIndex = filteredList.length - 1;
        }
        break;
    }
    if (newIndex !== -1) {
      this.selectedIndex = newIndex;
    }
  }
  // delete this once gux-command-palette-legacy is removed from library
  isCommandPaletteList() {
    return Boolean(this.root.closest('gux-command-palette-legacy'));
  }
  updateTabIndexes() {
    const children = this.getFilteredList();
    if (!children || this.selectedIndex === -1) {
      return;
    }
    children.forEach((element, index) => {
      if (index !== this.selectedIndex) {
        element.setAttribute('tabindex', '-1');
      }
      else {
        element.setAttribute('tabindex', '0');
        element.focus();
        setTimeout(() => {
          this.value = element.value;
        });
      }
    });
  }
  performHighlight(value) {
    const items = this.root.querySelectorAll('gux-text-highlight');
    if (!items) {
      return;
    }
    items.forEach((element) => {
      element.highlight = value;
    });
  }
  getFilteredList() {
    const slot = this.root.querySelector('slot');
    if (slot) {
      return slot
        .assignedElements()
        .filter(element => element.matches(validChildren));
    }
    return Array.from(this.root.querySelectorAll(validChildren));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "value": ["valueHandler"]
  }; }
};
GuxListLegacy.style = guxListCss;

export { GuxListItemLegacy as gux_list_item_legacy, GuxListLegacy as gux_list_legacy };
