import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Method
} from '@stencil/core';

import {
  byClosestId,
  byId,
  first,
  last,
  next,
  previous
} from './gux-list.service';

import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - collection of gux-list-item, gux-list-divider elements
 */

const validFocusableItems = [
  'gux-list-item',
  'gux-table-toolbar-custom-action'
];

@Component({
  styleUrl: 'gux-list.scss',
  tag: 'gux-list',
  shadow: true
})
export class GuxList {
  @Element()
  root: HTMLElement;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        previous(this.root, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        first(this.root, validFocusableItems);
        break;
      case 'ArrowDown':
        event.preventDefault();
        next(this.root, validFocusableItems);
        break;
      case 'End':
        event.preventDefault();
        last(this.root, validFocusableItems);
        break;
    }
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusFirstItem(): Promise<void> {
    first(this.root, validFocusableItems);
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusItemById(id: string): Promise<void> {
    byId(this.root, validFocusableItems, id);
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusItemByClosestId(id: string): Promise<void> {
    byClosestId(this.root, validFocusableItems, id);
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocusLastItem(): Promise<void> {
    last(this.root, validFocusableItems);
  }

  render(): JSX.Element {
    return (
      <Host tabindex="-1" role="list">
        <slot></slot>
      </Host>
    ) as JSX.Element;
  }
}
