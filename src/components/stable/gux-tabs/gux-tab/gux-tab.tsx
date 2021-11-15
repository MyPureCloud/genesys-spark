import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State
} from '@stencil/core';

@Component({
  styleUrl: 'gux-tab.less',
  tag: 'gux-tab',
  shadow: false
})
export class GuxTab {
  private buttonElement: HTMLButtonElement;

  /**
   * Tab id for the tab
   */
  @Prop()
  tabId: string;

  /**
   * Specifies if tab is disabled
   */
  @Prop()
  guxDisabled: boolean = false;

  /**
   * Specifies if the tab title is just an icon
   */
  @Prop()
  iconOnly: boolean = false;

  @State()
  active: boolean = false;

  @Listen('click')
  onClick() {
    if (!this.active && !this.guxDisabled) {
      this.internalactivatetabpanel.emit(this.tabId);
    }
  }

  @Event()
  internalactivatetabpanel: EventEmitter<string>;

  @Method()
  async guxSetActive(active: boolean): Promise<void> {
    this.active = active;
  }

  @Method()
  async guxFocus(): Promise<void> {
    this.buttonElement.focus();
  }

  @Method()
  async guxGetActive() {
    return this.active;
  }

  render() {
    return (
      <button
        class={{
          'gux-disabled': this.guxDisabled,
          'gux-tab': true,
          'gux-active': this.active
        }}
        type="button"
        aria-disabled={this.guxDisabled.toString()}
        id={`gux-${this.tabId}-tab`}
        role="tab"
        aria-controls={`gux-${this.tabId}-panel`}
        aria-selected={this.active.toString()}
        tabIndex={this.active ? 0 : -1}
        ref={el => (this.buttonElement = el)}
      >
        <gux-tooltip-title tab-width={122}>
          <slot />
        </gux-tooltip-title>
      </button>
    );
  }
}
