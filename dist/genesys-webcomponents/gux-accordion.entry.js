import { r as registerInstance, h, g as getElement } from './index-f583fcde.js';
import { t as trackComponent } from './usage-5b6f0d25.js';

const guxAccordionCss = "gux-accordion{-custom-noop:noop}";

const GuxAccordion = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.singleOpenSection = false;
  }
  handleInternalsectionopened(event) {
    event.stopImmediatePropagation();
    if (this.singleOpenSection) {
      this.getAccordionSections().forEach(section => {
        if (section !== event.target) {
          this.closeSection(section);
        }
      });
    }
  }
  componentWillLoad() {
    if (this.singleOpenSection) {
      this.getAccordionSections().reduceRight((openFound, section) => {
        if (openFound) {
          this.closeSection(section);
        }
        return openFound || section.open;
      }, false);
    }
    trackComponent(this.root);
  }
  getAccordionSections() {
    return Array.from(this.root.children);
  }
  closeSection(section) {
    if (!section.disabled) {
      section.open = false;
    }
  }
  render() {
    return (h("slot", null));
  }
  get root() { return getElement(this); }
};
GuxAccordion.style = guxAccordionCss;

export { GuxAccordion as gux_accordion };
