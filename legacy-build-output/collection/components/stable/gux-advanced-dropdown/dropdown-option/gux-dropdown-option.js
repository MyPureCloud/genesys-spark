import { h } from '@stencil/core';
// RegExp escape string from http://stackoverflow.com/a/3561711/23528
const escapeRegexStr = /[-/\\^$*+?.()|[\]{}]/g;
function escapeRegex(input) {
  return input.replace(escapeRegexStr, '\\$&');
}
export class GuxDropdownOption {
  constructor() {
    this.value = undefined;
    this.disabled = undefined;
    this.filtered = undefined;
    this.selected = undefined;
    this.text = undefined;
    this.highlight = undefined;
  }
  /**
   * Gets the value rendered by the drop down item.
   */
  getDisplayedValue() {
    return Promise.resolve(this.text);
  }
  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  shouldFilter(searchInput) {
    this.highlight = searchInput;
    this.highlightIndex = -1;
    if (!searchInput) {
      return Promise.resolve(false);
    }
    const regex = new RegExp(escapeRegex(searchInput), 'gi');
    const regexResult = regex.exec(this.text);
    const filter = regexResult === null;
    if (!filter) {
      this.highlightIndex = regexResult.index;
    }
    return Promise.resolve(filter);
  }
  componentDidLoad() {
    this.root.onclick = () => {
      this.onItemClicked();
    };
    this.root.onkeydown = (e) => {
      switch (e.key) {
        case ' ':
        case 'Enter':
          this.selected = true;
          this.selectedChanged.emit(this.value);
          break;
      }
    };
  }
  hostData() {
    return {
      tabindex: '0'
    };
  }
  render() {
    return (h("div", { class: "gux-dropdown-option", title: this.text }, this.textWithHighlights()));
  }
  textWithHighlights() {
    if (!this.highlight || !this.text) {
      return (h("span", null, this.text));
    }
    if (this.highlightIndex < 0) {
      return (h("span", null, this.text));
    }
    const preface = this.text.substring(0, this.highlightIndex);
    const actualHighlight = this.text.substring(this.highlightIndex, this.highlightIndex + this.highlight.length);
    const suffix = this.text.substring(preface.length + this.highlight.length);
    return (h("span", null, preface, h("strong", null, actualHighlight), suffix));
  }
  onItemClicked() {
    this.selected = true;
    this.selectedChanged.emit(this.value);
  }
  static get is() { return "gux-dropdown-option"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-dropdown-option.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-dropdown-option.css"]
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
      "filtered": {
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
          "text": "If this Boolean attribute is set, the option is not visible to the select control.\nThis does not mean that it clears the selection if it was previously selected.\n\nShould only be used by internal users."
        },
        "attribute": "filtered",
        "reflect": true
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
          "text": "If present, this Boolean attribute indicates that the option is currently selected."
        },
        "attribute": "selected",
        "reflect": true
      },
      "text": {
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
        "attribute": "text",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "highlight": {}
    };
  }
  static get events() {
    return [{
        "method": "selectedChanged",
        "name": "selectedChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Occurs when the item has been selected."
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
      "getDisplayedValue": {
        "complexType": {
          "signature": "() => Promise<string>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<string>"
        },
        "docs": {
          "text": "Gets the value rendered by the drop down item.",
          "tags": []
        }
      },
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
}
