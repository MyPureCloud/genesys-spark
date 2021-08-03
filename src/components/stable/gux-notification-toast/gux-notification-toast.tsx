import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Prop
} from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

import { GuxNotificationToastAccent } from './gux-notification-toast.types';

/**
 * @slot icon - Required slot for gux-icon
 * @slot title - Required slot for the notification toast title
 * @slot message - Required slot for the notification toast message
 */
@Component({
  styleUrl: 'gux-notification-toast.less',
  tag: 'gux-notification-toast'
})
export class GuxNotificationToast {
  /**
   * The component accent.
   */
  @Prop()
  accent: GuxNotificationToastAccent = 'neutral';

  @Event()
  guxdismiss: EventEmitter<void>;

  @Element()
  private root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.accent });
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class={`gux-icon gux-${this.accent}`}>
          <slot name="icon" />
        </div>

        <div class="gux-content">
          <div class="gux-title">
            <slot name="title" />
          </div>

          <div class="gux-message">
            <slot name="message" />
          </div>
        </div>

        <gux-dismiss-button-beta
          onClick={this.onDismissClickHandler.bind(this)}
        ></gux-dismiss-button-beta>
      </Host>
    );
  }

  private onDismissClickHandler(event: MouseEvent): void {
    event.stopPropagation();

    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
    }
  }
}
