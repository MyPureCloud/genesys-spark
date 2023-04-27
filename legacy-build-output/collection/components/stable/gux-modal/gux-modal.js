import { h } from '@stencil/core';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot content - Required slot for the modal content
 * @slot left-align-buttons - Optional slot to set gux-buttons aligned to the left of the modal
 * @slot right-align-buttons - Optional slot to set gux-buttons aligned to the left of the modal
 * @slot title - Optional slot to set the modal title
 */
export class GuxModal {
  constructor() {
    this.size = 'dynamic';
    this.trapFocus = true;
    this.initialFocus = undefined;
  }
  handleKeyEvent(event) {
    if (event.key === 'Escape') {
      this.onDismissHandler(event);
    }
  }
  connectedCallback() {
    this.triggerElement = document.activeElement;
  }
  componentWillLoad() {
    const trapFocusVariant = this.trapFocus ? 'trapfocuson' : 'trapfocusoff';
    const componentVariant = `${this.size}-${trapFocusVariant}`;
    trackComponent(this.root, { variant: componentVariant });
  }
  componentDidLoad() {
    var _a, _b, _c;
    const initialFocusElement = this.getInitialFocusElement();
    if (initialFocusElement) {
      // using .focus?.() instead of .focus() as a workaround for a Stencil bug in unit tests
      // https://github.com/ionic-team/stencil/issues/1964
      (_a = initialFocusElement.focus) === null || _a === void 0 ? void 0 : _a.call(initialFocusElement);
    }
    else if (this.dismissButton) {
      (_c = (_b = this.dismissButton).focus) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
  }
  render() {
    const hasModalTitleSlot = this.hasModalTitleSlot();
    const hasFooterButtons = this.hasFooterButtons();
    const titleID = randomHTMLId();
    return (h("div", { class: "gux-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": hasModalTitleSlot ? titleID : null }, h("div", { class: `gux-modal-container gux-${this.size}` }, this.renderModalTrapFocusEl(), hasModalTitleSlot && (h("h1", { class: "gux-modal-header", id: titleID }, h("slot", { name: "title" }))), h("gux-dismiss-button", { onClick: this.onDismissHandler.bind(this), ref: el => (this.dismissButton = el) }), h("div", { class: {
        'gux-modal-content': true,
        'gux-no-buttons': !hasFooterButtons
      } }, h("p", null, h("slot", { name: "content" }))), hasFooterButtons && (h("div", { class: "gux-button-footer" }, h("div", { class: "gux-left-align-buttons" }, h("slot", { name: "left-align-buttons" })), h("div", { class: "gux-right-align-buttons" }, h("slot", { name: "right-align-buttons" })))), this.renderModalTrapFocusEl())));
  }
  // When trap-focus is enabled, focusing this element
  // will immediately redirect focus back to the dismiss button at the top of the modal.
  renderModalTrapFocusEl() {
    if (this.trapFocus) {
      return (h("span", { onFocus: () => this.dismissButton.focus(), tabindex: "0" }));
    }
  }
  getInitialFocusElement() {
    return this.initialFocus
      ? this.root.querySelector(this.initialFocus)
      : undefined;
  }
  hasModalTitleSlot() {
    return Boolean(this.root.querySelector('[slot="title"]'));
  }
  hasFooterButtons() {
    return (Boolean(this.root.querySelector('[slot="left-align-buttons"]')) ||
      Boolean(this.root.querySelector('[slot="right-align-buttons"]')));
  }
  onDismissHandler(event) {
    var _a;
    event.stopPropagation();
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
      (_a = this.triggerElement) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  static get is() { return "gux-modal"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-modal.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-modal.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxModalSize",
          "resolved": "\"dynamic\" | \"large\" | \"medium\" | \"small\"",
          "references": {
            "GuxModalSize": {
              "location": "import",
              "path": "./gux-modal.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the size of the modal (small, medium or large)"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'dynamic'"
      },
      "trapFocus": {
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
        "attribute": "trap-focus",
        "reflect": false,
        "defaultValue": "true"
      },
      "initialFocus": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | undefined",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Query selector for the element to initially focus when the modal opens\nDefaults to the first tabbable element"
        },
        "attribute": "initial-focus",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "guxdismiss",
        "name": "guxdismiss",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Fired when a user dismisses the modal (The default behaviour is to remove the component from the DOM)"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleKeyEvent",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
