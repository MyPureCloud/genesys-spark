import { h } from '@stencil/core';
import { hasSlot } from '../../../utils/dom/has-slot';
import { trackComponent } from '@utils/tracking/usage';
/**
 * @slot header - slot for header content
 * @slot body - slot for body content
 * @slot footer - slot for footer content
 */
export class GuxPanelFrame {
  componentWillLoad() {
    trackComponent(this.root);
  }
  renderOptionalSlot(slotName) {
    if (hasSlot(this.root, slotName)) {
      switch (slotName) {
        case 'header':
          return (h("header", { class: "gux-panel-header" }, h("slot", { name: `${slotName}` })));
        case 'body':
          return (h("div", { class: "gux-panel-body" }, h("slot", { name: `${slotName}` })));
        case 'footer':
          return (h("footer", { class: "gux-panel-footer" }, h("slot", { name: `${slotName}` })));
      }
    }
  }
  render() {
    return (h("section", { class: "gux-panel-container" }, this.renderOptionalSlot('header'), this.renderOptionalSlot('body'), this.renderOptionalSlot('footer')));
  }
  static get is() { return "gux-panel-frame-legacy"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-panel-frame.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-panel-frame.css"]
    };
  }
  static get elementRef() { return "root"; }
}
