import { r as registerInstance, h, H as Host, g as getElement } from './index-816e34d8.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';

const guxOptionIconCss = "gux-option-icon{box-sizing:border-box;display:flex;min-height:32px;padding:6px 8px;color:#2e394c;word-wrap:break-word;cursor:pointer;align-items:flex-start}gux-option-icon.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-option-icon.gux-selected{background:#deeaff}gux-option-icon.gux-active,gux-option-icon.gux-hovered:not(:disabled){color:#fdfdfd;background:#2a60c8}gux-option-icon.gux-filtered{display:none}gux-option-icon gux-icon{flex-shrink:0;width:16px;height:16px;margin-block-start:calc((20px - 16px) / 2);margin-inline-end:8px}";

const GuxOptionIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.root.id = this.root.id || randomHTMLId('gux-option-icon');
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
    return (h(Host, { role: "option", class: {
        'gux-active': this.active,
        'gux-disabled': this.disabled,
        'gux-filtered': this.filtered,
        'gux-hovered': this.hovered,
        'gux-selected': this.selected
      }, "aria-selected": this.getAriaSelected(), "aria-disabled": this.disabled.toString() }, h("gux-icon", { decorative: this.iconSrText == null, "screenreader-text": this.iconSrText, "icon-name": this.iconName, style: iconStyle }), h("slot", null)));
  }
  get root() { return getElement(this); }
};
GuxOptionIcon.style = guxOptionIconCss;

export { GuxOptionIcon as gux_option_icon };
