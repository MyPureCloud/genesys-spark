import { h } from '@stencil/core';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { logError } from '@utils/error/log-error';
/**
 * @slot header - Required slot for the heading
 * @slot subheader - Optional slot for a subheader
 * * @slot icon - Optional slot for an icon
 */
export class GuxAccordionSection {
  constructor() {
    this.sectionId = randomHTMLId('gux-accordion-section');
    this.arrowPosition = 'default';
    this.contentLayout = 'text';
    this.open = false;
    this.disabled = false;
    this.reverseHeadings = false;
  }
  watchOpen(open) {
    if (open) {
      this.internalsectionopened.emit();
    }
  }
  toggle() {
    this.open = !this.open;
  }
  isArrowPositionBeforeText() {
    return this.arrowPosition === 'before-text';
  }
  // arrow position 'beside-text' will be removed in v4 (COMUI-1128)
  isArrowPositionedBesideText() {
    return this.arrowPosition === 'beside-text';
  }
  handleSlotChange(slotname) {
    const slot = this.root.querySelector(`[slot="${slotname}"]`);
    if (!slot || !/^H[1-6]$/.test(slot.nodeName)) {
      logError('gux-accordion-section', `For accessibility reasons the ${slotname} slot should be filled with a HTML heading tag (h1 - h6).`);
    }
  }
  componentWillLoad() {
    this.hasIconSlot = !!this.root.querySelector('[slot="icon"]');
  }
  render() {
    return (h("section", { class: { 'gux-disabled': this.disabled } }, h("button", { class: {
        'gux-header': true,
        'gux-reverse-headings': this.reverseHeadings
      }, "aria-expanded": this.open.toString(), "aria-controls": this.sectionId, disabled: this.disabled, onClick: this.toggle.bind(this) }, this.hasIconSlot && h("slot", { name: "icon" }), h("div", { class: {
        'gux-header-text': true,
        'gux-arrow-position-beside': this.isArrowPositionedBesideText()
      } }, h("slot", { onSlotchange: () => this.handleSlotChange('header'), name: "header" }), h("slot", { onSlotchange: () => this.handleSlotChange('subheader'), name: "subheader" })), h("div", { class: {
        'gux-header-icon': true,
        'gux-expanded': this.open,
        'gux-arrow-position-before-text': this.isArrowPositionBeforeText()
      } }, h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" }))), h("div", { id: this.sectionId, class: {
        'gux-content': true,
        'gux-expanded': this.open,
        'gux-text-content-layout': this.contentLayout === 'text'
      } }, h("slot", { name: "content" }))));
  }
  static get is() { return "gux-accordion-section"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-accordion-section.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-accordion-section.css"]
    };
  }
  static get properties() {
    return {
      "arrowPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxAccordionSectionArrowPosition",
          "resolved": "\"before-text\" | \"beside-text\" | \"default\"",
          "references": {
            "GuxAccordionSectionArrowPosition": {
              "location": "import",
              "path": "./gux-accordion-section.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Position of the arrow chevron icon. Position can be 'default' or 'before-text'.  'beside-text' is deprecated and will be removed in v4."
        },
        "attribute": "arrow-position",
        "reflect": false,
        "defaultValue": "'default'"
      },
      "contentLayout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxAccordionSectionContentLayout",
          "resolved": "\"custom\" | \"text\"",
          "references": {
            "GuxAccordionSectionContentLayout": {
              "location": "import",
              "path": "./gux-accordion-section.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The content layout used in the accordion section. 'text' layout provides default padding, 'custom' removes default padding."
        },
        "attribute": "content-layout",
        "reflect": false,
        "defaultValue": "'text'"
      },
      "open": {
        "type": "boolean",
        "mutable": true,
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
        "attribute": "open",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
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
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "reverseHeadings": {
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
        "attribute": "reverse-headings",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "internalsectionopened",
        "name": "internalsectionopened",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "open",
        "methodName": "watchOpen"
      }];
  }
}
