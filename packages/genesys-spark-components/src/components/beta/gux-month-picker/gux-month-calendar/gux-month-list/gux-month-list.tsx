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
  first,
  focusMove,
  last,
  next,
  previous
} from '../../../../stable/gux-list/gux-list.service';

const validFocusableItems = ['gux-month-list-item'];

/**
 * @slot - month name
 */

@Component({
  styleUrl: 'gux-month-list.less',
  tag: 'gux-month-list',
  shadow: { delegatesFocus: true }
})
export class GuxMonthList {
  @Element()
  root: HTMLElement;

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        focusMove(this.root, validFocusableItems, -3);
        break;
      case 'ArrowDown':
        event.preventDefault();
        focusMove(this.root, validFocusableItems, 3);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        previous(this.root, validFocusableItems);
        break;
      case 'ArrowRight':
        event.preventDefault();
        next(this.root, validFocusableItems);
        break;
      case 'Home':
        event.preventDefault();
        first(this.root, validFocusableItems);
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

  private renderFocusTarget(): JSX.Element {
    return (<span tabindex="1"></span>) as JSX.Element;
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
