'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const usage = require('./usage-da9572bf.js');
const popper = require('./popper-6eb3f461.js');

const guxActionListCss = ".gux-action-list-items-container{padding:8px 0;margin:0;list-style:none;background:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}";

const validChildren = 'gux-action-item:not([disabled])';
const GuxActionListLegacy = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectedIndex = -1;
  }
  /*
   * Sets focus to the fist item in the list.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async setFocusOnFirstItem() {
    this.selectedIndex = 0;
    this.updateTabIndexes();
  }
  /*
   * Sets focus to the last item in the list.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async setFocusOnLastItem() {
    const filteredList = this.getFilteredList();
    this.selectedIndex = filteredList.length - 1;
    this.updateTabIndexes();
  }
  /**
   * Returns whether the last item in the list is selected.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async isLastItemSelected() {
    const filteredList = this.getFilteredList();
    return this.selectedIndex === filteredList.length - 1;
  }
  /**
   * Returns whether the first item in the list is selected.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async isFirstItemSelected() {
    return this.selectedIndex <= 0;
  }
  componentWillLoad() {
    usage.trackComponent(this.root);
  }
  render() {
    this.updateTabIndexes();
    return (index.h("div", { class: "gux-action-list-items-container", role: "list" }, index.h("slot", null)));
  }
  onKeyDown(event) {
    const filteredList = this.getFilteredList();
    let newIndex = -1;
    switch (event.key) {
      case 'ArrowUp':
        if (this.selectedIndex !== 0) {
          event.preventDefault();
          newIndex = this.selectedIndex - 1;
          event.stopPropagation();
        }
        else if (!this.root.classList.contains('gux-command-palette-list')) {
          event.preventDefault();
          newIndex = filteredList.length - 1;
        }
        break;
      case 'Home':
        if (this.selectedIndex) {
          newIndex = 0;
        }
        break;
      case 'ArrowDown':
        if (this.selectedIndex !== filteredList.length - 1) {
          event.preventDefault();
          newIndex = this.selectedIndex + 1;
          event.stopPropagation();
        }
        else if (!this.root.classList.contains('gux-command-palette-list')) {
          event.preventDefault();
          newIndex = 0;
          event.stopPropagation();
        }
        break;
      case 'End':
        if (this.selectedIndex !== filteredList.length - 1) {
          newIndex = filteredList.length - 1;
        }
        break;
    }
    if (newIndex !== -1) {
      this.selectedIndex = newIndex;
    }
  }
  updateTabIndexes() {
    const children = this.getFilteredList();
    if (!children || this.selectedIndex === -1) {
      return;
    }
    children.forEach((element, index) => {
      if (index !== this.selectedIndex) {
        element.shadowRoot
          .querySelector('button')
          .setAttribute('tabindex', '-1');
      }
      else {
        element.shadowRoot
          .querySelector('button')
          .setAttribute('tabindex', '0');
        element.shadowRoot.querySelector('button').focus();
      }
    });
  }
  getFilteredList() {
    const slot = this.root.querySelector('slot');
    if (slot) {
      return slot
        .assignedElements()
        .filter(element => element.matches(validChildren));
    }
    return Array.from(this.root.querySelectorAll(validChildren));
  }
  get root() { return index.getElement(this); }
};
GuxActionListLegacy.style = guxActionListCss;

const guxPopupCss = ".gux-target-container.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}.gux-popup-container{z-index:var(--gux-zindex-popup, 1);visibility:hidden}.gux-popup-container.gux-expanded{visibility:visible}";

const GuxPopup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.internalexpanded = index.createEvent(this, "internalexpanded", 7);
    this.internalcollapsed = index.createEvent(this, "internalcollapsed", 7);
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
    this.popperInstance = popper.createPopper(this.targetElementContainer, this.popupElementContainer, {
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
GuxPopup.style = guxPopupCss;

exports.gux_action_list_legacy = GuxActionListLegacy;
exports.gux_popup = GuxPopup;
