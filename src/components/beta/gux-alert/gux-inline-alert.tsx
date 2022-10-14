import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { trackComponent } from 'usage-tracking';
import { GuxAlertAccent } from './gux-inline-alert.types';
import translationResources from './i18n/en.json';

/**
 * @slot - Slot for message.
 */

@Component({
  styleUrl: 'gux-inline-alert.less',
  tag: 'gux-inline-alert-beta',
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
        return 'alert-info';
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning-triangle';
      case 'error':
        return 'alert-warning-octogon';
      default:
        return 'alert-info';
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
        <gux-icon icon-name={this.getIcon(this.accent)} decorative></gux-icon>
        <gux-tooltip-title>
          <span>
            <div class="gux-sr-only">{this.i18n(this.accent)}</div>
            <slot />
          </span>
        </gux-tooltip-title>
      </div>
    ) as JSX.Element;
  }
}
