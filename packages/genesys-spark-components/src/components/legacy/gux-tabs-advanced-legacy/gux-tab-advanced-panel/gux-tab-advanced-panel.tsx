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

/**
 * @slot - content
 */

@Component({
  styleUrl: 'gux-tab-advanced-panel.scss',
  tag: 'gux-tab-advanced-panel-legacy',
  shadow: false
})
export class GuxTabAdvancedPanelLegacy {
  @Prop()
  tabId: string;

  @State()
  active: boolean = false;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxSetActive(active: boolean): Promise<void> {
    this.active = active;
  }

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
        aria-live="assertive"
      >
        <slot></slot>
      </div>
    ) as JSX.Element;
  }
}
