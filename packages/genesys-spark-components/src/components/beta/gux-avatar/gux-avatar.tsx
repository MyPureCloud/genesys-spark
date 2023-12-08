import { Component, h, JSX, Prop, Element, Fragment } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxAvatarSize, GuxAvatarAccent } from './gux-avatar.types';
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
  /*
   * Reference to the host element.
   */
  @Element()
  root: HTMLElement;

  @Prop()
  status: GuxAvatarStatus = 'available';

  @Prop()
  size: GuxAvatarSize = 'large';

  @Prop()
  statusRing: boolean = false;

  @Prop()
  initials: string;

  @Prop()
  accent: GuxAvatarAccent = 'default';

  @Prop()
  badge: GuxAvatarBadge;

  @Prop()
  interactive: boolean = false;

  hasImageSlot: boolean;

  private displayInnerContent(): JSX.Element | null {
    if (this.hasImageSlot) {
      return (<slot name="image"></slot>) as JSX.Element | null;
    }
    return (<div class="initials">{this.initials}</div>) as JSX.Element | null;
  }

  private displayBadge(): JSX.Element | null {
    if (this.badge) {
      return (
        <div
          class={{
            'gux-avatar-badge': true,
            [`${this.badge}`]: true,
            [`gux-${this.size}`]: true
          }}
        >
          <gux-icon
            icon-name={this.getIcon(this.badge)}
            screenreader-text={this.badge}
          ></gux-icon>
        </div>
      ) as JSX.Element;
    }
  }

  private getIcon(accent: GuxAvatarBadge): string {
    switch (accent) {
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
            [`gux-${this.statusRing && 'status-ring'}`]: true
          }}
        >
          <div
            class={{
              content: true,
              [`gux-accent-${this.accent}`]: true
            }}
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
