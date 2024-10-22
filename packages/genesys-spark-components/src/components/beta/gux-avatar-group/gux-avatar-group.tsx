import {
  Component,
  h,
  JSX,
  Element,
  State,
  Prop
  // writeTask
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { GuxAvatarAccent, GuxAvatarSize } from '../gux-avatar/gux-avatar.types';

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

  private renderInteractiveAvatar(
    avatar: ProcessedAvatar,
    index: number
  ): JSX.Element {
    const tabIndexVal = index === 0 ? 0 : -1;
    if (avatar.button) {
      return (
        <button
          type="button"
          onClick={avatar.button.onclick}
          tabIndex={tabIndexVal}
        >
          {this.renderAvatar(avatar, 'small')}
        </button>
      ) as JSX.Element;
    } else if (avatar.link) {
      return (
        <a
          href={avatar.link.href}
          target={avatar.link.target}
          tabIndex={tabIndexVal}
        >
          {this.renderAvatar(avatar, 'small')}
        </a>
      ) as JSX.Element;
    } else {
      return this.renderAvatar(avatar, 'small') as JSX.Element;
    }
  }

  private renderAvatar(
    avatar: ProcessedAvatar,
    size: GuxAvatarSize
  ): JSX.Element {
    return (
      <gux-avatar-beta size={size} name={avatar.name} accent={avatar.accent}>
        {avatar.img ? (
          <img slot="image" src={avatar.img.src} alt={avatar.img.alt} />
        ) : null}
      </gux-avatar-beta>
    ) as JSX.Element;
  }

  private renderListItem(avatar: ProcessedAvatar): JSX.Element {
    if (avatar.button) {
      return (
        <gux-list-item key={avatar.name} onClick={avatar.button.onclick}>
          <span class="gux-overflow-list-item">
            {this.renderAvatar(avatar, 'xsmall')}
            {avatar.name}
          </span>
        </gux-list-item>
      ) as JSX.Element;
    } else if (avatar.link) {
      return (
        <gux-list-item key={avatar.name} onClick={() => avatar.link.click()}>
          <span class="gux-overflow-list-item">
            <a href={avatar.link.href} target={avatar.link.target}>
              {this.renderAvatar(avatar, 'xsmall')}
            </a>
            {avatar.name}
          </span>
        </gux-list-item>
      ) as JSX.Element;
    } else {
      return (
        <gux-list-item key={avatar.name}>
          <span class="gux-overflow-list-item">
            {this.renderAvatar(avatar, 'xsmall')}
            {avatar.name}
          </span>
        </gux-list-item>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    const visibleAvatars = this.processedAvatars.filter(
      avatar => !avatar.isOverflow
    );
    const overflowAvatars = this.processedAvatars.filter(
      avatar => avatar.isOverflow
    );

    return [
      <div class="gux-avatar-group-wrapper">
        <div class="gux-avatar-group">
          {visibleAvatars.map((avatar, index) =>
            this.renderInteractiveAvatar(avatar, index)
          )}
          {overflowAvatars.length > 0 && (
            <gux-avatar-overflow-beta count={overflowAvatars.length}>
              <gux-list>
                {overflowAvatars.map(avatar => this.renderListItem(avatar))}
              </gux-list>
            </gux-avatar-overflow-beta>
          )}
        </div>
      </div>
    ] as JSX.Element;
  }
}
