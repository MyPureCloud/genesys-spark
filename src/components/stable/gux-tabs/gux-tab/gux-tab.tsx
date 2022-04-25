import {
  Component,
  Event,
  EventEmitter,
  h,
  JSX,
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
  private tooltipTitleElement: HTMLGuxTooltipTitleElement;

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

  @Listen('focusin')
  onFocusin() {
    void this.tooltipTitleElement.setShowTooltip();
  }

  @Listen('focusout')
  onFocusout() {
    void this.tooltipTitleElement.setHideTooltip();
  }

  @Event()
  internalactivatetabpanel: EventEmitter<string>;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxSetActive(active: boolean): Promise<void> {
    this.active = active;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxFocus(): Promise<void> {
    this.buttonElement.focus();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxGetActive() {
    return this.active;
  }

  render(): JSX.Element {
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
        <gux-tooltip-title ref={el => (this.tooltipTitleElement = el)}>
          <slot />
        </gux-tooltip-title>
      </button>
    ) as JSX.Element;
  }
}
