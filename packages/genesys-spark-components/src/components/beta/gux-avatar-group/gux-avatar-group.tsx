import { Component, h, JSX, Element, State, Prop, Listen } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxAvatarAccent, GuxAvatarSize } from '../gux-avatar/gux-avatar.types';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { logWarn } from '@utils/error/log-error';

import {
  first,
  last,
  next,
  previous
} from 'components/stable/gux-list/gux-list.service';
import defaultResources from './i18n/en.json';
import { GuxAvatarGroupLimit } from './gux-avatar-group.types';

const validFocusableItems = [
  'gux-avatar-list-item-beta',
  'gux-avatar-overflow-beta'
];

interface ProcessedAvatar {
  avatar: HTMLGuxAvatarBetaElement;
  interactiveElement?: HTMLElement;
  img?: HTMLImageElement | null;
  name: string;
  accent: GuxAvatarAccent;
  isOverflow: boolean;
}

@Component({
  styleUrl: 'gux-avatar-group.scss',
  tag: 'gux-avatar-group-beta',
  shadow: true
})
export class GuxAvatarGroup {
  private i18n: GetI18nValue;
  private groupRef: HTMLElement;

  @Element()
  root: HTMLElement;

  @Prop()
  avatarLimit: GuxAvatarGroupLimit = 7;

  @State()
  private processedAvatars: ProcessedAvatar[] = [];

  async componentWillLoad(): Promise<void> {
    this.processAvatars();
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
    trackComponent(this.root);
  }

  componentWillRender(): void {
    this.processAvatars();
  }

  private getAccent(index): string {
    return `${(index % 12) + 1}` as GuxAvatarAccent;
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        previous(this.groupRef, validFocusableItems);
        break;
      case 'ArrowRight':
        event.preventDefault();
        next(this.groupRef, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        first(this.groupRef, validFocusableItems);
        break;
      case 'End':
        event.preventDefault();
        last(this.groupRef, validFocusableItems);
        break;
    }
  }

  private validateChildElements(childElements: HTMLElement[]) {
    if (childElements.length === 0) {
      return;
    }

    // Check if avatarElements are buttons, anchor tags or gux-avatar beta and log warning if there are invalid elements
    const validTagNames = ['GUX-AVATAR-BETA', 'BUTTON', 'A'];
    const invalidElements = childElements.some(
      el => !validTagNames.includes(el.tagName)
    );

    if (invalidElements) {
      logWarn(
        this.root,
        'gux-avatar-group-beta: Invalid child element detected. All child elements must be either buttons, anchor tags or gux-avatar-beta components'
      );
    }
  }

  private processAvatars(): void {
    const avatarElements = Array.from(this.root.children) as HTMLElement[];

    this.validateChildElements(avatarElements);

    this.processedAvatars = avatarElements.map((interactiveAvatar, index) => {
      let avatar: HTMLGuxAvatarBetaElement;
      let img = null;
      if (interactiveAvatar.tagName === 'GUX-AVATAR-BETA') {
        avatar = interactiveAvatar as HTMLGuxAvatarBetaElement;
      } else {
        avatar = interactiveAvatar.querySelector(
          'gux-avatar-beta'
        ) as HTMLGuxAvatarBetaElement;
      }
      if (avatar) {
        img = avatar.querySelector('img');
      }

      return {
        interactiveElement: interactiveAvatar as HTMLElement,
        avatar,
        img,
        name: avatar?.name ?? '',
        accent: this.getAccent(index),
        isOverflow: index >= this.avatarLimit
      } as ProcessedAvatar;
    });
  }

  private renderVisibleListItem(
    avatar: ProcessedAvatar,
    index: number
  ): JSX.Element {
    const tabIndexVal = index === 0 ? true : false;
    if (avatar.interactiveElement.tagName !== 'GUX-AVATAR-BETA') {
      return (
        <gux-avatar-list-item-beta
          onClick={() => avatar.interactiveElement.click()}
          focusable={tabIndexVal}
        >
          {this.renderAvatar(avatar, 'small')}
        </gux-avatar-list-item-beta>
      ) as JSX.Element;
    } else {
      return (
        <gux-avatar-list-item-beta focusable={tabIndexVal}>
          {this.renderAvatar(avatar, 'small')}
        </gux-avatar-list-item-beta>
      ) as JSX.Element;
    }
  }

  private renderPopupListItem(avatar: ProcessedAvatar): JSX.Element {
    if (avatar.interactiveElement.tagName !== 'GUX-AVATAR-BETA') {
      return (
        <gux-avatar-list-item-beta
          layout="plus-name"
          onClick={() => avatar.interactiveElement.click()}
        >
          {this.renderAvatar(avatar, 'xsmall')}
        </gux-avatar-list-item-beta>
      ) as JSX.Element;
    } else {
      return (
        <gux-avatar-list-item-beta layout="plus-name">
          {this.renderAvatar(avatar, 'xsmall')}
        </gux-avatar-list-item-beta>
      ) as JSX.Element;
    }
  }

  private renderAvatar(
    avatar: ProcessedAvatar,
    size: GuxAvatarSize
  ): JSX.Element {
    return (
      <gux-avatar-beta
        size={size}
        name={avatar?.name ?? ''}
        label={avatar.avatar?.label ?? ''}
        accent={avatar.accent}
      >
        {avatar.img ? (
          <img slot="image" src={avatar.img.src} alt={avatar.img?.alt ?? ''} />
        ) : null}
      </gux-avatar-beta>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    const visibleAvatars = this.processedAvatars.filter(
      avatar => !avatar.isOverflow
    ) as ProcessedAvatar[];
    const overflowAvatars = this.processedAvatars.filter(
      avatar => avatar.isOverflow
    ) as ProcessedAvatar[];

    return (
      <div
        class={{
          'gux-avatar-group': true,
          'gux-avatar-no-overflow': overflowAvatars.length === 0
        }}
        ref={ref => (this.groupRef = ref)}
        aria-label={this.i18n('avatar-group')}
        role="list"
      >
        {visibleAvatars.map((avatar, index) =>
          this.renderVisibleListItem(avatar, index)
        )}

        {overflowAvatars.length > 0 && (
          <gux-avatar-overflow-beta count={overflowAvatars.length}>
            {overflowAvatars.map(avatar => this.renderPopupListItem(avatar))}
          </gux-avatar-overflow-beta>
        )}
      </div>
    ) as JSX.Element;
  }
}
