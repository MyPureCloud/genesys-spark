import { Component, h, JSX, Prop, Element, Fragment } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import {
  GuxAvatarStatus,
  GuxAvatarSize,
  GuxAvatarAccent
} from './gux-avatar.types';
import { hasSlot } from '@utils/dom/has-slot';

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
  name: string;

  @Prop()
  accent: GuxAvatarAccent = 'default';

  /**
   * Shows a status badge
   */
  @Prop()
  badge: boolean = false;

  /**
   * Wrap the content with a button if it needs to be clickable
   */
  @Prop()
  interactive: boolean = false;

  /**
   * Override the status badge with a notification icon
   */
  @Prop()
  notifications: boolean = false;

  hasImageSlot: boolean;

  private generateInitials(): string {
    const nameArray = this.name ? this.name.split(' ') : [''];
    if (nameArray.length > 1) {
      return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
    }
    return nameArray[0]?.charAt(0) + nameArray[0]?.charAt(1);
  }

  private displayInnerContent(): JSX.Element | null {
    if (this.hasImageSlot) {
      return (<slot name="image"></slot>) as JSX.Element;
    }
    return (
      <div class="initials">{this.generateInitials()}</div>
    ) as JSX.Element;
  }

  private displayBadge(): JSX.Element | null {
    const displayedStatus = this.notifications ? 'notifications' : this.status;
    if (this.badge) {
      return (
        <div
          class={{
            'gux-avatar-badge': true,
            [`${displayedStatus}`]: true,
            [`gux-${this.size}`]: true
          }}
        >
          <gux-icon
            icon-name={this.getIcon(displayedStatus)}
            screenreader-text={displayedStatus}
          ></gux-icon>
        </div>
      ) as JSX.Element;
    }
  }

  private getAccent(): string {
    if (this.accent === 'auto') {
      let hash = 0;
      for (let i = 0; i < this.name.length; i++) {
        hash += this.name.charCodeAt(i);
      }
      const accent = hash % 12;
      return accent === 0 ? '12' : accent.toString();
    }
    return this.accent.toString();
  }

  private getIcon(status: GuxAvatarStatus): string {
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

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.status });
    this.hasImageSlot = hasSlot(this.root, 'image');
  }

  render(): JSX.Element {
    const avatarContent = (
      <Fragment>
        <div
          class={{
            'gux-avatar': true,
            [`${this.status}`]: true,
            [`gux-${this.size}`]: true,
            [`gux-${this.statusRing ? 'status-ring' : ''}`]: this.statusRing
          }}
          aria-label={this.name}
        >
          <div
            class={{
              content: true,
              [`gux-accent-${this.getAccent()}`]: true
            }}
            aria-hidden="true"
          >
            {this.displayInnerContent()}
          </div>
        </div>
        {this.displayBadge()}
      </Fragment>
    );

    return this.interactive
      ? ((<button>{avatarContent}</button>) as JSX.Element)
      : (avatarContent as JSX.Element);
  }
}
