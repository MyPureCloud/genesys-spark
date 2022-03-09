import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Method,
  Prop,
  readTask,
  State,
  writeTask
} from '@stencil/core';
import Sortable, { MoveEvent } from 'sortablejs';

import { OnMutation } from '../../../../utils/decorator/on-mutation';
import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import { eventIsFrom } from '../../../../utils/dom/event-is-from';

import tabsResources from '../i18n/en.json';

@Component({
  styleUrl: 'gux-tab-advanced-list.less',
  tag: 'gux-tab-advanced-list',
  shadow: false
})
export class GuxTabAdvancedList {
  private i18n: GetI18nValue;
  private moveFocusDelay: number = 100;
  private triggerIds: string;

  @Element()
  root: HTMLElement;

  /**
   * Enable new tab button
   */
  @Prop()
  showNewTabButton: boolean = true;

  /**
   * Maximum nuber of tabs created
   */
  @Prop()
  tabLimit: number = Infinity;

  /**
   * Enable tab sorting by drag/drop
   */
  @Prop()
  allowSort: boolean = true;

  @State()
  focused: number = 0;

  /**
   * Disable new tab button event
   */
  @State()
  disableAddTabButton: boolean = false;

  @State()
  tabTriggers: NodeListOf<HTMLGuxTabAdvancedElement>;

  /**
   * Tabs show scrollbar when tabs overflow container
   */
  @State()
  private hasScrollbar: boolean = false;

  /**
   * Keyboard sort has been triggered using space
   */
  @State()
  private keyboardSort: boolean = false;

  /**
   * Index of sort target before sort starts
   */
  @State()
  private initialSortIndex: number = 0;

  /**
   * Selected target for sort
   */
  @State()
  private sortTarget: Node;

  /**
   * Translation key for aria live alert for keyboard sort
   */
  @State()
  private ariaLiveAlert: string = '';

  /**
   * Triggers when the new tab button is selected.
   */
  @Event()
  newTab: EventEmitter;

  /**
   * Triggers when the sorting of the tabs is changed.
   */
  @Event()
  sortChanged: EventEmitter<string[]>;

  @Listen('focusin')
  onFocusin(event: FocusEvent) {
    if (
      this.allowSort &&
      eventIsFrom('.gux-scrollable-section', event) &&
      !this.keyboardSort
    ) {
      this.ariaLiveAlert = 'toggleSort';
    }
  }

