import { r as registerInstance, e as createEvent, h } from './index-f583fcde.js';
import { a as autoUpdate, c as computePosition, o as offset, d as size, f as flip } from './floating-ui.dom.esm-603d43ce.js';

const guxPopupBetaCss = ".gux-target-container.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-popup-container{position:fixed;z-index:var(--gux-zindex-popup, 1);visibility:hidden}.gux-popup-container.gux-expanded{visibility:visible}";

const GuxPopupBeta = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internalexpanded = createEvent(this, "internalexpanded", 7);
    this.internalcollapsed = createEvent(this, "internalcollapsed", 7);
    this.expanded = false;
    this.disabled = false;
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = autoUpdate(this.targetElementContainer, this.popupElementContainer, () => this.updatePosition(), {
      ancestorScroll: true,
      elementResize: true,
      animationFrame: true,
      ancestorResize: true
    });
  }
  updatePosition() {
    if (this.targetElementContainer && this.popupElementContainer) {
      const popupElementContainer = this.popupElementContainer;
      void computePosition(this.targetElementContainer, this.popupElementContainer, {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [
          offset(2),
          size({
            apply({ rects }) {
              Object.assign(popupElementContainer.style, {
                width: `${rects.reference.width}px`
              });
            }
          }),
          flip()
        ]
      }).then(({ x, y }) => {
        Object.assign(this.popupElementContainer.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }
  }
  onExpandedChange(expanded) {
    if (expanded) {
      this.internalexpanded.emit();
    }
    else {
      this.internalcollapsed.emit();
    }
  }
  componentDidLoad() {
    if (this.expanded) {
      this.runUpdatePosition();
    }
  }
  componentDidUpdate() {
    if (this.expanded) {
      this.runUpdatePosition();
    }
    else if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }
  disconnectedCallback() {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }
  render() {
    return (h("div", { class: {
        'gux-target-container': true,
        'gux-disabled': this.disabled
      }, ref: (el) => (this.targetElementContainer = el) }, h("slot", { name: "target" }), h("div", { class: {
        'gux-popup-container': true,
        'gux-expanded': this.expanded && !this.disabled
      }, ref: (el) => (this.popupElementContainer = el) }, h("slot", { name: "popup" }))));
  }
  static get watchers() { return {
    "expanded": ["onExpandedChange"]
  }; }
};
GuxPopupBeta.style = guxPopupBetaCss;

export { GuxPopupBeta as gux_popup_beta };
