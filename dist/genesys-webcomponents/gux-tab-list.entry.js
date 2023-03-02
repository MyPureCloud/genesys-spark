import { r as registerInstance, k as readTask, m as writeTask, h, g as getElement } from './index-f583fcde.js';
import { a as afterNextRenderTimeout } from './after-next-render-ed0f7dcd.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { O as OnMutation } from './on-mutation-59e1cbf1.js';
import './get-closest-element-1597503c.js';

const scrollLeft = "Scroll Left";
const scrollRight = "Scroll Right";
const scrollUp = "Scroll Up";
const scrollDown = "Scroll Down";
const tabsResources = {
	scrollLeft: scrollLeft,
	scrollRight: scrollRight,
	scrollUp: scrollUp,
	scrollDown: scrollDown
};

const guxTabListCss = "gux-tabs[orientation='vertical']{height:100%}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container{display:flex;flex-direction:column;width:160px;max-width:160px;height:100%;margin-right:16px;border-right:1px solid #d7dce5}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scroll-button-container{width:100%}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scroll-button-container button{width:100%}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scrollable-section{flex-direction:column;height:100%;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;scroll-behavior:smooth}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab-container .gux-scrollable-section::-webkit-scrollbar{width:0;height:0}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab-container{height:40px;margin-bottom:16px;border-bottom:1px solid #d7dce5}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-scrollable-section{overflow-x:auto}gux-tabs .gux-tab-container{box-sizing:content-box;display:flex;width:100%;overflow-x:hidden;overflow-y:hidden;background-color:#fff}gux-tabs .gux-scrollable-section{display:flex;flex:1 1 auto;scroll-behavior:smooth;scrollbar-width:none}gux-tabs .gux-scrollable-section::-webkit-scrollbar{height:0}gux-tabs .gux-scroll-button-container{display:flex;border-radius:4px}gux-tabs .gux-scroll-button-container .gux-scroll-button{display:flex;align-items:center;justify-content:center;width:28px;height:40px;color:#202937;cursor:pointer;background-color:#c8cfda;background-color:#e2e6ee;border:none;border-radius:4px}gux-tabs .gux-scroll-button-container .gux-scroll-button gux-icon{width:16px;height:16px}gux-tabs .gux-scroll-button-container .gux-scroll-button:hover:not(:disabled){background-color:#d7dce5}gux-tabs .gux-scroll-button-container .gux-scroll-button:active:not(:disabled){background-color:#d2d8e5}gux-tabs .gux-scroll-button-container .gux-scroll-button:disabled{cursor:default;opacity:0.5}";

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
const GuxTabList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.focused = 0;
    this.tabTriggers = undefined;
    this.hasHorizontalScrollbar = false;
    this.hasVerticalScrollbar = false;
    this.isScrolledToBeginning = false;
    this.isScrolledToEnd = false;
  }
  onFocusout(event) {
    if (!this.root.contains(event.relatedTarget)) {
      this.tabTriggers.forEach(async (tabTrigger, index) => {
        const activeElement = await tabTrigger.guxGetActive();
        if (activeElement) {
          this.focused = index;
        }
        else {
          tabTrigger.querySelector('button').setAttribute('tabindex', '-1');
        }
      });
    }
  }
  onHasVerticalScrollBar() {
    this.checkDisabledScrollButtons();
  }
  onScroll() {
    this.checkDisabledScrollButtons();
  }
  onKeydown(event) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.handleKeyboardScroll('forward');
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.handleKeyboardScroll('backward');
        break;
      case 'Escape':
        event.preventDefault();
        this.focusTab(this.focused);
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
  onMutation() {
    this.setTabTriggers();
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
    this.tabTriggers.forEach(async (tabTrigger, index) => {
      const activeElement = await tabTrigger.guxGetActive();
      if (this.focused !== index && !activeElement) {
        tabTrigger.querySelector('button').setAttribute('tabindex', '-1');
      }
    });
    this.tabTriggers[this.focused]
      .querySelector('button')
      .setAttribute('tabindex', '0');
    void this.tabTriggers[this.focused].guxFocus();
  }
  setTabTriggers() {
    this.tabTriggers = this.root.querySelectorAll('gux-tab');
    if (this.tabTriggers) {
      this.triggerIds = Array.from(this.tabTriggers)
        .map(trigger => `gux-${trigger.getAttribute('tab-id')}-tab`)
        .join(' ');
    }
    else {
      this.triggerIds = '';
    }
  }
  checkForScrollbarHideOrShow() {
    readTask(() => {
      const el = this.root.querySelector('.gux-scrollable-section');
      const hasHorizontalScrollbar = el.clientWidth < el.scrollWidth;
      const hasVerticalScrollbar = el.clientHeight < el.scrollHeight;
      if (hasHorizontalScrollbar !== this.hasHorizontalScrollbar) {
        this.hasHorizontalScrollbar = hasHorizontalScrollbar;
      }
      if (hasVerticalScrollbar !== this.hasVerticalScrollbar) {
        this.hasVerticalScrollbar = hasVerticalScrollbar;
      }
      this.checkDisabledScrollButtons();
    });
  }
  handleKeyboardScroll(direction) {
    const scrollableSection = this.root.querySelector('.gux-scrollable-section');
    const currentTab = this.root.querySelectorAll('gux-tab')[this.focused];
    if (direction === 'forward') {
      if (this.focused < this.tabTriggers.length - 1) {
        writeTask(() => {
          this.hasHorizontalScrollbar
            ? scrollableSection.scrollBy(currentTab.clientWidth, 0)
            : scrollableSection.scrollBy(0, currentTab.clientHeight);
        });
        this.focusTab(this.focused + 1);
      }
      else {
        writeTask(() => {
          this.hasHorizontalScrollbar
            ? scrollableSection.scrollBy(-scrollableSection.scrollWidth, 0)
            : scrollableSection.scrollBy(0, -scrollableSection.scrollHeight);
        });
        this.focusTab(0);
      }
    }
    else if (direction === 'backward') {
      if (this.focused > 0) {
        writeTask(() => {
          this.hasHorizontalScrollbar
            ? scrollableSection.scrollBy(-currentTab.clientWidth, 0)
            : scrollableSection.scrollBy(0, -currentTab.clientHeight);
        });
        this.focusTab(this.focused - 1);
      }
      else {
        writeTask(() => {
          this.hasHorizontalScrollbar
            ? scrollableSection.scrollBy(scrollableSection.scrollWidth, 0)
            : scrollableSection.scrollBy(0, scrollableSection.scrollHeight);
        });
        this.focusTab(this.tabTriggers.length - 1);
      }
    }
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.root.querySelector('.gux-tab-container'));
    }
    if (this.domObserver) {
      this.domObserver.disconnect();
    }
  }
  async componentWillLoad() {
    this.setTabTriggers();
    this.i18n = await buildI18nForComponent(this.root, tabsResources, 'gux-tabs');
  }
  componentDidLoad() {
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
  checkDisabledScrollButtons() {
    const scrollContainer = this.root.querySelector('.gux-scrollable-section');
    if (this.hasHorizontalScrollbar) {
      const scrollLeft = scrollContainer.scrollLeft;
      const scrollLeftMax = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      this.isScrolledToBeginning = scrollLeft === 0;
      this.isScrolledToEnd = scrollLeftMax - scrollLeft === 0;
    }
    else {
      const scrollTop = scrollContainer.scrollTop;
      const scrollTopMax = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      this.isScrolledToBeginning = scrollTop === 0;
      this.isScrolledToEnd = scrollTopMax - scrollTop === 0;
    }
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
  render() {
    return (h("div", { class: "gux-tab-container" }, this.hasHorizontalScrollbar
      ? this.renderScrollButton('scrollLeft')
      : this.renderScrollButton('scrollUp'), h("div", { role: "tablist", class: "gux-scrollable-section", "aria-owns": this.triggerIds }, h("slot", null)), this.hasHorizontalScrollbar
      ? this.renderScrollButton('scrollRight')
      : this.renderScrollButton('scrollDown')));
  }
  renderScrollButton(direction) {
    return (h("div", { class: "gux-scroll-button-container" }, this.hasHorizontalScrollbar || this.hasVerticalScrollbar ? (h("button", { disabled: this.getButtonDisabled(direction), tabindex: "-1", title: this.i18n(direction), "aria-label": this.i18n(direction), class: "gux-scroll-button", onClick: () => this.getScrollDirection(direction) }, h("gux-icon", { "icon-name": this.getChevronIconName(direction), decorative: true }))) : null));
  }
  getButtonDisabled(direction) {
    switch (direction) {
      case 'scrollLeft':
      case 'scrollUp':
        return this.isScrolledToBeginning;
      case 'scrollRight':
      case 'scrollDown':
        return this.isScrolledToEnd;
    }
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
        return 'chevron-small-left';
      case 'scrollRight':
        return 'chevron-small-right';
      case 'scrollUp':
        return 'chevron-small-up';
      case 'scrollDown':
        return 'chevron-small-down';
    }
  }
  get root() { return getElement(this); }
};
__decorate([
  OnMutation({ childList: true, subtree: true })
], GuxTabList.prototype, "onMutation", null);
GuxTabList.style = guxTabListCss;

export { GuxTabList as gux_tab_list };