  @Listen('focusout')
  onFocusout(event: FocusEvent) {
    if (
      !this.root
        .querySelector('.gux-scrollable-section')
        .contains(event.relatedTarget as Node)
    ) {
      this.tabTriggers.forEach(async (tabTrigger, index) => {
        const activeElement = await tabTrigger.guxGetActive();

        if (activeElement) {
          this.focused = index;
        } else {
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
    }
  }

  private sortableInstance?: Sortable;

  private resizeObserver?: ResizeObserver;

  private domObserver?: MutationObserver;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.setTabTriggers();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        if (
          this.keyboardSort &&
          !eventIsFrom('.gux-tab-options-button', event)
        ) {
          this.ariaLiveAlert = '';
          const parentNode = this.root.querySelector('.gux-scrollable-section');
          const allNodes = parentNode.querySelectorAll('gux-tab-advanced');
          const targetNodeIndex = Array.prototype.indexOf.call(
            allNodes,
            this.sortTarget
          ) as number;
          let insertBeforeTab: Node;
          if (targetNodeIndex === allNodes.length - 1) {
            insertBeforeTab = allNodes[0];
          } else {
            insertBeforeTab = allNodes[targetNodeIndex + 2];
          }
          parentNode.insertBefore(this.sortTarget, insertBeforeTab);

          this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
          this.tabTriggers.forEach((tabTrigger, index) => {
            const active =
              tabTrigger.tabId ===
              (this.sortTarget as Element).getAttribute('tab-id');
            if (active) {
              this.focused = index;
            }
          });

          this.focusTab(this.focused);
        } else if (
          !eventIsFrom('.gux-tab-options-button', event) &&
          !eventIsFrom('.gux-dropdown-option-container', event)
        ) {
          this.handleKeyboardScroll('forward');
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        if (
          this.keyboardSort &&
          !eventIsFrom('.gux-tab-options-button', event)
        ) {
          this.ariaLiveAlert = '';
          const parentNode = this.root.querySelector('.gux-scrollable-section');
          const allNodes = parentNode.querySelectorAll('gux-tab-advanced');
          const targetNodeIndex = Array.prototype.indexOf.call(
            allNodes,
            this.sortTarget
          );
          const insertBeforeTab = allNodes[targetNodeIndex - 1] || null;
          parentNode.insertBefore(this.sortTarget, insertBeforeTab);
          this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
          this.tabTriggers.forEach((tabTrigger, index) => {
            const active =
              tabTrigger.tabId ===
              (this.sortTarget as Element).getAttribute('tab-id');
            if (active) {
              this.focused = index;
            }
          });
          this.focusTab(this.focused);
        } else if (
          !eventIsFrom('.gux-tab-options-button', event) &&
          !eventIsFrom('.gux-dropdown-option-container', event)
        ) {
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
          const active =
            tabTrigger.tabId ===
            (this.sortTarget as Element).getAttribute('tab-id');
          if (active) {
            this.focused = index;
          }
        });
        this.focusTab(this.initialSortIndex);
        setTimeout(() => {
          this.focusTab(this.initialSortIndex);
        }, this.moveFocusDelay);

        break;
      case 'Enter':
        if (this.keyboardSort) {
          event.preventDefault();
          this.keyboardSort = false;
          this.ariaLiveAlert = 'sortComplete';
          this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
          this.tabTriggers.forEach((tabTrigger, index) => {
            const active =
              tabTrigger.tabId ===
              (this.sortTarget as Element).getAttribute('tab-id');
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

  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        if (
          eventIsFrom('.gux-tab', event) &&
          !eventIsFrom('.gux-tab-options-button', event) &&
          !eventIsFrom('gux-popover', event) &&
          this.allowSort
        ) {
          event.preventDefault();
          if (this.keyboardSort === true) {
            this.keyboardSort = false;
            this.ariaLiveAlert = 'sortComplete';
            this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
            this.tabTriggers.forEach((tabTrigger, index) => {
              const active =
                tabTrigger.tabId ===
                (this.sortTarget as Element).getAttribute('tab-id');
              if (active) {
                this.focused = index;
              }
            });
            this.focusTab(this.focused);
          } else {
            this.keyboardSort = true;
            this.sortTarget = (event.target as Element).parentNode.parentNode;
            this.tabTriggers.forEach((tabTrigger, index) => {
              const active =
                tabTrigger.tabId ===
                (this.sortTarget as Element).getAttribute('tab-id');
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
  @Method()
  async guxSetActive(activeTab: string): Promise<void> {
    this.tabTriggers.forEach((tabTrigger, index) => {
      const active = tabTrigger.tabId === activeTab;

      void tabTrigger.guxSetActive(active);

      if (active) {
        this.focused = index;
      }
    });
  }

  private focusTab(tabIndex: number): void {
    this.focused = tabIndex;
    this.tabTriggers.forEach(async (tabTrigger, index) => {
      const activeElement = await tabTrigger.guxGetActive();
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
    this.tabTriggers[this.focused]
      .querySelector('button')
      .setAttribute('tabindex', '0');
    if (
      this.tabTriggers[this.focused].querySelector('.gux-tab-options-button')
    ) {
      this.tabTriggers[this.focused]
        .querySelector('.gux-tab-options-button')
        .setAttribute('tabindex', '0');
    }
    void this.tabTriggers[this.focused].guxFocus();
  }

  private setTabTriggers(): void {
    this.tabTriggers = this.root.querySelectorAll('gux-tab-advanced');
    if (this.tabTriggers) {
      this.triggerIds = Array.from(this.tabTriggers)
        .map(trigger => `gux-${trigger.getAttribute('tab-id')}-tab`)
        .join(' ');
    } else {
      this.triggerIds = '';
    }
  }

  createSortable() {
    this.sortableInstance = new Sortable(
      this.root.querySelector('.gux-scrollable-section'),
      {
        animation: 250,
        draggable: 'gux-tab-advanced',
        filter: '.ignore-sort',
        onMove: (event: MoveEvent) => {
          return !event.related.classList.contains('ignore-sort');
        },
        onUpdate: () => {
          const tabIds = Array.from(
            this.root.querySelectorAll('gux-tab-advanced')
          ).map(tabElement => tabElement.tabId);
          this.sortChanged.emit(tabIds);
        }
      }
    );
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
      const hasScrollbar = el.clientWidth !== el.scrollWidth;

      if (hasScrollbar !== this.hasScrollbar) {
        this.hasScrollbar = hasScrollbar;
      }
    });
  }

  handleKeyboardScroll(direction: 'forward' | 'backward'): void {
    const scrollableSection = this.root.querySelector(
      '.gux-scrollable-section'
    );
    const currentTab =
      this.root.querySelectorAll('gux-tab-advanced')[this.focused];

    if (direction === 'forward') {
      if (this.focused < this.tabTriggers.length - 1) {
        writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(currentTab.clientWidth, 0);
          }
        });
        this.focusTab(this.focused + 1);
      } else {
        writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(-scrollableSection.scrollWidth, 0);
          }
        });
        this.focusTab(0);
      }
    } else if (direction === 'backward') {
      if (this.focused > 0) {
        writeTask(() => {
          if (this.hasScrollbar) {
            scrollableSection.scrollBy(-currentTab.clientWidth, 0);
          }
        });
        this.focusTab(this.focused - 1);
      } else {
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
      this.resizeObserver.unobserve(
        this.root.querySelector('.gux-tab-container')
      );
    }

    if (this.domObserver) {
      this.domObserver.disconnect();
    }
  }

  async componentWillLoad(): Promise<void> {
    this.setTabTriggers();
    this.i18n = await buildI18nForComponent(this.root, tabsResources);
  }

  componentDidLoad() {
    if (this.allowSort && !this.sortableInstance) {
      this.createSortable();
    }

    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() =>
        this.checkForScrollbarHideOrShow()
      );
    }

    if (this.resizeObserver) {
      this.resizeObserver.observe(
        this.root.querySelector('.gux-scrollable-section')
      );
    }

    if (!this.domObserver && window.MutationObserver) {
      this.domObserver = new MutationObserver(() =>
        this.checkForScrollbarHideOrShow()
      );
    }

    if (this.domObserver) {
      this.domObserver.observe(this.root, {
        childList: true,
        attributes: false,
        subtree: true
      });
    }

    setTimeout(() => {
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
    const tabs: HTMLGuxTabAdvancedElement[] = Array.from(
      this.root.querySelectorAll('gux-tab-advanced')
    );
    if (tabs.length >= this.tabLimit) {
      this.disableAddTabButton = true;
    }
  }

  render(): JSX.Element {
    const AddNewTabButton = (props: { onClick: () => void }) => {
      return (
        <button
          title={
            this.disableAddTabButton
              ? this.i18n('disableNewTab')
              : this.i18n('createNewTab')
          }
          class="add-tab"
          onClick={() => props.onClick()}
          disabled={this.disableAddTabButton}
        >
          <gux-icon icon-name="add" decorative={true} />
        </button>
      ) as JSX.Element;
    };
    return [
      <span class="gux-sr-only gux-aria-live-region" aria-live="polite">
        {this.ariaLiveAlert ? this.i18n(this.ariaLiveAlert) : ''}
      </span>,
      <div class="gux-tab-container">
        <div class="action-button-container">
          {this.hasScrollbar
            ? this.renderScrollButton('scrollLeft')
            : this.renderScrollButton('scrollUp')}
        </div>

        <div
          role="tablist"
          class={`gux-scrollable-section ${
            this.keyboardSort ? 'gux-tab-sorting' : ''
          }`}
          aria-owns={this.triggerIds}
        >
          <slot></slot>
        </div>
        <div class="new-tab">
          {this.showNewTabButton && !this.hasScrollbar ? (
            <AddNewTabButton onClick={() => this.newTab.emit()} />
          ) : null}
        </div>

        <div class="action-button-container">
          {this.hasScrollbar
            ? this.renderScrollButton('scrollRight')
            : this.renderScrollButton('scrollDown')}

          {this.showNewTabButton && this.hasScrollbar ? (
            <AddNewTabButton onClick={() => this.newTab.emit()} />
          ) : null}
        </div>
      </div>
    ] as JSX.Element;
  }

  private renderScrollButton(direction: string): JSX.Element {
    return (
      <div class="gux-scroll-button-container">
        {this.hasScrollbar ? (
          <button
            tabindex="-1"
            title={this.i18n(direction)}
            aria-label={this.i18n(direction)}
            class="gux-scroll-button"
            onClick={() => this.getScrollDirection(direction)}
          >
            <gux-icon
              icon-name={this.getChevronIconName(direction)}
              decorative={true}
            />
          </button>
        ) : null}
      </div>
    ) as JSX.Element;
  }

  private getScrollDirection(direction: string): void {
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

  private getChevronIconName(direction: string): string {
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
}
