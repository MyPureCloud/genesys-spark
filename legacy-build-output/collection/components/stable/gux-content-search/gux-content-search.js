import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../i18n';
import contentSearchResources from './i18n/en.json';
import { onDisabledChange } from '../../../utils/dom/on-attribute-change';
/**
 * @slot  - Required slot for input tag
 */
export class GuxContentSearch {
  constructor() {
    this.matchCount = 0;
    this.currentMatch = 0;
    this.disabled = undefined;
    this.value = undefined;
  }
  /**
   * Clears the input.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async clear() {
    if (this.disabled) {
      return;
    }
    this.matchCount = 0;
    this.currentMatch = 0;
    this.value = '';
    this.resetInputSlottedElement();
    this.emitCurrentMatchChanged();
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, contentSearchResources);
    this.inputSlottedElement = this.root.querySelector('input');
    this.disabled = this.inputSlottedElement.disabled;
    this.value = this.inputSlottedElement.value;
    this.disabledObserver = onDisabledChange(this.inputSlottedElement, (disabled) => {
      this.disabled = disabled;
    });
    this.inputSlottedElement.addEventListener('input', (e) => this.onInput(e));
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (h("div", { class: {
        'gux-content-search': true,
        'gux-disabled': this.disabled
      } }, h("div", { class: "gux-search-icon" }, h("gux-icon", { decorative: true, "icon-name": "search" })), h("slot", null), this.getNavigationPanel()));
  }
  getNavigationPanel() {
    if (this.showNavigationPanel()) {
      const disableNavigationPanel = this.disableNavigationPanel();
      return (h("div", { class: "gux-content-control-panel" }, h("div", { class: {
          'gux-navigation-panel': true,
          'gux-navigation-disabled': disableNavigationPanel
        }, title: this.matchCountResult() }, h("span", { class: {
          'gux-navigation-result': true,
          'gux-navigation-result-disabled': disableNavigationPanel
        }, "aria-label": this.matchCountResult() }, this.matchCountResult()), h("button", { type: "button", class: "gux-previous-button", title: this.i18n('navigatePreviousBtn'), "aria-label": this.i18n('navigatePreviousBtn'), onClick: () => this.previousClick(), disabled: disableNavigationPanel }, h("gux-icon", { decorative: true, "icon-name": "arrow-solid-up" })), h("button", { type: "button", class: "gux-next-button", title: this.i18n('navigateNextBtn'), "aria-label": this.i18n('navigateNextBtn'), onClick: () => this.nextClick(), disabled: disableNavigationPanel }, h("gux-icon", { decorative: true, "icon-name": "arrow-solid-down" }))), h("button", { type: "button", class: "gux-clear-button", title: this.i18n('eraseBtnAria'), "aria-label": this.i18n('eraseBtnAria'), onClick: () => void this.clear(), disabled: this.disabled }, h("gux-icon", { decorative: true, "icon-name": "close" }))));
    }
    return null;
  }
  matchCountResult() {
    return this.i18n('totalMatches', {
      currentMatch: this.getNormalizedCurrentMatch(),
      matchCount: this.getNormalizedMatchCount()
    });
  }
  showNavigationPanel() {
    return this.value !== '' ? true : false;
  }
  disableNavigationPanel() {
    return this.disabled || this.getNormalizedMatchCount() <= 0;
  }
  getNormalizedMatchCount() {
    return this.matchCount &&
      Number.isInteger(this.matchCount) &&
      this.matchCount >= 0
      ? Number(this.matchCount)
      : 0;
  }
  getNormalizedCurrentMatch() {
    return this.currentMatch &&
      Number.isInteger(this.currentMatch) &&
      this.currentMatch >= 0 &&
      this.currentMatch <= this.getNormalizedMatchCount() &&
      this.getNormalizedMatchCount() > 0
      ? Number(this.currentMatch)
      : 0;
  }
  resetInputSlottedElement() {
    this.inputSlottedElement.value = '';
    this.inputSlottedElement.dispatchEvent(new InputEvent('input', {
      bubbles: true,
      cancelable: true
    }));
    this.inputSlottedElement.dispatchEvent(new InputEvent('change', {
      bubbles: true
    }));
  }
  nextClick() {
    if (this.disableNavigationPanel()) {
      return;
    }
    if (this.getNormalizedCurrentMatch() === this.getNormalizedMatchCount()) {
      this.currentMatch = 1;
    }
    else {
      this.currentMatch = this.getNormalizedCurrentMatch() + 1;
    }
    this.emitCurrentMatchChanged();
  }
  previousClick() {
    if (this.disableNavigationPanel()) {
      return;
    }
    if (this.getNormalizedCurrentMatch() === 1 ||
      this.getNormalizedCurrentMatch() === 0) {
      this.currentMatch = this.getNormalizedMatchCount();
    }
    else {
      this.currentMatch = this.getNormalizedCurrentMatch() - 1;
    }
    this.emitCurrentMatchChanged();
  }
  onInput(event) {
    this.value = event.target.value;
  }
  emitCurrentMatchChanged() {
    this.guxcurrentmatchchanged.emit(this.getNormalizedCurrentMatch());
  }
  static get is() { return "gux-content-search"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-content-search.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-content-search.css"]
    };
  }
  static get properties() {
    return {
      "matchCount": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The Match Count"
        },
        "attribute": "match-count",
        "reflect": false,
        "defaultValue": "0"
      },
      "currentMatch": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The Current match count which needs to highlighted"
        },
        "attribute": "current-match",
        "reflect": false,
        "defaultValue": "0"
      }
    };
  }
  static get states() {
    return {
      "disabled": {},
      "value": {}
    };
  }
  static get events() {
    return [{
        "method": "guxcurrentmatchchanged",
        "name": "guxcurrentmatchchanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "return",
              "text": "The Current match value"
            }],
          "text": "Triggered when Current match value changes"
        },
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "clear": {
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
          "text": "Clears the input.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
}
