import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State,
  writeTask
} from '@stencil/core';

import { eventIsFrom } from '../../../../utils/dom/event-is-from';
import { randomHTMLId } from '../../../../utils/dom/random-html-id';

@Component({
  styleUrl: 'gux-tab.less',
  tag: 'gux-tab'
})
export class GuxTab {
  private dropdownOptionsButtonId: string = randomHTMLId();
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

  @State() private popoverHidden: boolean = true;
  @State() private hasAnimated: boolean = false;

  @Element()
  private root: HTMLElement;

  @Event()
  private internaltabselected: EventEmitter<void>;

  private get hasDropdownOptions(): boolean {
    return Boolean(this.root.querySelector('[slot="dropdown-options"]'));
  }

  private toggleOptions(): void {
    this.popoverHidden = !this.popoverHidden;
  }

  private onSelectDropdownOption(e: MouseEvent): void {
    this.popoverHidden = true;
    e.stopPropagation();
  }

  private selectTab(e: MouseEvent): void {
    if (eventIsFrom('.gux-tab-options-button', e)) {
      return;
    }

    this.popoverHidden = true;
    this.internaltabselected.emit();
  }

  private getDropdownOptions(): JSX.Element {
    if (this.hasDropdownOptions) {
      return [
        <button
          id={this.dropdownOptionsButtonId}
          type="button"
          class="gux-tab-options-button"
          onClick={() => this.toggleOptions()}
        >
          <gux-icon
            icon-name="menu-kebab-vertical"
            decorative={true}
          ></gux-icon>
        </button>,
        <gux-popover
          position="top-end"
          for={this.dropdownOptionsButtonId}
          displayDismissButton={false}
          hidden={this.popoverHidden}
          closeOnClickOutside={true}
          onGuxdismiss={() => (this.popoverHidden = true)}
        >
          <div onClick={(e: MouseEvent) => this.onSelectDropdownOption(e)}>
            <slot name="dropdown-options" />
          </div>
        </gux-popover>
      ];
    }

    return null;
  }

  componentDidLoad(): void {
    if (!this.hasAnimated) {
      writeTask(() => {
        this.root.querySelector('.gux-tab').classList.add('gux-show');
        this.hasAnimated = true;
      });
    }
  }

  render(): JSX.Element {
    return (
      <button
        type="button"
        class={`gux-tab ${this.active ? 'selected' : ''}`}
        onClick={e => this.selectTab(e)}
        role="button"
      >
        {this.tabIconName ? (
          <div class="tab-icon-container">
            <gux-icon icon-name={this.tabIconName} decorative={true}></gux-icon>
          </div>
        ) : null}
        <span class="tab-title">
          <slot name="title" />
        </span>

        {this.getDropdownOptions()}
      </button>
    );
  }
}
