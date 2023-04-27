import { h, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logError } from '../../../utils/error/log-error';
/**
 * @slot - button, input[type="button"] or input[type="submit"] element
 */
export class GuxButtonSlot {
  constructor() {
    this.accent = 'secondary';
  }
  validateSlotContent() {
    let slottedElement = this.root.children[0];
    let slottedTagName = slottedElement.tagName;
    if (slottedTagName === 'SLOT') {
      slottedElement = slottedElement.assignedNodes()[0];
      slottedTagName = slottedElement.tagName;
    }
    if (slottedTagName === 'BUTTON') {
      return;
    }
    else if (slottedTagName === 'INPUT') {
      const slottedType = slottedElement.getAttribute('type');
      if (slottedType === 'button' || slottedType === 'submit') {
        return;
      }
    }
    logError('gux-button-slot', 'You must slot a button, input[type="button"] or input[type="submit"] element.');
  }
  componentWillLoad() {
    trackComponent(this.root);
    this.validateSlotContent();
  }
  render() {
    return (h(Host, { accent: this.accent }, h("slot", null)));
  }
  static get is() { return "gux-button-slot-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-button-slot.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-button-slot.css"]
    };
  }
  static get properties() {
    return {
      "accent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxButtonAccent",
          "resolved": "\"danger\" | \"ghost\" | \"inline\" | \"primary\" | \"secondary\" | \"tertiary\"",
          "references": {
            "GuxButtonAccent": {
              "location": "import",
              "path": "../../stable/gux-button/gux-button.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "accent",
        "reflect": false,
        "defaultValue": "'secondary'"
      }
    };
  }
  static get elementRef() { return "root"; }
}
