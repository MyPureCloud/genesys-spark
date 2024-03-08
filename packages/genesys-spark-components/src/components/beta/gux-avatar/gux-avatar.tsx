import { Component, h, JSX, Prop, Element } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import {
  GuxAvatarSize,
  GuxAvatarAccent,
  GuxAvatarPresence
} from './gux-avatar.types';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import defaultResources from './i18n/en.json';

/**
 * @slot image - Headshot photo.
 */

@Component({
  styleUrl: 'gux-avatar.scss',
  tag: 'gux-avatar-beta',
  shadow: true
})
export class GuxAvatar {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  size: GuxAvatarSize = 'large';

  /**
   * Name which is shown as initials. Should be formatted 'Lastname Firstname' for JA, zhCN and KO names.
   * Names without blank space will show first 2 characters of string.
   */
  @Prop()
  name!: string;

  /**
   * Manually sets avatar accent
   */
  @Prop()
  accent: GuxAvatarAccent = 'default';

  /**
   * Shows presence such as away or available.
   * Must be combined with badge or ring props to take effect.
   */
  @Prop()
  presence: GuxAvatarPresence = 'none';

  /**
   * Label to display for accessibility
   */
  @Prop()
  label: string;

  /**
   * Shows a ring around the avatar indicating current presence
   */
  @Prop()
  ring: boolean = false;

  /**
   * Shows a badge indicating current presence
   */
  @Prop()
  badge: boolean = false;

  /**
   * Show notifications indicator
   */
  @Prop()
  notifications: boolean = false;

  private generateInitials(): string {
    const nameArray = this.name?.split(' ') ?? [];
    if (nameArray.length > 1) {
      return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
    }
    return nameArray[0]?.charAt(0) + nameArray[0]?.charAt(1);
  }

  private getAccent(): string {
    if (this.accent !== 'auto') {
      return this.accent;
    }
    const hashedName = this.name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hashedName % 12).toString();
  }

  private validatingInputs(): void {
    const avatarImage = this.root.querySelector('img');
    if (!this.name) {
      logWarn(this.root, 'Name prop is required for accessibility');
    }

    if (avatarImage && !avatarImage.getAttribute('alt')) {
      logWarn(this.root, 'Alt attribute is required for slotted image.');
    }
  }

  private renderBadge(): JSX.Element | null {
    if (this.notifications) {
      return this.renderNotificationsBadge();
    } else if (this.badge && !['idle', 'none'].includes(this.presence)) {
      return (
        <div
          class={{
            'gux-avatar-badge': true,
            [`gux-${this.presence}`]: true,
            [`gux-${this.size}`]: true
          }}
        >
          <gux-icon
            icon-name={this.getPresenceIcon(this.presence)}
            decorative
          ></gux-icon>
        </div>
      ) as JSX.Element;
    }
  }

  private renderNotificationsBadge(): JSX.Element | null {
    return (
      <div
        class={{
          'gux-avatar-badge gux-notifications': true,
          [`gux-${this.size}`]: true
        }}
      >
        <gux-icon icon-name="fa/bell-regular" decorative></gux-icon>
      </div>
    ) as JSX.Element;
  }

  private getPresenceIcon(presence: GuxAvatarPresence): string {
    switch (presence) {
      case 'available':
        return 'fa/circle-check-solid';
      case 'busy':
      case 'meeting':
        return 'fa/ban-outline';
      case 'away':
      case 'break':
      case 'meal':
      case 'training':
        return 'fa/clock-outline';
      case 'on-queue':
        return 'fa/headset-solid';
      case 'offline':
        return 'fa/circle-xmark-regular';
      case 'out-of-office':
        return 'fa/subtract-circle';
      default:
        return 'fa/circle-xmark-regular';
    }
  }

  private getDescriptionText(): string {
    if (this.notifications)
      return `${this.name} (${this.i18n('notifications')})`;
    if (this.label && this.presence !== 'none')
      return `${this.name} (${this.label})`;
    return `${this.name}`;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.size });
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
  }

  componentDidLoad() {
    this.validatingInputs();
  }

  render(): JSX.Element {
    return [
      <div
        class={{
          'gux-avatar': true,
          [`gux-${this.presence}`]: this.ring || this.badge,
          [`gux-${this.size}`]: true,
          'gux-ring': this.ring,
          [`gux-accent-${this.getAccent()}`]: true
        }}
      >
        <div class="gux-content">
          <slot name="image">
            <abbr
              title={this.getDescriptionText()}
              aria-label={this.getDescriptionText()}
            >
              {this.generateInitials()}
            </abbr>
          </slot>
        </div>
      </div>,
      this.renderBadge()
    ] as JSX.Element;
  }
}
