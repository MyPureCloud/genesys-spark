import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  readTask,
  State,
  writeTask
} from '@stencil/core';
import ResizeObserver from 'resize-observer-polyfill';
import Sortable, { MoveEvent } from 'sortablejs';

@Component({
  styleUrl: 'gux-tabs.less',
  tag: 'gux-tabs'
})
export class GuxTabs {
  /**
   * Triggers when the new tab button is selected.
   */
  @Event() newTab: EventEmitter;

  /**
   * Triggers when the sorting of the tabs is changed.
   */
  @Event() sortChanged: EventEmitter;

  @Element() private element: HTMLElement;

  @State() private hasScrollbar: boolean = false;

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

    if (this.element instanceof window.Element) {
      this.resizeObserver.unobserve(this.element.querySelector('.gux-tabs'));
    }
  }

  componentDidLoad() {
    if (!this.sortableInstance) {
      this.createSortable();
    }

    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        readTask(() => {
          const el = this.element.querySelector('.scrollable-section');
          this.hasScrollbar = el.clientWidth !== el.scrollWidth;
        });
      });
    }

    if (this.element instanceof window.Element) {
      this.resizeObserver.observe(this.element.querySelector('.gux-tabs'));
    }
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
    }, 200);
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
