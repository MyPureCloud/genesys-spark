var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { forceUpdate, h } from '@stencil/core';
import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { buildI18nForComponent } from '../../../i18n';
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import { afterNextRender } from '../../../utils/dom/after-next-render';
import { onInputDisabledStateChange } from '../../../utils/dom/on-input-disabled-state-change';
import { trackComponent } from '@utils/tracking/usage';
import translationResources from './i18n/en.json';
import { getSearchOption } from '../../stable/gux-listbox/gux-listbox.service';
import { OnMutation } from '@utils/decorator/on-mutation';
/**
 * @slot - for a gux-listbox-multi containing gux-option-multi children
 */
export class GuxDropdownMulti {
  constructor() {
    this.value = undefined;
    this.disabled = false;
    this.required = false;
    this.loading = false;
    this.placeholder = undefined;
    this.filterable = false;
    this.filterType = 'none';
    this.hasError = false;
    this.hasCreate = false;
    this.expanded = false;
    this.textInput = '';
  }
  onMutation() {
    var _a;
    if (this.listboxElement) {
      return;
    }
    this.listboxElement = (_a = this.root) === null || _a === void 0 ? void 0 : _a.querySelector('gux-listbox-multi');
    this.applyListboxEventListeners();
  }
  /**
   * Listens for expanded event emitted by gux-popup.
   */
  onInternalExpanded(event) {
    event.stopPropagation();
    this.guxexpanded.emit();
  }
  /**
   * Listens for collapsed event emitted by gux-popup.
   */
  onInternalCollapsed(event) {
    event.stopPropagation();
    this.guxcollapsed.emit();
  }
  focusSelectedItemAfterRender(expanded) {
    if (expanded && this.listboxElement) {
      afterNextRender(() => {
        if (this.hasTextInput()) {
          this.textInputElement.focus();
        }
        else {
          this.listboxElement.focus();
        }
      });
    }
    if (!expanded) {
      this.textInput = '';
    }
  }
  watchValue(newValue) {
    this.validateValue(newValue, this.listboxElement);
  }
  handleFilter(filter) {
    this.guxfilter.emit(filter);
  }
  /**
   * Returns an array of the selected values
   */
  getSelectedValues() {
    var _a;
    return Promise.resolve(((_a = this.value) === null || _a === void 0 ? void 0 : _a.split(',')) || []);
  }
  onKeydown(event) {
    switch (event.key) {
      case 'Escape':
        if (this.hasTextInput()) {
          if (document.activeElement === this.listboxElement) {
            return this.textInputElement.focus();
          }
        }
        this.collapseListbox('focusFieldButton');
        return;
      case 'Tab':
        if (this.shiftTabFromFilterListbox(event)) {
          event.preventDefault();
          return this.textInputElement.focus();
        }
        else if (this.shiftTabFromExpandedFilterInput(event)) {
          event.preventDefault();
          return this.collapseListbox('focusFieldButton');
        }
        else {
          this.collapseListbox('noFocusChange');
        }
        return;
      case 'ArrowDown':
        if (this.activeElementNotListbox()) {
          event.preventDefault();
          this.expanded = true;
        }
        return;
      case 'Enter':
        if (this.canCreateNewOption() && this.isActiveElement()) {
          this.emitCreateOption();
        }
    }
  }
  /**
   * force update when slotted gux-listbox-multi listbox options change
   */
  onInternallistboxoptionsupdated(event) {
    event.stopPropagation();
    forceUpdate(this.root);
  }
  /**
   * clear selected options when gux-dropdown-multi-tag emits event
   */
  onClearselected(event) {
    event.stopPropagation();
    this.updateValue('');
    if (this.listboxElement) {
      this.listboxElement.value = undefined;
    }
    this.validateValue(this.value, this.listboxElement);
    this.fieldButtonElement.focus();
  }
  /**
   * emit guxcreateoption event when gux-create-option emits create event
   */
  onCreatenewoption(event) {
    event.stopPropagation();
    this.emitCreateOption();
  }
  onBlur(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onFocus(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onFocusout(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onFocusin(event) {
    this.stopPropagationOfInternalFocusEvents(event);
  }
  onClickOutside() {
    this.collapseListbox('noFocusChange');
  }
  connectedCallback() {
    var _a;
    this.listboxElement = (_a = this.root) === null || _a === void 0 ? void 0 : _a.querySelector('gux-listbox-multi');
    if (this.listboxElement) {
      this.validateValue(this.value, this.listboxElement);
      this.hasCreate = !!this.root.querySelector('gux-create-option');
    }
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    onInputDisabledStateChange(this.root, () => {
      forceUpdate(this.root);
    });
  }
  componentDidLoad() {
    this.applyListboxEventListeners();
  }
  componentWillRender() {
    if (this.listboxElement) {
      this.validateValue(this.value, this.listboxElement);
      this.listboxElement.loading = this.loading;
      this.listboxElement.filterType = this.filterType;
      this.listboxElement.textInput = this.textInput;
    }
  }
  validateValue(newValue, listboxElement) {
    if (newValue === undefined) {
      if (listboxElement) {
        listboxElement.value = newValue;
      }
      return;
    }
    const selectedListboxOptionElement = this.getOptionElementByValue(newValue);
    if (selectedListboxOptionElement) {
      listboxElement.value = newValue;
      return;
    }
    this.value = undefined;
  }
  hasTextInput() {
    return this.isFilterable() || this.hasCreate;
  }
  applyListboxEventListeners() {
    var _a, _b;
    (_a = this.listboxElement) === null || _a === void 0 ? void 0 : _a.addEventListener('input', (event) => {
      event.stopPropagation();
      this.updateValue(event.target.value);
    });
    (_b = this.listboxElement) === null || _b === void 0 ? void 0 : _b.addEventListener('change', (event) => {
      event.stopPropagation();
    });
  }
  isFilterable() {
    return (this.filterable ||
      this.filterType === 'custom' ||
      this.filterType === 'starts-with');
  }
  stopPropagationOfInternalFocusEvents(event) {
    if (this.root.contains(event.relatedTarget)) {
      return event.stopImmediatePropagation();
    }
  }
  getOptionElementByValue(value) {
    const listboxOptionElements = Array.from(this.root.querySelectorAll('gux-option-multi'));
    const values = value ? value.split(',') : undefined;
    if (values) {
      return listboxOptionElements.filter(element => values.includes(element.value));
    }
    return;
  }
  fieldButtonClick() {
    this.expanded = !this.expanded;
  }
  fieldButtonInputClick() {
    if (!this.expanded) {
      this.expanded = !this.expanded;
    }
  }
  filterInput(event) {
    event.stopPropagation();
    this.textInput = this.textInputElement.value;
  }
  shiftTabFromExpandedFilterInput(event) {
    return (event.shiftKey &&
      this.hasTextInput() &&
      this.expanded &&
      !(document.activeElement === this.listboxElement));
  }
  shiftTabFromFilterListbox(event) {
    return (event.shiftKey &&
      this.hasTextInput() &&
      document.activeElement === this.listboxElement);
  }
  emitCreateOption() {
    this.guxcreateoption.emit(this.textInput);
    this.textInput = '';
    this.textInputElement.value = '';
  }
  /**
   * check if able to create new option from text input value
   */
  canCreateNewOption() {
    return (this.hasCreate && this.textInput && !this.listboxElement.hasExactMatch);
  }
  isActiveElement() {
    return document.activeElement === this.root;
  }
  activeElementNotListbox() {
    return document.activeElement !== this.listboxElement;
  }
  filterKeydown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.stopImmediatePropagation();
        this.listboxElement.focus();
        return;
    }
  }
  filterKeyup(event) {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        return;
    }
  }
  collapseListbox(focusChange) {
    if (this.expanded) {
      this.expanded = false;
    }
    if (focusChange === 'focusFieldButton') {
      this.fieldButtonElement.focus();
    }
  }
  updateValue(newValue) {
    if (this.value !== newValue) {
      this.value = newValue;
      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }
  getTypeaheadText(textInput) {
    var _a;
    const textInputLength = textInput.length;
    if (textInputLength > 0 && !this.loading) {
      const option = getSearchOption(this.listboxElement, textInput);
      if (option && this.filterType !== 'custom') {
        const optionSlotTextContent = (_a = option.querySelector('[gux-slot-container]')) === null || _a === void 0 ? void 0 : _a.textContent;
        return optionSlotTextContent === null || optionSlotTextContent === void 0 ? void 0 : optionSlotTextContent.substring(textInputLength);
      }
      return '';
    }
  }
  renderTargetDisplay() {
    return (h("div", { class: "gux-placeholder" }, this.placeholder || this.i18n('noSelection'), this.getSrSelectedText()));
  }
  getSrSelectedText() {
    const selectedListboxOptionElement = this.getOptionElementByValue(this.value);
    if (selectedListboxOptionElement === null || selectedListboxOptionElement === void 0 ? void 0 : selectedListboxOptionElement.length) {
      return (h("span", { class: "gux-sr-only" }, this.i18n('numberSelected', {
        numberSelected: selectedListboxOptionElement.length.toString()
      })));
    }
  }
  getInputAriaLabel() {
    return this.canCreateNewOption() && this.isActiveElement()
      ? this.i18n('pressEnterToCreate', { textInputValue: this.textInput })
      : this.i18n('textInputResults');
  }
  renderTag() {
    const selectedListboxOptionElement = this.getOptionElementByValue(this.value);
    if (selectedListboxOptionElement === null || selectedListboxOptionElement === void 0 ? void 0 : selectedListboxOptionElement.length) {
      return (h("gux-dropdown-multi-tag", { disabled: this.disabled, "number-selected": selectedListboxOptionElement.length }));
    }
  }
  renderFilterInputField() {
    if (this.expanded && this.hasTextInput()) {
      return (h("div", { class: "gux-field gux-input-field" }, h("div", { class: "gux-field-content" }, h("div", { class: "gux-filter" }, h("div", { class: "gux-filter-display" }, h("span", { class: "gux-filter-text" }, this.textInput), h("span", { class: "gux-filter-suggestion" }, this.getTypeaheadText(this.textInput))), h("div", { class: "input-and-dropdown-button" }, h("input", { onClick: this.fieldButtonInputClick.bind(this), placeholder: this.placeholder || this.i18n('noSelection'), class: "gux-filter-input", type: "text", "aria-label": this.getInputAriaLabel(), ref: el => (this.textInputElement = el), onInput: this.filterInput.bind(this), onKeyDown: this.filterKeydown.bind(this), onKeyUp: this.filterKeyup.bind(this) }))))));
    }
  }
  renderPopup() {
    return (h("div", { slot: "popup", class: "gux-listbox-container" }, h("slot", null)));
  }
  renderTarget() {
    return (h("div", { class: {
        'gux-target-container': true,
        'gux-target-container-expanded': this.expanded && this.hasTextInput(),
        'gux-target-container-collapsed': !(this.expanded && this.hasTextInput()),
        'gux-error': this.hasError
      }, slot: "target" }, this.renderFilterInputField(), h("button", { type: "button", class: "gux-field gux-field-button", disabled: this.disabled, onClick: this.fieldButtonClick.bind(this), ref: el => (this.fieldButtonElement = el), "aria-haspopup": "listbox", "aria-expanded": this.expanded.toString() }, this.renderTargetContent(), this.renderTag(), this.renderRadialLoading(), h("gux-icon", { class: {
        'gux-expand-icon': true
      }, "screenreader-text": this.i18n('dropdown'), iconName: "chevron-small-down" }))));
  }
  renderTargetContent() {
    if (!(this.expanded && this.hasTextInput())) {
      return (h("div", { class: "gux-field-content" }, this.renderTargetDisplay()));
    }
  }
  renderRadialLoading() {
    if (this.loading && !this.expanded) {
      return (h("gux-radial-loading", { context: "input" }));
    }
  }
  render() {
    return [
      h("div", { class: "gux-dropdown-container" }, h("gux-popup-beta", { expanded: this.expanded && (!this.loading || this.isFilterable()), disabled: this.disabled }, this.renderTarget(), this.renderPopup()))
    ];
  }
  static get is() { return "gux-dropdown-multi-beta"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-dropdown-multi.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-dropdown-multi.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
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
        "attribute": "value",
        "reflect": false
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "required": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "required",
        "reflect": false,
        "defaultValue": "false"
      },
      "loading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "placeholder": {
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
        "attribute": "placeholder",
        "reflect": false
      },
      "filterable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "deprecated will be removed in v4 (COMUI-1369). Use filterType instead"
        },
        "attribute": "filterable",
        "reflect": false,
        "defaultValue": "false"
      },
      "filterType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxFilterTypes",
          "resolved": "\"custom\" | \"none\" | \"starts-with\"",
          "references": {
            "GuxFilterTypes": {
              "location": "import",
              "path": "../../stable/gux-dropdown/gux-dropdown.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Override default filtering behavior"
        },
        "attribute": "filter-type",
        "reflect": false,
        "defaultValue": "'none'"
      },
      "hasError": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "has-error",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "hasCreate": {},
      "expanded": {},
      "textInput": {}
    };
  }
  static get events() {
    return [{
        "method": "guxcreateoption",
        "name": "guxcreateoption",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This event is emitted to request creating a new option"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "guxexpanded",
        "name": "guxexpanded",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This event will run when the dropdown-multi transitions to an expanded state."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "guxcollapsed",
        "name": "guxcollapsed",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This event will run when the dropdown-multi transitions to a collapsed state."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "guxfilter",
        "name": "guxfilter",
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
      }];
  }
  static get methods() {
    return {
      "getSelectedValues": {
        "complexType": {
          "signature": "() => Promise<string[]>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<string[]>"
        },
        "docs": {
          "text": "Returns an array of the selected values",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "expanded",
        "methodName": "focusSelectedItemAfterRender"
      }, {
        "propName": "value",
        "methodName": "watchValue"
      }, {
        "propName": "textInput",
        "methodName": "handleFilter"
      }];
  }
  static get listeners() {
    return [{
        "name": "internalexpanded",
        "method": "onInternalExpanded",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "internalcollapsed",
        "method": "onInternalCollapsed",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keydown",
        "method": "onKeydown",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "internallistboxoptionsupdated",
        "method": "onInternallistboxoptionsupdated",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "internalclearselected",
        "method": "onClearselected",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "internalcreatenewoption",
        "method": "onCreatenewoption",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "blur",
        "method": "onBlur",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focus",
        "method": "onFocus",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusout",
        "method": "onFocusout",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusin",
        "method": "onFocusin",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxDropdownMulti.prototype, "onMutation", null);
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxDropdownMulti.prototype, "onClickOutside", null);
