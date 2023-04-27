'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxTextLabelCss = "gux-text-label-legacy .gux-label{margin-right:8px}gux-text-label-legacy .gux-text-label-container.gux-beside{display:flex;flex-direction:row;align-items:baseline}gux-text-label-legacy .gux-text-label-container.gux-beside .gux-labeled-component{flex:1 1 auto}.gux-text-label-dark-theme{color:#fdfdfd}.gux-dark-theme gux-text-label-legacy{color:#fdfdfd}gux-text-label-legacy.gux-dark-theme{color:#fdfdfd}.gux-text-label-light-theme{color:#2e394c}.gux-light-theme gux-text-label-legacy{color:#2e394c}gux-text-label-legacy.gux-light-theme{color:#2e394c}gux-text-label-legacy{color:#2e394c}";

let nextLabelId = 1;
const GuxTextLabelLegacy = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.label = undefined;
    this.position = 'above';
    this.id = this.generateId();
  }
  componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.position });
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
    return (index.h("div", { class: `gux-text-label-container gux-${this.position}` }, index.h("label", { class: "gux-label", id: this.id }, index.h("slot", { name: "label" }, this.label)), index.h("div", { class: "gux-labeled-component", ref: el => (this.labeledComponent = el) }, index.h("slot", null))));
  }
  generateId() {
    return 'gux-text-label-' + nextLabelId++;
  }
  get root() { return index.getElement(this); }
};
GuxTextLabelLegacy.style = guxTextLabelCss;

exports.gux_text_label_legacy = GuxTextLabelLegacy;
