import { r as registerInstance, h, H as Host, g as getElement } from './index-816e34d8.js';
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift } from './floating-ui.dom.esm-2389d4f3.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { t as trackComponent } from './usage-55de2afe.js';
import { f as findElementById } from './find-element-by-id-4d8e4156.js';
import { b as afterNextRender } from './after-next-render-ed0f7dcd.js';

const guxTooltipCss = ":host{position:fixed;z-index:var(--gux-zindex-tooltip, 1);display:none;width:max-content;max-width:250px;overflow:hidden;opacity:0}:host(.gux-show){display:block;animation-name:fade-in;animation-duration:250ms;animation-delay:1s;animation-fill-mode:forwards}.gux-container{box-sizing:border-box;padding:6px 12px;color:#2e394c;pointer-events:none;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}";

const GuxTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.pointerenterHandler = () => this.show();
    this.pointerleaveHandler = () => this.hide();
    this.focusinHandler = () => this.show();
    this.focusoutHandler = () => this.hide();
    this.id = randomHTMLId('gux-tooltip');
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
    this.cleanupUpdatePosition = autoUpdate(this.forElement, this.root, () => this.updatePosition(), {
      ancestorScroll: true,
      elementResize: true,
      animationFrame: false,
      ancestorResize: true
    });
  }
  updatePosition() {
    void computePosition(this.forElement, this.root, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: [offset(16), flip(), shift()]
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
    afterNextRender(() => {
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
      this.forElement = findElementById(this.root, this.for);
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
    trackComponent(this.root);
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
    return (h(Host, { id: this.id, class: { 'gux-show': this.isShown }, role: "tooltip" }, h("div", { class: "gux-container" }, h("slot", null))));
  }
  get root() { return getElement(this); }
};
GuxTooltip.style = guxTooltipCss;

export { GuxTooltip as gux_tooltip };
