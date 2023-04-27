import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../../../i18n';
import { randomHTMLId } from '../../../../../utils/dom/random-html-id';
import colorInputResources from './i18n/en.json';
import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';
/**
 * @slot input - Required slot for input[type="color"]
 */
export class GuxInputColor {
  constructor() {
    this.requiredId = randomHTMLId('gux-input-color-required');
    this.guxLabelDescribedby = undefined;
    this.guxErrorDescribedby = undefined;
    this.guxRequired = undefined;
    this.disabled = undefined;
    this.color = undefined;
    this.opened = undefined;
    this.colorOnOpen = undefined;
  }
  onClick(e) {
    const element = e.target;
    if (!this.root.contains(element)) {
      this.setOpened(false);
    }
  }
  onInput(e) {
    const input = e.target;
    this.color = input.value;
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, colorInputResources);
    this.input = this.root.querySelector('input[slot="input"]');
    this.input.addEventListener('change', (e) => {
      if (this.opened) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
      }
    });
    this.disabledObserver = onDisabledChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    this.disabled = this.input.disabled;
    this.color = this.input.value;
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (h("section", null, h("span", { class: "gux-hidden", id: this.requiredId }, this.i18n('required')), h("button", { "aria-describedby": `${this.guxLabelDescribedby} ${this.guxRequired ? this.requiredId : ''} ${this.guxErrorDescribedby}`, "aria-expanded": this.opened ? 'true' : 'false', type: "button", class: {
        'gux-input-color-main-element': true,
        'gux-opened': this.opened
      }, disabled: this.disabled, onClick: this.clickHandler.bind(this) }, h("div", { class: "gux-input-color-selected-color", style: { background: this.color } }), h("div", { class: "gux-input-color-color-name" }, this.color), h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })), h("gux-color-select", { class: {
        'gux-input-color-color-select': true,
        'gux-opened': this.opened
      } }, h("slot", { name: "input", slot: "input" }))));
  }
  setOpened(opened) {
    if (this.colorOnOpen && this.colorOnOpen !== this.color) {
      this.colorOnOpen = this.color;
      this.input.dispatchEvent(new Event('change', {
        bubbles: true
      }));
    }
    this.colorOnOpen = this.color;
    this.opened = opened;
  }
  clickHandler() {
    if (!this.disabled) {
      this.setOpened(!this.opened);
    }
  }
  static get is() { return "gux-input-color"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-input-color.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-input-color.css"]
    };
  }
  static get properties() {
    return {
      "guxLabelDescribedby": {
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
        "attribute": "gux-label-describedby",
        "reflect": false
      },
      "guxErrorDescribedby": {
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
        "attribute": "gux-error-describedby",
        "reflect": false
      },
      "guxRequired": {
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
        "attribute": "gux-required",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "disabled": {},
      "color": {},
      "opened": {},
      "colorOnOpen": {}
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "click",
        "method": "onClick",
        "target": "window",
        "capture": false,
        "passive": false
      }, {
        "name": "input",
        "method": "onInput",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
