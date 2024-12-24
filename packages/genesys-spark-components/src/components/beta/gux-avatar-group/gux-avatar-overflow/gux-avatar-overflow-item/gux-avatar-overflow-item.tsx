import {
  Component,
  h,
  JSX,
  Prop,
  Element,
  Method,
  Listen,
  Host
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import { GuxAvatarAccent } from '../../gux-avatar-group.types';
import { generateInitials } from '@utils/string/generate-initials';
import { overflowNavigation } from '../gux-avatar-overflow.service';

/**
 * @slot image - Avatar photo.
 */

@Component({
  styleUrl: 'gux-avatar-overflow-item.scss',
  tag: 'gux-avatar-overflow-item-beta',
  shadow: true
})
export class GuxAvatarOverflowItem {
  private buttonElement: HTMLButtonElement;

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

  /*
   * Focus button element
   */
  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus(): Promise<void> {
    this.buttonElement.focus();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    overflowNavigation(event, this.root);
  }

  private getAccent(): string {
    if (this.accent !== 'auto') {
      return `gux-accent-${this.accent}`;
    }
    const hashedName = this.name
      ?.split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hashedNameAccent = (hashedName % 12).toString();
    return `gux-accent-${hashedNameAccent}`;
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
        <button
          type="button"
          aria-label={this.name}
          tabIndex={-1}
          ref={el => (this.buttonElement = el)}
        >
          <span
            class={{
              'gux-avatar': true,
              [this.getAccent()]: true
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
