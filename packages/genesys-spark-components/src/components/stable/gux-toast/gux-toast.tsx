import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
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
 * @slot primary-button - Required slot for primary action button in an action toast
 * @slot secondary-button - Optional slot for secondary action button in an action toast
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
  hasPrimaryButton: boolean = false;

  @State()
  hasSecondaryButton: boolean = false;

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.toastType });

    this.hasPrimaryButton = hasSlot(this.root, 'primary-button');
    this.hasSecondaryButton = hasSlot(this.root, 'secondary-button');

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
        <gux-link-beta standalone>
          <slot name="link" />
        </gux-link-beta>
      </div>
    ) as JSX.Element;
  }

  private renderActions(): JSX.Element {
    return (
      <gux-cta-group class="gux-buttons-bar" align="end">
        {this.hasSecondaryButton && (
          <gux-button-slot slot="secondary">
            <slot name="secondary-button" />
          </gux-button-slot>
        )}
        <gux-button-slot slot="primary">
          <slot name="primary-button" />
        </gux-button-slot>
      </gux-cta-group>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <div class={`gux-toast gux-toast-${this.toastType}`}>
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

          {this.toastType === 'action' &&
            this.hasPrimaryButton &&
            this.renderActions()}
        </div>

        <gux-dismiss-button
          position="inherit"
          onClick={this.onDismissClickHandler.bind(this)}
        ></gux-dismiss-button>
      </div>
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
