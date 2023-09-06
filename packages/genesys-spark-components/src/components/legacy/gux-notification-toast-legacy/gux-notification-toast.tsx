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

import { trackComponent } from '@utils/tracking/usage';

import { GuxNotificationToastAccent } from './gux-notification-toast.types';

/**
 * @slot icon - Required slot for gux-icon
 * @slot title - Required slot for the notification toast title
 * @slot message - Required slot for the notification toast message
 */
@Component({
  styleUrl: 'gux-notification-toast.scss',
  tag: 'gux-notification-toast-legacy',
  shadow: true
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

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.accent });
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class={`gux-icon gux-${this.accent}`}>
          <slot name="icon" />
        </div>

        <div class="gux-content">
          <gux-truncate class="gux-title" max-lines={1}>
            <slot name="title" />
          </gux-truncate>

          <gux-truncate class="gux-message" max-lines={2}>
            <slot name="message" />
          </gux-truncate>
        </div>

        <gux-dismiss-button
          onClick={this.onDismissClickHandler.bind(this)}
        ></gux-dismiss-button>
      </Host>
    ) as JSX.Element;
  }

  private onDismissClickHandler(event: MouseEvent): void {
    event.stopPropagation();

    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.remove();
    }
  }
}
