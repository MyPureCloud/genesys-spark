export class GuxCommandAction {
  constructor() {
    this.text = '';
    this.details = '';
    this.common = false;
    this.recent = false;
    this.shortcut = '';
  }
  /**
   * @internal
   * Invokes the pressed action on this component.
   */
  async invokePress() {
    this.press.emit();
  }
  render() {
    return '';
  }
  static get is() { return "gux-command-action"; }
  static get properties() {
    return {
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
          "text": "The textual value of the command."
        },
        "attribute": "text",
        "reflect": false,
        "defaultValue": "''"
      },
      "details": {
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
          "text": "Details about the command. This acts as extra contextual information about the command."
        },
        "attribute": "details",
        "reflect": false,
        "defaultValue": "''"
      },
      "common": {
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
          "text": "If the command is a common command. Common commands are choosen defaults a user might want to use."
        },
        "attribute": "common",
        "reflect": false,
        "defaultValue": "false"
      },
      "recent": {
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
          "text": "If the command is a recent command. Recent commands are commands that the user has recently issued."
        },
        "attribute": "recent",
        "reflect": false,
        "defaultValue": "false"
      },
      "shortcut": {
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
          "text": "The shortcut for the command. Textual representation of a shortcut associated with this command, if it exists."
        },
        "attribute": "shortcut",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
  static get events() {
    return [{
        "method": "press",
        "name": "press",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits when the list item is clicked, or enter/space is pressed."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "invokePress": {
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
          "tags": [{
              "name": "internal",
              "text": "Invokes the pressed action on this component."
            }]
        }
      }
    };
  }
}
