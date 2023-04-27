import { r as registerInstance, d as readTask, h, g as getElement } from './index-816e34d8.js';
import { a as afterNextRenderTimeout } from './after-next-render-ed0f7dcd.js';
import { t as trackComponent } from './usage-55de2afe.js';

/**
 * Below are the max-widths for the loading component.
 */
const SMALL_LOADING_MESSAGE = 160;
const MEDIUM_LOADING_MESSAGE = 300;

const guxLoadingMessageCss = ":host{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container slot[name='primary-message']{color:#364154;text-align:center}.gux-container slot[name='additional-guidance']{color:#596373;text-align:center}.gux-container.gux-small,.gux-container.gux-medium{padding:8px 0 4px}.gux-container.gux-small slot[name='primary-message'],.gux-container.gux-medium slot[name='primary-message']{font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:14px;line-height:20px}.gux-container.gux-small slot[name='additional-guidance'],.gux-container.gux-medium slot[name='additional-guidance']{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px}.gux-container.gux-large{padding:16px 0 4px}.gux-container.gux-large slot[name='primary-message']{font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px}.gux-container.gux-large slot[name='additional-guidance']{font-family:Roboto, sans-serif;font-weight:400;font-size:14px;line-height:24px}";

const GuxLoadingMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hasAdditionalGuidance = undefined;
    this.loadingMessageSize = undefined;
  }
  updateLoadingMessageSize() {
    readTask(() => {
      const containerWidth = this.root.clientWidth;
      if (containerWidth <= SMALL_LOADING_MESSAGE) {
        this.loadingMessageSize = 'small';
      }
      else if (containerWidth <= MEDIUM_LOADING_MESSAGE) {
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
  get root() { return getElement(this); }
};
GuxLoadingMessage.style = guxLoadingMessageCss;

export { GuxLoadingMessage as gux_loading_message_beta };
