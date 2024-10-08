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
  private listItemClickListeners: Map<HTMLElement, (event: Event) => void> =
    new Map();

  @State()
  avatarList: HTMLGuxAvatarFocusableBetaElement[];

  @State()
  private overflowCount: number = 0;

  get countAvatars() {
    return this.avatarList.length ?? 0;
  }

  private checkGroupContainerWidthForLayout() {
    readTask(() => {
      const container = this.root.shadowRoot.querySelector('.gux-avatar-group');
      const containerWidth = container.clientWidth;
      const maxAvatarsToDisplay = this.getMaxAvatarsToDisplay(containerWidth);
      if (this.listItemClickListeners.size > 0) {
        this.removeAllListeners();
      }
      this.overflowAvatars = Array.from(
        this.avatarList.slice(maxAvatarsToDisplay)
      );

      if (this.overflowAvatars.length > 0) {
        this.buildOverflowList();
      }

      this.overflowCount = this.countAvatars - maxAvatarsToDisplay;
    });
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

    if (this.listItemClickListeners.size > 0) {
      this.removeAllListeners();
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

      if (avatarComp) {
        avatarComp.accent = this.getAccent(index) as GuxAvatarAccent;
      }
    });
  }

  private getAccent(index): string {
    return ((index % 12) + 1).toString();
  }

  private showOverflowIndicator(): JSX.Element | null {
    if (this.overflowCount > 0) {
      return (
        <gux-avatar-overflow-beta count={this.overflowCount}>
          <gux-list></gux-list>
        </gux-avatar-overflow-beta>
      ) as JSX.Element;
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

    const avatarInteractiveElement =
      clonedFocusabledAvatar.querySelector('button, a');
    if (avatarInteractiveElement) {
      avatarInteractiveElement.setAttribute('tabIndex', '-1');
    }

    listItemWrapper.appendChild(clonedFocusabledAvatar);

    // Append the avatar's name as text
    if (clonedFocusabledAvatar) {
      const avatar = clonedFocusabledAvatar.querySelector(
        'gux-avatar-beta'
      ) as HTMLGuxAvatarBetaElement;

      if (avatar) {
        avatar.accent = this.getAccent(
          this.avatarList.indexOf(focusableAvatar)
        ) as GuxAvatarAccent;
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('gux-avatar-name');
        nameSpan.textContent = avatar.name;
        listItemWrapper.appendChild(nameSpan);
      }
    }

    const clickListener = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      const originalAvatarInteractiveElement =
        focusableAvatar.querySelector('button, a');
      if (originalAvatarInteractiveElement instanceof HTMLElement) {
        originalAvatarInteractiveElement.click();
      }
    };

    // Add click event listener to the list item
    listItem.addEventListener('click', clickListener);

    // Store the listener reference
    this.listItemClickListeners.set(listItem, clickListener);

    listItem.appendChild(listItemWrapper);

    const popover = this.root.shadowRoot.querySelector('gux-list');
    if (popover) {
      popover.appendChild(listItem);
    }
  }

  private removeAllListeners() {
    this.listItemClickListeners.forEach((listener, listItem) => {
      listItem.removeEventListener('click', listener);
    });
    this.listItemClickListeners.clear();
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
