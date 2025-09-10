import {
  Component,
  h,
  JSX,
  Prop,
  Element,
  Listen,
  Method,
  Host
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import { groupKeyboardNavigation } from '../gux-avatar-group.service';
import { generateInitials } from '@utils/string/generate-initials';
import { getAvatarAccentClass } from '@components/beta/gux-avatar/gux-avatar.service';
import { GuxAvatarAccent } from '@components/beta/gux-avatar/gux-avatar.types';

/**
 * @slot image - Avatar photo.
 */

@Component({
  styleUrl: 'gux-avatar-group-item.scss',
  tag: 'gux-avatar-group-item-beta',
  shadow: { delegatesFocus: true }
})
export class GuxAvatarGroupItem {
  private tooltip: HTMLGuxTooltipBetaElement;

  @Element()
  root: HTMLElement;

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
  accent: GuxAvatarAccent = 'auto';

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  componentDidLoad() {
    this.validatingInputs();
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
      <Host role="menuitem">
        <button
          type="button"
          aria-label={this.name}
          tabIndex={-1}
          class={{
            'gux-avatar': true,
            [getAvatarAccentClass(this.accent, this.name)]: true,
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
      </Host>
    ) as JSX.Element;
  }
}
