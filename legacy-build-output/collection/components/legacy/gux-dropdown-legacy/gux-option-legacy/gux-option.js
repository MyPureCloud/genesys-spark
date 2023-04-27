import { h } from '@stencil/core';
export class GuxOptionLegacy {
  constructor() {
    this.value = undefined;
    this.disabled = undefined;
    this.text = undefined;
    this.selected = undefined;
  }
  updateParentSelection() {
    void this.getParentGuxDropdown().setSelected();
  }
  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  shouldFilter(searchInput) {
    if (!searchInput) {
      return Promise.resolve(false);
    }
    return Promise.resolve(!this.text.toLowerCase().startsWith(searchInput.toLowerCase()));
  }
  getParentGuxDropdown() {
    return this.root.closest('gux-dropdown-legacy');
  }
  componentWillLoad() {
    if (!this.text) {
      this.text = this.root.textContent;
    }
  }
  hostData() {
    return {
      tabindex: '0'
    };
  }
  render() {
    return (h("div", { title: this.text }, h("span", { ref: el => (this.slotContent = el), style: { display: 'none' } }, h("slot", null)), this.text));
  }
  static get is() { return "gux-option-legacy"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-option.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-option.css"]
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
          "text": "The content of this attribute represents the value to be submitted on 'input' changes,\nshould this option be selected. If this attribute is omitted, the value is taken from\nthe text content of the option element."
        },
        "attribute": "value",
        "reflect": false
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
          "text": "If this Boolean attribute is set, this option is not checkable. It won't receive any\nbrowsing events, like mouse clicks or focus-related ones."
        },
        "attribute": "disabled",
        "reflect": false
      },
      "text": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The content of this attribute represents the value to be displayed,\nIf this attribute is omitted, the value is taken from the text content of the slot.\nThis attribute takes precedence over slot value"
        },
        "attribute": "text",
        "reflect": false
      },
      "selected": {
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
        "attribute": "selected",
        "reflect": true
      }
    };
  }
  static get methods() {
    return {
      "shouldFilter": {
        "complexType": {
          "signature": "(searchInput: string) => Promise<boolean>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "searchInput The input string being searched for."
                }],
              "text": "The input string being searched for."
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<boolean>"
        },
        "docs": {
          "text": "Determines if the search input matches this option.",
          "tags": [{
              "name": "param",
              "text": "searchInput The input string being searched for."
            }]
        }
      }
    };
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "selected",
        "methodName": "updateParentSelection"
      }];
  }
}
