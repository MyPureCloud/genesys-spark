import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Prop,
  State
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

import { GuxToastTypes } from './gux-toast.types';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * @slot icon - Required slot for toast type of action
 * @slot title - Optional slot for the toast title
 * @slot message - Required slot for the toast message
 * @slot link - Optional slot for a link in any toast except toast type of action
 * @slot action-1 - Optional slot for primary action button in the toast
 * @slot action-2 - Optional slot for secondary action button in the toast
 */
@Component({
  styleUrl: 'gux-toast.scss',
  tag: 'gux-toast',
  shadow: true
})
export class GuxToast {
  @Prop()
  toastType: GuxToastTypes = 'success';

  @Event()
  guxdismiss: EventEmitter<void>;

  @Element()
  private root: HTMLElement;

  @State()
  hasLink: boolean = false;

  @State()
  actionCount: number = 0;

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.toastType });

    const actions = [
      hasSlot(this.root, 'action-1'),
      hasSlot(this.root, 'action-2')
    ];
    this.actionCount = actions.filter(x => x).length;

    this.hasLink = hasSlot(this.root, 'link');
  }

  private renderToastIcon(): JSX.Element {
    switch (this.toastType) {
      case 'success':
        return (
          <gux-icon icon-name="fa/circle-check-solid" decorative />
        ) as JSX.Element;
      case 'warning':
        return (
          <gux-icon icon-name="fa/triangle-exclamation-solid" decorative />
        ) as JSX.Element;
      case 'error':
        return (
          <gux-icon icon-name="fa/hexagon-exclamation-solid" decorative />
        ) as JSX.Element;
      case 'info':
        return (
          <gux-icon icon-name="fa/circle-info-solid" decorative />
        ) as JSX.Element;
      case 'action':
        return (<slot name="icon" />) as JSX.Element;
    }
  }

  private renderLink(): JSX.Element {
    return (
      <div class="gux-buttons-bar">
        <slot name="link" />
      </div>
    ) as JSX.Element;
  }

  private renderActions(): JSX.Element {
    if (this.actionCount === 2) {
      return (
        <div class="gux-buttons-bar">
          <gux-button-slot-beta>
            <slot name="action-2" />
          </gux-button-slot-beta>
          <gux-button-slot-beta accent="primary">
            <slot name="action-1" />
          </gux-button-slot-beta>
        </div>
      ) as JSX.Element;
    } else {
      return (
        <div class="gux-buttons-bar">
          <gux-button-slot-beta accent="tertiary">
            <slot name="action-1"></slot>
          </gux-button-slot-beta>
        </div>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host class={`gux-toast-${this.toastType}`}>
        <div class={`gux-icon gux-icon-${this.toastType}`}>
          {this.renderToastIcon()}
        </div>

        <div class="gux-content">
          <div class="gux-message">
            <gux-truncate class="gux-message-title" max-lines={1}>
              <slot name="title" />
            </gux-truncate>

            <gux-truncate class="gux-message-body" max-lines={2}>
              <slot name="message" />
            </gux-truncate>
          </div>

          {this.toastType !== 'action' && this.hasLink && this.renderLink()}

          {this.toastType === 'action' && this.renderActions()}
        </div>

        <gux-dismiss-button
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
