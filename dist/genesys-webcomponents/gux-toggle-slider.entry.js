import { r as registerInstance, h } from './index-f583fcde.js';

const guxToggleSliderCss = "gux-toggle-slider{padding:2px;outline:none}gux-toggle-slider .gux-toggle-slider{position:relative;display:inline-block;flex:0 1 auto;align-self:auto;order:0;width:30px;height:16px;border-radius:8px}gux-toggle-slider .gux-toggle-slider.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-toggle-slider .gux-toggle-slider:focus{outline:none;outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}gux-toggle-slider .gux-toggle-slider .gux-slider{position:absolute;top:0;right:0;bottom:0;left:0;background-color:#6b7585;border-radius:8px;transition:background-color 0.5s ease}gux-toggle-slider .gux-toggle-slider .gux-slider .gux-switch{position:absolute;bottom:1px;left:1px;width:14px;height:14px;content:'';background-color:#fdfdfd;border-radius:50%;transition:0.5s}gux-toggle-slider .gux-toggle-slider .gux-slider .gux-switch gux-icon{position:absolute;top:0;right:0;bottom:0;left:0;width:12px;height:12px;padding:1px;color:#fdfdfd;opacity:0;transition:color 0.5s linear}gux-toggle-slider .gux-toggle-slider.gux-checked .gux-slider{background-color:#2a60c8}gux-toggle-slider .gux-toggle-slider.gux-checked .gux-slider .gux-switch{transform:translateX(14px)}gux-toggle-slider .gux-toggle-slider.gux-checked .gux-slider .gux-switch gux-icon{color:#2a60c8;opacity:1;transition:opacity 0.25s linear;transition-delay:0.25s}";

const GuxToggleSlider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.checked = false;
    this.disabled = false;
    this.guxAriaLabel = '';
    this.labelId = '';
    this.errorId = '';
  }
  componentDidLoad() {
    var _a, _b, _c;
    if (this.labelId) {
      (_a = this.checkboxElement) === null || _a === void 0 ? void 0 : _a.setAttribute('aria-labelledby', this.labelId);
    }
    else {
      (_b = this.checkboxElement) === null || _b === void 0 ? void 0 : _b.setAttribute('aria-label', this.guxAriaLabel);
    }
    if (this.errorId) {
      (_c = this.checkboxElement) === null || _c === void 0 ? void 0 : _c.setAttribute('aria-describedby', this.errorId);
    }
  }
  render() {
    return (h("div", { class: {
        'gux-toggle-slider': true,
        'gux-checked': this.checked,
        'gux-disabled': this.disabled
      }, role: "checkbox", "aria-checked": this.checked.toString(), "aria-disabled": this.disabled.toString(), tabindex: this.disabled ? '' : '0', ref: el => (this.checkboxElement = el) }, h("div", { class: "gux-slider" }, h("div", { class: "gux-switch" }, h("gux-icon", { "icon-name": "checkmark", decorative: true })))));
  }
};
GuxToggleSlider.style = guxToggleSliderCss;

export { GuxToggleSlider as gux_toggle_slider };
