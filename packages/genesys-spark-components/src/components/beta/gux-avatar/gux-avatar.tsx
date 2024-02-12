import { Component, h, JSX, Prop, Element } from '@stencil/core';
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

  private validatingInputs(): void {
    const avatarImage = this.root.querySelector('img');
    if (!this.name) {
      logWarn(this.root, 'Name prop is required for accessibility');
    }

    if (avatarImage && !avatarImage.getAttribute('alt')) {
      logWarn(this.root, 'Alt attribute is required for slotted image.');
    }
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.size });
  }

  componentDidLoad() {
    this.validatingInputs();
  }

  render(): JSX.Element {
    const validSizes: GuxAvatarSize[] = ['xsmall', 'small', 'medium', 'large'];
    const checkedSize = validSizes.includes(this.size) ? this.size : 'large';

    return (
      <div
        class={{
          'gux-avatar': true,
          [`gux-${checkedSize}`]: true
        }}
      >
        <div class="gux-content">
          <slot name="image">
            {!this.root.querySelector('[slot="image"]') && (
              <abbr title={this.name}>{this.generateInitials()}</abbr>
            )}
          </slot>
        </div>
      </div>
    ) as JSX.Element;
  }
}
