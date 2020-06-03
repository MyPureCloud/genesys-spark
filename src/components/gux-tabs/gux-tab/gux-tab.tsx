import { Component, h, Prop, State } from '@stencil/core';

@Component({
  styleUrl: 'gux-tab.less',
  tag: 'gux-tab'
})
export class GuxTab {
  @Prop() selected: boolean = false;
  @Prop() title: string = '';
  @Prop() index: number = 0;

  @State() popoverHidden: boolean = true;

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
      <button
        class={`gux-tab ${this.selected ? 'selected' : ''}`}
        onClick={() => this.selectTab()}
        role="button"
      >
        <div class="tab-icon-container">
          <gux-icon iconName="ic-locked" decorative={true}></gux-icon>
        </div>
        <span class="tab-title" title="Title of tab">
          {this.title}
        </span>
        <button
          id={`tab${this.index}`}
          class="tab-dropdown-container"
          onClick={(e: MouseEvent) => this.toggleOptions(e)}
        >
          <gux-icon iconName="ellipsis-v" decorative={true}></gux-icon>
        </button>

        <gux-popover
          id="popover-example"
          position="top-start"
          for={`tab${this.index}`}
          hideClose={true}
          hidden={this.popoverHidden}
        >
          <button class="tab-dropdown-option" onClick={() => this.selectTab()}>
            <gux-icon iconName="ic-pencil" decorative={true}></gux-icon>
            <span> Edit... </span>
          </button>
          <button class="tab-dropdown-option" onClick={() => this.selectTab()}>
            <gux-icon iconName="ic-clone" decorative={true}></gux-icon>
            <span> Clone </span>
          </button>
          <button class="tab-dropdown-option" onClick={() => this.selectTab()}>
            <gux-icon iconName="ic-share" decorative={true}></gux-icon>
            <span> Share... </span>
          </button>
          <button class="tab-dropdown-option" onClick={() => this.selectTab()}>
            <gux-icon iconName="ic-download" decorative={true}></gux-icon>
            <span> Download... </span>
          </button>
        </gux-popover>
      </button>
    );
  }
}
