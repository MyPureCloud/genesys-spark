import { Component, Element, h, JSX, Listen, State } from '@stencil/core';
import { logWarn } from '@utils/error/log-error';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import { trackComponent } from '@utils/tracking/usage';
import { GuxAvatarAccent } from '../gux-avatar/gux-avatar.types';
import defaultResources from './i18n/en.json';
import { GuxAvatarGroupInteractiveElement } from './gux-avatar-groups.types';
import {
  first,
  last,
  next,
  previous
} from 'components/stable/gux-list/gux-list.service';

/**
 * @slot - slot for a group of gux-avatars, or gux-avatars within button or anchor tags
 */

const validFocusableItems = ['button', 'a'];

@Component({
  styleUrl: 'gux-avatar-group.scss',
  tag: 'gux-avatar-group-beta',
  shadow: { delegatesFocus: true }
})
export class GuxAvatarGroup {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @State()
  count: number = 0;

  @State()
  avatars: HTMLGuxAvatarBetaElement[];

  @State()
  interactiveElements: GuxAvatarGroupInteractiveElement[] = [];

  async componentWillLoad(): Promise<void> {
    this.validateSlot();
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
    trackComponent(this.root);
  }

  private validateSlot(): void {
    this.interactiveElements = Array.from(
      this.root.querySelectorAll('a, button')
    ) as GuxAvatarGroupInteractiveElement[];

    // Disable tabbing on everything but the first interactive element as we're using arrow navigation
    if (this.interactiveElements.length > 0) {
      this.interactiveElements.slice(1).forEach(element => {
        element.tabIndex = -1;
      });
    }

    this.avatars = Array.from(
      this.root.querySelectorAll('gux-avatar-beta')
    ) as HTMLGuxAvatarBetaElement[];

    if (this.avatars.length === 0) {
      logWarn(this.root, 'No avatars found in slot');
    }

    // This is required for the aria-label
    this.count = this.avatars.length;

    this.avatars.forEach((avatar: HTMLGuxAvatarBetaElement, index: number) => {
      // Only small avatars can be included in avatar-group
      avatar.size = 'small';

      if (avatar.accent === 'default') {
        avatar.accent = this.getAccent(index) as GuxAvatarAccent;
      }
    });
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        previous(this.root, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        first(this.root, validFocusableItems);
        break;
      case 'ArrowRight':
        event.preventDefault();
        next(this.root, validFocusableItems);
        break;
      case 'End':
        event.preventDefault();
        last(this.root, validFocusableItems);
        break;
    }
  }

  private getAccent(index): string {
    const totalAvatarAccentVariations = 12;
    return `${(index % totalAvatarAccentVariations) + 1}` as GuxAvatarAccent;
  }

  render(): JSX.Element {
    return (
      <div
        class="gux-avatar-group"
        aria-label={this.i18n('avatarGroup', { count: this.count })}
      >
        <slot onSlotchange={() => this.validateSlot()}></slot>
      </div>
    ) as JSX.Element;
  }
}
