import { Component, h, JSX, Prop, Element, Fragment } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import {
  GuxAvatarStatus,
  GuxAvatarSize,
  GuxAvatarAccent
} from './gux-avatar.types';
import { logWarn } from '@utils/error/log-error';

/**
 * @slot image - Headshot photo.
 */

@Component({
  styleUrl: 'gux-avatar.scss',
  tag: 'gux-avatar-beta',
  shadow: true
})
export class GuxAvatar {
  @Element()
  root: HTMLElement;

  @Prop()
  status: GuxAvatarStatus = 'available';

  @Prop()
  size: GuxAvatarSize = 'large';

  /**
   * Shows a status ring around the avatar
   */
  @Prop()
  statusRing: boolean = false;

  @Prop()
  name!: string;

  @Prop()
  accent: GuxAvatarAccent = 'default';

  /**
   * Shows a status badge
   */
  @Prop()
  hasBadge: boolean = false;

  /**
   * Wrap the content with a button if it needs to be clickable
   */
  @Prop()
  isInteractive: boolean = false;

  /**
   * Override the status badge with a notification icon
   */
  @Prop()
  notifications: boolean = false;

  private generateInitials(): string {
    const nameArray = this.name.split(' ');
    if (nameArray.length > 1) {
      return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
    }
    return nameArray[0]?.charAt(0) + nameArray[0]?.charAt(1);
  }

  private renderBadge(): JSX.Element | null {
    if (this.hasBadge) {
      const displayedStatus = this.notifications
        ? 'notifications'
        : this.status;
      return (
        <div
          class={{
            'gux-avatar-badge': true,
            [`${displayedStatus}`]: true,
            [`gux-${this.size}`]: true
          }}
        >
          <gux-icon
            icon-name={this.getBadgeIcon(displayedStatus)}
            screenreader-text={displayedStatus}
          ></gux-icon>
        </div>
      ) as JSX.Element;
    }
  }

  private getAccent(): string {
    if (this.accent !== 'auto') {
      return this.accent.toString();
    }
    const hashedName = this.name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hashedName % 12 || 12).toString();
  }

  private getBadgeIcon(status: GuxAvatarStatus): string {
    switch (status) {
      case 'available':
        return 'fa/circle-check-solid';
      case 'break':
        return 'fa/clock-outline';
      case 'busy':
        return 'fa/ban-outline';
      case 'notifications':
        return 'fa/bell-regular';
      case 'offline':
        return 'fa/circle-xmark-regular';
      case 'out-of-office':
        return 'fa/subtract-circle';
      case 'queue':
        return 'fa/headset-solid';
      default:
        return 'fa/circle-xmark-regular';
    }
  }

  private logWarning(): void {
    const avatarImage = this.root.querySelector('img');
    if (!this.name && !avatarImage) {
      logWarn(this.root, 'must have a name attribute for accessibility.');
    } else if (avatarImage && !avatarImage.getAttribute('alt')) {
      logWarn(this.root, 'Alt attribute is required for slotted image.');
    }
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.status });
  }

  componentDidLoad() {
    this.logWarning();
  }

  render(): JSX.Element {
    const avatarContent = (
      <Fragment>
        <div
          class={{
            'gux-avatar': true,
            [`${this.status}`]: true,
            [`gux-${this.size}`]: true,
            'gux-status-ring': this.statusRing
          }}
        >
          <div
            class={{
              'gux-content': true,
              [`gux-accent-${this.getAccent()}`]: true
            }}
          >
            <slot name="image">
              <abbr title={this.name}>{this.generateInitials()}</abbr>
            </slot>
          </div>
        </div>
        {this.renderBadge()}
      </Fragment>
    );

    return this.isInteractive
      ? ((<button>{avatarContent}</button>) as JSX.Element)
      : (avatarContent as JSX.Element);
  }
}
