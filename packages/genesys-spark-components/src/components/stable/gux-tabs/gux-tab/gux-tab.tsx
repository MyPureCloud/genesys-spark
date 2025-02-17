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

/**
 * @slot - text
 */

@Component({
  styleUrl: 'gux-tab.scss',
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    void this.tooltipTitleElement.setShowTooltip();
  }

  @Listen('focusout')
  onFocusout() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    void this.tooltipTitleElement.setHideTooltip();
  }

  @Event()
  internalactivatetabpanel: EventEmitter<string>;

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSetActive(active: boolean): Promise<void> {
    this.active = active;
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus(): Promise<void> {
    this.buttonElement.focus();
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxGetActive() {
    return this.active;
  }

  private getTabIndex(): number | null {
    if (this.guxDisabled) {
      return null;
    }
    if (this.active) {
      return 0;
    }
    return -1;
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
        disabled={this.guxDisabled}
        id={`gux-${this.tabId}-tab`}
        role="tab"
        aria-controls={`gux-${this.tabId}-panel`}
        aria-selected={this.active.toString()}
        tabIndex={this.getTabIndex()}
        ref={el => (this.buttonElement = el)}
      >
        <gux-tooltip-title ref={el => (this.tooltipTitleElement = el)}>
          <span>
            <slot />
          </span>
        </gux-tooltip-title>
      </button>
    ) as JSX.Element;
  }
}
