import { h, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { buildI18nForComponent } from '../../../i18n';
import translationResources from './i18n/en.json';
export class GuxToggle {
  constructor() {
    this.labelId = randomHTMLId('gux-toggle-label');
    this.errorId = randomHTMLId('gux-toggle-error');
    this.checked = false;
    this.disabled = false;
    this.loading = false;
    this.checkedLabel = undefined;
    this.uncheckedLabel = undefined;
    this.labelPosition = 'right';
    this.errorMessage = undefined;
    this.displayInline = false;
  }
  handleLoading(loading) {
    if (loading) {
      void this.announceElement.guxAnnounce(this.i18n('toggleIsLoading'));
    }
    else {
      void this.announceElement.guxAnnounce(this.i18n('toggleIsFinishedLoading'));
    }
  }
  onClick() {
    this.toggle();
  }
  onKeydown(event) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
    }
  }
  toggle() {
    if (!this.disabled && !this.loading) {
      const checkEvent = this.check.emit(!this.checked);
      if (!checkEvent.defaultPrevented) {
        this.checked = !this.checked;
      }
    }
  }
  getAriaLabel() {
    return (this.root.getAttribute('aria-label') ||
      this.root.title ||
      this.i18n('defaultAriaLabel'));
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    const variant = this.checkedLabel || this.uncheckedLabel ? 'labled' : 'unlabled';
    trackComponent(this.root, { variant });
  }
  renderLoading() {
    if (this.loading) {
      return (h("div", { class: "gux-toggle-label-loading" }, h("gux-radial-loading", { context: "input" })));
    }
  }
  renderLabel() {
    if (this.uncheckedLabel && this.checkedLabel) {
      const labelText = this.checked ? this.checkedLabel : this.uncheckedLabel;
      return (h("div", { class: "gux-toggle-label-and-error" }, h("div", { class: "gux-toggle-label" }, h("div", { class: "gux-toggle-label-text" }, h("span", { class: "gux-toggle-label-text-inner" }, h("span", { id: this.labelId }, labelText), this.renderLoading()), h("span", { class: "gux-toggle-label-text-inner gux-hidden" }, this.checkedLabel), h("span", { class: "gux-toggle-label-text-inner gux-hidden" }, this.uncheckedLabel)))));
    }
  }
  renderError() {
    if (this.errorMessage) {
      return (h("div", { id: this.errorId, class: "gux-toggle-error" }, h("gux-error-message-beta", null, this.errorMessage)));
    }
  }
  render() {
    return (h(Host, { class: { 'gux-display-inline': this.displayInline } }, h("div", { class: {
        'gux-toggle-container': true,
        'gux-toggle-label-left': this.labelPosition === 'left',
        'gux-disabled': this.disabled || this.loading
      } }, h("div", { class: "gux-toggle-input" }, h("gux-toggle-slider", { checked: this.checked, disabled: this.disabled || this.loading, guxAriaLabel: this.getAriaLabel(), labelId: this.checkedLabel && this.uncheckedLabel ? this.labelId : '', errorId: this.errorMessage ? this.errorId : '' }), this.renderLabel()), this.renderError()), h("gux-announce-beta", { ref: el => (this.announceElement = el) })));
  }
  static get is() { return "gux-toggle"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-toggle.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-toggle.css"]
    };
  }
  static get properties() {
    return {
      "checked": {
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
        "attribute": "checked",
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
      "loading": {
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
        "attribute": "loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "checkedLabel": {
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
        "attribute": "checked-label",
        "reflect": false
      },
      "uncheckedLabel": {
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
        "attribute": "unchecked-label",
        "reflect": false
      },
      "labelPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxToggleLabelPosition",
          "resolved": "\"left\" | \"right\"",
          "references": {
            "GuxToggleLabelPosition": {
              "location": "import",
              "path": "./gux-toggle.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label-position",
        "reflect": false,
        "defaultValue": "'right'"
      },
      "errorMessage": {
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
        "attribute": "error-message",
        "reflect": false
      },
      "displayInline": {
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
        "attribute": "display-inline",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "check",
        "name": "check",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "loading",
        "methodName": "handleLoading"
      }];
  }
  static get listeners() {
    return [{
        "name": "click",
        "method": "onClick",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keydown",
        "method": "onKeydown",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
