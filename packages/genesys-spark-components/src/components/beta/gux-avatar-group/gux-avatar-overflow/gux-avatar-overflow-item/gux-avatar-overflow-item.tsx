import { Component, h, JSX, Prop, Element, Listen, Host } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import { generateInitials } from '@utils/string/generate-initials';
import { overflowNavigation } from '../gux-avatar-overflow.service';
import { getAvatarAccentClass } from '@components/beta/gux-avatar/gux-avatar.service';
import { GuxAvatarAccent } from '@components/beta/gux-avatar/gux-avatar.types';

/**
 * @slot image - Avatar photo.
 */

@Component({
  styleUrl: 'gux-avatar-overflow-item.scss',
  tag: 'gux-avatar-overflow-item-beta',
  shadow: { delegatesFocus: true }
})
export class GuxAvatarOverflowItem {
  @Element()
  root: HTMLElement;

  @Prop()
  name: string;

  /**
   * Manually sets avatar accent
   */
  @Prop()
  accent: GuxAvatarAccent = 'auto';

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  componentDidLoad() {
    this.validatingInputs();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    overflowNavigation(event, this.root);
  }

  private validatingInputs(): void {
    const avatarImage = this.root.querySelector('img');
    if (!this.name) {
      logWarn(this.root, 'Name prop is required');
    }

    if (avatarImage && !avatarImage.getAttribute('alt')) {
      logWarn(this.root, 'Alt attribute is required for slotted image.');
    }
  }

  render(): JSX.Element {
    return (
      <Host role="menuitem">
        <button type="button" aria-label={this.name} tabIndex={-1}>
          <span
            class={{
              'gux-avatar': true,
              [getAvatarAccentClass(this.accent, this.name)]: true
            }}
          >
            <slot name="image">
              <span class="gux-avatar-initials" aria-hidden="true">
                {generateInitials(this.name)}
              </span>
            </slot>
          </span>
          <span>{this.name}</span>
        </button>
      </Host>
    ) as JSX.Element;
  }
}
