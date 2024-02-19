import { Component, h, JSX, Prop, Element } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import { GuxAvatarSize, GuxAvatarAccent } from './gux-avatar.types';

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

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.size });
  }

  componentDidLoad() {
    this.validatingInputs();
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-avatar': true,
          [`gux-${this.size}`]: true,
          [`gux-accent-${this.getAccent()}`]: true
        }}
      >
        <slot name="image">
          <abbr title={this.name}>{this.generateInitials()}</abbr>
        </slot>
      </div>
    ) as JSX.Element;
  }
}
