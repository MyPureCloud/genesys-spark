'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');

const guxOptionIconCss = "gux-option-icon{box-sizing:border-box;display:flex;min-height:32px;padding:6px 8px;color:#2e394c;word-wrap:break-word;cursor:pointer;align-items:flex-start}gux-option-icon.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-option-icon.gux-selected{background:#deeaff}gux-option-icon.gux-active,gux-option-icon.gux-hovered:not(:disabled){color:#fdfdfd;background:#2a60c8}gux-option-icon.gux-filtered{display:none}gux-option-icon gux-icon{flex-shrink:0;width:16px;height:16px;margin-block-start:calc((20px - 16px) / 2);margin-inline-end:8px}";

const GuxOptionIcon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = undefined;
    this.iconName = undefined;
    this.iconSrText = undefined;
    this.iconColor = undefined;
    this.active = false;
    this.selected = false;
    this.disabled = false;
    this.filtered = false;
    this.hovered = false;
  }
  onmouseenter() {
    this.hovered = true;
  }
  onMouseleave() {
    this.hovered = false;
  }
  componentWillLoad() {
    this.root.id = this.root.id || randomHtmlId.randomHTMLId('gux-option-icon');
  }
  getAriaSelected() {
    if (this.disabled) {
      return false;
    }
    return this.selected ? 'true' : 'false';
  }
  render() {
    let iconStyle = null;
    // If the icon color is set and we don't have a background highlight that
    // might cause contrast problems, set the color style.
    if (this.iconColor !== null && !(this.hovered || this.active)) {
      iconStyle = { color: this.iconColor };
    }
    return (index.h(index.Host, { role: "option", class: {
        'gux-active': this.active,
        'gux-disabled': this.disabled,
        'gux-filtered': this.filtered,
        'gux-hovered': this.hovered,
        'gux-selected': this.selected
      }, "aria-selected": this.getAriaSelected(), "aria-disabled": this.disabled.toString() }, index.h("gux-icon", { decorative: this.iconSrText == null, "screenreader-text": this.iconSrText, "icon-name": this.iconName, style: iconStyle }), index.h("slot", null)));
  }
  get root() { return index.getElement(this); }
};
GuxOptionIcon.style = guxOptionIconCss;

exports.gux_option_icon = GuxOptionIcon;
