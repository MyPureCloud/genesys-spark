import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import {
  GuxNotificationBadgeAccent,
  GuxNotificationBadgeSize
} from './gux-notification-badge.types';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - Slot for up to 3 digits or a gux-icon
 */

@Component({
  styleUrl: 'gux-notification-badge.scss',
  tag: 'gux-notification-badge',
  shadow: true
})
export class GuxNotificationBadge {
  @Element()
  root: HTMLElement;

  @Prop()
  accent: GuxNotificationBadgeAccent = 'info';

  @Prop()
  size: GuxNotificationBadgeSize = 'medium';

  @State()
  iconOnly: boolean;

  private hasIconOnly(): boolean {
    const children = Array.from(this.root.children);

    if (children.length === 1) {
      const child = children[0];
      if (child.tagName === 'GUX-ICON') {
        return true;
      }
    } else if (
      children.length === 2 &&
      children[0].tagName === 'GUX-ICON' &&
      ['GUX-TOOLTIP', 'GUX-TOOLTIP-BETA'].includes(children[1].tagName)
    ) {
      return true;
    }

    return false;
  }

  private slotChanged() {
    this.iconOnly = this.hasIconOnly();
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-notification-badge': true,
          [`gux-${this.accent}`]: true
        }}
      >
        <slot onSlotchange={this.slotChanged.bind(this)} />
      </div>
    ) as JSX.Element;
  }
}
