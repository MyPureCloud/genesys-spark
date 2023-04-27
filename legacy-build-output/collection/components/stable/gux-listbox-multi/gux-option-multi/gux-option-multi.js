import { h, Host } from '@stencil/core';
import { randomHTMLId } from '../../../../utils/dom/random-html-id';
import { buildI18nForComponent } from '../../../../i18n';
import translationResources from './i18n/en.json';
/**
 * @slot - text
 */
export class GuxOptionMulti {
  constructor() {
    this.value = undefined;
    this.active = false;
    this.selected = false;
    this.disabled = false;
    this.filtered = false;
    this.hovered = false;
    this.custom = false;
  }
  onmouseenter() {
    this.hovered = true;
  }
  onMouseleave() {
    this.hovered = false;
  }
  emitRemoveCustomOption() {
    if (!this.selected && this.custom) {
      this.guxremovecustomoption.emit();
    }
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.root.id = this.root.id || randomHTMLId('gux-option-multi');
    if (this.custom) {
      this.internalselectcustomoption.emit(this.value);
    }
  }
  renderCustomOptionInstructions() {
    if (this.custom) {
      return (h("span", { class: "gux-screenreader" }, this.i18n('removeCustomElementInstructions')));
    }
  }
  render() {
    return (h(Host, { role: "option", class: {
        'gux-active': this.active,
        'gux-disabled': this.disabled,
        'gux-filtered': this.filtered,
        'gux-hovered': this.hovered,
        'gux-selected': this.selected
      }, "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString() }, h("div", { "gux-slot-container": true, class: "gux-option" }, h("slot", null)), this.renderCustomOptionInstructions()));
  }
  static get is() { return "gux-option-multi"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-option-multi.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-option-multi.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "value",
        "reflect": false
      },
      "active": {
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
        "attribute": "active",
        "reflect": false,
        "defaultValue": "false"
      },
      "selected": {
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
        "attribute": "selected",
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
      "filtered": {
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
        "attribute": "filtered",
        "reflect": false,
        "defaultValue": "false"
      },
      "hovered": {
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
        "attribute": "hovered",
        "reflect": false,
        "defaultValue": "false"
      },
      "custom": {
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
        "attribute": "custom",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "guxremovecustomoption",
        "name": "guxremovecustomoption",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "internalselectcustomoption",
        "name": "internalselectcustomoption",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "selected",
        "methodName": "emitRemoveCustomOption"
      }];
  }
  static get listeners() {
    return [{
        "name": "mouseenter",
        "method": "onmouseenter",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "mouseleave",
        "method": "onMouseleave",
        "target": undefined,
        "capture": false,
        "passive": true
      }];
  }
}
