import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const guxTextLabelCss = "gux-text-label-legacy .gux-label{margin-right:8px}gux-text-label-legacy .gux-text-label-container.gux-beside{display:flex;flex-direction:row;align-items:baseline}gux-text-label-legacy .gux-text-label-container.gux-beside .gux-labeled-component{flex:1 1 auto}.gux-text-label-dark-theme{color:#fdfdfd}.gux-dark-theme gux-text-label-legacy{color:#fdfdfd}gux-text-label-legacy.gux-dark-theme{color:#fdfdfd}.gux-text-label-light-theme{color:#2e394c}.gux-light-theme gux-text-label-legacy{color:#2e394c}gux-text-label-legacy.gux-light-theme{color:#2e394c}gux-text-label-legacy{color:#2e394c}";

let nextLabelId = 1;
const GuxTextLabelLegacy = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = undefined;
    this.position = 'above';
    this.id = this.generateId();
  }
  componentWillLoad() {
    trackComponent(this.root, { variant: this.position });
  }
  componentDidLoad() {
    const labeledComponentSlot = this.labeledComponent.querySelector('*');
    if (typeof labeledComponentSlot.componentOnReady !== 'function' ||
      typeof labeledComponentSlot.setLabelledBy !== 'function') {
      // Only set labeled by if its supported by the contained element.
      labeledComponentSlot.setAttribute('aria-labelledby', this.id);
      return;
    }
    labeledComponentSlot.componentOnReady().then(() => {
      labeledComponentSlot.setLabelledBy(this.id);
    });
  }
  render() {
    return (h("div", { class: `gux-text-label-container gux-${this.position}` }, h("label", { class: "gux-label", id: this.id }, h("slot", { name: "label" }, this.label)), h("div", { class: "gux-labeled-component", ref: el => (this.labeledComponent = el) }, h("slot", null))));
  }
  generateId() {
    return 'gux-text-label-' + nextLabelId++;
  }
  get root() { return getElement(this); }
};
GuxTextLabelLegacy.style = guxTextLabelCss;

export { GuxTextLabelLegacy as gux_text_label_legacy };
