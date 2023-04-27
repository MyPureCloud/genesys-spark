import { h, readTask } from '@stencil/core';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
import * as loadingMessageWidth from './gux-loading-message-constants';
/**
 * @slot progress - Required slot for progress.
 * @slot primary-guidance - Required slot for primary guidance.
 * @slot additional-guidance - Slot for additional guidance.
 */
export class GuxLoadingMessage {
  constructor() {
    this.hasAdditionalGuidance = undefined;
    this.loadingMessageSize = undefined;
  }
  updateLoadingMessageSize() {
    readTask(() => {
      const containerWidth = this.root.clientWidth;
      if (containerWidth <= loadingMessageWidth.SMALL_LOADING_MESSAGE) {
        this.loadingMessageSize = 'small';
      }
      else if (containerWidth <= loadingMessageWidth.MEDIUM_LOADING_MESSAGE) {
        this.loadingMessageSize = 'medium';
      }
      else {
        this.loadingMessageSize = 'large';
      }
    });
  }
  componentWillLoad() {
    trackComponent(this.root);
  }
  componentDidLoad() {
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateLoadingMessageSize();
      });
    }
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.root);
    }
    afterNextRenderTimeout(() => {
      this.updateLoadingMessageSize();
    }, 500);
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.root);
    }
  }
  render() {
    return (h("div", { class: {
        'gux-container': true,
        [`gux-${this.loadingMessageSize}`]: true
      }, role: "alert", "aria-live": "assertive" }, h("slot", { name: "progress" }), h("slot", { name: "primary-message" }), h("slot", { name: "additional-guidance" })));
  }
  static get is() { return "gux-loading-message-beta"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-loading-message.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-loading-message.css"]
    };
  }
  static get states() {
    return {
      "hasAdditionalGuidance": {},
      "loadingMessageSize": {}
    };
  }
  static get elementRef() { return "root"; }
}
