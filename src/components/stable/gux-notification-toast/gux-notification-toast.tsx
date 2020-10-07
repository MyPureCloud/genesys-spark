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

import { buildI18nForComponent } from '../../../i18n';

import modalComponentResources from './i18n/en.json';

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

  private getI18nValue: (resourceKey: string, context?: any) => string;

  @Element()
  private root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    this.getI18nValue = await buildI18nForComponent(
      this.root,
      modalComponentResources
    );
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class={`icon ${this.accent}`}>
          <slot name="icon" />
        </div>

        <div class="content">
          <div class="title">
            <slot name="title" />
          </div>

          <div class="message">
            <slot name="message" />
          </div>
        </div>

        <button
          class="dismiss-button"
          title={this.getI18nValue('dismiss')}
          onClick={this.onDismissClickHandler.bind(this)}
        >
          <gux-icon
            screenreaderText={this.getI18nValue('dismiss')}
            iconName="ic-close"
          ></gux-icon>
        </button>
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
