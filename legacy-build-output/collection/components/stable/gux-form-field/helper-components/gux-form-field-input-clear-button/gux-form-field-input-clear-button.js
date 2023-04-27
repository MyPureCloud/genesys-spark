import { h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../../../i18n';
import translationResources from './i18n/en.json';
export class Gux {
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("button", { tabIndex: -1, type: "button", title: this.i18n('clear') }, h("gux-icon", { "icon-name": "close", decorative: true })));
  }
  static get is() { return "gux-form-field-input-clear-button"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-form-field-input-clear-button.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-form-field-input-clear-button.css"]
    };
  }
  static get elementRef() { return "root"; }
}
