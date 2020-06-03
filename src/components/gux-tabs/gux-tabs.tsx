import { Component, Element, h } from '@stencil/core'; // , Element, Method, Prop
import Sortable, { MoveEvent } from 'sortablejs';

@Component({
  styleUrl: 'gux-tabs.less',
  tag: 'gux-tabs'
})
export class GuxTabs {
  sortableInstance?: Sortable;

  @Element() private element: HTMLElement;

  createSortable() {
    this.sortableInstance = new Sortable(
      this.element.querySelector('.gux-tabs'),
      {
        animation: 250,
        filter: '.ignore-sort',
        onMove: (event: MoveEvent) => {
          return !event.related.classList.contains('ignore-sort');
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
  }

  componentDidLoad() {
    if (!this.sortableInstance) {
      this.createSortable();
    }
  }

  render() {
    return (
      <div class="gux-tabs">
        <gux-tab title="Title of tab" selected={true} index={0}>
          {' '}
        </gux-tab>
        <gux-tab
          title="Title of tab title title"
          selected={false}
          index={1}
        ></gux-tab>
        <button title="Create New Tab" class="add-tab ignore-sort">
          <gux-icon iconName="ic-add" decorative={true}></gux-icon>
        </button>
      </div>
    );
  }
}
