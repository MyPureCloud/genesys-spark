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

/**
 * @slot - Some gux-avatars
 */

@Component({
  styleUrl: 'gux-avatar-group.scss',
  tag: 'gux-avatar-group-beta',
  shadow: true
})
export class GuxAvatarGroup {
  @Element()
  root: HTMLElement;

  private listItemClickListeners: Map<HTMLElement, (event: Event) => void> =
    new Map();

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

  disconnectedCallback() {
    if (this.listItemClickListeners.size > 0) {
      this.removeAllListeners();
    }
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

  private renderAvatar(
    avatar: ProcessedAvatar,
    avatarSize: GuxAvatarSize
  ): JSX.Element {
    if (avatar.button) {
      return (
        <button type={avatar.button.type} onClick={avatar.button.onclick}>
          <gux-avatar-beta
            size={avatarSize}
            name={avatar.name}
            accent={avatar.accent}
          >
            {avatar.img ? (
              <img slot="image" src={avatar.img.src} alt={avatar.img.alt} />
            ) : null}
          </gux-avatar-beta>
        </button>
      ) as JSX.Element;
    } else if (avatar.link) {
      return (
        <a href={avatar.link.href} target={avatar.link.target}>
          <gux-avatar-beta
            size={avatarSize}
            name={avatar.name}
            accent={avatar.accent}
          >
            {avatar.img ? (
              <img slot="image" src={avatar.img.src} alt={avatar.img.alt} />
            ) : null}
          </gux-avatar-beta>
        </a>
      ) as JSX.Element;
    } else {
      return (
        <gux-avatar-beta
          size={avatarSize}
          name={avatar.name}
          accent={avatar.accent}
        >
          {avatar.img ? (
            <img slot="image" src={avatar.img.src} alt={avatar.img.alt} />
          ) : null}
        </gux-avatar-beta>
      ) as JSX.Element;
    }
  }

  private renderListItem(avatar: ProcessedAvatar): JSX.Element {
    const handleClick = (event: MouseEvent) =>
      this.handleListItemClick(event, avatar);
    this.listItemClickListeners.set(avatar.focusableAvatar, handleClick);

    return (
      <gux-list-item key={avatar.name} onClick={handleClick}>
        <div class="gux-overflow-list-item">
          {this.renderAvatar(avatar, 'xsmall')}
          {avatar.name}
        </div>
      </gux-list-item>
    ) as JSX.Element;
  }

  private handleListItemClick(
    event: MouseEvent,
    avatar: ProcessedAvatar
  ): void {
    if (avatar.button) {
      event.preventDefault();
      avatar.button.click();
    } else if (avatar.link) {
      event.preventDefault();
      avatar.link.click();
    }
  }

  private removeAllListeners() {
    this.listItemClickListeners.forEach((listener, element) => {
      element.removeEventListener('click', listener);
    });
    this.listItemClickListeners.clear();
  }

  render(): JSX.Element {
    const visibleAvatars = this.processedAvatars.filter(
      avatar => !avatar.isOverflow
    );
    const overflowAvatars = this.processedAvatars.filter(
      avatar => avatar.isOverflow
    );

    return (
      <div class="gux-avatar-group-wrapper">
        <div class="gux-avatar-group">
          {visibleAvatars.map(avatar => (
            <gux-avatar-focusable-beta>
              {this.renderAvatar(avatar, 'small')}
            </gux-avatar-focusable-beta>
          ))}
          {overflowAvatars.length > 0 && (
            <gux-avatar-overflow-beta count={overflowAvatars.length}>
              <gux-list>
                {overflowAvatars.map(avatar => this.renderListItem(avatar))}
              </gux-list>
            </gux-avatar-overflow-beta>
          )}
        </div>
      </div>
    ) as JSX.Element;
  }
}
