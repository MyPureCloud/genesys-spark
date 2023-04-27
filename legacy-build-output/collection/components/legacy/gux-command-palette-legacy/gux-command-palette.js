import { h } from '@stencil/core';
import { matchesFuzzy } from '../../../utils/string/search';
import { buildI18nForComponent } from '../../../i18n';
import paletteResources from './i18n/en.json';
import { trackComponent } from '@utils/tracking/usage';
const filterLimit = 50;
const animationDuration = 300; // this 300ms duration must be kept in sync with the 300ms transition in the CSS and delay in the e2e tests
function sortActions(items) {
  return items.sort((a, b) => {
    if (a.recent && !b.recent) {
      return -1;
    }
    if (!a.recent && b.recent) {
      return 1;
    }
    const aText = a.text.toUpperCase();
    const bText = b.text.toUpperCase();
    if (aText < bText) {
      return -1;
    }
    if (aText > bText) {
      return 1;
    }
    return 0;
  });
}
export class GuxCommandPaletteLegacy {
  constructor() {
    this.filterValue = '';
    this.visible = false;
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, paletteResources);
  }
  render() {
    return (h("div", { class: `gux-command-palette ${this.visible ? '' : 'gux-hidden'}`, role: "dialog", onKeyDown: e => this.onKeyDown(e), "aria-label": this.i18n('title') }, h("label", { htmlFor: "gux-command-palette-search", class: "gux-command-palette-search-label" }, this.i18n('search')), h("gux-input-search", null, h("input", { id: "gux-command-palette-search", type: "search", onInput: (event) => {
        this.handleInput(event);
      }, value: this.filterValue, ref: el => (this.inputElement = el) })), this.visible && this.renderLists()));
  }
  renderLists() {
    const allItems = Array.from(this.root.children).slice(0, -1);
    const recentItems = allItems.filter(item => item.recent);
    const commonItems = allItems.filter(item => item.common);
    let filteredItems = this.filterItems(allItems);
    let commonList;
    if (commonItems.length) {
      commonList = this.createList(commonItems, this.filterValue, this.i18n('commonSearch'));
    }
    if (this.filterValue && filteredItems.length) {
      const filterExceeded = filteredItems.length > filterLimit;
      if (filterExceeded) {
        filteredItems = filteredItems.slice(0, filterLimit);
      }
      const filterList = [
        h("gux-list-legacy", { tabindex: "-1", highlight: this.filterValue }, filteredItems)
      ];
      if (filterExceeded) {
        filterList.unshift(h("div", { class: "gux-limit" }, this.i18n('limited')));
      }
      if (filteredItems.length !== 1 && commonItems.length) {
        return [filterList, commonList];
      }
      return filterList;
    }
    const lists = [];
    if (recentItems.length && !this.filterValue) {
      lists.push(this.createList(recentItems, this.filterValue, this.i18n('recentSearch')));
    }
    if (commonList) {
      lists.push(commonList);
    }
    if (!lists.length) {
      return (h("gux-list-legacy", { tabindex: "-1" }, this.transformCommands(sortActions(allItems))));
    }
    return lists;
  }
  /**
   * Opens the command palette.
   */
  async open() {
    this.visible = true;
    setTimeout(() => {
      this.inputElement.focus();
    }, animationDuration);
  }
  /**
   * Closes the command palette.
   */
  async close() {
    this.filterValue = '';
    this.visible = false;
  }
  handleInput(event) {
    this.filterValue = event.target.value;
  }
  filterItems(items) {
    return this.transformCommands(sortActions(items.filter((item) => {
      return matchesFuzzy(this.filterValue, `${item.text} + ${item.details}`);
    })), '');
  }
  createShortcutItem(command) {
    return (h("gux-list-item-legacy", { value: command.text, onPress: this.handlePress(command), class: (command.details && 'gux-has-details') || '' }, h("div", null, h("gux-text-highlight", { text: command.text, strategy: "fuzzy" }), h("span", { class: "gux-shortcut" }, command.shortcut)), command.details && (h("gux-text-highlight", { class: "gux-details", text: command.details, strategy: "fuzzy" }))));
  }
  createStandardItem(command) {
    return (h("gux-list-item-legacy", { value: command.text, onPress: this.handlePress(command), class: (command.details && 'gux-has-details') || '' }, h("gux-text-highlight", { text: command.text, strategy: "fuzzy" }), command.details && (h("gux-text-highlight", { class: "gux-details", text: command.details, strategy: "fuzzy" }))));
  }
  transformCommands(commands, header) {
    const retVal = [];
    if (header) {
      retVal.push(h("strong", null, header));
    }
    commands.forEach((command) => {
      if (command.shortcut) {
        retVal.push(this.createShortcutItem(command));
        return;
      }
      retVal.push(this.createStandardItem(command));
    });
    return retVal;
  }
  handlePress(command) {
    return () => {
      this.close();
      setTimeout(() => {
        command.invokePress();
      });
    };
  }
  createList(items, filter, header) {
    return (h("gux-list-legacy", { class: "gux-command-palette-list", highlight: filter, tabindex: "-1" }, this.transformCommands(sortActions(items), header)));
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.navigateUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigateDown();
        break;
    }
  }
  elementIsSearch(el) {
    return el.closest('gux-input-search') !== null;
  }
  getParentGuxList(el) {
    return el.closest('gux-list-legacy');
  }
  setFocusOnElement(el) {
    const listElement = el;
    if (listElement && listElement.setFocusOnLastItem) {
      listElement.setFocusOnLastItem();
      return;
    }
    this.inputElement.focus();
  }
  navigateUp() {
    const focusedElement = this.root.querySelector(':focus');
    if (this.elementIsSearch(focusedElement)) {
      // Already at the top, don't need to focus elsewhere
      return;
    }
    const guxList = this.getParentGuxList(focusedElement);
    if (!guxList) {
      return;
    }
    guxList.isFirstItemSelected().then(firstSelected => {
      if (!firstSelected) {
        // Let the GUX List handle navigation through the list
        return;
      }
      // Manually jump to the previous element
      this.setFocusOnElement(guxList.previousElementSibling);
    });
  }
  navigateDown() {
    const focusedElement = this.root.querySelector(':focus');
    if (this.elementIsSearch(focusedElement)) {
      this.root.querySelector('gux-list-legacy').setFocusOnFirstItem();
      return;
    }
    const guxList = this.getParentGuxList(focusedElement);
    if (!guxList) {
      return;
    }
    guxList.isLastItemSelected().then(lastSelected => {
      if (!lastSelected) {
        // Let the GUX List handle navigation through the list
        return;
      }
      // Manually jump to the next element
      this.setFocusOnElement(guxList.nextElementSibling);
    });
  }
  static get is() { return "gux-command-palette-legacy"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-command-palette.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-command-palette.css"]
    };
  }
  static get states() {
    return {
      "filterValue": {},
      "visible": {}
    };
  }
  static get methods() {
    return {
      "open": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Opens the command palette.",
          "tags": []
        }
      },
      "close": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Closes the command palette.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
}
