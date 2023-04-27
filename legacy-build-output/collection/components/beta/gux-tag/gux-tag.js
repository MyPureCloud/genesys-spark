import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import tagResources from './i18n/en.json';
/**
 * @slot - content
 */
export class GuxTag {
  constructor() {
    this.color = 'default';
    this.value = undefined;
    this.disabled = false;
    this.removable = false;
    this.label = undefined;
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        this.removeTag();
    }
  }
  removeTag() {
    if (this.disabled || !this.removable) {
      return;
    }
    this.guxdelete.emit(this.value);
  }
  onSlotChange(event) {
    const slotAssignedNodes = event.composedPath()[0].assignedNodes();
    this.label = slotAssignedNodes
      .map(nodeItem => nodeItem.textContent)
      .join('');
  }
  renderTagTitle() {
    return (h("gux-tooltip-title", null, h("span", null, h("slot", { "aria-hidden": "true", onSlotchange: this.onSlotChange.bind(this) }))));
  }
  renderSrText() {
    return (h("div", { class: "gux-sr-only" }, this.disabled
      ? this.i18n('tag-disabled', { label: this.label })
      : this.i18n('tag', { label: this.label })));
  }
  renderRemoveButton() {
    if (this.removable) {
      return (h("button", { class: "gux-tag-remove-button", onClick: this.removeTag.bind(this), type: "button", disabled: this.disabled }, h("gux-icon", { class: "gux-tag-remove-icon", "icon-name": "close", "screenreader-text": this.i18n('remove-tag', {
          label: this.label
        }) })));
    }
  }
  componentWillLoad() {
    trackComponent(this.root, {
      variant: this.removable ? 'removable' : 'permenant'
    });
  }
  async componentWillRender() {
    this.i18n = await buildI18nForComponent(this.root, tagResources);
  }
  render() {
    return (h("div", { class: {
        'gux-tag': true,
        [`gux-${this.color}`]: true,
        'gux-disabled': this.disabled
      }, "aria-disabled": this.disabled.toString() }, this.renderTagTitle(), this.renderSrText(), this.renderRemoveButton()));
  }
  static get is() { return "gux-tag-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tag.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tag.css"]
    };
  }
  static get properties() {
    return {
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxTagColor",
          "resolved": "\"default\" | \"default-subtle\" | \"navy\" | \"blue\" | \"electric-purple\" | \"aqua-green\" | \"fuscha\" | \"fuchsia\" | \"dark-purple\" | \"bubblegum-pink\" | \"olive-green\" | \"lilac\" | \"alert-yellow-green\" | \"blue-10\" | \"blue-20\" | \"blue-30\" | \"blue-40\" | \"blue-50\" | \"blue-60\" | \"blue-70\" | \"blue-80\" | \"blue-90\" | \"blue-100\" | \"alert-red-10\" | \"alert-red-20\" | \"alert-red-30\" | \"alert-red-40\" | \"alert-red-50\" | \"alert-red-60\" | \"alert-red-70\" | \"alert-red-80\" | \"alert-red-90\" | \"alert-red-100\" | \"alert-green-10\" | \"alert-green-20\" | \"alert-green-30\" | \"alert-green-40\" | \"alert-green-50\" | \"alert-green-60\" | \"alert-green-70\" | \"alert-green-80\" | \"alert-green-90\" | \"alert-green-100\" | \"alert-yellow-10\" | \"alert-yellow-20\" | \"alert-yellow-30\" | \"alert-yellow-40\" | \"alert-yellow-50\" | \"alert-yellow-60\" | \"alert-yellow-70\" | \"alert-yellow-80\" | \"alert-yellow-90\" | \"alert-yellow-100\" | \"brand-orange\" | \"brand-teal\" | \"brand-navy\" | \"brand-light-blue\" | \"brand-yellow\"",
          "references": {
            "GuxTagColor": {
              "location": "import",
              "path": "./gux-tag.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tag background color."
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'default'"
      },
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
          "text": "Index for remove tag"
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
          "text": "Tag is removable."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "removable": {
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
          "text": "Tag is removable."
        },
        "attribute": "removable",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "label": {}
    };
  }
  static get events() {
    return [{
        "method": "guxdelete",
        "name": "guxdelete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggered when click on remove button"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "onKeyDown",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
