import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  readTask,
  State,
  Watch,
  writeTask
} from '@stencil/core';
import Sortable, { MoveEvent } from 'sortablejs';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import tabsResources from './i18n/en.json';
import { whenEventIsFrom } from '../../../common-utils';

@Component({
  styleUrl: 'gux-tabs.less',
  tag: 'gux-tabs-beta',
  shadow: true
})
export class GuxTabs {
  /**
   * Enable tab sorting by drag/drop
   */
  @Prop() allowSort: boolean = false;

  /**
   * Enable new tab button
   */
  @Prop() showNewTabButton: boolean = false;

  /**
   * tabId of the currently selected tab
   */
  @Prop() value: string = '';

  /**
   * Triggers when the new tab button is selected.
   */
  @Event() newTab: EventEmitter;

  /**
   * Triggers when a tab is selected.
   */
  @Event() input: EventEmitter;

  /**
   * Triggers when the sorting of the tabs is changed.
   */
  @Event() sortChanged: EventEmitter<string[]>;

  @Element() private element: HTMLElement;

  @State() private hasScrollbar: boolean = false;

  private i18n: GetI18nValue;

  private sortableInstance?: Sortable;

  private resizeObserver?: ResizeObserver;

  @Watch('value')
  watchHandler(newValue: string) {
    const tabs: HTMLGuxTabElement[] = Array.from(
      this.element.querySelectorAll('gux-tab')
    );

    for (const tab of tabs) {
      tab.active = tab.tabId === newValue;
    }
  }

  @Listen('click')
  clickHandler(e: MouseEvent) {
    whenEventIsFrom('gux-tab', e, elem => {
      const tab = elem as HTMLGuxTabElement;
      if (!tab.active) {
        this.value = tab.tabId;
        this.input.emit();
      }
    });
  }

  createSortable() {
    this.sortableInstance = new Sortable(this.element, {
      animation: 250,
      draggable: 'gux-tab',
      filter: '.ignore-sort',
      onMove: (event: MoveEvent) => {
        return !event.related.classList.contains('ignore-sort');
      },
      onUpdate: () => {
        const tabIds = Array.from(this.element.querySelectorAll('gux-tab')).map(
          tabElement => tabElement.tabId
        );
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

  disconnectedCallback() {
    if (this.sortableInstance) {
      this.destroySortable();
    }

    if (this.resizeObserver) {
      this.resizeObserver.unobserve(
        this.element.shadowRoot.querySelector('.gux-tabs')
      );
    }
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.element, tabsResources);
  }

  componentDidLoad() {
    if (this.allowSort && !this.sortableInstance) {
      this.createSortable();
    }

    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        readTask(() => {
          const el = this.element.shadowRoot.querySelector(
            '.scrollable-section'
          );
          this.hasScrollbar = el.clientWidth !== el.scrollWidth;
        });
      });
    }

    if (this.resizeObserver) {
      this.resizeObserver.observe(
        this.element.shadowRoot.querySelector('.gux-tabs')
      );
    }
  }

  componentDidRender() {
    setTimeout(() => {
      readTask(() => {
        const el = this.element.shadowRoot.querySelector('.scrollable-section');
        const hasScrollbar = el.clientWidth !== el.scrollWidth;
        if (this.hasScrollbar !== hasScrollbar) {
          this.hasScrollbar = hasScrollbar;
        }

        if (this.value) {
          const activeTab: any = this.element.querySelector(
            `gux-tab[tab-id='${this.value}']`
          );
          if (activeTab) {
            activeTab.active = true;
          }
        }
      });
    }, 500);
  }

  scrollLeft() {
    writeTask(() => {
      this.element.shadowRoot
        .querySelector('.scrollable-section')
        .scrollBy(-100, 0);
    });
  }

  scrollRight() {
    writeTask(() => {
      this.element.shadowRoot
        .querySelector('.scrollable-section')
        .scrollBy(100, 0);
    });
  }

  render() {
    const AddNewTabButton = (props: { onClick: () => void }) => {
      return (
        <button
          title={this.i18n('createNewTab')}
          class="add-tab"
          onClick={() => props.onClick()}
        >
          <gux-icon iconName="ic-add" decorative={true} />
        </button>
      );
    };
    return (
      <div class="gux-tabs">
        <div class="action-button-container">
          {this.hasScrollbar ? (
            <button
              title={this.i18n('scrollLeft')}
              class="arrow-button"
              onClick={() => this.scrollLeft()}
            >
              <gux-icon iconName="ic-chevron-left" decorative={true} />
            </button>
          ) : null}
        </div>
        <div class="scrollable-section">
          <slot />
          {this.showNewTabButton && !this.hasScrollbar ? (
            <AddNewTabButton onClick={() => this.newTab.emit()} />
          ) : null}
        </div>
        <div class="action-button-container">
          {this.hasScrollbar ? (
            <button
              title={this.i18n('scrollRight')}
              class="arrow-button"
              onClick={() => this.scrollRight()}
            >
              <gux-icon iconName="ic-chevron-right" decorative={true} />
            </button>
          ) : null}

          {this.showNewTabButton && this.hasScrollbar ? (
            <AddNewTabButton onClick={() => this.newTab.emit()} />
          ) : null}
        </div>
      </div>
    );
  }
}
