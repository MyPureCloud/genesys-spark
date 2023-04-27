'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');

const guxAccordionCss = "gux-accordion{-custom-noop:noop}";

const GuxAccordion = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    usage.trackComponent(this.root);
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
    return (index.h("slot", null));
  }
  get root() { return index.getElement(this); }
};
GuxAccordion.style = guxAccordionCss;

exports.gux_accordion = GuxAccordion;
