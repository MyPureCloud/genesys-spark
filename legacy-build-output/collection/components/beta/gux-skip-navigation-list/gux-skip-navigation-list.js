import { h } from '@stencil/core';
import { buildI18nForComponent } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import translationResources from './i18n/en.json';
/**
 * @slot - collection of gux-navigation-list-item elements
 */
export class GuxSkipNavigationList {
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }
  render() {
    return (h("div", { class: "gux-container" }, h("nav", { "aria-label": this.i18n('navigationName') }, h("ul", { role: "list" }, h("slot", null)))));
  }
  static get is() { return "gux-skip-navigation-list-beta"; }
  static get encapsulation() { return "shadow"; }
  static get delegatesFocus() { return true; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-skip-navigation-list.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-skip-navigation-list.css"]
    };
  }
  static get elementRef() { return "root"; }
}
