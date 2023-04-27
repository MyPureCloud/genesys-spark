import { r as registerInstance, c as createEvent, h, g as getElement } from './index-816e34d8.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { t as tableResources } from './en-66f138f8.js';
import './get-closest-element-1597503c.js';

const guxRowSelectCss = "gux-row-select .gux-label-text{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxRowSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internalrowselectchange = createEvent(this, "internalrowselectchange", 7);
    this.id = randomHTMLId('gux-row-select');
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
    this.i18n = await buildI18nForComponent(this.root, tableResources, 'gux-table');
  }
  render() {
    return (h("gux-form-field-checkbox", null, h("input", { slot: "input", id: this.id, type: "checkbox", checked: this.selected, disabled: this.disabled }), h("label", { slot: "label", htmlFor: this.id }, "\u200B", h("span", { class: "gux-label-text" }, this.i18n('selectTableRow')))));
  }
  get root() { return getElement(this); }
};
GuxRowSelect.style = guxRowSelectCss;

export { GuxRowSelect as gux_row_select };
