import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State
} from '@stencil/core';
import {
  autoUpdate,
  computePosition,
  offset,
  flip,
  shift
} from '@floating-ui/dom';

import { afterNextRenderTimeout } from '@utils/dom/after-next-render';

import {
  HTMLGuxMenuItemElement,
  hideDelay,
  menuNavigation
} from '../gux-menu.common';

/**
 * @slot - collection of menu-option, submenu elements
 */

@Component({
  styleUrl: 'gux-submenu.scss',
  tag: 'gux-submenu',
  shadow: true
})
export class GuxSubmenu {
  private hideDelayTimeout: ReturnType<typeof setTimeout>;
  private buttonElement: HTMLButtonElement;
  private submenuElement: HTMLDivElement;
  private submenuContentElement: HTMLDivElement;
  private cleanupUpdatePosition: ReturnType<typeof autoUpdate>;

  @Element()
  private root: HTMLElement;

  @Prop()
  label: string;

  @State()
  private isShown: boolean = false;

  /**
   * Focus on the components button element
   */
  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus(): Promise<void> {
    this.buttonElement.focus();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    menuNavigation(event, this.root);
    switch (event.key) {
      case 'Enter':
        event.stopPropagation();
        this.hideDelayTimeout = afterNextRenderTimeout(() => {
          this.focusOnSubmenu();
        });

        void this.guxFocus();
        break;

      case 'ArrowRight':
        event.stopPropagation();

        this.show();
        this.hideDelayTimeout = afterNextRenderTimeout(() => {
          this.focusOnSubmenu();
        });
        break;

      case 'ArrowLeft':
      case 'Escape':
        if (!(this.root === event.target)) {
          event.stopPropagation();
        }
        void this.guxFocus();
        break;
    }
  }

  // Using 'keyup' here because the native click handler behavior
  // for buttons is triggered on keyup when using the space key
  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        this.hideDelayTimeout = afterNextRenderTimeout(() => {
          this.focusOnSubmenu();
        });
        void this.guxFocus();
        break;
    }
  }

  @Listen('mouseenter')
  onmouseenter() {
    this.show();
  }

  @Listen('mouseleave')
  onMouseleave() {
    this.hide();
  }

  @Listen('click')
  onClick(event: MouseEvent) {
    if ((event.target as Node).nodeName === 'GUX-MENU-OPTION') {
      this.hide();
      return;
    }

    event.stopPropagation();
  }

  @Listen('focusin')
  onFocusin() {
    this.show();
  }

  @Listen('focusout')
  onFocusout() {
    this.hide();
  }

  private show(): void {
    clearTimeout(this.hideDelayTimeout);
    this.isShown = true;
  }

  private hide(): void {
    if (this.isShown) {
      this.hideDelayTimeout = setTimeout(() => {
        this.isShown = false;
      }, hideDelay);
    }
  }

  private runUpdatePosition(): void {
    if (this.root.isConnected) {
      this.cleanupUpdatePosition = autoUpdate(
        this.buttonElement,
        this.submenuElement,
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
    if (this.submenuElement) {
      void computePosition(this.buttonElement, this.submenuElement, {
        placement: 'right-start',
        strategy: 'fixed',
        // gse-ui-flyoutMenu-parenting-gap
        middleware: [offset(4), flip(), shift()]
      }).then(({ x, y }) => {
        Object.assign(this.submenuElement.style, {
          left: `${x}px`,
          top: `${y - 8}px` //TODO https://inindca.atlassian.net/browse/COMUI-2480
        });
      });
    }
  }

  private focusOnSubmenu(): void {
    if (this.submenuContentElement.contains(document.activeElement)) {
      return;
    }
    const menuItems = Array.from(this.root.children);

    const nextFocusableElement = menuItems[0] as HTMLGuxMenuItemElement;

    void nextFocusableElement.guxFocus();
  }

  componentDidLoad(): void {
    if (this.isShown) {
      this.runUpdatePosition();
    }
  }

  componentDidUpdate(): void {
    if (this.isShown) {
      this.runUpdatePosition();
    } else if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }

  disconnectedCallback(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <button
          type="button"
          class={{
            'gux-submenu-button': true,
            'gux-submenu-button-active': this.isShown
          }}
          role="menuitem"
          tabIndex={-1}
          ref={el => (this.buttonElement = el)}
          aria-haspopup="true"
          aria-expanded={this.isShown.toString()}
        >
          <span class="gux-submenu-button-text">{this.label}</span>
          <gux-icon
            class="gux-submenu-open-icon"
            icon-name="custom/chevron-right-small-regular"
            decorative
          ></gux-icon>
        </button>
        <div
          ref={el => (this.submenuElement = el)}
          class={{
            'gux-submenu-wrapper': true,
            'gux-shown': this.isShown
          }}
        >
          <div
            role="menu"
            class="gux-submenu-content"
            ref={el => (this.submenuContentElement = el)}
          >
            <slot />
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
