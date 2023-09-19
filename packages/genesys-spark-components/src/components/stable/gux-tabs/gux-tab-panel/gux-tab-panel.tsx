import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

/**
 * @slot - content
 */

@Component({
  styleUrl: 'gux-tab-panel.scss',
  tag: 'gux-tab-panel',
  shadow: true
})
export class GuxTabPanel {
  /**
   * Tab id of the tab that is associated with the panel
   */
  @Prop()
  tabId: string;

  @State()
  active: boolean = false;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxSetActive(active: boolean): Promise<void> {
    this.active = active;
  }

  /**
   * Triggers when the active panel changes
   */
  @Event()
  guxactivepanelchange: EventEmitter<string>;

  @Watch('active')
  watchActivePanel() {
    if (this.active === true) {
      this.guxactivepanelchange.emit(this.tabId);
    }
  }

  render(): JSX.Element {
    return (
      <Host
        id={`gux-${this.tabId}-panel`}
        role="tabpanel"
        aria-labelledby={`gux-${this.tabId}-tab`}
        tabIndex={0}
        hidden={!this.active}
      >
        <slot></slot>
      </Host>
    ) as JSX.Element;
  }
}
