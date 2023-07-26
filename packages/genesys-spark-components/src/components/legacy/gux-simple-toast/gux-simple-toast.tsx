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

import { GuxSimpleToastAccent } from './gux-simple-toast.types';

/**
 * @slot icon - Required slot for gux-icon
 * @slot message - Required slot for the simple toast message
 */
@Component({
  styleUrl: 'gux-simple-toast.scss',
  tag: 'gux-simple-toast-legacy',
  shadow: true
})
export class GuxSimpleToast {
  /**
   * The component accent.
   */
  @Prop()
  accent: GuxSimpleToastAccent = 'neutral';

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

        <gux-truncate class="gux-message" max-lines={2}>
          <slot name="message" />
        </gux-truncate>

        <gux-dismiss-button
          class="gux-dismiss"
          position="inherit"
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
