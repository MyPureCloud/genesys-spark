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

const validFocusableItems = ['gux-list-item'];

@Component({
  styleUrl: 'gux-list.less',
  tag: 'gux-list',
  shadow: { delegatesFocus: true }
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

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxFocusFirstItem(): Promise<void> {
    first(this.root, validFocusableItems);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxFocusItemById(id: string): Promise<void> {
    byId(this.root, validFocusableItems, id);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxFocusItemByClosestId(id: string): Promise<void> {
    byClosestId(this.root, validFocusableItems, id);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxFocusLastItem(): Promise<void> {
    last(this.root, validFocusableItems);
  }

  private renderFocusTarget(): JSX.Element {
    return (<span tabindex="-1"></span>) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <Host role="list">
        {this.renderFocusTarget()}
        <slot></slot>
      </Host>
    ) as JSX.Element;
  }
}
