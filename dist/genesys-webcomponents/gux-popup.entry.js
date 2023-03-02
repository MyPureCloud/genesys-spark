import { r as registerInstance, e as createEvent, h } from './index-f583fcde.js';
import { c as createPopper } from './index-bfc8356b.js';

const guxPopupCss = ".gux-target-container.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-popup-container{z-index:var(--gux-zindex-popup, 1);visibility:hidden}.gux-popup-container.gux-expanded{visibility:visible}";

const GuxPopup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internalexpanded = createEvent(this, "internalexpanded", 7);
    this.internalcollapsed = createEvent(this, "internalcollapsed", 7);
    this.expanded = false;
    this.disabled = false;
  }
  onExpandedChange(expanded) {
    if (expanded) {
      this.popperInstance.forceUpdate();
      this.internalexpanded.emit();
    }
    else {
      this.internalcollapsed.emit();
    }
  }
  connectedCallback() {
    if (this.targetElementContainer && this.popupElementContainer) {
      this.setPopperInstance();
    }
  }
  componentDidLoad() {
    this.setPopperInstance();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.popperInstance) === null || _a === void 0 ? void 0 : _a.destroy();
  }
  setPopperInstance() {
    this.popperInstance = createPopper(this.targetElementContainer, this.popupElementContainer, {
      strategy: 'fixed',
      modifiers: [
        {
          name: 'flip',
          options: {
            boundary: []
          }
        },
        {
          name: 'offset',
          options: {
            offset: [0, 2]
          }
        },
        {
          name: 'sameWidth',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          // eslint-disable-next-line @typescript-eslint/typedef
          fn({ state }) {
            state.styles.popper.width = `${state.rects.reference.width}px`;
          },
          // eslint-disable-next-line @typescript-eslint/typedef
          effect({ state }) {
            state.elements.popper.style.width = `${state.elements.reference.getBoundingClientRect().width}px`;
          }
        }
      ],
      placement: 'bottom-start'
    });
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
GuxPopup.style = guxPopupCss;

export { GuxPopup as gux_popup };
