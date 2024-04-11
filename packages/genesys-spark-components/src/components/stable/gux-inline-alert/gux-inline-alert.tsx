import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';
import { GuxAlertAccent } from './gux-inline-alert.types';
import translationResources from './i18n/en.json';

/**
 * @slot message - Slot for message.
 */

@Component({
  styleUrl: 'gux-inline-alert.scss',
  tag: 'gux-inline-alert',
  shadow: true
})
export class GuxAlert {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  accent: GuxAlertAccent = 'info';

  private getIcon(accent: GuxAlertAccent): string {
    switch (accent) {
      case 'info':
        return 'fa/circle-info-solid';
      case 'success':
        return 'fa/circle-check-solid';
      case 'warning':
        return 'fa/triangle-exclamation-solid';
      case 'error':
        return 'fa/hexagon-exclamation-solid';
      default:
        return 'fa/circle-info-solid';
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.accent });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-inline-alert': true,
          [`gux-${this.accent}`]: true
        }}
      >
        <div class="gux-message-wrapper">
          <gux-icon icon-name={this.getIcon(this.accent)} decorative></gux-icon>
          <div class="gux-sr-only">{this.i18n(this.accent)}</div>
          <div class="gux-message">
            <slot name="message">
              <slot />
            </slot>
          </div>
        </div>
      </div>
    ) as JSX.Element;
  }
}
