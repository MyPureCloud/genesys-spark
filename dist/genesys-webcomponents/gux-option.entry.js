import { r as registerInstance, h, j as Host, g as getElement } from './index-f583fcde.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';

const guxOptionCss = "gux-option{box-sizing:border-box;display:flex;min-height:32px;padding:8px 16px;color:#2e394c;word-wrap:break-word;cursor:pointer}gux-option.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-option.gux-selected{background:#deeaff}gux-option.gux-active,gux-option.gux-hovered:not(:disabled){color:#fdfdfd;background:#2a60c8}gux-option.gux-filtered{display:none}";

const GuxOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
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
    this.root.id = this.root.id || randomHTMLId('gux-option');
  }
  getAriaSelected() {
    if (this.disabled) {
      return false;
    }
    return this.selected ? 'true' : 'false';
  }
  render() {
    return (h(Host, { role: "option", class: {
        'gux-active': this.active,
        'gux-disabled': this.disabled,
        'gux-filtered': this.filtered,
        'gux-hovered': this.hovered,
        'gux-selected': this.selected
      }, "aria-selected": this.getAriaSelected(), "aria-disabled": this.disabled.toString() }, h("slot", null)));
  }
  get root() { return getElement(this); }
};
GuxOption.style = guxOptionCss;

export { GuxOption as gux_option };
