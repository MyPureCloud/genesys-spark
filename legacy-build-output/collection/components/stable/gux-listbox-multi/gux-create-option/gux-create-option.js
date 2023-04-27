import { h, Host } from '@stencil/core';
import { randomHTMLId } from '../../../../utils/dom/random-html-id';
import { buildI18nForComponent } from '../../../../i18n';
import translationResources from './i18n/en.json';
export class GuxCreateOption {
  constructor() {
    this.value = undefined;
    this.active = false;
    this.hidden = true;
    this.filtered = true;
    this.hovered = false;
  }
  onmouseenter() {
    this.hovered = true;
  }
  onMouseleave() {
    this.hovered = false;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxEmitInternalCreateNewOption() {
    this.internalcreatenewoption.emit();
  }
  handleClick() {
    this.internalcreatenewoption.emit(this.value);
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.root.id = this.root.id || randomHTMLId('gux-option-multi');
  }
  renderCustomOptionInstructions() {
    return (h("span", { class: "gux-screenreader" }, this.i18n('createCustomOptionInstructions')));
  }
  render() {
    return (h(Host, { role: "option", "aria-selected": false, class: {
        'gux-active': this.active,
        'gux-hovered': this.hovered,
        'gux-filtered': this.filtered
      } }, h("div", { class: "gux-option" }, h("gux-icon", { decorative: true, iconName: "add" }), h("div", { class: "gux-create-text" }, this.i18n('createOption', {
      optionValue: this.value
    })), this.renderCustomOptionInstructions())));
  }
  static get is() { return "gux-create-option"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-create-option.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-create-option.css"]
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
      "hidden": {
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
        "attribute": "hidden",
        "reflect": false,
        "defaultValue": "true"
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
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "hovered": {}
    };
  }
  static get events() {
    return [{
        "method": "internalcreatenewoption",
        "name": "internalcreatenewoption",
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
  static get methods() {
    return {
      "guxEmitInternalCreateNewOption": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
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
      }, {
        "name": "click",
        "method": "handleClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
