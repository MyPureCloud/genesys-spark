import { h } from '@stencil/core';
import { createPopper } from '@popperjs/core';
/**
 * @slot target - Required slot for target
 * @slot popup - Required slot for popup
 */
export class GuxPopup {
  constructor() {
    this.expanded = false;
    this.disabled = false;
  }
  onExpandedChange(expanded) {
    if (expanded) {
      this.popperInstance.forceUpdate();
      this.internalexpanded.emit();
    }
    else {
      this.internalcollapsed.emit();
    }
  }
  connectedCallback() {
    if (this.targetElementContainer && this.popupElementContainer) {
      this.setPopperInstance();
    }
  }
  componentDidLoad() {
    this.setPopperInstance();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.popperInstance) === null || _a === void 0 ? void 0 : _a.destroy();
  }
  setPopperInstance() {
    this.popperInstance = createPopper(this.targetElementContainer, this.popupElementContainer, {
      strategy: 'fixed',
      modifiers: [
        {
          name: 'flip',
          options: {
            boundary: []
          }
        },
        {
          name: 'offset',
          options: {
            offset: [0, 2]
          }
        },
        {
          name: 'sameWidth',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          // eslint-disable-next-line @typescript-eslint/typedef
          fn({ state }) {
            state.styles.popper.width = `${state.rects.reference.width}px`;
          },
          // eslint-disable-next-line @typescript-eslint/typedef
          effect({ state }) {
            state.elements.popper.style.width = `${state.elements.reference.getBoundingClientRect().width}px`;
          }
        }
      ],
      placement: 'bottom-start'
    });
  }
  render() {
    return (h("div", { class: {
        'gux-target-container': true,
        'gux-disabled': this.disabled
      }, ref: (el) => (this.targetElementContainer = el) }, h("slot", { name: "target" }), h("div", { class: {
        'gux-popup-container': true,
        'gux-expanded': this.expanded && !this.disabled
      }, ref: (el) => (this.popupElementContainer = el) }, h("slot", { name: "popup" }))));
  }
  static get is() { return "gux-popup"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-popup.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-popup.css"]
    };
  }
  static get properties() {
    return {
      "expanded": {
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
        "attribute": "expanded",
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
      }
    };
  }
  static get events() {
    return [{
        "method": "internalexpanded",
        "name": "internalexpanded",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This event will run when the popup transitions to an expanded state."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "internalcollapsed",
        "name": "internalcollapsed",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This event will run when the popup transitions to a collapsed state."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "expanded",
        "methodName": "onExpandedChange"
      }];
  }
}
