import { r as registerInstance, e as createEvent, l as forceUpdate, h, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { g as getEmptyKeyboardOrderChange, s as setKeyboardReorderPositionIndicator, a as setMainCheckboxElementCheckedState, b as getNewOrder, c as getIndexInParent, d as getNewKeyboardOrderChange, e as setHighlights, f as setAllCheckboxInputs, h as getSelectedColumnCount } from './gux-column-manager.service-f7f0f044.js';
import './get-closest-element-1597503c.js';
import './clamp-6bdb0367.js';
import './simulate-native-event-ac69961f.js';

const search = "Search column";
const selectedColumnCount = "{count}/{total} Columns Selected";
const selectAllColumnsScreenReader = "{count} of {total} columns selected: check checkbox to select all {total} columns";
const unselectAllColumnsScreenReader = "{count} of {total} columns selected: uncheck checkbox to unselect all {total} columns";
const movePositionPrompt = "Press space or enter to move the {columnName} column to position {newPositionNumber} from position {oldPositionNumber}.";
const reorderingModeActive = "Reordering mode active. Reposition the {columnName} column using the up arrow key, the down arrow key, the home key and the end key. Press Escape to deactivate reordering mode.";
const translationResources = {
	search: search,
	selectedColumnCount: selectedColumnCount,
	selectAllColumnsScreenReader: selectAllColumnsScreenReader,
	unselectAllColumnsScreenReader: unselectAllColumnsScreenReader,
	movePositionPrompt: movePositionPrompt,
	reorderingModeActive: reorderingModeActive
};

const guxColumnManagerCss = ".gux-container{width:320px;min-width:320px}.gux-container .gux-search gux-content-search{width:100%}.gux-container .gux-select{padding:8px 0 8px 16px;margin:4px 0;color:#596373;background-color:#f6f7f9;border-radius:4px}.gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}";

const GuxColumnManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxorderchange = createEvent(this, "guxorderchange", 7);
    this.highlightResults = {
      matchCount: 0,
      currentMatch: 0
    };
    this.keyboardOrderChange = getEmptyKeyboardOrderChange();
  }
  watchKeyboardOrderChange() {
    setKeyboardReorderPositionIndicator(this.root, this.keyboardOrderChange);
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  componentDidLoad() {
    setMainCheckboxElementCheckedState(this.root, this.mainCheckboxElement);
  }
  handleInternalorderchange(event) {
    event.stopPropagation();
    this.emitOrderChange(event.detail);
  }
  emitOrderChange(orderChange) {
    const { oldIndex, newIndex } = orderChange;
    if (oldIndex !== newIndex) {
      const newOrder = getNewOrder(this.root, orderChange);
      this.guxorderchange.emit(newOrder);
    }
  }
  handleInternalkeyboardorderstart(event) {
    event.stopPropagation();
    const columnName = event.detail;
    const oldIndex = getIndexInParent(event.target);
    this.keyboardOrderChange = {
      oldIndex,
      newIndex: oldIndex
    };
    void this.announceElement.guxAnnounce(this.i18n('reorderingModeActive', { columnName }));
  }
  handleInternalkeyboardreordermove(event) {
    event.stopPropagation();
    const { delta, column } = event.detail;
    this.keyboardOrderChange = getNewKeyboardOrderChange(this.root, this.keyboardOrderChange, delta);
    const columnName = column;
    const newPositionNumber = this.keyboardOrderChange.newIndex + 1;
    const oldPositionNumber = this.keyboardOrderChange.oldIndex + 1;
    void this.announceElement.guxAnnounce(this.i18n('movePositionPrompt', {
      columnName,
      newPositionNumber,
      oldPositionNumber
    }));
  }
  handleInternalkeyboarddoreorder(event) {
    event.stopPropagation();
    this.emitOrderChange(this.keyboardOrderChange);
    void event.target.guxFocus();
  }
  handleInternalkeyboardorderfinish(event) {
    event.stopPropagation();
    this.keyboardOrderChange = getEmptyKeyboardOrderChange();
  }
  onSearchInput() {
    this.highlightResults = setHighlights(this.root, this.searchElement);
  }
  onGuxCurrentMatchChanged(event) {
    this.highlightResults = setHighlights(this.root, this.searchElement, event.detail);
  }
  onMainCheckboxChange() {
    setAllCheckboxInputs(this.root, this.mainCheckboxElement.checked);
    forceUpdate(this.root);
  }
  onListChange() {
    setMainCheckboxElementCheckedState(this.root, this.mainCheckboxElement);
    forceUpdate(this.root);
  }
  onSlotChange() {
    this.onListChange();
  }
  renderSelectedColumnCount() {
    const { count, total } = getSelectedColumnCount(this.root);
    return (h("div", null, h("span", { "aria-hidden": "true" }, this.i18n('selectedColumnCount', { count, total })), h("span", { class: "gux-sr-only" }, count === total ? (h("span", null, ": ", this.i18n('unselectAllColumnsScreenReader', { count, total }))) : (h("span", null, ": ", this.i18n('selectAllColumnsScreenReader', { count, total }))))));
  }
  render() {
    return (h("div", { class: "gux-container" }, h("div", { class: "gux-search" }, h("gux-content-search", { "match-count": this.highlightResults.matchCount, "current-match": this.highlightResults.currentMatch, onGuxcurrentmatchchanged: event => this.onGuxCurrentMatchChanged(event) }, h("input", { type: "text", placeholder: this.i18n('search'), onInput: () => this.onSearchInput(), ref: el => (this.searchElement = el) }))), h("div", { class: "gux-select" }, h("gux-form-field-checkbox", null, h("input", { slot: "input", type: "checkbox", ref: el => (this.mainCheckboxElement = el), onChange: () => this.onMainCheckboxChange() }), h("label", { slot: "label" }, this.renderSelectedColumnCount()))), h("div", { class: "gux-list", onChange: () => this.onListChange() }, h("slot", { onSlotchange: () => this.onSlotChange() })), h("gux-announce-beta", { ref: el => (this.announceElement = el) })));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "keyboardOrderChange": ["watchKeyboardOrderChange"]
  }; }
};
GuxColumnManager.style = guxColumnManagerCss;

export { GuxColumnManager as gux_column_manager_beta };
