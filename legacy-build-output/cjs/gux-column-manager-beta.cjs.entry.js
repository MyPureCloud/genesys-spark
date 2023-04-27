'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const usage = require('./usage-da9572bf.js');
const guxColumnManager_service = require('./gux-column-manager.service-80a241dd.js');
require('./get-closest-element-ab4b2eee.js');
require('./clamp-1bb96117.js');
require('./simulate-native-event-fe3e62da.js');

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
    index.registerInstance(this, hostRef);
    this.guxorderchange = index.createEvent(this, "guxorderchange", 7);
    this.highlightResults = {
      matchCount: 0,
      currentMatch: 0
    };
    this.keyboardOrderChange = guxColumnManager_service.getEmptyKeyboardOrderChange();
  }
  watchKeyboardOrderChange() {
    guxColumnManager_service.setKeyboardReorderPositionIndicator(this.root, this.keyboardOrderChange);
  }
  async componentWillLoad() {
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
  }
  componentDidLoad() {
    guxColumnManager_service.setMainCheckboxElementCheckedState(this.root, this.mainCheckboxElement);
  }
  handleInternalorderchange(event) {
    event.stopPropagation();
    this.emitOrderChange(event.detail);
  }
  emitOrderChange(orderChange) {
    const { oldIndex, newIndex } = orderChange;
    if (oldIndex !== newIndex) {
      const newOrder = guxColumnManager_service.getNewOrder(this.root, orderChange);
      this.guxorderchange.emit(newOrder);
    }
  }
  handleInternalkeyboardorderstart(event) {
    event.stopPropagation();
    const columnName = event.detail;
    const oldIndex = guxColumnManager_service.getIndexInParent(event.target);
    this.keyboardOrderChange = {
      oldIndex,
      newIndex: oldIndex
    };
    void this.announceElement.guxAnnounce(this.i18n('reorderingModeActive', { columnName }));
  }
  handleInternalkeyboardreordermove(event) {
    event.stopPropagation();
    const { delta, column } = event.detail;
    this.keyboardOrderChange = guxColumnManager_service.getNewKeyboardOrderChange(this.root, this.keyboardOrderChange, delta);
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
    this.keyboardOrderChange = guxColumnManager_service.getEmptyKeyboardOrderChange();
  }
  onSearchInput() {
    this.highlightResults = guxColumnManager_service.setHighlights(this.root, this.searchElement);
  }
  onGuxCurrentMatchChanged(event) {
    this.highlightResults = guxColumnManager_service.setHighlights(this.root, this.searchElement, event.detail);
  }
  onMainCheckboxChange() {
    guxColumnManager_service.setAllCheckboxInputs(this.root, this.mainCheckboxElement.checked);
    index.forceUpdate(this.root);
  }
  onListChange() {
    guxColumnManager_service.setMainCheckboxElementCheckedState(this.root, this.mainCheckboxElement);
    index.forceUpdate(this.root);
  }
  onSlotChange() {
    this.onListChange();
  }
  renderSelectedColumnCount() {
    const { count, total } = guxColumnManager_service.getSelectedColumnCount(this.root);
    return (index.h("div", null, index.h("span", { "aria-hidden": "true" }, this.i18n('selectedColumnCount', { count, total })), index.h("span", { class: "gux-sr-only" }, count === total ? (index.h("span", null, ": ", this.i18n('unselectAllColumnsScreenReader', { count, total }))) : (index.h("span", null, ": ", this.i18n('selectAllColumnsScreenReader', { count, total }))))));
  }
  render() {
    return (index.h("div", { class: "gux-container" }, index.h("div", { class: "gux-search" }, index.h("gux-content-search", { "match-count": this.highlightResults.matchCount, "current-match": this.highlightResults.currentMatch, onGuxcurrentmatchchanged: event => this.onGuxCurrentMatchChanged(event) }, index.h("input", { type: "text", placeholder: this.i18n('search'), onInput: () => this.onSearchInput(), ref: el => (this.searchElement = el) }))), index.h("div", { class: "gux-select" }, index.h("gux-form-field-checkbox", null, index.h("input", { slot: "input", type: "checkbox", ref: el => (this.mainCheckboxElement = el), onChange: () => this.onMainCheckboxChange() }), index.h("label", { slot: "label" }, this.renderSelectedColumnCount()))), index.h("div", { class: "gux-list", onChange: () => this.onListChange() }, index.h("slot", { onSlotchange: () => this.onSlotChange() })), index.h("gux-announce-beta", { ref: el => (this.announceElement = el) })));
  }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "keyboardOrderChange": ["watchKeyboardOrderChange"]
  }; }
};
GuxColumnManager.style = guxColumnManagerCss;

exports.gux_column_manager_beta = GuxColumnManager;
