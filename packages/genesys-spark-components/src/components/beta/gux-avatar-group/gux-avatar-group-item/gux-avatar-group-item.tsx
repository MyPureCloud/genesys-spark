import {
  Component,
  h,
  JSX,
  Prop,
  Element,
  Listen,
  Method
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import { GuxAvatarAccent } from './gux-avatar-group-item.types';
import { groupKeyboardNavigation } from '../gux-avatar-group.service';
import { generateInitials } from '@utils/string/generate-initials';

/**
 * @slot image - Avatar photo.
 */

@Component({
  styleUrl: 'gux-avatar-group-item.scss',
  tag: 'gux-avatar-group-item-beta',
  shadow: true
})
export class GuxAvatarGroupItem {
  private buttonElement: HTMLButtonElement;
  private tooltip: HTMLGuxTooltipBetaElement;

  @Element()
  root: HTMLElement;

  /**
   * Name which is shown as initials. Should be formatted 'Lastname Firstname' for JA, zhCN and KO names.
   * Names without blank space will show first 2 characters of string.
   */
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

  /*
   * Hide tooltip
   */
  @Method()
  async hideTooltip(): Promise<void> {
    return await this.tooltip.hideTooltip();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    groupKeyboardNavigation(event, this.root);
  }

  private isLastItemInGroup(): boolean {
    const parent = this.root.parentElement as HTMLGuxAvatarGroupBetaElement;
    const children = Array.from(parent.children);
    const index = children.findIndex(i => i === this.root);

    return index === children.length - 1;
  }

  private getAccent(): string {
    if (this.accent !== 'auto') {
      return `gux-accent-${this.accent}`;
    }
    const hashedName = this.name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hashedNameAccent = (hashedName % 12).toString();
    return `gux-accent-${hashedNameAccent}`;
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

  render(): JSX.Element {
    return (
      <button
        type="button"
        role="menuitem"
        aria-label={this.name}
        tabIndex={-1}
        ref={el => (this.buttonElement = el)}
        class={{
          'gux-avatar': true,
          [this.getAccent()]: true,
          'gux-last-item': this.isLastItemInGroup()
        }}
      >
        <slot name="image">
          <span class="gux-avatar-initials" aria-hidden="true">
            {generateInitials(this.name)}
          </span>
        </slot>
        <gux-tooltip-beta
          aria-hidden="true"
          visual-only
          placement="top"
          ref={el => (this.tooltip = el)}
        >
          <div slot="content">{this.name}</div>
        </gux-tooltip-beta>
      </button>
    ) as JSX.Element;
  }
}
