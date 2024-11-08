import {
  Component,
  Element,
  Listen,
  Host,
  h,
  Method,
  Prop,
  State,
  Event,
  EventEmitter
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

import {
  first,
  last,
  next,
  previous
} from '../../../stable/gux-list/gux-list.service';

/**
 * @slot - collection of gux-rich-style-list-item elements
 */

const validFocusableItems = ['gux-rich-style-list-item'];

@Component({
  tag: 'gux-rich-text-editor-list',
  styleUrl: 'gux-rich-text-editor-list.scss',
  shadow: { delegatesFocus: true }
})
export class GuxRichTextEditorList {
  @Element()
  root: HTMLElement;

  @Prop()
  value: string;

  @State()
  listItems: HTMLGuxRichStyleListItemElement[] = [];

  @Event()
  internallistitemsupdated: EventEmitter;

  get listItemsSlot(): HTMLSlotElement | null {
    return this.root.querySelector('slot');
  }

  get listItemElements(): HTMLGuxRichStyleListItemElement[] {
    const assignedElements = this.listItemsSlot?.assignedElements();

    if (assignedElements) {
      return Array.from(assignedElements as HTMLGuxRichStyleListItemElement[]);
    }
    return [];
  }

  private setListItems(): void {
    this.listItems = this.listItemElements as HTMLGuxRichStyleListItemElement[];
    this.internallistitemsupdated.emit();
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);

    this.setListItems();
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
  async guxFocusLastItem(): Promise<void> {
    last(this.root, validFocusableItems);
  }

  private renderFocusTarget(): JSX.Element {
    return (<span tabindex="-1" aria-hidden="true"></span>) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <Host role="list">
        {this.renderFocusTarget()}
        <slot onSlotchange={() => this.setListItems()}></slot>
      </Host>
    );
  }
}
