'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const floatingUi_dom_esm = require('./floating-ui.dom.esm-ecb2a154.js');

const guxPopupBetaCss = ".gux-target-container.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-popup-container{position:fixed;z-index:var(--gux-zindex-popup, 1);visibility:hidden}.gux-popup-container.gux-expanded{visibility:visible}";

const GuxPopupBeta = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internalexpanded = index.createEvent(this, "internalexpanded", 7);
    this.internalcollapsed = index.createEvent(this, "internalcollapsed", 7);
    this.expanded = false;
    this.disabled = false;
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = floatingUi_dom_esm.autoUpdate(this.targetElementContainer, this.popupElementContainer, () => this.updatePosition(), {
      ancestorScroll: true,
      elementResize: true,
      animationFrame: true,
      ancestorResize: true
    });
  }
  updatePosition() {
    if (this.targetElementContainer && this.popupElementContainer) {
      const popupElementContainer = this.popupElementContainer;
      void floatingUi_dom_esm.computePosition(this.targetElementContainer, this.popupElementContainer, {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [
          floatingUi_dom_esm.offset(2),
          floatingUi_dom_esm.size({
            apply({ rects }) {
              Object.assign(popupElementContainer.style, {
                width: `${rects.reference.width}px`
              });
            }
          }),
          floatingUi_dom_esm.flip()
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
    return (index.h("div", { class: {
        'gux-target-container': true,
        'gux-disabled': this.disabled
      }, ref: (el) => (this.targetElementContainer = el) }, index.h("slot", { name: "target" }), index.h("div", { class: {
        'gux-popup-container': true,
        'gux-expanded': this.expanded && !this.disabled
      }, ref: (el) => (this.popupElementContainer = el) }, index.h("slot", { name: "popup" }))));
  }
  static get watchers() { return {
    "expanded": ["onExpandedChange"]
  }; }
};
GuxPopupBeta.style = guxPopupBetaCss;

exports.gux_popup_beta = GuxPopupBeta;
