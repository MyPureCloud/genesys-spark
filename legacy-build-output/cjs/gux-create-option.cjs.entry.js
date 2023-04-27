'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const index$1 = require('./index-c4441830.js');
require('./get-closest-element-ab4b2eee.js');

const createCustomOptionInstructions = ", select to create a new custom option";
const createOption = "Add \"{optionValue}\"";
const translationResources = {
	createCustomOptionInstructions: createCustomOptionInstructions,
	createOption: createOption
};

const guxCreateOptionCss = "gux-create-option{font-family:Roboto, sans-serif;font-weight:400;font-weight:700;box-sizing:border-box;display:flex;min-height:32px;padding:6px 12px;color:#2e394c;word-wrap:break-word;cursor:pointer}gux-create-option.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-create-option.gux-active,gux-create-option.gux-hovered:not([disabled]){color:#fdfdfd;background:#2a60c8}gux-create-option.gux-filtered{display:none}gux-create-option gux-icon{width:16px;height:100%;padding-right:10px}gux-create-option .gux-option{display:inline-flex}gux-create-option .gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxCreateOption = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internalcreatenewoption = index.createEvent(this, "internalcreatenewoption", 7);
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
    this.i18n = await index$1.buildI18nForComponent(this.root, translationResources);
    this.root.id = this.root.id || randomHtmlId.randomHTMLId('gux-option-multi');
  }
  renderCustomOptionInstructions() {
    return (index.h("span", { class: "gux-screenreader" }, this.i18n('createCustomOptionInstructions')));
  }
  render() {
    return (index.h(index.Host, { role: "option", "aria-selected": false, class: {
        'gux-active': this.active,
        'gux-hovered': this.hovered,
        'gux-filtered': this.filtered
      } }, index.h("div", { class: "gux-option" }, index.h("gux-icon", { decorative: true, iconName: "add" }), index.h("div", { class: "gux-create-text" }, this.i18n('createOption', {
      optionValue: this.value
    })), this.renderCustomOptionInstructions())));
  }
  get root() { return index.getElement(this); }
};
GuxCreateOption.style = guxCreateOptionCss;

exports.gux_create_option = GuxCreateOption;
