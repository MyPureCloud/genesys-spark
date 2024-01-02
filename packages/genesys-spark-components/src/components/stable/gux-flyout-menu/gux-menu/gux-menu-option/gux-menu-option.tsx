import {
  Component,
  Element,
  h,
  JSX,
  Listen,
  Method,
  State
} from '@stencil/core';

import { hasSlot } from '@utils/dom/has-slot';
import { menuNavigation } from '../gux-menu.common';

/**
 * @slot - text
 */

@Component({
  styleUrl: 'gux-menu-option.scss',
  tag: 'gux-menu-option',
  shadow: true
})
export class GuxMenuOption {
  private buttonElement: HTMLButtonElement;

  @Element()
  private root: HTMLElement;

  @State()
  private hasSubtext: boolean = false;

  componentWillLoad(): void {
    this.hasSubtext = hasSlot(this.root, 'subtext');
  }

  /**
   * Focus on the components button element
   */
  // eslint-disable-next-line @typescript-eslint/require-await
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

  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        event.stopPropagation();
        break;
    }
  }

  private renderText(): JSX.Element {
    if (this.hasSubtext) {
      return (
        <div class="gux-menu-option-button-text-wrapper">
          <span class="gux-menu-option-button-text">
            <slot />
          </span>
          <span class="gux-menu-option-button-subtext">
            <slot name="subtext" />
          </span>
        </div>
      ) as JSX.Element;
    } else {
      return (
        <span class="gux-menu-option-button-text">
          <slot />
        </span>
      ) as JSX.Element;
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
        {this.renderText()}
      </button>
    ) as JSX.Element;
  }
}
