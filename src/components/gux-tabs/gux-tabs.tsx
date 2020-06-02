import { Component, Element, h, State } from '@stencil/core'; // , Element, Method, Prop
import Sortable from 'sortablejs';

@Component({
  styleUrl: 'gux-tabs.less',
  tag: 'gux-tabs'
})
export class GuxTabs {
  sortableInstance?: Sortable;

  @State() popoverHidden: boolean = true;

  @Element() private element: HTMLElement;

  createSortable() {
    this.sortableInstance = new Sortable(
      this.element.querySelector('.gux-tabs'),
      { animation: 250 }
    );
  }

  destroySortable() {
    if (this.sortableInstance) {
      this.sortableInstance.destroy();
      this.sortableInstance = null;
    }
  }

  componentDidRender() {
    if (!this.sortableInstance) {
      this.createSortable();
    }
  }

  toggleOptions(e: MouseEvent) {
    this.popoverHidden = !this.popoverHidden;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  selectTab() {
    this.popoverHidden = true;
  }

  render() {
    return (
      <div>
        <div class="gux-tabs">
          <button
            class="gux-tab selected"
            onClick={() => this.selectTab()}
            role="button"
          >
            <div class="tab-icon-container">
              <gux-icon iconName="ic-locked" decorative={true}></gux-icon>
            </div>
            <span class="tab-title" title="Title of tab">
              Title of tab
            </span>
            <button
              id="tab1"
              class="tab-dropdown-container"
              onClick={(e: MouseEvent) => this.toggleOptions(e)}
            >
              <gux-icon iconName="ellipsis-v" decorative={true}></gux-icon>
            </button>
          </button>

          <gux-popover
            id="popover-example"
            position="top-start"
            for="tab1"
            hideClose={true}
            hidden={this.popoverHidden}
          >
            <button
              class="tab-dropdown-option"
              onClick={() => this.selectTab()}
            >
              <gux-icon iconName="ic-pencil" decorative={true}></gux-icon>
              <span> Edit... </span>
            </button>
            <button
              class="tab-dropdown-option"
              onClick={() => this.selectTab()}
            >
              <gux-icon iconName="ic-clone" decorative={true}></gux-icon>
              <span> Clone </span>
            </button>
            <button
              class="tab-dropdown-option"
              onClick={() => this.selectTab()}
            >
              <gux-icon iconName="ic-share" decorative={true}></gux-icon>
              <span> Share... </span>
            </button>
            <button
              class="tab-dropdown-option"
              onClick={() => this.selectTab()}
            >
              <gux-icon iconName="ic-download" decorative={true}></gux-icon>
              <span> Download... </span>
            </button>
          </gux-popover>

          <button class="gux-tab" onClick={() => this.selectTab()}>
            <div class="tab-icon-container">
              <gux-icon iconName="ic-locked" decorative={true}></gux-icon>
            </div>
            <span class="tab-title" title="Title of tab title title">
              Title of tab title title
            </span>
            <button
              id="tab2"
              class="tab-dropdown-container"
              onClick={(e: MouseEvent) => this.toggleOptions(e)}
            >
              <gux-icon iconName="ellipsis-v" decorative={true}></gux-icon>
            </button>
          </button>

          <gux-popover
            id="popover-example"
            position="top-start"
            for="tab2"
            hide-close={true}
            hidden={this.popoverHidden}
          >
            <button
              class="tab-dropdown-option"
              onClick={() => this.selectTab()}
            >
              <gux-icon iconName="ic-pencil" decorative={true}></gux-icon>
              <span> Edit... </span>
            </button>
            <button
              class="tab-dropdown-option"
              onClick={() => this.selectTab()}
            >
              <gux-icon iconName="ic-clone" decorative={true}></gux-icon>
              <span> Clone </span>
            </button>
            <button
              class="tab-dropdown-option"
              onClick={() => this.selectTab()}
            >
              <gux-icon iconName="ic-share" decorative={true}></gux-icon>
              <span> Share... </span>
            </button>
            <button
              class="tab-dropdown-option"
              onClick={() => this.selectTab()}
            >
              <gux-icon iconName="ic-download" decorative={true}></gux-icon>
              <span> Download... </span>
            </button>
          </gux-popover>
        </div>
      </div>
    );
  }
}
