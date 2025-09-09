import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import {
  GuxNotificationBadgeAccent,
  GuxNotificationBadgeSize
} from './gux-notification-badge.types';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import defaultResources from './i18n/en.json';

/**
 * @slot - Slot for up to 3 digits or a gux-icon
 */

@Component({
  styleUrl: 'gux-notification-badge.scss',
  tag: 'gux-notification-badge',
  shadow: true
})
export class GuxNotificationBadge {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  accent: GuxNotificationBadgeAccent = 'info-on-dark';

  @Prop()
  size: GuxNotificationBadgeSize = 'medium';

  @State()
  iconOnly: boolean;

  private hasIconOnly(): boolean {
    const children = Array.from(this.root.children);
    const tagNames = children.map(child => child.tagName);

    if (children.length === 1 && tagNames[0] === 'GUX-ICON') {
      return true;
    }

    return false;
  }

  private slotChanged() {
    this.iconOnly = this.hasIconOnly();
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-notification-badge': true,
          [`gux-${this.accent}`]: true,
          [`gux-${this.size}`]: true,
          'gux-icon-only': this.iconOnly
        }}
      >
        <slot onSlotchange={this.slotChanged.bind(this)} />
        <gux-screen-reader-beta>
          {this.i18n('notifications')}
        </gux-screen-reader-beta>
      </div>
    ) as JSX.Element;
  }
}
