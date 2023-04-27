import { h, Host } from '@stencil/core';
import { buildI18nForComponent } from '../../../../i18n';
import { getIndexInParent } from '../gux-column-manager.service';
import { getNewIndex } from './gux-column-manager-item.service';
import translationResources from './i18n/en.json';
/**
 * @slot - slot for gux-form-field-checkbox
 */
export class GuxColumnManagerItem {
  constructor() {
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
    const oldIndex = getIndexInParent(this.root);
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
    const dropIndex = getIndexInParent(this.root);
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
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h(Host, { draggable: "true" }, h("div", { class: {
        'gux-container': true,
        [`gux-drop-${this.pendingReorder}`]: true,
        'gux-dragging': this.isDragging
      } }, h("button", { class: {
        'gux-reorder': true,
        'gux-reordering': this.isReordering
      }, type: "button", onClick: () => this.toggleReorderMode(), onKeyDown: event => this.keyboardReorder(event), ref: el => (this.reorderButtonElement = el) }, h("gux-icon", { "icon-name": "grab-vertical", decorative: true }), h("span", { class: "gux-sr-only" }, this.i18n('activateReordering', { columnName: this.text }))), h("div", { class: "gux-select" }, h("slot", { onSlotchange: () => this.onSlotChange() }), h("gux-text-highlight", { class: { 'gux-active': this.highlightActive }, highlight: this.highlight, text: this.text, strategy: "contains" })))));
  }
  static get is() { return "gux-column-manager-item"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-column-manager-item.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-column-manager-item.css"]
    };
  }
  static get properties() {
    return {
      "orderId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "order-id",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "highlightActive": {},
      "highlight": {},
      "text": {},
      "pendingReorder": {},
      "isDragging": {},
      "isReordering": {}
    };
  }
  static get events() {
    return [{
        "method": "internal_order_change",
        "name": "internal_order_change",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "InternalOrderChange",
          "resolved": "{ oldIndex: number; newIndex: number; }",
          "references": {
            "InternalOrderChange": {
              "location": "import",
              "path": "../gux-column-manager.types"
            }
          }
        }
      }, {
        "method": "internal_keyboard_reorder_start",
        "name": "internal_keyboard_reorder_start",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "internal_keyboard_reorder_move",
        "name": "internal_keyboard_reorder_move",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "InternalKeyboardReorderMove",
          "resolved": "{ delta: number; column: string; }",
          "references": {
            "InternalKeyboardReorderMove": {
              "location": "import",
              "path": "../gux-column-manager.types"
            }
          }
        }
      }, {
        "method": "internal_keyboard_reorder_emit",
        "name": "internal_keyboard_reorder_emit",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "internal_keyboard_reorder_finish",
        "name": "internal_keyboard_reorder_finish",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "guxSetHighlight": {
        "complexType": {
          "signature": "(highlight?: string, highlightActive?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "guxFocus": {
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
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "blur",
        "method": "onBlur",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "dragstart",
        "method": "onDragStart",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "dragenter",
        "method": "onDragEnter",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "dragover",
        "method": "onDragOver",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "dragleave",
        "method": "onDragLeave",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "dragend",
        "method": "onDragEnd",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "drop",
        "method": "onDrop",
        "target": undefined,
        "capture": false,
        "passive": true
      }];
  }
}
