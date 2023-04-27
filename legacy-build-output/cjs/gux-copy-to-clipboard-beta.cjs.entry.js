'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const clickToCopy = "Click to Copy";
const enterToCopy = "Press Enter to Copy";
const copySuccess = "Copied to Clipboard";
const copyFailure = "Error. Please Try Again.";
const translationResources = {
	clickToCopy: clickToCopy,
	enterToCopy: enterToCopy,
	copySuccess: copySuccess,
	copyFailure: copyFailure
};

const guxCopyToClipboardCss = "button{all:unset}.gux-copy-to-clipboard-wrapper{display:inline-flex;align-items:center}.gux-copy-to-clipboard-wrapper .gux-copy-content{display:inherit;align-items:inherit;cursor:pointer}.gux-copy-to-clipboard-wrapper .gux-copy-content ::slotted(*){padding:0 2px;margin-right:4px}.gux-copy-to-clipboard-wrapper .gux-copy-content:hover ::slotted(*){background-color:#deeaff;border-radius:4px}.gux-copy-to-clipboard-wrapper .gux-copy-content:hover gux-icon[icon-name='copy']{visibility:visible}.gux-copy-to-clipboard-wrapper .gux-copy-content gux-icon[icon-name='copy']{width:16px;height:16px;padding:2px;visibility:hidden;background-color:#deeaff;border-radius:4px}.gux-copy-to-clipboard-wrapper:focus-visible{outline:none}.gux-copy-to-clipboard-wrapper:focus-visible ::slotted(*){background-color:#deeaff;border-radius:4px}.gux-copy-to-clipboard-wrapper:focus-visible gux-icon[icon-name='copy']{visibility:visible}.gux-copy-to-clipboard-wrapper gux-tooltip{display:inline-flex;align-items:center}.gux-copy-to-clipboard-wrapper gux-tooltip .gux-tooltip-content>*{vertical-align:middle}.gux-copy-to-clipboard-wrapper gux-tooltip gux-icon{width:16px;height:16px;padding-right:8px}.gux-copy-to-clipboard-wrapper gux-tooltip gux-icon[icon-name='badge-check']{color:#3c8527}.gux-copy-to-clipboard-wrapper gux-tooltip gux-icon[icon-name='badge-x']{color:#ea0b0b}.focus-and-hover-copy-content ::slotted(*){background-color:#deeaff;border-radius:4px}.focus-and-hover-copy-content gux-icon[icon-name='copy']{visibility:visible}";

const GuxCopyToClipboard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.tooltipContent = 'clickToCopy';
  }
  onMouseleave() {
    this.resetTooltip();
  }
  onFocusout() {
    this.resetTooltip();
  }
  onFocus() {
    // when copy button is focused by keyboard it will have `:focus-visible` pseudo class
    if (this.copyButton.matches(':focus-visible')) {
      this.tooltipContent = 'enterToCopy';
    }
  }
  resetTooltip() {
    this.tooltipContent = 'clickToCopy';
  }
  onCopyToClipboard() {
    const copyText = this.root.innerText;
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
      this.tooltipContent = 'copySuccess';
    })
      .catch(() => {
      this.tooltipContent = 'copyFailure';
    });
  }
  getIconName(tooltipContent) {
    switch (tooltipContent) {
      case 'copyFailure':
        return 'badge-x';
      case 'copySuccess':
        return 'badge-check';
    }
  }
  renderTooltipIcon() {
    const iconName = this.getIconName(this.tooltipContent);
    if (iconName) {
      return (index.h("gux-icon", { "icon-name": iconName, decorative: true }));
    }
  }
  renderTooltip() {
    return (index.h("gux-tooltip", { placement: "bottom-end" }, index.h("div", { class: "gux-tooltip-content" }, this.renderTooltipIcon(), index.h("span", null, this.i18n(this.tooltipContent)))));
  }
  async componentWillLoad() {
    usage.trackComponent(this.root);
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (index.h("button", { class: "gux-copy-to-clipboard-wrapper", ref: el => (this.copyButton = el), onClick: this.onCopyToClipboard.bind(this) }, index.h("div", { class: "gux-copy-content" }, index.h("slot", { name: "content" }), index.h("gux-icon", { "icon-name": "copy", decorative: true })), this.renderTooltip()));
  }
  get root() { return index.getElement(this); }
};
GuxCopyToClipboard.style = guxCopyToClipboardCss;

exports.gux_copy_to_clipboard_beta = GuxCopyToClipboard;
