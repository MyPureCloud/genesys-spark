import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { m as matchesFuzzy } from './search-2ca67cb1.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import './get-closest-element-1597503c.js';

const recentSearch = "Recently Searched:";
const commonSearch = "Common Searches:";
const limited = "Results limited, refine your search for more commands.";
const search = "Search for commands.";
const title = "Command Palette";
const paletteResources = {
	recentSearch: recentSearch,
	commonSearch: commonSearch,
	limited: limited,
	search: search,
	title: title
};

const guxCommandPaletteCss = "gux-command-palette-legacy .gux-command-palette{position:absolute;right:0;left:0;max-width:750px;padding:12px;margin:0 auto;border-color:1px solid #e2e6ee;box-shadow:0 0 2px 0 rgba(32, 41, 55, 0.24);}gux-command-palette-legacy .gux-command-palette .gux-command-palette-search-label{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}gux-command-palette-legacy .gux-command-palette.gux-hidden{top:0;display:none}gux-command-palette-legacy .gux-command-palette:not(.gux-hidden){top:40px;animation-name:fadeIn;animation-duration:300ms;animation-timing-function:ease-in;animation-iteration-count:1}@keyframes fadeIn{0%{top:0;opacity:0}100%{top:40px;opacity:1}}gux-command-palette-legacy .gux-command-palette .gux-limit{margin-bottom:8px}gux-command-palette-legacy .gux-command-palette gux-list-legacy{display:block;margin-top:4px}gux-command-palette-legacy .gux-command-palette gux-list-legacy>strong{height:32px;padding:0 16px;line-height:32px}gux-command-palette-legacy .gux-command-palette gux-text-field,gux-command-palette-legacy .gux-command-palette gux-list-legacy>div[role='list']{margin-bottom:12px}gux-command-palette-legacy .gux-command-palette gux-list-legacy+gux-list-legacy{margin-bottom:0}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy.gux-has-details .gux-list-item{line-height:16px}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item{display:block;line-height:32px}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item gux-text-highlight,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-shortcut{display:block}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item div{display:flex;padding:0;border:none;box-shadow:none}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item div gux-text-highlight{flex:1 1 auto}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item div .gux-shortcut{flex:0 1 auto}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item gux-text-highlight:last-child{margin-bottom:8px}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{margin-left:4px;font-size:11px}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:last-of-type .gux-details,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:last-of-type div:last-child{margin-bottom:0}.gux-command-palette-light-theme .gux-command-palette{color:#2e394c;background:#fdfdfd}.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:focus .gux-list-item div,.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item div,.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item div{color:#fdfdfd;background:#2a60c8}.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:focus .gux-list-item .gux-details,.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item .gux-details,.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item .gux-details{color:#fdfdfd}.gux-command-palette-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{color:#6b7585}.gux-light-theme gux-command-palette-legacy .gux-command-palette{color:#2e394c;background:#fdfdfd}.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:focus .gux-list-item div,.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item div,.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item div{color:#fdfdfd;background:#2a60c8}.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:focus .gux-list-item .gux-details,.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item .gux-details,.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item .gux-details{color:#fdfdfd}.gux-light-theme gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{color:#6b7585}gux-command-palette-legacy.gux-light-theme .gux-command-palette{color:#2e394c;background:#fdfdfd}gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:focus .gux-list-item div,gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item div,gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item div{color:#fdfdfd;background:#2a60c8}gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:focus .gux-list-item .gux-details,gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item .gux-details,gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item .gux-details{color:#fdfdfd}gux-command-palette-legacy.gux-light-theme .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{color:#6b7585}gux-command-palette-legacy .gux-command-palette{color:#2e394c;background:#fdfdfd}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:focus .gux-list-item div,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item div,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item div{color:#fdfdfd;background:#2a60c8}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:focus .gux-list-item .gux-details,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:active .gux-list-item .gux-details,gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy:hover .gux-list-item .gux-details{color:#fdfdfd}gux-command-palette-legacy .gux-command-palette gux-list-legacy gux-list-item-legacy .gux-list-item .gux-details{color:#6b7585}";

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
const GuxCommandPaletteLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get root() { return getElement(this); }
};
GuxCommandPaletteLegacy.style = guxCommandPaletteCss;

export { GuxCommandPaletteLegacy as gux_command_palette_legacy };
