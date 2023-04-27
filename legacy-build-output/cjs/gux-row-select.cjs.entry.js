'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const en = require('./en-dc1f49b7.js');
require('./get-closest-element-ab4b2eee.js');

const guxRowSelectCss = "gux-row-select .gux-label-text{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxRowSelect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internalrowselectchange = index.createEvent(this, "internalrowselectchange", 7);
    this.id = randomHtmlId.randomHTMLId('gux-row-select');
    this.selected = false;
    this.disabled = undefined;
  }
  onCheck(event) {
    event.stopPropagation();
    const input = event.target;
    this.selected = input.checked;
    this.internalrowselectchange.emit();
  }
  async componentWillLoad() {
    this.i18n = await index$1.buildI18nForComponent(this.root, en.tableResources, 'gux-table');
  }
  render() {
    return (index.h("gux-form-field-checkbox", null, index.h("input", { slot: "input", id: this.id, type: "checkbox", checked: this.selected, disabled: this.disabled }), index.h("label", { slot: "label", htmlFor: this.id }, "\u200B", index.h("span", { class: "gux-label-text" }, this.i18n('selectTableRow')))));
  }
  get root() { return index.getElement(this); }
};
GuxRowSelect.style = guxRowSelectCss;

exports.gux_row_select = GuxRowSelect;
