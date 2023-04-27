import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { getSections, modifyClassList, onKeyboardNavigation } from './gux-accordion.service';
export class GuxAccordionLegacy {
  constructor() {
    this.sections = [];
    this.headingLevel = null;
    this.arrowPosition = 'default';
  }
  /**
   * Opens a section.
   * @param slotName The slot name
   */
  async open(slotName) {
    modifyClassList(slotName, 'add', this.sections);
  }
  /**
   * Closes a section.
   * @param slotName The slot name
   */
  async close(slotName) {
    modifyClassList(slotName, 'remove', this.sections);
  }
  /**
   * Toggles a section.
   * @param slotName The slot name
   */
  async toggle(slotName) {
    modifyClassList(slotName, 'toggle', this.sections);
  }
  componentWillLoad() {
    trackComponent(this.root);
    this.sections = getSections(this.root);
  }
  render() {
    return (h("div", { class: "gux-accordion" }, this.sections.map(section => (h("section", { class: "gux-section", onKeyDown: event => onKeyboardNavigation(event, section.slotName, this.sections), ref: el => (section.ref = el) }, h("div", { "aria-role": "heading", "aria-level": this.headingLevel, class: "gux-header" }, h("button", { class: "gux-header-button", type: "button", onClick: () => this.toggle(section.slotName) }, h("div", { class: "gux-text" }, section.slotName), this.arrowPosition === 'beside-text' ? null : (h("div", { class: "gux-spacer" })), h("div", { class: "gux-toggle-arrow" }, h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })))), h("div", { class: "gux-content" }, h("slot", { name: section.slotName })))))));
  }
  static get is() { return "gux-accordion-legacy"; }
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
      "headingLevel": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The heading level within the page the\naccordion section headers should be set to.\nheading-level=\"3\" woudl be equivalent to an\nh3 element."
        },
        "attribute": "heading-level",
        "reflect": false,
        "defaultValue": "null"
      },
      "arrowPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxAccordionLegacyArrowPosition",
          "resolved": "\"beside-text\" | \"default\"",
          "references": {
            "GuxAccordionLegacyArrowPosition": {
              "location": "import",
              "path": "./gux-accordion.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "arrow-position",
        "reflect": false,
        "defaultValue": "'default'"
      }
    };
  }
  static get states() {
    return {
      "sections": {}
    };
  }
  static get methods() {
    return {
      "open": {
        "complexType": {
          "signature": "(slotName: string) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "slotName The slot name"
                }],
              "text": "The slot name"
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Opens a section.",
          "tags": [{
              "name": "param",
              "text": "slotName The slot name"
            }]
        }
      },
      "close": {
        "complexType": {
          "signature": "(slotName: string) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "slotName The slot name"
                }],
              "text": "The slot name"
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Closes a section.",
          "tags": [{
              "name": "param",
              "text": "slotName The slot name"
            }]
        }
      },
      "toggle": {
        "complexType": {
          "signature": "(slotName: string) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "slotName The slot name"
                }],
              "text": "The slot name"
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Toggles a section.",
          "tags": [{
              "name": "param",
              "text": "slotName The slot name"
            }]
        }
      }
    };
  }
  static get elementRef() { return "root"; }
}
