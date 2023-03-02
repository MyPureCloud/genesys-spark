import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const guxActionListCss = ".gux-action-list-items-container{padding:8px 0;margin:0;list-style:none;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}";

const validChildren = 'gux-action-item:not([disabled])';
const GuxActionListLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selectedIndex = -1;
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
  render() {
    this.updateTabIndexes();
    return (h("div", { class: "gux-action-list-items-container", role: "list" }, h("slot", null)));
  }
  onKeyDown(event) {
    const filteredList = this.getFilteredList();
    let newIndex = -1;
    switch (event.key) {
      case 'ArrowUp':
        if (this.selectedIndex !== 0) {
          event.preventDefault();
          newIndex = this.selectedIndex - 1;
          event.stopPropagation();
        }
        else if (!this.root.classList.contains('gux-command-palette-list')) {
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
        else if (!this.root.classList.contains('gux-command-palette-list')) {
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
  updateTabIndexes() {
    const children = this.getFilteredList();
    if (!children || this.selectedIndex === -1) {
      return;
    }
    children.forEach((element, index) => {
      if (index !== this.selectedIndex) {
        element.shadowRoot
          .querySelector('button')
          .setAttribute('tabindex', '-1');
      }
      else {
        element.shadowRoot
          .querySelector('button')
          .setAttribute('tabindex', '0');
        element.shadowRoot.querySelector('button').focus();
      }
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
};
GuxActionListLegacy.style = guxActionListCss;

export { GuxActionListLegacy as gux_action_list_legacy };
