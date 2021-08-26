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
  styleUrl: 'gux-tab-beta.less',
  tag: 'gux-tab-beta',
  shadow: false
})
export class GuxTabBeta {
  private buttonElement: HTMLButtonElement;

  @Prop()
  tabId: string;

  @Prop()
  guxDisabled: boolean = false;

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

  render() {
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
        tabIndex={this.active ? 0 : -1}
        ref={el => (this.buttonElement = el)}
      >
        <gux-tooltip-title-beta tab-width={122}>
          <slot />
        </gux-tooltip-title-beta>
      </button>
    );
  }
}
