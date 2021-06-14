import { Component, Element, h, JSX, Listen, Method } from '@stencil/core';

import { menuNavigation } from '../gux-menu.common';

@Component({
  styleUrl: 'gux-menu-option.less',
  tag: 'gux-menu-option'
})
export class GuxMenuOption {
  private buttonElement: HTMLButtonElement;

  @Element()
  private root: HTMLElement;

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
      case 'ArrowRight':
      case 'Enter':
        event.stopPropagation();

        break;
    }
  }

  render(): JSX.Element {
    return (
      <button
        type="button"
        class="gux-menu-option-button"
        role="menuitem"
        aria-haspopup="false"
        tabIndex={-1}
        ref={el => (this.buttonElement = el)}
      >
        <span class="gux-menu-option-button-text">
          <slot />
        </span>
      </button>
    );
  }
}
