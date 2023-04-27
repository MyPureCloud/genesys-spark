'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const sortable_esm = require('./sortable.esm-73cf219b.js');
const onMutation = require('./on-mutation-83dff2a7.js');
const eventIsFrom = require('./event-is-from-ad1044f2.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const index$1 = require('./index-c4441830.js');
const en = require('./en-eb56dc17.js');
require('./get-closest-element-ab4b2eee.js');

const guxTabAdvancedListCss = "gux-tab-advanced-list .gux-tab-container{display:flex;align-items:flex-end;width:100%;height:50px;margin-bottom:16px;overflow-x:auto;overflow-y:hidden;background-color:#f6f7f9;border-bottom:1px solid #d7dce5;border-radius:4px 4px 0 0}gux-tab-advanced-list .gux-tab-container .action-button-container{display:flex;border-radius:4px}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button{min-width:35px;height:50px;padding:0;margin-left:2px;color:#2e394c;background-color:#e2e6ee;border:none;border-radius:4px;transition:color 0.25s}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button [slot='add-tab']{display:inline-flex;align-items:center;padding:0 12px;white-space:nowrap;font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button [slot='add-tab'] gux-icon{padding-right:8px}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:disabled{opacity:0.5}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:hover{background-color:#d7dce5}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:active{background-color:#c8cfda}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:focus-visible{outline:none;box-shadow:inset 0 0 0 3px #aac9ff}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button:focus-visible{border-radius:5px;outline:none;box-shadow:inset 0 0 0 3px #aac9ff}gux-tab-advanced-list .gux-tab-container .action-button-container .add-tab-button gux-icon{width:16px;height:16px}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container{display:flex;border-radius:4px}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button{display:flex;align-items:center;justify-content:center;width:28px;height:50px;padding:0;color:#2e394c;background-color:#e2e6ee;border:none;border-radius:4px;transition:color 0.25s}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:focus-visible{border:3px solid #aac9ff;border-radius:5px;outline:none}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button gux-icon{width:16px;height:16px}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:focus-visible{border:3px solid #aac9ff;outline:none}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:hover{background-color:#d7dce5}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:active{background-color:#c8cfda}gux-tab-advanced-list .gux-tab-container .action-button-container .gux-scroll-button-container .gux-scroll-button:focus-visible{outline:3px solid #aac9ff;outline-offset:1px;box-shadow:0 0 0 1px #fdfdfd}gux-tab-advanced-list .gux-tab-container .gux-scrollable-section{display:flex;align-items:flex-end;height:50px;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none}gux-tab-advanced-list .gux-tab-container .gux-scrollable-section::-webkit-scrollbar{height:0}gux-tab-advanced-list .gux-sr-only{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const GuxTabAdvancedList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.newTab = index.createEvent(this, "newTab", 7);
    this.sortChanged = index.createEvent(this, "sortChanged", 7);
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
      eventIsFrom.eventIsFrom('.gux-scrollable-section', event) &&
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
          !eventIsFrom.eventIsFrom('.gux-tab-options-button', event)) {
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
        else if (!eventIsFrom.eventIsFrom('.gux-tab-options-button', event) &&
          !eventIsFrom.eventIsFrom('.gux-dropdown-option-container', event)) {
          this.handleKeyboardScroll('forward');
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        if (this.keyboardSort &&
          !eventIsFrom.eventIsFrom('.gux-tab-options-button', event)) {
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
        else if (!eventIsFrom.eventIsFrom('.gux-tab-options-button', event) &&
          !eventIsFrom.eventIsFrom('.gux-dropdown-option-container', event)) {
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
        afterNextRender.afterNextRenderTimeout(() => {
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
        if (eventIsFrom.eventIsFrom('.gux-tab', event) &&
          !eventIsFrom.eventIsFrom('.gux-tab-options-button', event) &&
          !eventIsFrom.eventIsFrom('gux-popover-list', event) &&
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
    this.sortableInstance = new sortable_esm.Sortable(this.root.querySelector('.gux-scrollable-section'), {
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
    index.readTask(() => {
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
        index.writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(currentTab.clientWidth, 0);
          }
        });
        this.focusTab(this.focused + 1);
      }
      else {
        index.writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(-scrollableSection.scrollWidth, 0);
          }
        });
        this.focusTab(0);
      }
    }
    else if (direction === 'backward') {
      if (this.focused > 0) {
        index.writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(-currentTab.clientWidth, 0);
          }
        });
        this.focusTab(this.focused - 1);
      }
      else {
        index.writeTask(() => {
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
    this.i18n = await index$1.buildI18nForComponent(this.root, en.tabsResources, 'gux-tabs-advanced');
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
    afterNextRender.afterNextRenderTimeout(() => {
      this.checkForScrollbarHideOrShow();
    }, 500);
  }
  scrollLeft() {
    index.writeTask(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(-100, 0);
    });
  }
  scrollRight() {
    index.writeTask(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(100, 0);
    });
  }
  scrollUp() {
    index.writeTask(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(0, -100);
    });
  }
  scrollDown() {
    index.writeTask(() => {
      this.root.querySelector('.gux-scrollable-section').scrollBy(0, 100);
    });
  }
  componentWillRender() {
    const tabs = Array.from(this.root.querySelectorAll('gux-tab-advanced'));
    this.disableAddTabButton = tabs.length >= this.tabLimit;
  }
  render() {
    const AddNewTabButton = (props) => {
      return (index.h("button", { title: this.disableAddTabButton
          ? this.i18n('disableNewTab')
          : this.root.querySelector('[slot="add-tab"]')
            ? this.root.querySelector('[slot="add-tab"]').textContent.trim()
            : this.i18n('createNewTab'), class: "add-tab-button", onClick: () => props.onClick(), disabled: this.disableAddTabButton }, index.h("slot", { name: "add-tab" }, index.h("gux-icon", { "icon-name": "add", decorative: true }))));
    };
    return [
      index.h("span", { class: "gux-sr-only gux-aria-live-region", "aria-live": "polite" }, this.ariaLiveAlert ? this.i18n(this.ariaLiveAlert) : ''),
      index.h("div", { class: "gux-tab-container" }, index.h("div", { class: "action-button-container" }, this.hasScrollbar
        ? this.renderScrollButton('scrollLeft')
        : this.renderScrollButton('scrollUp')), index.h("div", { role: "tablist", class: `gux-scrollable-section ${this.keyboardSort ? 'gux-tab-sorting' : ''}`, "aria-owns": this.triggerIds }, index.h("slot", null)), index.h("div", { class: "action-button-container" }, this.hasScrollbar
        ? this.renderScrollButton('scrollRight')
        : this.renderScrollButton('scrollDown'), this.showNewTabButton ? (index.h(AddNewTabButton, { onClick: () => this.newTab.emit() })) : null))
    ];
  }
  renderScrollButton(direction) {
    return (index.h("div", { class: "gux-scroll-button-container" }, this.hasScrollbar ? (index.h("button", { tabindex: "-1", title: this.i18n(direction), "aria-label": this.i18n(direction), class: "gux-scroll-button", onClick: () => this.getScrollDirection(direction) }, index.h("gux-icon", { "icon-name": this.getChevronIconName(direction), decorative: true }))) : null));
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
  get root() { return index.getElement(this); }
};
__decorate([
  onMutation.OnMutation({ childList: true, subtree: true })
], GuxTabAdvancedList.prototype, "onMutation", null);
GuxTabAdvancedList.style = guxTabAdvancedListCss;

exports.gux_tab_advanced_list = GuxTabAdvancedList;
