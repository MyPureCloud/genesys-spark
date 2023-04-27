'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
const onAttributeChange = require('./on-attribute-change-37556263.js');
require('./get-closest-element-ab4b2eee.js');

const eraseBtnAria = "Clear";
const navigateNextBtn = "Next";
const navigatePreviousBtn = "Previous";
const totalMatches = "{currentMatch, number} of {matchCount, number}";
const contentSearchResources = {
	eraseBtnAria: eraseBtnAria,
	navigateNextBtn: navigateNextBtn,
	navigatePreviousBtn: navigatePreviousBtn,
	totalMatches: totalMatches
};

const guxContentSearchCss = ":host{display:inline-block;width:300px;min-width:300px;color:#596373}::slotted(input){box-sizing:border-box;width:100%;height:32px;padding:4px 12px;font-family:inherit;font-size:12px;line-height:1.6667;background-color:#fdfdfd;background-image:none;border:1px solid #6b7585;border-radius:2px;flex-basis:100%;flex-shrink:1;min-width:0;height:22px;padding:0;color:#2e394c;background-color:#f6f7f9;border:0;border-radius:0;outline:none}::slotted(input)::placeholder{color:#596373}::slotted(input).gux-focused,::slotted(input):focus-visible{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px rgba(170, 201, 255, 0.5)}::slotted(input).gux-focused,::slotted(input):focus{border:0;outline:none;box-shadow:none}.gux-content-search{box-sizing:border-box;display:flex;flex-direction:row;width:100%;height:32px;padding:4px 0 4px 0;margin:4px 0;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}.gux-content-search.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-content-search:focus-visible,.gux-content-search:focus-within{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px #75a8ff}.gux-content-search .gux-search-icon{display:flex;flex-shrink:0;align-items:center;padding:0 4px 0 8px}.gux-content-search .gux-search-icon:disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-content-search .gux-search-icon gux-icon{width:16px;height:16px}.gux-content-search .gux-content-control-panel{box-sizing:border-box;display:flex;flex-grow:1;flex-shrink:0;align-content:center;align-items:center;justify-content:flex-end;height:22px;padding:0;line-height:1.6667}.gux-content-search .gux-content-control-panel button{display:block;align-items:center;overflow:hidden;color:#596373;cursor:pointer;background:none;border:none;border-radius:4px;outline:none}.gux-content-search .gux-content-control-panel button:disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-content-search .gux-content-control-panel button:not(:disabled):hover,.gux-content-search .gux-content-control-panel button:not(:disabled):focus-visible{color:#2e394c}.gux-content-search .gux-content-control-panel button:focus-visible:enabled{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}.gux-content-search .gux-content-control-panel button gux-icon{width:16px;height:16px}.gux-content-search .gux-content-control-panel .gux-clear-button{flex-shrink:0;align-items:center;padding-right:0;padding-left:0;margin-right:8px;margin-left:8px}.gux-content-search .gux-content-control-panel .gux-navigation-disabled{pointer-events:auto;cursor:default;opacity:0.5}.gux-content-search .gux-content-control-panel .gux-navigation-panel{display:flex;align-content:center;align-items:center;justify-content:flex-end;border-right:1px solid #596373}.gux-content-search .gux-content-control-panel .gux-navigation-panel .gux-navigation-result{align-items:center;padding-left:8px;font-family:inherit;font-size:12px;white-space:nowrap}.gux-content-search .gux-content-control-panel .gux-navigation-panel .gux-previous-button{flex-shrink:0;align-items:center;padding-right:0;padding-left:0;margin-left:4px}.gux-content-search .gux-content-control-panel .gux-navigation-panel .gux-next-button{flex-shrink:0;align-items:center;padding-right:0;padding-left:0;margin-right:4px}";

const GuxContentSearch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.guxcurrentmatchchanged = index.createEvent(this, "guxcurrentmatchchanged", 7);
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
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, contentSearchResources);
    this.inputSlottedElement = this.root.querySelector('input');
    this.disabled = this.inputSlottedElement.disabled;
    this.value = this.inputSlottedElement.value;
    this.disabledObserver = onAttributeChange.onDisabledChange(this.inputSlottedElement, (disabled) => {
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
    return (index.h("div", { class: {
        'gux-content-search': true,
        'gux-disabled': this.disabled
      } }, index.h("div", { class: "gux-search-icon" }, index.h("gux-icon", { decorative: true, "icon-name": "search" })), index.h("slot", null), this.getNavigationPanel()));
  }
  getNavigationPanel() {
    if (this.showNavigationPanel()) {
      const disableNavigationPanel = this.disableNavigationPanel();
      return (index.h("div", { class: "gux-content-control-panel" }, index.h("div", { class: {
          'gux-navigation-panel': true,
          'gux-navigation-disabled': disableNavigationPanel
        }, title: this.matchCountResult() }, index.h("span", { class: {
          'gux-navigation-result': true,
          'gux-navigation-result-disabled': disableNavigationPanel
        }, "aria-label": this.matchCountResult() }, this.matchCountResult()), index.h("button", { type: "button", class: "gux-previous-button", title: this.i18n('navigatePreviousBtn'), "aria-label": this.i18n('navigatePreviousBtn'), onClick: () => this.previousClick(), disabled: disableNavigationPanel }, index.h("gux-icon", { decorative: true, "icon-name": "arrow-solid-up" })), index.h("button", { type: "button", class: "gux-next-button", title: this.i18n('navigateNextBtn'), "aria-label": this.i18n('navigateNextBtn'), onClick: () => this.nextClick(), disabled: disableNavigationPanel }, index.h("gux-icon", { decorative: true, "icon-name": "arrow-solid-down" }))), index.h("button", { type: "button", class: "gux-clear-button", title: this.i18n('eraseBtnAria'), "aria-label": this.i18n('eraseBtnAria'), onClick: () => void this.clear(), disabled: this.disabled }, index.h("gux-icon", { decorative: true, "icon-name": "close" }))));
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
  get root() { return index.getElement(this); }
};
GuxContentSearch.style = guxContentSearchCss;

exports.gux_content_search = GuxContentSearch;
