import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../i18n';
import translationResources from './i18n/en.json';
/**
 * @slot content - Slot for content
 */
export class GuxCopyToClipboard {
  constructor() {
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
      return (h("gux-icon", { "icon-name": iconName, decorative: true }));
    }
  }
  renderTooltip() {
    return (h("gux-tooltip", { placement: "bottom-end" }, h("div", { class: "gux-tooltip-content" }, this.renderTooltipIcon(), h("span", null, this.i18n(this.tooltipContent)))));
  }
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("button", { class: "gux-copy-to-clipboard-wrapper", ref: el => (this.copyButton = el), onClick: this.onCopyToClipboard.bind(this) }, h("div", { class: "gux-copy-content" }, h("slot", { name: "content" }), h("gux-icon", { "icon-name": "copy", decorative: true })), this.renderTooltip()));
  }
  static get is() { return "gux-copy-to-clipboard-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-copy-to-clipboard.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-copy-to-clipboard.css"]
    };
  }
  static get states() {
    return {
      "tooltipContent": {}
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "mouseleave",
        "method": "onMouseleave",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "focusout",
        "method": "onFocusout",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focus",
        "method": "onFocus",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
