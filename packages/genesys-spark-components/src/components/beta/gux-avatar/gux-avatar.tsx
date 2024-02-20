import { Component, h, JSX, Prop, Element, Fragment } from '@stencil/core';
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
   * Shows presence such as away or available
   */
  @Prop()
  presence: GuxAvatarPresence = 'available';

  /**
   * Shows a presence ring around the avatar
   */
  @Prop()
  presenceRing: boolean = false;

  /**
   * Shows a presence badge
   */
  @Prop()
  hasBadge: boolean = false;

  /**
   * Override the presence badge with a notification icon
   */
  @Prop()
  hasNotifications: boolean = false;

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
    if (this.hasNotifications) {
      return this.renderNotificationsBadge();
    } else if (this.hasBadge) {
      return (
        <div
          class={{
            'gux-avatar-badge': true,
            [`${this.presence}`]: true,
            [`gux-${this.size}`]: true
          }}
        >
          <gux-icon
            icon-name={this.getPresenceIcon(this.presence)}
            screenreader-text={this.i18n(this.presence)}
          ></gux-icon>
        </div>
      ) as JSX.Element;
    }
  }

  private renderNotificationsBadge(): JSX.Element | null {
    return (
      <div
        class={{
          'gux-avatar-badge notifications': true,
          [`gux-${this.size}`]: true
        }}
      >
        <gux-icon
          icon-name="fa/bell-regular"
          screenreader-text={this.i18n('notifications')}
        ></gux-icon>
      </div>
    ) as JSX.Element;
  }

  private getPresenceIcon(presence: GuxAvatarPresence): string {
    switch (presence) {
      case 'available':
        return 'fa/circle-check-solid';
      case 'busy':
        return 'fa/ban-outline';
      case 'away':
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

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.size });
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
  }

  componentDidLoad() {
    this.validatingInputs();
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <div
          class={{
            'gux-avatar': true,
            [`${this.presence}`]: true,
            [`gux-${this.size}`]: true,
            'gux-presence-ring': this.presenceRing,
            [`gux-accent-${this.getAccent()}`]: true
          }}
        >
          <div class="gux-content">
            <slot name="image">
              <abbr title={this.name}>{this.generateInitials()}</abbr>
            </slot>
          </div>
        </div>
        {this.renderBadge()}
      </Fragment>
    ) as JSX.Element;
  }
}
