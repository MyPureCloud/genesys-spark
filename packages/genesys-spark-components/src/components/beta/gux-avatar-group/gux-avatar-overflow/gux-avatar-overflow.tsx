import {
  Component,
  h,
  JSX,
  Element,
  State,
  Method,
  Host,
  Listen
} from '@stencil/core';

import { autoUpdate, computePosition, offset } from '@floating-ui/dom';

import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { trackComponent } from '@utils/tracking/usage';
import { logWarn } from '@utils/error/log-error';
import { groupKeyboardNavigation } from '../gux-avatar-group.service';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';

/**
 * @slot - a number of gux-avatar-overflow-items
 */
@Component({
  styleUrl: 'gux-avatar-overflow.scss',
  tag: 'gux-avatar-overflow-beta',
  shadow: { delegatesFocus: true }
})
export class GuxAvatarOverflow {
  private overflowButtonElement: HTMLButtonElement;
  private menuElement: HTMLDivElement;
  private cleanupUpdatePosition: ReturnType<typeof autoUpdate>;
  private hideDelayTimeout: ReturnType<typeof setTimeout>;
  private focusDelayTimeout: ReturnType<typeof setTimeout>;
  private delayTime: number = 250;

  @Element() root: HTMLElement;

  @State() count: number = 0;

  @State() expanded: boolean = false;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    if (this.expanded) {
      this.runUpdatePosition();
    }
  }

  componentDidUpdate(): void {
    if (this.expanded) {
      this.runUpdatePosition();
    } else if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }

  disconnectedCallback(): void {
    clearTimeout(this.focusDelayTimeout);
    clearTimeout(this.hideDelayTimeout);
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  onClickOutside(): void {
    this.expanded = false;
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    groupKeyboardNavigation(event, this.root);

    switch (event.key) {
      case 'Escape': {
        this.hide();

        const target = event.target as Element;
        if (target.tagName === 'GUX-AVATAR-OVERFLOW-ITEM-BETA') {
          this.focusDelayTimeout = afterNextRenderTimeout(() => {
            this.overflowButtonElement?.focus();
          });
        }
        break;
      }
      case 'Tab':
        this.hide();
        break;
    }
  }

  @Listen('click')
  onClick(e: MouseEvent): void {
    e.stopPropagation();

    const target = e.target as HTMLElement;
    if (target.tagName === 'GUX-AVATAR-OVERFLOW-ITEM-BETA') {
      // Reset scroll on menu when clicked to avoid scroll jump when reopened
      this.menuElement.scrollTop = 0;
      this.expanded = false;
    }
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxClose(): Promise<void> {
    this.hide();
  }

  private runUpdatePosition(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }

    if (this.root.isConnected) {
      this.cleanupUpdatePosition = autoUpdate(
        this.overflowButtonElement,
        this.menuElement,
        () => this.updatePosition(),
        {
          ancestorScroll: true,
          elementResize: true,
          animationFrame: true,
          ancestorResize: true
        }
      );
    } else {
      this.disconnectedCallback();
    }
  }

  private updatePosition(): void {
    if (this.root) {
      void computePosition(this.overflowButtonElement, this.menuElement, {
        placement: 'bottom-start',
        strategy: 'fixed',
        middleware: [
          offset({
            mainAxis: 4,
            crossAxis: 4
          })
        ]
      }).then(({ x, y }) => {
        Object.assign(this.menuElement.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }
  }

  private getCount() {
    const menuItems = Array.from(
      this.root.children
    ) as HTMLGuxAvatarOverflowItemBetaElement[];
    if (
      menuItems.some(item => item.tagName !== 'GUX-AVATAR-OVERFLOW-ITEM-BETA')
    ) {
      logWarn(
        this.root,
        'Only gux-avatar-overflow-item-beta elements are allowed as children.'
      );
    }
    if (menuItems) {
      return menuItems.length;
    }
  }

  private toggleOverflowMenu(): void {
    if (!this.expanded) {
      this.show();
    } else {
      this.hide();
    }
  }

  private show(): void {
    clearTimeout(this.hideDelayTimeout);
    this.expanded = true;
    this.hideDelayTimeout = afterNextRenderTimeout(() => {
      this.focusOnMenu();
    });
  }

  private hide(): void {
    if (this.expanded) {
      this.hideDelayTimeout = setTimeout(() => {
        this.expanded = false;
      }, this.delayTime);
    }
  }

  private focusOnMenu(): void {
    const overflowItems = Array.from(this.root.children);

    const nextFocusableElement =
      overflowItems[0] as HTMLGuxAvatarOverflowItemBetaElement;

    void nextFocusableElement.focus();
  }

  render(): JSX.Element {
    return (
      <Host role="menuitem">
        <button
          class="gux-avatar-overflow"
          ref={el => (this.overflowButtonElement = el)}
          onClick={() => this.toggleOverflowMenu()}
          tabIndex={-1}
          aria-haspopup="true"
          aria-expanded={this.expanded.toString()}
        >
          <span class="gux-avatar-overflow-wrapper">
            <span class="gux-avatar-overflow-content"> +{this.getCount()}</span>
          </span>
        </button>
        <div
          class={{
            'gux-menu-wrapper': true,
            'gux-shown': this.expanded
          }}
          ref={el => (this.menuElement = el)}
        >
          <div role="menu" class="gux-menu-content">
            <slot></slot>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
