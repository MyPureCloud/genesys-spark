var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, readTask, writeTask } from '@stencil/core';
import Sortable from 'sortablejs';
import { OnMutation } from '@utils/decorator/on-mutation';
import { eventIsFrom } from '@utils/dom/event-is-from';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { buildI18nForComponent } from '../../../../i18n';
import tabsResources from '../i18n/en.json';
export class GuxTabAdvancedList {
  constructor() {
    this.showNewTabButton = true;
    this.tabLimit = Infinity;
    this.allowSort = true;
    this.focused = 0;
    this.disableAddTabButton = false;
    this.tabTriggers = undefined;
    this.hasScrollbar = false;
    this.keyboardSort = false;
    this.initialSortIndex = 0;
    this.sortTarget = undefined;
    this.ariaLiveAlert = '';
  }
  onFocusin(event) {
    if (this.allowSort &&
      eventIsFrom('.gux-scrollable-section', event) &&
      !this.keyboardSort) {
      this.ariaLiveAlert = 'toggleSort';
    }
  }
  onFocusout(event) {
    if (!this.root
      .querySelector('.gux-scrollable-section')
      .contains(event.relatedTarget)) {
      this.tabTriggers.forEach((tabTrigger, index) => {
        void tabTrigger.guxGetActive().then(activeElement => {
          if (activeElement) {
            this.focused = index;
          }
          else {
            tabTrigger
              .querySelector('.gux-tab-button')
              .setAttribute('tabindex', '-1');
            if (tabTrigger.querySelector('.gux-tab-options-button')) {
              tabTrigger
                .querySelector('.gux-tab-options-button')
                .setAttribute('tabindex', '-1');
            }
          }
        });
      });
    }
  }
  onMutation() {
    this.setTabTriggers();
  }
  onKeydown(event) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        if (this.keyboardSort &&
          !eventIsFrom('.gux-tab-options-button', event)) {
          this.ariaLiveAlert = '';
          const parentNode = this.root.querySelector('.gux-scrollable-section');
          const allNodes = parentNode.querySelectorAll('gux-tab-advanced');
          const targetNodeIndex = Array.prototype.indexOf.call(allNodes, this.sortTarget);
          let insertBeforeTab;
          if (targetNodeIndex === allNodes.length - 1) {
            insertBeforeTab = allNodes[0];
          }
          else {
            insertBeforeTab = allNodes[targetNodeIndex + 2];
          }
          parentNode.insertBefore(this.sortTarget, insertBeforeTab);
          this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
          this.tabTriggers.forEach((tabTrigger, index) => {
            var _a;
            const active = tabTrigger.tabId ===
              ((_a = this.sortTarget) === null || _a === void 0 ? void 0 : _a.getAttribute('tab-id'));
            if (active) {
              this.focused = index;
            }
          });
          this.focusTab(this.focused);
        }
        else if (!eventIsFrom('.gux-tab-options-button', event) &&
          !eventIsFrom('.gux-dropdown-option-container', event)) {
          this.handleKeyboardScroll('forward');
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        if (this.keyboardSort &&
          !eventIsFrom('.gux-tab-options-button', event)) {
          this.ariaLiveAlert = '';
          const parentNode = this.root.querySelector('.gux-scrollable-section');
          const allNodes = parentNode.querySelectorAll('gux-tab-advanced');
          const targetNodeIndex = Array.prototype.indexOf.call(allNodes, this.sortTarget);
          const insertBeforeTab = allNodes[targetNodeIndex - 1] || null;
          parentNode.insertBefore(this.sortTarget, insertBeforeTab);
          this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
          this.tabTriggers.forEach((tabTrigger, index) => {
            var _a;
            const active = tabTrigger.tabId ===
              ((_a = this.sortTarget) === null || _a === void 0 ? void 0 : _a.getAttribute('tab-id'));
            if (active) {
              this.focused = index;
            }
          });
          this.focusTab(this.focused);
        }
        else if (!eventIsFrom('.gux-tab-options-button', event) &&
          !eventIsFrom('.gux-dropdown-option-container', event)) {
          this.handleKeyboardScroll('backward');
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (this.keyboardSort && this.allowSort) {
          this.keyboardSort = false;
          this.ariaLiveAlert = 'sortCancelled';
          const parentNode = this.root.querySelector('.gux-scrollable-section');
          const allNodes = this.tabTriggers;
          const targetNodeIndex = this.initialSortIndex;
          const insertBeforeTab = allNodes[targetNodeIndex] || null;
          parentNode.insertBefore(this.sortTarget, insertBeforeTab);
        }
        this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
        this.tabTriggers.forEach((tabTrigger, index) => {
          var _a;
          const active = tabTrigger.tabId ===
            ((_a = this.sortTarget) === null || _a === void 0 ? void 0 : _a.getAttribute('tab-id'));
          if (active) {
            this.focused = index;
          }
        });
        this.focusTab(this.initialSortIndex);
        afterNextRenderTimeout(() => {
          this.focusTab(this.initialSortIndex);
        });
        break;
      case 'Enter':
        if (this.keyboardSort) {
          event.preventDefault();
          this.keyboardSort = false;
          this.ariaLiveAlert = 'sortComplete';
          this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
          this.tabTriggers.forEach((tabTrigger, index) => {
            var _a;
            const active = tabTrigger.tabId ===
              ((_a = this.sortTarget) === null || _a === void 0 ? void 0 : _a.getAttribute('tab-id'));
            if (active) {
              this.focused = index;
            }
          });
        }
        break;
      case 'Tab':
        if (this.keyboardSort) {
          this.keyboardSort = false;
          this.ariaLiveAlert = 'sortCancelled';
        }
        break;
      case 'Home':
        event.preventDefault();
        this.focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusTab(this.tabTriggers.length - 1);
        break;
    }
  }
  onKeyup(event) {
    switch (event.key) {
      case ' ':
        if (eventIsFrom('.gux-tab', event) &&
          !eventIsFrom('.gux-tab-options-button', event) &&
          !eventIsFrom('gux-popover-list', event) &&
          this.allowSort) {
          event.preventDefault();
          if (this.keyboardSort === true) {
            this.keyboardSort = false;
            this.ariaLiveAlert = 'sortComplete';
            this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
            this.tabTriggers.forEach((tabTrigger, index) => {
              var _a;
              const active = tabTrigger.tabId ===
                ((_a = this.sortTarget) === null || _a === void 0 ? void 0 : _a.getAttribute('tab-id'));
              if (active) {
                this.focused = index;
              }
            });
            this.focusTab(this.focused);
          }
          else {
            this.keyboardSort = true;
            this.sortTarget = event.target.parentNode.parentNode;
            this.tabTriggers.forEach((tabTrigger, index) => {
              var _a;
              const active = tabTrigger.tabId ===
                ((_a = this.sortTarget) === null || _a === void 0 ? void 0 : _a.getAttribute('tab-id'));
              if (active) {
                this.initialSortIndex = index;
              }
            });
            this.ariaLiveAlert = 'sortModeOn';
          }
        }
    }
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSetActive(activeTab) {
    this.tabTriggers.forEach((tabTrigger, index) => {
      const active = tabTrigger.tabId === activeTab;
      void tabTrigger.guxSetActive(active);
      if (active) {
        this.focused = index;
      }
    });
  }
  focusTab(tabIndex) {
    this.focused = tabIndex;
    this.tabTriggers.forEach((tabTrigger, index) => {
      void tabTrigger.guxGetActive().then(activeElement => {
        if (this.focused !== index && !activeElement) {
          tabTrigger
            .querySelector('.gux-tab-button')
            .setAttribute('tabindex', '-1');
          if (tabTrigger.querySelector('.gux-tab-options-button')) {
            tabTrigger
              .querySelector('.gux-tab-options-button')
              .setAttribute('tabindex', '-1');
          }
        }
      });
    });
    this.tabTriggers[this.focused]
      .querySelector('button')
      .setAttribute('tabindex', '0');
    if (this.tabTriggers[this.focused].querySelector('.gux-tab-options-button')) {
      this.tabTriggers[this.focused]
        .querySelector('.gux-tab-options-button')
        .setAttribute('tabindex', '0');
    }
    void this.tabTriggers[this.focused].guxFocus();
  }
  setTabTriggers() {
    this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
    if (this.tabTriggers) {
      this.triggerIds = Array.from(this.tabTriggers)
        .map(trigger => `gux-${trigger.getAttribute('tab-id')}-tab`)
        .join(' ');
    }
    else {
      this.triggerIds = '';
    }
  }
  createSortable() {
    this.sortableInstance = new Sortable(this.root.querySelector('.gux-scrollable-section'), {
      animation: 250,
      draggable: 'gux-tab-advanced',
      filter: '.ignore-sort',
      onMove: (event) => {
        return !event.related.classList.contains('ignore-sort');
      },
      onUpdate: () => {
        const tabIds = Array.from(this.root.querySelectorAll('gux-tab-advanced')).map(tabElement => tabElement.tabId);
        this.sortChanged.emit(tabIds);
      }
    });
  }
  destroySortable() {
    if (this.sortableInstance) {
      this.sortableInstance.destroy();
      this.sortableInstance = null;
    }
  }
  checkForScrollbarHideOrShow() {
    readTask(() => {
      const el = this.root.querySelector('.gux-scrollable-section');
      const hasScrollbar = el.clientWidth < el.scrollWidth;
      if (hasScrollbar !== this.hasScrollbar) {
        this.hasScrollbar = hasScrollbar;
      }
    });
  }
  handleKeyboardScroll(direction) {
    const scrollableSection = this.root.querySelector('.gux-scrollable-section');
    const currentTab = this.root.querySelectorAll('gux-tab-advanced')[this.focused];
    if (direction === 'forward') {
      if (this.focused < this.tabTriggers.length - 1) {
        writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(currentTab.clientWidth, 0);
          }
        });
        this.focusTab(this.focused + 1);
      }
      else {
        writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(-scrollableSection.scrollWidth, 0);
          }
        });
        this.focusTab(0);
      }
    }
    else if (direction === 'backward') {
      if (this.focused > 0) {
        writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(-currentTab.clientWidth, 0);
          }
        });
        this.focusTab(this.focused - 1);
      }
      else {
        writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(scrollableSection.scrollWidth, 0);
          }
        });
        this.focusTab(this.tabTriggers.length - 1);
      }
    }
  }
  disconnectedCallback() {
    if (this.sortableInstance) {
      this.destroySortable();
    }
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.root.querySelector('.gux-tab-container'));
    }
    if (this.domObserver) {
      this.domObserver.disconnect();
    }
  }
  async componentWillLoad() {
    this.setTabTriggers();
    this.i18n = await buildI18nForComponent(this.root, tabsResources, 'gux-tabs-advanced');
  }
  componentDidLoad() {
    if (this.allowSort && !this.sortableInstance) {
      this.createSortable();
    }
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => this.checkForScrollbarHideOrShow());
    }
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.root.querySelector('.gux-scrollable-section'));
    }
    if (!this.domObserver && window.MutationObserver) {
      this.domObserver = new MutationObserver(() => this.checkForScrollbarHideOrShow());
    }
    if (this.domObserver) {
      this.domObserver.observe(this.root, {
        childList: true,
        attributes: false,
        subtree: true
      });
    }
    afterNextRenderTimeout(() => {
      this.checkForScrollbarHideOrShow();
    }, 500);
  }
  scrollLeft() {
    writeTask(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(-100, 0);
    });
  }
  scrollRight() {
    writeTask(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(100, 0);
    });
  }
  scrollUp() {
    writeTask(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(0, -100);
    });
  }
  scrollDown() {
    writeTask(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(0, 100);
    });
  }
  componentWillRender() {
    const tabs = Array.from(this.root.querySelectorAll('gux-tab-advanced'));
    this.disableAddTabButton = tabs.length >= this.tabLimit;
  }
  render() {
    const AddNewTabButton = (props) => {
      return (h("button", { title: this.disableAddTabButton
          ? this.i18n('disableNewTab')
          : this.root.querySelector('[slot="add-tab"]')
            ? this.root.querySelector('[slot="add-tab"]').textContent.trim()
            : this.i18n('createNewTab'), class: "add-tab-button", onClick: () => props.onClick(), disabled: this.disableAddTabButton }, h("slot", { name: "add-tab" }, h("gux-icon", { "icon-name": "add", decorative: true }))));
    };
    return [
      h("span", { class: "gux-sr-only gux-aria-live-region", "aria-live": "polite" }, this.ariaLiveAlert ? this.i18n(this.ariaLiveAlert) : ''),
      h("div", { class: "gux-tab-container" }, h("div", { class: "action-button-container" }, this.hasScrollbar
        ? this.renderScrollButton('scrollLeft')
        : this.renderScrollButton('scrollUp')), h("div", { role: "tablist", class: `gux-scrollable-section ${this.keyboardSort ? 'gux-tab-sorting' : ''}`, "aria-owns": this.triggerIds }, h("slot", null)), h("div", { class: "action-button-container" }, this.hasScrollbar
        ? this.renderScrollButton('scrollRight')
        : this.renderScrollButton('scrollDown'), this.showNewTabButton ? (h(AddNewTabButton, { onClick: () => this.newTab.emit() })) : null))
    ];
  }
  renderScrollButton(direction) {
    return (h("div", { class: "gux-scroll-button-container" }, this.hasScrollbar ? (h("button", { tabindex: "-1", title: this.i18n(direction), "aria-label": this.i18n(direction), class: "gux-scroll-button", onClick: () => this.getScrollDirection(direction) }, h("gux-icon", { "icon-name": this.getChevronIconName(direction), decorative: true }))) : null));
  }
  getScrollDirection(direction) {
    switch (direction) {
      case 'scrollLeft':
        this.scrollLeft();
        break;
      case 'scrollRight':
        this.scrollRight();
        break;
      case 'scrollUp':
        this.scrollUp();
        break;
      case 'scrollDown':
        this.scrollDown();
    }
  }
  getChevronIconName(direction) {
    switch (direction) {
      case 'scrollLeft':
        return 'chevron-left';
      case 'scrollRight':
        return 'chevron-right';
      case 'scrollUp':
        return 'chevron-up';
      case 'scrollDown':
        return 'chevron-down';
    }
  }
  static get is() { return "gux-tab-advanced-list"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-tab-advanced-list.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-tab-advanced-list.css"]
    };
  }
  static get properties() {
    return {
      "showNewTabButton": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Enable new tab button"
        },
        "attribute": "show-new-tab-button",
        "reflect": false,
        "defaultValue": "true"
      },
      "tabLimit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum nuber of tabs created"
        },
        "attribute": "tab-limit",
        "reflect": false,
        "defaultValue": "Infinity"
      },
      "allowSort": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Enable tab sorting by drag/drop"
        },
        "attribute": "allow-sort",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "focused": {},
      "disableAddTabButton": {},
      "tabTriggers": {},
      "hasScrollbar": {},
      "keyboardSort": {},
      "initialSortIndex": {},
      "sortTarget": {},
      "ariaLiveAlert": {}
    };
  }
  static get events() {
    return [{
        "method": "newTab",
        "name": "newTab",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggers when the new tab button is selected."
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "sortChanged",
        "name": "sortChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggers when the sorting of the tabs is changed."
        },
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "guxSetActive": {
        "complexType": {
          "signature": "(activeTab: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "root"; }
  static get listeners() {
    return [{
        "name": "focusin",
        "method": "onFocusin",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "focusout",
        "method": "onFocusout",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keydown",
        "method": "onKeydown",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "keyup",
        "method": "onKeyup",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxTabAdvancedList.prototype, "onMutation", null);
