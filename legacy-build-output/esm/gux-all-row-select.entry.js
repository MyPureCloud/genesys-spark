import { r as registerInstance, c as createEvent, h, g as getElement } from './index-816e34d8.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { t as tableResources } from './en-66f138f8.js';
import './get-closest-element-1597503c.js';

const guxAllRowSelectCss = "gux-all-row-select .gux-label-text{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxAllRowSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internalallrowselectchange = createEvent(this, "internalallrowselectchange", 7);
    this.id = randomHTMLId('gux-all-row-select');
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
    this.i18n = await buildI18nForComponent(this.root, tableResources, 'gux-table');
  }
  render() {
    return (h("gux-form-field-checkbox", null, h("input", { ref: el => (this.inputElement = el), slot: "input", id: this.id, type: "checkbox", checked: this.selected }), h("label", { slot: "label", htmlFor: this.id }, "\u200B", h("span", { class: "gux-label-text" }, this.i18n('selectAllTableRows')))));
  }
  get root() { return getElement(this); }
};
GuxAllRowSelect.style = guxAllRowSelectCss;

export { GuxAllRowSelect as gux_all_row_select };
