import { Component, h, JSX, Prop, Element, Fragment } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import { GuxAvatarSize } from './gux-avatar.types';

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

  /**
   * Avatar size: small, medium or large
   */
  @Prop()
  size: GuxAvatarSize = 'large';

  /**
   * Name which is shown as initials
   */
  @Prop()
  name!: string;

  private generateInitials(): string {
    const nameArray = this.name?.split(' ') ?? [];
    if (nameArray.length > 1) {
      return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
    }
    return nameArray[0]?.charAt(0) + nameArray[0]?.charAt(1);
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
    trackComponent(this.root);
  }

  componentDidLoad() {
    this.logWarning();
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <div
          class={{
            'gux-avatar': true,
            [`gux-${this.size}`]: true
          }}
        >
          <div class="gux-content">
            <slot name="image">
              <abbr title={this.name}>{this.generateInitials()}</abbr>
            </slot>
          </div>
        </div>
      </Fragment>
    ) as JSX.Element;
  }
}
