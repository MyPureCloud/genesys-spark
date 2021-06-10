import { createPopper, Instance } from '@popperjs/core';
import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

import {
  HTMLGuxMenuItemElement,
  hideDelay,
  moveFocusDelay,
  menuNavigation
} from '../gux-menu.common';

@Component({
  styleUrl: 'gux-submenu.less',
  tag: 'gux-submenu'
})
export class GuxSubmenu {
  private hideDelayTimeout: NodeJS.Timer;
  private popperInstance: Instance;
  private buttonElement: HTMLButtonElement;
  private submenuElement: HTMLDivElement;
  private submenuContentElement: HTMLDivElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  label: string;

  @State()
  private isShown: boolean = false;

  @Watch('isShown')
  forceUpdate(isShown: boolean) {
    if (isShown) {
      if (this.popperInstance) {
        this.popperInstance.update();
      }
    }
  }

  /**
   * Focus on the components button element
   */
  @Method()
  async guxFocus(): Promise<void> {
    this.buttonElement.focus();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    menuNavigation(event, this.root);
    switch (event.key) {
      case 'Enter':
        this.hideDelayTimeout = setTimeout(() => {
          this.focusOnSubmenu();
        }, moveFocusDelay);

        this.guxFocus();
        break;

      case 'ArrowRight':
        event.stopPropagation();

        this.show();
        this.hideDelayTimeout = setTimeout(() => {
          this.focusOnSubmenu();
        }, moveFocusDelay);
        break;

      case 'ArrowLeft':
      case 'Escape':
        if (this.submenuContentElement.contains(event.target as Node)) {
          event.stopPropagation();
        }

        this.guxFocus();
        break;
    }
  }

  // Using 'keyup' here because the native click handler behavior
  // for buttons is triggered on keyup when using the space key
  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        event.stopPropagation();
        if (this.submenuContentElement.contains(document.activeElement)) {
          this.root.focus();
        } else {
          this.hideDelayTimeout = setTimeout(() => {
            this.focusOnSubmenu();
          }, moveFocusDelay);
        }
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
    if (this.submenuContentElement.contains(event.target as Node)) {
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

  private runPopper(): void {
    this.popperInstance = createPopper(
      this.buttonElement,
      this.submenuElement,
      {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [-8, 0]
            }
          },
          {
            name: 'flip',
            enabled: false
          }
        ],
        placement: 'right-start'
      }
    );
  }

  private destroyPopper(): void {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  private focusOnSubmenu(): void {
    if (this.submenuContentElement.contains(document.activeElement)) {
      return;
    }

    const menuItems = Array.from(this.submenuContentElement.children);
    const nextFocusableElement = menuItems[0] as HTMLGuxMenuItemElement;

    nextFocusableElement.guxFocus();
  }

  componentDidLoad(): void {
    this.runPopper();
  }

  disconnectedCallback(): void {
    this.destroyPopper();
  }

  render(): JSX.Element {
    return (
      <Host>
        <button
          type="button"
          class="gux-submenu-button"
          role="menuitem"
          tabIndex={-1}
          ref={el => (this.buttonElement = el)}
          aria-haspopup="true"
          aria-expanded={this.isShown.toString()}
        >
          <span class="gux-submenu-button-text">{this.label}</span>
          <gux-icon
            class="gux-submenu-open-icon"
            icon-name="chevron-right"
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
    );
  }
}
