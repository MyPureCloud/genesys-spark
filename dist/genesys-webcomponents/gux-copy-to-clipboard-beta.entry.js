import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import './get-closest-element-1597503c.js';

const clickToCopy = "Click to Copy";
const copyToClipboard = "Copy to clipboard";
const enterToCopy = "Press Enter to Copy";
const copySuccess = "Copied to Clipboard";
const copyFailure = "Error. Please Try Again.";
const translationResources = {
	clickToCopy: clickToCopy,
	copyToClipboard: copyToClipboard,
	enterToCopy: enterToCopy,
	copySuccess: copySuccess,
	copyFailure: copyFailure
};

const guxCopyToClipboardCss = "button{all:unset}.gux-copy-to-clipboard-wrapper{display:inline-flex;align-items:center}.gux-copy-to-clipboard-wrapper .gux-copy-content{display:inherit;align-items:inherit;cursor:pointer}.gux-copy-to-clipboard-wrapper .gux-copy-content ::slotted(*){padding:0 2px;margin-right:4px}.gux-copy-to-clipboard-wrapper .gux-copy-content:hover ::slotted(*){background-color:#deeaff;border-radius:4px}.gux-copy-to-clipboard-wrapper .gux-copy-content:hover gux-icon[icon-name='copy']{visibility:visible}.gux-copy-to-clipboard-wrapper .gux-copy-content gux-icon[icon-name='copy']{width:16px;height:16px;padding:2px;visibility:hidden;background-color:#deeaff;border-radius:4px}.gux-copy-to-clipboard-wrapper:focus{outline:none}.gux-copy-to-clipboard-wrapper:focus ::slotted(*){background-color:#deeaff;border-radius:4px}.gux-copy-to-clipboard-wrapper:focus gux-icon[icon-name='copy']{visibility:visible}.gux-copy-to-clipboard-wrapper gux-tooltip{display:inline-flex;align-items:center}.gux-copy-to-clipboard-wrapper gux-tooltip gux-icon{width:16px;height:16px;padding-right:8px}.gux-copy-to-clipboard-wrapper gux-tooltip gux-icon[icon-name='badge-check']{color:#3c8527}.gux-copy-to-clipboard-wrapper gux-tooltip gux-icon[icon-name='badge-x']{color:#ea0b0b}.focus-and-hover-copy-content ::slotted(*){background-color:#deeaff;border-radius:4px}.focus-and-hover-copy-content gux-icon[icon-name='copy']{visibility:visible}";

const GuxCopyToClipboard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tooltipContent = 'offerClick';
  }
  onMouseleave() {
    this.resetTooltip();
  }
  onFocusout() {
    this.resetTooltip();
  }
  onFocus() {
    // when element is focused by keyboard
    this.tooltipContent = 'offerEnter';
  }
  resetTooltip() {
    this.tooltipContent = 'offerClick';
  }
  onCopyToClipboard() {
    const copyText = this.root.innerText;
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
      this.tooltipContent = 'success';
    })
      .catch(() => {
      this.tooltipContent = 'error';
    });
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("button", { onClick: this.onCopyToClipboard.bind(this), class: "gux-copy-to-clipboard-wrapper", title: this.i18n('copyToClipboard') }, h("div", { class: "gux-copy-content" }, h("slot", { name: "content" }), h("gux-icon", { "icon-name": "copy", decorative: true })), h("gux-tooltip", { placement: "bottom-end" }, this.tooltipContent === 'success' ? (h("gux-icon", { "icon-name": "badge-check", decorative: true })) : (''), this.tooltipContent === 'error' ? (h("gux-icon", { "icon-name": "badge-x", decorative: true })) : (''), this.tooltipContent === 'offerClick' ? this.i18n('clickToCopy') : '', this.tooltipContent === 'offerEnter' ? this.i18n('enterToCopy') : '', this.tooltipContent === 'success' ? this.i18n('copySuccess') : '', this.tooltipContent === 'error' ? this.i18n('copyFailure') : '')));
  }
  get root() { return getElement(this); }
};
GuxCopyToClipboard.style = guxCopyToClipboardCss;

export { GuxCopyToClipboard as gux_copy_to_clipboard_beta };
