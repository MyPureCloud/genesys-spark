import {
  Component,
  Element,
  h,
  JSX,
  Listen,
  Method,
  State
} from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

const validChildren = 'gux-action-item:not([disabled])';

@Component({
  styleUrl: 'gux-action-list.less',
  tag: 'gux-action-list',
  shadow: true
})
export class GuxActionList {
  @Element()
  root: HTMLElement;

  /**
   * The currently selected index.
   */
  @State()
  selectedIndex: number = -1;

  /*
   * Sets focus to the fist item in the list.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setFocusOnFirstItem(): Promise<void> {
    this.selectedIndex = 0;
    this.updateTabIndexes();
  }

  /*
   * Sets focus to the last item in the list.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async setFocusOnLastItem(): Promise<void> {
    const filteredList = this.getFilteredList();
    this.selectedIndex = filteredList.length - 1;
    this.updateTabIndexes();
  }

  /**
   * Returns whether the last item in the list is selected.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async isLastItemSelected(): Promise<boolean> {
    const filteredList = this.getFilteredList();
    return this.selectedIndex === filteredList.length - 1;
  }

  /**
   * Returns whether the first item in the list is selected.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async isFirstItemSelected(): Promise<boolean> {
    return this.selectedIndex <= 0;
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    this.updateTabIndexes();
    return (
      <div class="gux-action-list-items-container" role="list">
        <slot />
      </div>
    ) as JSX.Element;
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    const filteredList = this.getFilteredList();

    let newIndex = -1;
    switch (event.key) {
      case 'ArrowUp':
        if (this.selectedIndex !== 0) {
          event.preventDefault();
          newIndex = this.selectedIndex - 1;
          event.stopPropagation();
        } else if (!this.root.classList.contains('gux-command-palette-list')) {
          event.preventDefault();
          newIndex = filteredList.length - 1;
        }
        break;
      case 'Home':
        if (this.selectedIndex) {
          newIndex = 0;
        }
        break;
      case 'ArrowDown':
        if (this.selectedIndex !== filteredList.length - 1) {
          event.preventDefault();
          newIndex = this.selectedIndex + 1;
          event.stopPropagation();
        } else if (!this.root.classList.contains('gux-command-palette-list')) {
          event.preventDefault();
          newIndex = 0;
          event.stopPropagation();
        }
        break;
      case 'End':
        if (this.selectedIndex !== filteredList.length - 1) {
          newIndex = filteredList.length - 1;
        }
        break;
    }

    if (newIndex !== -1) {
      this.selectedIndex = newIndex;
    }
  }

  private updateTabIndexes(): void {
    const children = this.getFilteredList();

    if (!children || this.selectedIndex === -1) {
      return;
    }

    children.forEach((element: HTMLGuxActionItemElement, index: number) => {
      if (index !== this.selectedIndex) {
        element.shadowRoot
          .querySelector('button')
          .setAttribute('tabindex', '-1');
      } else {
        element.shadowRoot
          .querySelector('button')
          .setAttribute('tabindex', '0');
        element.shadowRoot.querySelector('button').focus();
      }
    });
  }

  private getFilteredList(): Element[] {
    const slot = this.root.querySelector('slot');

    if (slot) {
      return slot
        .assignedElements()
        .filter(element => element.matches(validChildren));
    }

    return Array.from(this.root.querySelectorAll(validChildren));
  }
}
