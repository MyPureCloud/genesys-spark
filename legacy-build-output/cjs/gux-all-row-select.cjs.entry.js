'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const index$1 = require('./index-c4441830.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const en = require('./en-dc1f49b7.js');
require('./get-closest-element-ab4b2eee.js');

const guxAllRowSelectCss = "gux-all-row-select .gux-label-text{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxAllRowSelect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internalallrowselectchange = index.createEvent(this, "internalallrowselectchange", 7);
    this.id = randomHtmlId.randomHTMLId('gux-all-row-select');
    this.selected = false;
  }
  onCheck(event) {
    event.stopPropagation();
    const input = event.target;
    this.selected = input.checked;
    this.internalallrowselectchange.emit();
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async setIndeterminate(indeterminate = true) {
    this.inputElement.indeterminate = indeterminate;
  }
  async componentWillLoad() {
    this.i18n = await index$1.buildI18nForComponent(this.root, en.tableResources, 'gux-table');
  }
  render() {
    return (index.h("gux-form-field-checkbox", null, index.h("input", { ref: el => (this.inputElement = el), slot: "input", id: this.id, type: "checkbox", checked: this.selected }), index.h("label", { slot: "label", htmlFor: this.id }, "\u200B", index.h("span", { class: "gux-label-text" }, this.i18n('selectAllTableRows')))));
  }
  get root() { return index.getElement(this); }
};
GuxAllRowSelect.style = guxAllRowSelectCss;

exports.gux_all_row_select = GuxAllRowSelect;
