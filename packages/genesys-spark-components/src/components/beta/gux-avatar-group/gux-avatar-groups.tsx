import {
  Component,
  h,
  JSX,
  Element,
  State,
  readTask,
  Prop,
  writeTask
} from '@stencil/core';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';
import { GuxAvatarAccent } from './../gux-avatar/gux-avatar.types';
import { randomHTMLId } from '@utils/dom/random-html-id';

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
  private listItemClickListeners: Map<HTMLElement, (event: Event) => void> =
    new Map();

  @Prop()
  avatarLimit: number = 7;

  @State()
  avatarList: HTMLGuxAvatarFocusableBetaElement[];

  @State()
  private overflowCount: number = 0;

  @State()
  private maxAvatarsToDisplay: number = 0;

  get countAvatars() {
    return this.avatarList.length ?? 0;
  }

  async componentWillLoad(): Promise<void> {
    this.avatarList = Array.from(
      this.root.children
    ) as HTMLGuxAvatarFocusableBetaElement[];

    this.avatarList.forEach(focusableAvatar => {
      const avatar = focusableAvatar.querySelector(
        'gux-avatar-beta'
      ) as HTMLGuxAvatarBetaElement;
      avatar.size = 'small';
      focusableAvatar.id = focusableAvatar.id
        ? focusableAvatar.id
        : randomHTMLId(`gux-avatar-list-item`);
    });

    trackComponent(this.root);
    this.checkGroupContainerWidthForLayout();
  }

  componentDidLoad() {
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() =>
        readTask(() => {
          this.checkGroupContainerWidthForLayout();
        })
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

  private getAccent(index): string {
    return ((index % 12) + 1).toString();
  }

  // Check the amount of avatars that should be hidden/visible and update display
  private checkGroupContainerWidthForLayout() {
    const container = this.root.shadowRoot.querySelector('.gux-avatar-group');
    const containerWidth = container?.clientWidth ?? 0;
    const newMaxAvatarsToDisplay = this.getMaxAvatarsToDisplay(containerWidth);

    const newOverflowCount = Math.max(
      0,
      this.countAvatars - this.maxAvatarsToDisplay
    );

    if (
      newMaxAvatarsToDisplay !== this.maxAvatarsToDisplay ||
      newOverflowCount !== this.overflowCount
    ) {
      this.maxAvatarsToDisplay = newMaxAvatarsToDisplay;
      this.overflowCount = newOverflowCount;
      this.updateGroupItems();
    }
  }

  // Determine the amount of avatars that can be displayed based on the current container width
  private getMaxAvatarsToDisplay(containerWidth: number): number {
    const minimumSize = 37;
    const avatarWidth = 26;

    const maxAvatarsToDisplay = Math.floor(
      (containerWidth - minimumSize) / avatarWidth
    );

    if (containerWidth < minimumSize) {
      return 0;
    }

    return maxAvatarsToDisplay < this.avatarLimit
      ? maxAvatarsToDisplay
      : this.avatarLimit;
  }

  private updateGroupItems(): void {
    this.avatarList.forEach((avatar, index) => {
      const shouldHide = index >= this.maxAvatarsToDisplay;
      const isHidden = avatar.classList.contains('gux-hide');

      if (shouldHide && !isHidden) {
        this.addItemToPopup(avatar);
        avatar.classList.add('gux-hide');
      } else if (!shouldHide && isHidden) {
        this.removeItemFromPopup(avatar);
        avatar.classList.remove('gux-hide');
      }
    });
  }

  private addItemToPopup(
    focusableAvatar: HTMLGuxAvatarFocusableBetaElement
  ): void {
    // Clone the original focusableAvatar so it can be used in overflow popup
    const clonedFocusableAvatar = focusableAvatar?.cloneNode(
      true
    ) as HTMLGuxAvatarFocusableBetaElement;

    const list = this.root.shadowRoot.querySelector('gux-list');

    // Create a new list item with the same id as the focusableAvatar
    const listItem = document.createElement('gux-list-item');
    listItem.id = focusableAvatar.id;

    // Give is a class that makes it use flexbox layout
    listItem.classList.add('gux-overflow-list-item');

    // Get the button or link within the cloned focusableAvatar
    // and set its tabIndex to -1 so it can't be tabbed to
    const buttonOrLink = clonedFocusableAvatar.querySelector('button, a');
    if (buttonOrLink) {
      buttonOrLink.setAttribute('tabIndex', '-1');
    }

    // Append the avatar's name as text
    if (clonedFocusableAvatar) {
      // Get the nested avatar
      const avatar = clonedFocusableAvatar.querySelector(
        'gux-avatar-beta'
      ) as HTMLGuxAvatarBetaElement;

      if (avatar) {
        // Set the accent
        avatar.accent = this.getAccent(
          this.avatarList.indexOf(focusableAvatar)
        ) as GuxAvatarAccent;

        // Set the size
        avatar.size = 'xsmall';

        // Create a span with the name from the avatar
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('gux-avatar-name');
        nameSpan.textContent = avatar.name;

        // Add cloned avatar and name span to list item
        listItem.append(clonedFocusableAvatar, nameSpan);
      }
    }

    // Create click listener to pass the click on the list item down to the button or link
    const clickListener = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      if (buttonOrLink instanceof HTMLElement) {
        buttonOrLink.click();
      }
    };

    // Add click event listener to the list item
    listItem.addEventListener('click', clickListener);

    // Store the listener reference
    this.listItemClickListeners.set(listItem, clickListener);

    // Append the list item to the list
    if (list) {
      writeTask(() => {
        list.appendChild(listItem);
      });
    }
  }

  private removeItemFromPopup(
    focusableAvatar: HTMLGuxAvatarFocusableBetaElement
  ): void {
    const listItem = Array.from(
      this.root.shadowRoot.querySelectorAll('gux-list-item')
    ).find(item => item.id === focusableAvatar.id);

    if (listItem) {
      writeTask(() => {
        listItem.remove();
      });
    }
  }

  private removeAllListeners() {
    this.listItemClickListeners.forEach((listener, listItem) => {
      listItem.removeEventListener('click', listener);
    });
    this.listItemClickListeners.clear();
  }

  private slotChanged(): void {
    this.avatarList = Array.from(
      this.root.children
    ) as HTMLGuxAvatarFocusableBetaElement[];

    this.avatarList.forEach((focusableAvatar, index) => {
      const avatar = focusableAvatar.querySelector(
        'gux-avatar-beta'
      ) as HTMLGuxAvatarBetaElement;

      if (avatar) {
        avatar.accent = this.getAccent(index) as GuxAvatarAccent;
      }
    });
  }

  render(): JSX.Element {
    return (
      <div class="gux-avatar-group-wrapper">
        <div class="gux-avatar-group">
          <slot onSlotchange={this.slotChanged.bind(this)} />
          <gux-avatar-overflow-beta
            class={{ 'gux-overflow-hide': this.overflowCount === 0 }}
            count={this.overflowCount}
          >
            <gux-list></gux-list>
          </gux-avatar-overflow-beta>
        </div>
      </div>
    ) as JSX.Element;
  }
}
