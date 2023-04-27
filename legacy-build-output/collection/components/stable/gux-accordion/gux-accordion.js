import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot - collection of gux-accordion-section elements
 */
export class GuxAccordion {
  constructor() {
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
  static get is() { return "gux-accordion"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-accordion.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-accordion.css"]
    };
  }
  static get properties() {
    return {
      "singleOpenSection": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "single-open-section",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "internalsectionopened",
        "method": "handleInternalsectionopened",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
