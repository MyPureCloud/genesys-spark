import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { a as onDisabledChange } from './on-attribute-change-5fd8da7c.js';
import './get-closest-element-1597503c.js';

const required = "Required";
const colorInputResources = {
	required: required
};

const guxInputColorCss = "gux-input-color{color:#2e394c}gux-input-color>section{position:relative;display:inline-block;width:160px}gux-input-color>gux-input-color-option{display:none}gux-input-color .gux-input-color-main-element{box-sizing:border-box;width:100%;padding:0;margin:0;cursor:pointer;user-select:none;background-color:#f6f7f9;border:1px solid #b4bccb;border-radius:4px;outline:none;box-shadow:0 0 0 0 transparent;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);transition:box-shadow 0.2s}gux-input-color .gux-input-color-main-element:focus,gux-input-color .gux-input-color-main-element.gux-opened{border-color:#2a60c8;outline:none;box-shadow:0 0 4px rgba(117, 168, 255, 0.5)}gux-input-color .gux-input-color-main-element:disabled{pointer-events:none;cursor:default;opacity:0.5}gux-input-color .gux-input-color-main-element:hover gux-icon,gux-input-color .gux-input-color-main-element:focus gux-icon{color:#2e394c}gux-input-color .gux-input-color-selected-color{float:left;padding:8px;margin:8px 12px}gux-input-color .gux-input-color-color-name{float:left;margin:9px 0;font-size:12px}gux-input-color .gux-input-color-color-select{position:absolute;top:100%;left:0;z-index:var(--gux-zindex-popup, 1);display:none;width:100%}gux-input-color .gux-input-color-color-select.gux-opened{display:inherit}gux-input-color gux-icon{position:absolute;top:0;right:0;display:flex;align-items:center;width:16px;height:100%;padding:0 7px;overflow:hidden;color:#596373;pointer-events:none;cursor:pointer;background:none;border:none;outline:none}gux-input-color .gux-hidden{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxInputColor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.requiredId = randomHTMLId('gux-input-color-required');
    this.guxLabelDescribedby = undefined;
    this.guxErrorDescribedby = undefined;
    this.guxRequired = undefined;
    this.disabled = undefined;
    this.color = undefined;
    this.opened = undefined;
    this.colorOnOpen = undefined;
  }
  onClick(e) {
    const element = e.target;
    if (!this.root.contains(element)) {
      this.setOpened(false);
    }
  }
  onInput(e) {
    const input = e.target;
    this.color = input.value;
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, colorInputResources);
    this.input = this.root.querySelector('input[slot="input"]');
    this.input.addEventListener('change', (e) => {
      if (this.opened) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
      }
    });
    this.disabledObserver = onDisabledChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    this.disabled = this.input.disabled;
    this.color = this.input.value;
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (h("section", null, h("span", { class: "gux-hidden", id: this.requiredId }, this.i18n('required')), h("button", { "aria-describedby": `${this.guxLabelDescribedby} ${this.guxRequired ? this.requiredId : ''} ${this.guxErrorDescribedby}`, "aria-expanded": this.opened ? 'true' : 'false', type: "button", class: {
        'gux-input-color-main-element': true,
        'gux-opened': this.opened
      }, disabled: this.disabled, onClick: this.clickHandler.bind(this) }, h("div", { class: "gux-input-color-selected-color", style: { background: this.color } }), h("div", { class: "gux-input-color-color-name" }, this.color), h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })), h("gux-color-select", { class: {
        'gux-input-color-color-select': true,
        'gux-opened': this.opened
      } }, h("slot", { name: "input", slot: "input" }))));
  }
  setOpened(opened) {
    if (this.colorOnOpen && this.colorOnOpen !== this.color) {
      this.colorOnOpen = this.color;
      this.input.dispatchEvent(new Event('change', {
        bubbles: true
      }));
    }
    this.colorOnOpen = this.color;
    this.opened = opened;
  }
  clickHandler() {
    if (!this.disabled) {
      this.setOpened(!this.opened);
    }
  }
  get root() { return getElement(this); }
};
GuxInputColor.style = guxInputColorCss;

export { GuxInputColor as gux_input_color };
