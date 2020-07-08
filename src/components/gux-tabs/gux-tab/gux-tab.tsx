import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
  writeTask
} from '@stencil/core';

@Component({
  styleUrl: 'gux-tab.less',
  tag: 'gux-tab'
})
export class GuxTab {
  /**
   * unique id for the tab
   */
  @Prop() tabId: string;

  /**
   * indicates whether or not the tab is selected
   */
  @Prop() active: boolean = false;

  /**
   * indicates the gux-icon to display on the left side of the tab (similar to a favicon in the browser)
   */
  @Prop() tabIconName: string;

  /**
   * Triggers when the tab is selected
   * @returns the id of the tab
   */
  @Event() selected: EventEmitter<string>;

  @State() private popoverHidden: boolean = true;
  @State() private hasAnimated: boolean = false;

  @Element() private element: HTMLElement;

  toggleOptions(e: MouseEvent) {
    this.popoverHidden = !this.popoverHidden;
    e.stopPropagation();
  }

  onSelectDropdownOption(e: MouseEvent) {
    this.popoverHidden = true;
    e.stopPropagation();
  }

  selectTab() {
    this.popoverHidden = true;
    if (!this.active) {
      this.selected.emit(this.tabId);
    }
  }

  componentDidLoad() {
    if (!this.hasAnimated) {
      writeTask(() => {
        this.element.querySelector('.gux-tab').classList.add('show');
        this.hasAnimated = true;
      });
    }
  }

  render() {
    return (
      <button
        class={`gux-tab ${this.active ? 'selected' : ''}`}
        onClick={() => this.selectTab()}
        role="button"
      >
        {this.tabIconName ? (
          <div class="tab-icon-container">
            <gux-icon iconName={this.tabIconName} decorative={true}></gux-icon>
          </div>
        ) : null}
        <span class="tab-title">
          <slot name="title" />
        </span>
        <button
          id={this.tabId}
          class="tab-dropdown-container"
          onClick={(e: MouseEvent) => this.toggleOptions(e)}
        >
          <gux-icon iconName="ellipsis-v" decorative={true}></gux-icon>
        </button>

        <gux-popover
          id="popover-example"
          position="top-start"
          for={this.tabId}
          hideClose={true}
          hidden={this.popoverHidden}
          closeOnClickOutside={true}
          onClose={() => (this.popoverHidden = true)}
        >
          <div onClick={(e: MouseEvent) => this.onSelectDropdownOption(e)}>
            <slot name="dropdown-options" />
          </div>
        </gux-popover>
      </button>
    );
  }
}
