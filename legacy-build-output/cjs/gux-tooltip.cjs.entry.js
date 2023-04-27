'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const floatingUi_dom_esm = require('./floating-ui.dom.esm-ecb2a154.js');
const randomHtmlId = require('./random-html-id-b86b61c0.js');
const usage = require('./usage-da9572bf.js');
const findElementById = require('./find-element-by-id-7a79ceeb.js');
const afterNextRender = require('./after-next-render-a09f528a.js');

const guxTooltipCss = ":host{position:fixed;z-index:var(--gux-zindex-tooltip, 1);display:none;width:max-content;max-width:250px;overflow:hidden;opacity:0}:host(.gux-show){display:block;animation-name:fade-in;animation-duration:250ms;animation-delay:1s;animation-fill-mode:forwards}.gux-container{box-sizing:border-box;padding:6px 12px;color:#2e394c;pointer-events:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}";

const GuxTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.pointerenterHandler = () => this.show();
    this.pointerleaveHandler = () => this.hide();
    this.focusinHandler = () => this.show();
    this.focusoutHandler = () => this.hide();
    this.id = randomHtmlId.randomHTMLId('gux-tooltip');
    this.for = undefined;
    this.placement = 'bottom-start';
    this.isShown = false;
  }
  handleKeyDown(event) {
    if (event.key === 'Escape' && this.isShown) {
      this.hide();
    }
  }
  /*
   * Show tooltip
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async showTooltip() {
    this.show();
  }
  /*
   * Hide tooltip
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async hideTooltip() {
    this.hide();
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = floatingUi_dom_esm.autoUpdate(this.forElement, this.root, () => this.updatePosition(), {
      ancestorScroll: true,
      elementResize: true,
      animationFrame: false,
      ancestorResize: true
    });
  }
  updatePosition() {
    void floatingUi_dom_esm.computePosition(this.forElement, this.root, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: [floatingUi_dom_esm.offset(16), floatingUi_dom_esm.flip(), floatingUi_dom_esm.shift()]
    }).then(({ x, y, placement }) => {
      Object.assign(this.root.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      // data-placement is currently only used for e2e tests
      this.root.setAttribute('data-placement', placement);
    });
  }
  show() {
    this.isShown = true;
    afterNextRender.afterNextRender(() => {
      this.runUpdatePosition();
    });
  }
  hide() {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
    this.isShown = false;
  }
  getForElement() {
    if (this.for) {
      this.forElement = findElementById.findElementById(this.root, this.for);
    }
    else {
      this.forElement = this.root.parentElement;
    }
  }
  logForAttributeError() {
    if (this.root.isConnected) {
      console.error(`gux-tooltip: invalid element supplied to 'for': "${this.for}"`);
    }
  }
  connectedCallback() {
    this.getForElement();
    if (this.forElement) {
      this.forElement.setAttribute('aria-describedby', this.id);
      this.forElement.addEventListener('pointerenter', this.pointerenterHandler);
      this.forElement.addEventListener('pointerleave', this.pointerleaveHandler);
      this.forElement.addEventListener('focusin', this.focusinHandler);
      this.forElement.addEventListener('focusout', this.focusoutHandler);
    }
    else {
      this.logForAttributeError();
    }
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  disconnectedCallback() {
    var _a, _b, _c, _d, _e;
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
    (_a = this.forElement) === null || _a === void 0 ? void 0 : _a.removeAttribute('aria-describedby');
    (_b = this.forElement) === null || _b === void 0 ? void 0 : _b.removeEventListener('pointerenter', this.pointerenterHandler);
    (_c = this.forElement) === null || _c === void 0 ? void 0 : _c.removeEventListener('pointerleave', this.pointerleaveHandler);
    (_d = this.forElement) === null || _d === void 0 ? void 0 : _d.removeEventListener('focusin', this.focusinHandler);
    (_e = this.forElement) === null || _e === void 0 ? void 0 : _e.removeEventListener('focusout', this.focusoutHandler);
  }
  render() {
    return (index.h(index.Host, { id: this.id, class: { 'gux-show': this.isShown }, role: "tooltip" }, index.h("div", { class: "gux-container" }, index.h("slot", null))));
  }
  get root() { return index.getElement(this); }
};
GuxTooltip.style = guxTooltipCss;

exports.gux_tooltip = GuxTooltip;
