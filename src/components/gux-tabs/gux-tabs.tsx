import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  // Listen,
  Prop,
  readTask,
  State,
  writeTask
} from '@stencil/core';
import Sortable, { MoveEvent } from 'sortablejs';

@Component({
  styleUrl: 'gux-tabs.less',
  tag: 'gux-tabs'
})
export class GuxTabs {
  /**
   * Enable tab sorting by drag/drop
   */
  @Prop() allowSort: boolean = true;

  /**
   * Triggers when the new tab button is selected.
   */
  @Event() newTab: EventEmitter;

  @Event() input: EventEmitter;

  /**
   * Triggers when the sorting of the tabs is changed.
   */
  @Event() sortChanged: EventEmitter;

  @Element() private element: HTMLElement;

  @State() private hasScrollbar: boolean = false;

  // @Listen('selected')
  // selectedHandler(event: CustomEvent<string>) {
  //   this.input.emit(event.detail);
  // }

  private sortableInstance?: Sortable;

  private resizeObserver?: ResizeObserver;

  createSortable() {
    this.sortableInstance = new Sortable(
      this.element.querySelector('.scrollable-section'),
      {
        animation: 250,
        filter: '.ignore-sort',
        onMove: (event: MoveEvent) => {
          return !event.related.classList.contains('ignore-sort');
        },
        onUpdate: () => {
          this.sortChanged.emit();
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

  disconnectedCallback() {
    if (this.sortableInstance) {
      this.destroySortable();
    }

    this.resizeObserver?.unobserve(this.element.querySelector('.gux-tabs'));
  }

  componentDidLoad() {
    if (this.allowSort && !this.sortableInstance) {
      this.createSortable();
    }

    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        readTask(() => {
          const el = this.element.querySelector('.scrollable-section');
          this.hasScrollbar = el.clientWidth !== el.scrollWidth;
        });
      });
    }

    this.resizeObserver?.observe(this.element.querySelector('.gux-tabs'));

    const tabElements = this.element.querySelectorAll('gux-tab');
    tabElements.forEach(tab => {
      tab.addEventListener('click', () => {
        if ((tab as HTMLGuxTabElement).active) {
          return;
        }

        tabElements.forEach(t => {
          (t as HTMLGuxTabElement).active = false;
        });

        (tab as HTMLGuxTabElement).active = true;
      });
    });
  }

  componentDidRender() {
    setTimeout(() => {
      readTask(() => {
        const el = this.element.querySelector('.scrollable-section');
        const hasScrollbar = el.clientWidth !== el.scrollWidth;
        if (this.hasScrollbar !== hasScrollbar) {
          this.hasScrollbar = hasScrollbar;
        }
      });
    }, 500);
  }

  scrollLeft() {
    writeTask(() => {
      this.element.querySelector('.scrollable-section').scrollBy(-100, 0);
    });
  }

  scrollRight() {
    writeTask(() => {
      this.element.querySelector('.scrollable-section').scrollBy(100, 0);
    });
  }

  render() {
    return (
      <div class="gux-tabs">
        <div class="action-button-container">
          {this.hasScrollbar ? (
            <button
              title="Create New Tab"
              class="arrow-button"
              onClick={() => this.scrollLeft()}
            >
              <gux-icon iconName="ic-chevron-left" decorative={true} />
            </button>
          ) : null}
        </div>
        <div class="scrollable-section">
          <slot />
          {this.hasScrollbar ? null : (
            <button
              title="Create New Tab"
              class="add-tab ignore-sort"
              onClick={() => this.newTab.emit()}
            >
              <gux-icon iconName="ic-add" decorative={true} />
            </button>
          )}
        </div>
        <div class="action-button-container">
          {this.hasScrollbar ? (
            <button
              title="Create New Tab"
              class="arrow-button"
              onClick={() => this.scrollRight()}
            >
              <gux-icon iconName="ic-chevron-right" decorative={true} />
            </button>
          ) : null}

          {this.hasScrollbar ? (
            <button
              title="Create New Tab"
              class="add-tab"
              onClick={() => this.newTab.emit()}
            >
              <gux-icon iconName="ic-add" decorative={true} />
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
