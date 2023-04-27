import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-816e34d8.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import './get-closest-element-1597503c.js';

const createCustomOptionInstructions = ", select to create a new custom option";
const createOption = "Add \"{optionValue}\"";
const translationResources = {
	createCustomOptionInstructions: createCustomOptionInstructions,
	createOption: createOption
};

const guxCreateOptionCss = "gux-create-option{font-family:Roboto, sans-serif;font-weight:400;font-weight:700;box-sizing:border-box;display:flex;min-height:32px;padding:6px 12px;color:#2e394c;word-wrap:break-word;cursor:pointer}gux-create-option.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-create-option.gux-active,gux-create-option.gux-hovered:not([disabled]){color:#fdfdfd;background:#2a60c8}gux-create-option.gux-filtered{display:none}gux-create-option gux-icon{width:16px;height:100%;padding-right:10px}gux-create-option .gux-option{display:inline-flex}gux-create-option .gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxCreateOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internalcreatenewoption = createEvent(this, "internalcreatenewoption", 7);
    this.value = undefined;
    this.active = false;
    this.hidden = true;
    this.filtered = true;
    this.hovered = false;
  }
  onmouseenter() {
    this.hovered = true;
  }
  onMouseleave() {
    this.hovered = false;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxEmitInternalCreateNewOption() {
    this.internalcreatenewoption.emit();
  }
  handleClick() {
    this.internalcreatenewoption.emit(this.value);
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.root.id = this.root.id || randomHTMLId('gux-option-multi');
  }
  renderCustomOptionInstructions() {
    return (h("span", { class: "gux-screenreader" }, this.i18n('createCustomOptionInstructions')));
  }
  render() {
    return (h(Host, { role: "option", "aria-selected": false, class: {
        'gux-active': this.active,
        'gux-hovered': this.hovered,
        'gux-filtered': this.filtered
      } }, h("div", { class: "gux-option" }, h("gux-icon", { decorative: true, iconName: "add" }), h("div", { class: "gux-create-text" }, this.i18n('createOption', {
      optionValue: this.value
    })), this.renderCustomOptionInstructions())));
  }
  get root() { return getElement(this); }
};
GuxCreateOption.style = guxCreateOptionCss;

export { GuxCreateOption as gux_create_option };
