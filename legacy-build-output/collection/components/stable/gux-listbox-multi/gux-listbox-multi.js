import { h, Host } from '@stencil/core';
import { actOnActiveOption, clearActiveOptions, goToOption, hasPreviousOption, hasNextOption, onClickedOption, setFirstOptionActive, setInitialActiveOption, setLastOptionActive, setNextOptionActive, setPreviousOptionActive } from '../gux-listbox/gux-listbox.service';
import { buildI18nForComponent } from '../../../i18n';
import { whenEventIsFrom } from '../../../utils/dom/when-event-is-from';
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import { trackComponent } from '@utils/tracking/usage';
import { afterNextRender } from '../../../utils/dom/after-next-render';
import translationResources from './i18n/en.json';
/**
 * @slot - collection of gux-option-multi elements
 */
export class GuxListboxMulti {
  constructor() {
    this.value = undefined;
    this.loading = false;
    this.filter = '';
    this.textInput = '';
    this.filterType = 'none';
    this.listboxOptions = [];
    this.allListboxOptionsFiltered = undefined;
    this.hasExactMatch = false;
  }
  onFocus() {
    setInitialActiveOption(this.root);
  }
  onBlur() {
    clearActiveOptions(this.root);
  }
  selectNewCustomOption(event) {
    this.updateValue(event.detail);
  }
  onKeydown(event) {
    var _a;
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if ((_a = this.optionCreateElement) === null || _a === void 0 ? void 0 : _a.active) {
          void this.optionCreateElement.guxEmitInternalCreateNewOption();
          afterNextRender(() => {
            setInitialActiveOption(this.root);
          });
        }
        else {
          actOnActiveOption(this.root, value => this.updateValue(value));
        }
        return;
      case 'ArrowDown':
        event.preventDefault();
        if (hasNextOption(this.root)) {
          event.stopPropagation();
          setNextOptionActive(this.root);
        }
        else {
          setFirstOptionActive(this.root);
        }
        return;
      case 'ArrowUp': {
        event.preventDefault();
        if (hasPreviousOption(this.root)) {
          event.stopPropagation();
          setPreviousOptionActive(this.root);
        }
        else {
          setLastOptionActive(this.root);
        }
        return;
      }
      case 'Home': {
        event.preventDefault();
        setFirstOptionActive(this.root);
        return;
      }
      case 'End': {
        event.preventDefault();
        setLastOptionActive(this.root);
        return;
      }
      case ' ': {
        event.preventDefault();
        return;
      }
    }
    if (event.key.length === 1) {
      goToOption(this.root, event.key);
      return;
    }
  }
  onKeyup(event) {
    var _a;
    switch (event.key) {
      case ' ':
        if ((_a = this.optionCreateElement) === null || _a === void 0 ? void 0 : _a.active) {
          void this.optionCreateElement.guxEmitInternalCreateNewOption();
          afterNextRender(() => {
            setInitialActiveOption(this.root);
          });
        }
        else {
          actOnActiveOption(this.root, value => this.updateValue(value));
        }
        return;
    }
  }
  onMousemove() {
    clearActiveOptions(this.root);
  }
  onClick(event) {
    whenEventIsFrom('gux-option-multi', event, (option) => {
      onClickedOption(option, value => this.updateValue(value));
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSelectActive() {
    actOnActiveOption(this.root, value => this.updateValue(value));
  }
  getHasExactMatch() {
    let hasExactMatch = false;
    this.hasExactMatch = false;
    this.listboxOptions.forEach(listboxOption => {
      var _a, _b, _c;
      if (((_c = (_b = (_a = listboxOption
        .querySelector('[gux-slot-container]')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === null || _c === void 0 ? void 0 : _c.trim()) == this.textInput.toLowerCase().trim()) {
        hasExactMatch = true;
        this.hasExactMatch = true;
      }
    });
    return hasExactMatch;
  }
  updateOptionMultiCreateValue() {
    if (this.optionCreateElement) {
      this.optionCreateElement.value = this.textInput;
      this.optionCreateElement.filtered =
        !this.textInput || this.getHasExactMatch();
    }
  }
  // value as an array
  getSelectedValues() {
    if (this.value) {
      return this.value.split(',');
    }
    else {
      return [];
    }
  }
  updateOnSlotChange() {
    this.setListboxOptions();
    this.updateListboxOptions();
    setInitialActiveOption(this.root);
  }
  getOptionCreateElement() {
    this.optionCreateElement = this.root.querySelector('gux-create-option');
  }
  // get list of listbox option elements
  setListboxOptions() {
    this.listboxOptions = Array.from(this.root.children).filter(element => element.tagName === 'GUX-OPTION-MULTI');
    this.internallistboxoptionsupdated.emit();
  }
  updateListboxOptions() {
    this.listboxOptions.forEach(listboxOption => {
      listboxOption.selected = this.getSelectedValues().includes(listboxOption.value);
      if (this.filterType !== 'custom') {
        listboxOption.filtered = !listboxOption.textContent
          .toLowerCase()
          .startsWith(this.textInput.toLowerCase());
      }
    });
  }
  updateValue(newValue) {
    if (!this.getSelectedValues().includes(newValue)) {
      const newArray = [...this.getSelectedValues(), newValue];
      this.value = newArray.join(',');
    }
    else {
      this.value = this.getSelectedValues()
        .filter(e => e !== newValue)
        .join(',');
    }
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.setListboxOptions();
    this.getOptionCreateElement();
  }
  componentWillRender() {
    this.setListboxOptions();
    this.updateListboxOptions();
    this.allListboxOptionsFiltered =
      this.listboxOptions.filter(listboxOption => !listboxOption.filtered)
        .length === 0;
  }
  // The slot must always be rendered so onSlotchange can be called
  renderHiddenSlot() {
    return (h("div", { hidden: true }, h("slot", { onSlotchange: () => this.setListboxOptions() })));
  }
  renderLoading() {
    return [
      h("div", { class: "gux-message-container" }, h("gux-radial-loading", { context: "modal" }), h("span", null, this.i18n('loading'))),
      this.renderHiddenSlot()
    ];
  }
  renderAllListboxOptionsFiltered() {
    if (this.allListboxOptionsFiltered) {
      return [
        h("div", { class: "gux-message-container" }, h("div", { class: "gux-no-matches" }, this.i18n('noMatches'))),
        this.renderHiddenSlot()
      ];
    }
  }
  renderCreateOptionSlot() {
    return (h("slot", { name: "create" }));
  }
  render() {
    if (this.loading) {
      return this.renderLoading();
    }
    return (h(Host, { role: "listbox", "aria-multiselectable": "true", tabindex: 0 }, h("slot", { onSlotchange: () => this.updateOnSlotChange() }), this.renderAllListboxOptionsFiltered(), this.renderCreateOptionSlot()));
  }
  static get is() { return "gux-listbox-multi"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-listbox-multi.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-listbox-multi.css"]
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
      "filter": {
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
        "attribute": "filter",
        "reflect": false,
        "defaultValue": "''"
      },
      "textInput": {
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
        "attribute": "text-input",
        "reflect": false,
        "defaultValue": "''"
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
          "text": ""
        },
        "attribute": "filter-type",
        "reflect": false,
        "defaultValue": "'none'"
      },
      "hasExactMatch": {
        "type": "boolean",
        "mutable": true,
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
        "attribute": "has-exact-match",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "listboxOptions": {},
      "allListboxOptionsFiltered": {}
    };
  }
  static get events() {
    return [{
        "method": "internallistboxoptionsupdated",
        "name": "internallistboxoptionsupdated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "guxSelectActive": {
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
  static get watchers() {
    return [{
        "propName": "textInput",
        "methodName": "updateOptionMultiCreateValue"
      }];
  }
  static get listeners() {
    return [{
        "name": "focus",
        "method": "onFocus",
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
        "name": "internalselectcustomoption",
        "method": "selectNewCustomOption",
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
        "name": "keyup",
        "method": "onKeyup",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "mousemove",
        "method": "onMousemove",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "click",
        "method": "onClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
