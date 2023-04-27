'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const defaultAriaLabel = "Toggle Switch";
const toggleIsLoading = "Toggle is loading";
const toggleIsFinishedLoading = "Toggle is finished loading";
const translationResources = {
	defaultAriaLabel: defaultAriaLabel,
	toggleIsLoading: toggleIsLoading,
	toggleIsFinishedLoading: toggleIsFinishedLoading
};

const guxToggleCss = ":host{display:block;margin:2px;color:#2e394c;outline:none}:host(.gux-display-inline){display:inline-block}.gux-toggle-container{cursor:pointer}.gux-toggle-container.gux-disabled{pointer-events:none;cursor:default}.gux-toggle-container.gux-disabled .gux-toggle-input .gux-toggle-label .gux-toggle-label-text{opacity:0.5}.gux-toggle-container.gux-toggle-label-left .gux-toggle-input{flex-direction:row-reverse}.gux-toggle-container.gux-toggle-label-left .gux-toggle-input .gux-toggle-label .gux-toggle-label-text{place-items:end}.gux-toggle-container.gux-toggle-label-left .gux-toggle-error{float:right}.gux-toggle-container .gux-toggle-input{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:flex-start;justify-content:flex-start}.gux-toggle-container .gux-toggle-input .gux-toggle-label{position:relative;display:inline-block;padding:0 4px}.gux-toggle-container .gux-toggle-input .gux-toggle-label .gux-toggle-label-text{display:grid;grid-template-areas:'inner-div';place-items:start}.gux-toggle-container .gux-toggle-input .gux-toggle-label .gux-toggle-label-text .gux-toggle-label-text-inner{position:relative;grid-area:inner-div}.gux-toggle-container .gux-toggle-input .gux-toggle-label .gux-toggle-label-text .gux-toggle-label-text-inner.gux-hidden{visibility:hidden}.gux-toggle-container .gux-toggle-input .gux-toggle-label .gux-toggle-label-loading{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center}";

const GuxToggle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.check = index.createEvent(this, "check", 7);
    this.labelId = randomHtmlId.randomHTMLId('gux-toggle-label');
    this.errorId = randomHtmlId.randomHTMLId('gux-toggle-error');
    this.checked = false;
    this.disabled = false;
    this.loading = false;
    this.checkedLabel = undefined;
    this.uncheckedLabel = undefined;
    this.labelPosition = 'right';
    this.errorMessage = undefined;
    this.displayInline = false;
  }
  handleLoading(loading) {
    if (loading) {
      void this.announceElement.guxAnnounce(this.i18n('toggleIsLoading'));
    }
    else {
      void this.announceElement.guxAnnounce(this.i18n('toggleIsFinishedLoading'));
    }
  }
  onClick() {
    this.toggle();
  }
  onKeydown(event) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
    }
  }
  toggle() {
    if (!this.disabled && !this.loading) {
      const checkEvent = this.check.emit(!this.checked);
      if (!checkEvent.defaultPrevented) {
        this.checked = !this.checked;
      }
    }
  }
  getAriaLabel() {
    return (this.root.getAttribute('aria-label') ||
      this.root.title ||
      this.i18n('defaultAriaLabel'));
  }
  async componentWillLoad() {
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
    const variant = this.checkedLabel || this.uncheckedLabel ? 'labled' : 'unlabled';
    usage.trackComponent(this.root, { variant });
  }
  renderLoading() {
    if (this.loading) {
      return (index.h("div", { class: "gux-toggle-label-loading" }, index.h("gux-radial-loading", { context: "input" })));
    }
  }
  renderLabel() {
    if (this.uncheckedLabel && this.checkedLabel) {
      const labelText = this.checked ? this.checkedLabel : this.uncheckedLabel;
      return (index.h("div", { class: "gux-toggle-label-and-error" }, index.h("div", { class: "gux-toggle-label" }, index.h("div", { class: "gux-toggle-label-text" }, index.h("span", { class: "gux-toggle-label-text-inner" }, index.h("span", { id: this.labelId }, labelText), this.renderLoading()), index.h("span", { class: "gux-toggle-label-text-inner gux-hidden" }, this.checkedLabel), index.h("span", { class: "gux-toggle-label-text-inner gux-hidden" }, this.uncheckedLabel)))));
    }
  }
  renderError() {
    if (this.errorMessage) {
      return (index.h("div", { id: this.errorId, class: "gux-toggle-error" }, index.h("gux-error-message-beta", null, this.errorMessage)));
    }
  }
  render() {
    return (index.h(index.Host, { class: { 'gux-display-inline': this.displayInline } }, index.h("div", { class: {
        'gux-toggle-container': true,
        'gux-toggle-label-left': this.labelPosition === 'left',
        'gux-disabled': this.disabled || this.loading
      } }, index.h("div", { class: "gux-toggle-input" }, index.h("gux-toggle-slider", { checked: this.checked, disabled: this.disabled || this.loading, guxAriaLabel: this.getAriaLabel(), labelId: this.checkedLabel && this.uncheckedLabel ? this.labelId : '', errorId: this.errorMessage ? this.errorId : '' }), this.renderLabel()), this.renderError()), index.h("gux-announce-beta", { ref: el => (this.announceElement = el) })));
  }
  static get delegatesFocus() { return true; }
  get root() { return index.getElement(this); }
  static get watchers() { return {
    "loading": ["handleLoading"]
  }; }
};
GuxToggle.style = guxToggleCss;

exports.gux_toggle = GuxToggle;
