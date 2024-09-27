import { Component, h, JSX, Element, State, readTask } from '@stencil/core';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
import { GuxAvatarAccent } from './../gux-avatar/gux-avatar.types';

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

  private resizeObserver?: ResizeObserver;
  private overflowAvatars: HTMLGuxAvatarFocusableBetaElement[];

  @State()
  avatarList: HTMLGuxAvatarFocusableBetaElement[];

  @State()
  private overflowCount: number = 0;

  @State()
  private popoverOpen: boolean = false;

  get countAvatars() {
    return this.avatarList.length ?? 0;
  }

  private checkGroupContainerWidthForLayout() {
    readTask(() => {
      const container = this.root.shadowRoot.querySelector('.gux-avatar-group');
      const containerWidth = container.clientWidth;
      const maxAvatarsToDisplay = this.getMaxAvatarsToDisplay(containerWidth);
      this.overflowAvatars = Array.from(
        this.avatarList.slice(maxAvatarsToDisplay)
      );

      if (this.overflowAvatars.length > 0) {
        this.buildOverflowList();
      }

      this.overflowCount = this.countAvatars - maxAvatarsToDisplay;
    });

    /*
    TODO: Implement logic to handle layout based on container width
    This logic should determine the number of avatars to display and their layout
      max 63px - overflow only if more than 1 avatar
      max 87px - if more than 2 avatars, display 2 avatars with overflow indicator
      max 111px - if more than 3 avatars, display 3 avatars with overflow indicator
      max 135px - if more than 4 avatars, display 4 avatars with overflow indicator
      max 159px - if more than 5 avatars, display 5 avatars with overflow indicator
      max 183px - if more than 6 avatars, display 6 avatars with overflow indicator
      max 207px - if more than 7 avatars, display 7 avatars with overflow indicator
    */
  }

  private getMaxAvatarsToDisplay(containerWidth: number): number {
    if (containerWidth <= 59) {
      return 0;
    } else if (containerWidth <= 83) {
      return 1;
    } else if (containerWidth <= 107) {
      return 2;
    } else if (containerWidth <= 131) {
      return 3;
    } else if (containerWidth <= 159) {
      return 4;
    } else if (containerWidth <= 183) {
      return 5;
    } else if (containerWidth <= 207) {
      return 6;
    } else {
      return 7;
    }
  }

  async componentWillLoad(): Promise<void> {
    this.avatarList = Array.from(
      this.root.children
    ) as HTMLGuxAvatarFocusableBetaElement[];
    trackComponent(this.root);
  }

  componentDidLoad() {
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() =>
        this.checkGroupContainerWidthForLayout()
      );
    }

    if (this.resizeObserver) {
      this.resizeObserver.observe(
        this.root.shadowRoot.querySelector('.gux-avatar-group')
      );
    }

    afterNextRenderTimeout(() => {
      this.checkGroupContainerWidthForLayout();
    }, 500);
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(
        this.root.shadowRoot.querySelector('.gux-avatar-group')
      );
    }
  }

  private slotChanged(): void {
    this.avatarList = Array.from(
      this.root.children
    ) as HTMLGuxAvatarFocusableBetaElement[];

    this.avatarList.forEach((avatar, index) => {
      const avatarComp = avatar.querySelector(
        'gux-avatar-beta'
      ) as HTMLGuxAvatarBetaElement;
      console.log(avatarComp.name);
      avatarComp.accent = this.getAccent(index) as GuxAvatarAccent;
    });
  }

  private getAccent(index): string {
    return ((index % 12) + 1).toString();
  }

  private showOverflowIndicator(): JSX.Element | null {
    if (this.overflowCount > 0) {
      return [
        <gux-avatar-focusable-beta
          id="avatar-overflow-indicator"
          onClick={() => (this.popoverOpen = !this.popoverOpen)}
        >
          <gux-avatar-overflow-beta
            count={this.overflowCount}
          ></gux-avatar-overflow-beta>
        </gux-avatar-focusable-beta>,
        <gux-popover-list
          id="overflow-popover"
          for="avatar-overflow-indicator"
          is-open={this.popoverOpen}
        >
          <gux-list></gux-list>
        </gux-popover-list>
      ] as JSX.Element;
    } else {
      return null;
    }
  }

  private buildOverflowList(): void {
    const list = this.root.shadowRoot.querySelector('gux-list');
    if (list) {
      list.innerHTML = '';
      this.overflowAvatars.map(focusableAvatar =>
        this.addListItemForAvatar(focusableAvatar)
      );
    }
  }

  private addListItemForAvatar(
    focusableAvatar: HTMLGuxAvatarFocusableBetaElement
  ): void {
    const listItem = document.createElement('gux-list-item');
    const listItemWrapper = document.createElement('div');
    listItemWrapper.classList.add('gux-overflow-list-item');
    const clonedFocusabledAvatar = focusableAvatar?.cloneNode(
      true
    ) as HTMLGuxAvatarFocusableBetaElement;
    listItemWrapper.appendChild(clonedFocusabledAvatar);

    // Append the avatar's name as text
    if (clonedFocusabledAvatar) {
      const avatar = clonedFocusabledAvatar.querySelector(
        'gux-avatar-beta'
      ) as HTMLGuxAvatarBetaElement;
      avatar.accent = this.getAccent(
        this.avatarList.indexOf(focusableAvatar)
      ) as GuxAvatarAccent;
      const nameSpan = document.createElement('span');
      nameSpan.classList.add('gux-avatar-name');
      nameSpan.textContent = avatar.name;
      listItemWrapper.appendChild(nameSpan);
    }

    listItem.appendChild(listItemWrapper);
    const popover = this.root.shadowRoot.querySelector('gux-list');
    if (popover) {
      popover.appendChild(listItem);
    }
  }

  render(): JSX.Element {
    return (
      <div class="gux-avatar-group-wrapper">
        <div class="gux-avatar-group">
          <slot onSlotchange={this.slotChanged.bind(this)} />
          {this.showOverflowIndicator()}
        </div>
      </div>
    ) as JSX.Element;
  }
}
