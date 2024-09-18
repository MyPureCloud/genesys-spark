import { Component, h, JSX, Element, State, readTask } from '@stencil/core';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { trackComponent } from '@utils/tracking/usage';

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
        this.showOverflowPopover()
      ] as JSX.Element;
    } else {
      return null;
    }
  }

  private showOverflowPopover(): JSX.Element | null {
    if (this.overflowCount > 0 && this.overflowAvatars) {
      return (
        <gux-popover-list
          id="overflow-popover"
          for="avatar-overflow-indicator"
          is-open={this.popoverOpen}
          // is-open
        >
          <gux-list>
            {this.overflowAvatars.map(focusableAvatar =>
              this.getListItemFromAvatar(focusableAvatar)
            )}
          </gux-list>
        </gux-popover-list>
      ) as JSX.Element;
    } else {
      return null;
    }
  }

  private getListItemFromAvatar(
    focusableAvatar: HTMLGuxAvatarFocusableBetaElement
  ): JSX.Element {
    const avatar =
      (focusableAvatar.querySelector(
        'gux-avatar-beta'
      ) as HTMLGuxAvatarBetaElement) ?? null;
    console.log(avatar.outerHTML);
    return (
      <gux-list-item>
        <div class="gux-overflow-list-item">
          <gux-avatar-beta size="small" name={avatar.name}></gux-avatar-beta>
          {avatar.name}
        </div>
      </gux-list-item>
    ) as JSX.Element;
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
