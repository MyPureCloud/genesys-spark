'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const guxColumnManager_service = require('./gux-column-manager.service-80a241dd.js');
require('./get-closest-element-ab4b2eee.js');
require('./clamp-1bb96117.js');
require('./simulate-native-event-fe3e62da.js');

function getNewIndex(oldIndex, dropIndex, mouseOnTopHalfOfDropElement) {
  if (oldIndex < dropIndex) {
    if (mouseOnTopHalfOfDropElement) {
      return dropIndex - 1;
    }
    return dropIndex;
  }
  if (mouseOnTopHalfOfDropElement) {
    return dropIndex;
  }
  return dropIndex + 1;
}

const activateReordering = "Activate reordering mode for {columnName} column";
const translationResources = {
	activateReordering: activateReordering
};

const guxColumnManagerItemCss = ":host([gs-reorder-indicator='above']) .gux-container{border-top-color:#aac9ff}:host([gs-reorder-indicator='below']) .gux-container{border-bottom-color:#aac9ff}.gux-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;margin-bottom:-2px;border-top:2px solid transparent;border-bottom:2px solid transparent}.gux-container.gux-drop-above{border-top-color:#aac9ff}.gux-container.gux-drop-below{border-bottom-color:#aac9ff}.gux-container.gux-dragging{border-top-color:transparent;border-bottom-color:transparent;opacity:0.4}.gux-container .gux-reorder{all:unset;flex:0 1 auto;align-self:auto;order:0;margin-right:4px;color:#596373;cursor:grab;border-radius:4px}.gux-container .gux-reorder.gux-reordering:focus-visible gux-icon{color:#2a60c8}.gux-container .gux-reorder:active{pointer-events:none;cursor:grabbing !important}.gux-container .gux-reorder:hover,.gux-container .gux-reorder:focus-visible{outline:2px solid #aac9ff;outline-offset:0}.gux-container .gux-reorder:hover gux-icon,.gux-container .gux-reorder:focus-visible gux-icon{color:#2a60c8}.gux-container .gux-select{position:relative;flex:1 1 auto;align-self:auto;order:1}.gux-container .gux-select gux-text-highlight{position:absolute;top:2px;left:24px;color:transparent;pointer-events:none;opacity:0.25}.gux-container .gux-select gux-text-highlight.gux-active{opacity:1}.gux-sr-only:not(:focus):not(:active){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}";

const GuxColumnManagerItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internal_order_change = index.createEvent(this, "internal_order_change", 7);
    this.internal_keyboard_reorder_start = index.createEvent(this, "internal_keyboard_reorder_start", 7);
    this.internal_keyboard_reorder_move = index.createEvent(this, "internal_keyboard_reorder_move", 7);
    this.internal_keyboard_reorder_emit = index.createEvent(this, "internal_keyboard_reorder_emit", 7);
    this.internal_keyboard_reorder_finish = index.createEvent(this, "internal_keyboard_reorder_finish", 7);
    this.orderId = undefined;
    this.highlightActive = undefined;
    this.highlight = undefined;
    this.text = undefined;
    this.pendingReorder = 'none';
    this.isDragging = false;
    this.isReordering = false;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSetHighlight(highlight = '', highlightActive = false) {
    this.highlight = highlight;
    this.highlightActive = highlightActive;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus() {
    this.reorderButtonElement.focus();
  }
  onBlur() {
    this.setReorderMode(false);
  }
  onDragStart(event) {
    this.isDragging = true;
    const oldIndex = guxColumnManager_service.getIndexInParent(this.root);
    event.dataTransfer.setData('oldIndex', String(oldIndex));
    event.dataTransfer.effectAllowed = 'move';
  }
  onDragEnter(event) {
    event.dataTransfer.dropEffect = 'move';
    this.pendingReorder = this.mouseOnTopHalf(event) ? 'above' : 'below';
  }
  onDragOver(event) {
    event.preventDefault();
    this.pendingReorder = this.mouseOnTopHalf(event) ? 'above' : 'below';
  }
  onDragLeave() {
    this.pendingReorder = 'none';
  }
  onDragEnd() {
    this.isDragging = false;
  }
  onDrop(event) {
    const oldIndex = Number(event.dataTransfer.getData('oldIndex'));
    const dropIndex = guxColumnManager_service.getIndexInParent(this.root);
    event.stopPropagation(); // stops the browser from redirecting.
    event.stopImmediatePropagation();
    this.pendingReorder = 'none';
    const newIndex = getNewIndex(oldIndex, dropIndex, this.mouseOnTopHalf(event));
    this.internal_order_change.emit({ oldIndex, newIndex });
    return false;
  }
  mouseOnTopHalf(event) {
    const rect = this.root.getBoundingClientRect();
    return event.clientY - rect.top <= (rect.bottom - rect.top) / 2;
  }
  onSlotChange() {
    this.text = this.root.querySelector('gux-form-field-checkbox label').textContent;
  }
  setReorderMode(isReordering, doReorder = false) {
    if (this.isReordering !== isReordering) {
      this.isReordering = isReordering;
      if (isReordering) {
        this.internal_keyboard_reorder_start.emit(this.text);
      }
      else {
        if (doReorder) {
          this.internal_keyboard_reorder_emit.emit();
        }
        this.internal_keyboard_reorder_finish.emit();
      }
    }
  }
  toggleReorderMode() {
    this.setReorderMode(!this.isReordering, true);
  }
  keyboardReorder(event) {
    if (this.isReordering) {
      switch (event.key) {
        case 'ArrowUp': {
          event.preventDefault();
          this.internal_keyboard_reorder_move.emit({
            delta: -1,
            column: this.text
          });
          break;
        }
        case 'ArrowDown': {
          event.preventDefault();
          this.internal_keyboard_reorder_move.emit({
            delta: 1,
            column: this.text
          });
          break;
        }
        case 'Home': {
          event.preventDefault();
          this.internal_keyboard_reorder_move.emit({
            delta: -Infinity,
            column: this.text
          });
          break;
        }
        case 'End': {
          event.preventDefault();
          console.log('End');
          this.internal_keyboard_reorder_move.emit({
            delta: Infinity,
            column: this.text
          });
          break;
        }
        case 'Escape': {
          event.preventDefault();
          this.setReorderMode(false);
        }
      }
    }
  }
  async componentWillLoad() {
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (index.h(index.Host, { draggable: "true" }, index.h("div", { class: {
        'gux-container': true,
        [`gux-drop-${this.pendingReorder}`]: true,
        'gux-dragging': this.isDragging
      } }, index.h("button", { class: {
        'gux-reorder': true,
        'gux-reordering': this.isReordering
      }, type: "button", onClick: () => this.toggleReorderMode(), onKeyDown: event => this.keyboardReorder(event), ref: el => (this.reorderButtonElement = el) }, index.h("gux-icon", { "icon-name": "grab-vertical", decorative: true }), index.h("span", { class: "gux-sr-only" }, this.i18n('activateReordering', { columnName: this.text }))), index.h("div", { class: "gux-select" }, index.h("slot", { onSlotchange: () => this.onSlotChange() }), index.h("gux-text-highlight", { class: { 'gux-active': this.highlightActive }, highlight: this.highlight, text: this.text, strategy: "contains" })))));
  }
  get root() { return index.getElement(this); }
};
GuxColumnManagerItem.style = guxColumnManagerItemCss;

exports.gux_column_manager_item = GuxColumnManagerItem;
