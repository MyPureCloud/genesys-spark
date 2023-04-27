'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const usage = require('./usage-da9572bf.js');

/**
 * Below are the max-widths for the loading component.
 */
const SMALL_LOADING_MESSAGE = 160;
const MEDIUM_LOADING_MESSAGE = 300;

const guxLoadingMessageCss = ":host{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container{display:flex;flex-direction:column;align-items:center;justify-content:center}.gux-container slot[name='primary-message']{color:#364154;text-align:center}.gux-container slot[name='additional-guidance']{color:#596373;text-align:center}.gux-container.gux-small,.gux-container.gux-medium{padding:8px 0 4px}.gux-container.gux-small slot[name='primary-message'],.gux-container.gux-medium slot[name='primary-message']{font-family:Roboto, sans-serif;font-weight:400;font-weight:700;font-size:14px;line-height:20px}.gux-container.gux-small slot[name='additional-guidance'],.gux-container.gux-medium slot[name='additional-guidance']{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px}.gux-container.gux-large{padding:16px 0 4px}.gux-container.gux-large slot[name='primary-message']{font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:24px;line-height:32px}.gux-container.gux-large slot[name='additional-guidance']{font-family:Roboto, sans-serif;font-weight:400;font-size:14px;line-height:24px}";

const GuxLoadingMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hasAdditionalGuidance = undefined;
    this.loadingMessageSize = undefined;
  }
  updateLoadingMessageSize() {
    index.readTask(() => {
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
    usage.trackComponent(this.root);
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
    afterNextRender.afterNextRenderTimeout(() => {
      this.updateLoadingMessageSize();
    }, 500);
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.root);
    }
  }
  render() {
    return (index.h("div", { class: {
        'gux-container': true,
        [`gux-${this.loadingMessageSize}`]: true
      }, role: "alert", "aria-live": "assertive" }, index.h("slot", { name: "progress" }), index.h("slot", { name: "primary-message" }), index.h("slot", { name: "additional-guidance" })));
  }
  get root() { return index.getElement(this); }
};
GuxLoadingMessage.style = guxLoadingMessageCss;

exports.gux_loading_message_beta = GuxLoadingMessage;
