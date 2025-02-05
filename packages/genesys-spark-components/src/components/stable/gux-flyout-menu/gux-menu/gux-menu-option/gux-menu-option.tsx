import {
  AttachInternals,
  Component,
  Element,
  h,
  JSX,
  Listen,
  Method
} from '@stencil/core';

import { menuNavigation } from '../gux-menu.common';

/**
 * @slot - text
 */

@Component({
  styleUrl: 'gux-menu-option.scss',
  tag: 'gux-menu-option',
  shadow: true,
  formAssociated: true
})
export class GuxMenuOption {
  private buttonElement: HTMLButtonElement;

  @AttachInternals() internals: ElementInternals;

  @Element()
  private root: HTMLElement;

  connectedCallback(): void {
    this.internals.role = 'menuitem';
  }

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
      case 'ArrowRight':
      case 'Enter':
        event.stopPropagation();
        break;
    }
  }

  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        event.stopPropagation();
        break;
    }
  }

  render(): JSX.Element {
    return (
      <button
        type="button"
        class="gux-menu-option-button"
        aria-haspopup="false"
        tabIndex={-1}
        ref={el => (this.buttonElement = el)}
      >
        <span class="gux-menu-option-button-text">
          <slot />
        </span>
      </button>
    ) as JSX.Element;
  }
}
