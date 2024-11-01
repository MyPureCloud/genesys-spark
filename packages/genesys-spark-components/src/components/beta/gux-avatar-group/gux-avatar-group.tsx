import {
  Component,
  h,
  JSX,
  Element,
  State,
  Prop,
  Listen
  // writeTask
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxAvatarAccent, GuxAvatarSize } from '../gux-avatar/gux-avatar.types';
import {
  first,
  last,
  next,
  previous
} from 'components/stable/gux-list/gux-list.service';

const validFocusableItems = [
  'gux-avatar-list-item-beta',
  'gux-avatar-overflow-beta'
];

interface ProcessedAvatar {
  focusableAvatar: HTMLGuxAvatarFocusableBetaElement;
  avatar: HTMLGuxAvatarBetaElement;
  button?: HTMLButtonElement;
  link?: HTMLAnchorElement;
  img?: HTMLImageElement;
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
  private groupRef: HTMLElement;

  @Element()
  root: HTMLElement;

  @Prop()
  avatarLimit: number = 7;

  @State()
  avatarList: HTMLGuxAvatarFocusableBetaElement[];

  @State()
  private processedAvatars: ProcessedAvatar[] = [];

  get countAvatars() {
    return this.avatarList.length ?? 0;
  }

  async componentWillLoad(): Promise<void> {
    this.processAvatars();

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

  private processAvatars(): void {
    const avatarElements = Array.from(
      this.root.children
    ) as HTMLGuxAvatarFocusableBetaElement[];

    this.processedAvatars = avatarElements.map((focusableAvatar, index) => {
      const avatar = focusableAvatar.querySelector(
        'gux-avatar-beta'
      ) as HTMLGuxAvatarBetaElement;
      const button = focusableAvatar.querySelector('button');
      const link = focusableAvatar.querySelector('a');
      const img = avatar.querySelector('img');
      return {
        focusableAvatar,
        avatar,
        button,
        link,
        img,
        name: avatar.name,
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
    if (avatar.button) {
      return (
        <gux-avatar-list-item-beta
          onClick={avatar.button.onclick}
          focusable={tabIndexVal}
        >
          {this.renderAvatar(avatar, 'small')}
        </gux-avatar-list-item-beta>
      ) as JSX.Element;
    } else if (avatar.link) {
      return (
        <gux-avatar-list-item-beta
          onClick={() => avatar.link.click()}
          focusable={tabIndexVal}
          interactive-element="link"
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

  private renderAvatar(
    avatar: ProcessedAvatar,
    size: GuxAvatarSize
  ): JSX.Element {
    return (
      <gux-avatar-beta
        size={size}
        name={avatar.name}
        accent={avatar.accent}
        presence={avatar.avatar.presence}
        label={avatar.avatar.label}
        ring={avatar.avatar.ring}
      >
        {avatar.img ? (
          <img slot="image" src={avatar.img.src} alt={avatar.img.alt} />
        ) : null}
      </gux-avatar-beta>
    ) as JSX.Element;
  }

  private renderPopupListItem(avatar: ProcessedAvatar): JSX.Element {
    if (avatar.button) {
      return (
        <gux-list-item onClick={avatar.button.onclick}>
          {this.renderPopupListItemContent(avatar)}
        </gux-list-item>
      ) as JSX.Element;
    } else if (avatar.link) {
      return (
        <gux-list-item onClick={() => avatar.link.click()}>
          {this.renderPopupListItemContent(avatar)}
        </gux-list-item>
      ) as JSX.Element;
    } else {
      return (
        <gux-list-item>{this.renderPopupListItemContent(avatar)}</gux-list-item>
      ) as JSX.Element;
    }
  }

  private renderPopupListItemContent(avatar: ProcessedAvatar): JSX.Element {
    return (
      <span class="gux-overflow-list-item">
        {this.renderAvatar(avatar, 'xsmall')}
        <span class="gux-overflow-list-item-name" aria-hidden="true">
          {avatar.name}
        </span>
      </span>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    const visibleAvatars = this.processedAvatars.filter(
      avatar => !avatar.isOverflow
    );
    const overflowAvatars = this.processedAvatars.filter(
      avatar => avatar.isOverflow
    );

    return (
      <div
        class={{
          'gux-avatar-group': true,
          'gux-avatar-group-overflow': overflowAvatars.length > 0
        }}
        ref={ref => (this.groupRef = ref)}
      >
        {visibleAvatars.map((avatar, index) =>
          this.renderVisibleListItem(avatar, index)
        )}

        {overflowAvatars.length > 0 && (
          <gux-avatar-overflow-beta count={overflowAvatars.length}>
            <gux-list>
              {overflowAvatars.map(avatar => this.renderPopupListItem(avatar))}
            </gux-list>
          </gux-avatar-overflow-beta>
        )}
      </div>
    ) as JSX.Element;
  }
}
