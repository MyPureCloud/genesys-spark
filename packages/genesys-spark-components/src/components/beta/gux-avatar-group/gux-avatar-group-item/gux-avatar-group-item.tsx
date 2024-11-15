import {
  Component,
  h,
  JSX,
  Prop,
  Element,
  State,
  Listen,
  Method
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import { GuxAvatarAccent } from './gux-avatar-group-item.types';
import {
  groupKeyboardNavigation,
  resetFocusableSiblings
} from '../gux-avatar-group.service';

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
  private parentElement: HTMLGuxAvatarGroupBetaElement;

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

  /**
   *  Tracks the item index in group to faciliate auto accent colours
   */
  @State()
  index: number = 0;

  /**
   * Removes mask from avatar display if is last in group
   */
  @State()
  lastItemInGroup: boolean = false;

  @State()
  taxIndexVal: number = -1;

  private generateInitials(): string {
    const nameArray = this.name?.split(' ') ?? [];
    if (nameArray.length > 1) {
      return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
    }
    return nameArray[0]?.charAt(0) + nameArray[0]?.charAt(1);
  }

  private getAccent(): string {
    // get current item index in parent element

    if (this.accent !== 'auto') {
      return this.accent;
    }

    return (this.index % 12).toString();
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

  private getDescriptionText(): string {
    return `${this.name}`;
  }

  async componentWillLoad(): Promise<void> {
    this.checkPositionInGroup();
    trackComponent(this.root);
  }

  componentDidLoad() {
    this.validatingInputs();
  }

  private checkPositionInGroup(): void {
    this.parentElement = this.root
      .parentElement as HTMLGuxAvatarGroupBetaElement;

    if (this.parentElement) {
      this.index = Array.from(this.parentElement.children).indexOf(this.root);
      this.lastItemInGroup =
        this.index === this.parentElement.children.length - 1;
      this.taxIndexVal = this.index === 0 ? 0 : -1;
    }
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus(): Promise<void> {
    this.buttonElement.focus();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    groupKeyboardNavigation(event, this.root);

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
        event.stopPropagation();
        break;
    }
  }

  private handleClick() {
    this.taxIndexVal = 0;
    resetFocusableSiblings(this.root);
  }

  render(): JSX.Element {
    return (
      <button
        type="button"
        role="menuitem"
        aria-haspopup="false"
        aria-label={this.getDescriptionText()}
        tabIndex={this.taxIndexVal}
        ref={el => (this.buttonElement = el)}
        onClick={this.handleClick.bind(this)}
        class={{
          'gux-avatar': true,
          [`gux-accent-${this.getAccent()}`]: true,
          'gux-last-item': this.lastItemInGroup
        }}
      >
        <slot name="image">
          <span class="gux-avatar-initials" aria-hidden="true">
            {this.generateInitials()}
          </span>
        </slot>
        <gux-tooltip-beta aria-hidden="true" placement="top">
          <div slot="content">{this.getDescriptionText()}</div>
        </gux-tooltip-beta>
      </button>
    ) as JSX.Element;
  }
}
