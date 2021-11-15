import {
  Component,
  Event,
  EventEmitter,
  h,
  JSX,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

@Component({
  styleUrl: 'gux-tab-panel.less',
  tag: 'gux-tab-panel',
  shadow: false
})
export class GuxTabPanel {
  /**
   * Tab id of the tab that is associated with the panel
   */
  @Prop()
  tabId: string;

  @State()
  active: boolean = false;

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
      <div
        id={`gux-${this.tabId}-panel`}
        role="tabpanel"
        aria-labelledby={`gux-${this.tabId}-tab`}
        tabIndex={0}
        hidden={!this.active}
      >
        <slot></slot>
      </div>
    );
  }
}
