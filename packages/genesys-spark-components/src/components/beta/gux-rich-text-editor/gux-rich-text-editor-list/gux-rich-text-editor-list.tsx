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
 * @slot - collection of gux-rich-style-list-item, gux-rich-highlight-list-item or gux-rich-text-editor-sub-list elements.
 */

const validFocusableItems = [
  'gux-rich-style-list-item',
  'gux-rich-highlight-list-item',
  'gux-rich-text-editor-sub-list'
];

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
  listItems: HTMLElement[] = [];

  @Event()
  internallistitemsupdated: EventEmitter;

  get listItemsSlot(): HTMLSlotElement | null {
    return this.root.querySelector('slot');
  }

  get listItemElements(): HTMLElement[] {
    const assignedElements = this.listItemsSlot?.assignedElements();

    if (assignedElements) {
      return Array.from(assignedElements as HTMLElement[]);
    }

    return [];
  }

  //Set the first gux-rich-highlight-list-item tab-index to 0 so we can tab to the list of colors.
  private handleHighlighItemsNavigation(): void {
    if (this.listItemsSlot) {
      const firstHighlightItem = this.listItemsSlot
        .assignedElements()
        .find(
          el => el.tagName.toLowerCase() === 'gux-rich-highlight-list-item'
        );
      if (firstHighlightItem) {
        const buttonElement =
          firstHighlightItem.shadowRoot.querySelector('button');
        if (buttonElement) {
          buttonElement.tabIndex = 0;
        }
      }
    }
  }

  private setListItems(): void {
    this.listItems = this.listItemElements as HTMLElement[];
    this.internallistitemsupdated.emit();
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);

    this.setListItems();
    this.handleHighlighItemsNavigation();
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;

    if (!target) {
      return;
    }

    const keyHandlers = {
      ArrowUp: () => previous(this.root, validFocusableItems),
      ArrowDown: () => next(this.root, validFocusableItems),
      Home: () => first(this.root, validFocusableItems),
      End: () => last(this.root, validFocusableItems)
    };

    if (target.matches('gux-rich-highlight-list-item')) {
      Object.assign(keyHandlers, {
        ArrowLeft: () => previous(this.root, validFocusableItems),
        ArrowRight: () => next(this.root, validFocusableItems)
      });
    }

    const handler = keyHandlers[event.key];
    if (handler) {
      event.preventDefault();
      handler();
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

  render(): JSX.Element {
    return (
      <Host role="list">
        <slot onSlotchange={() => this.setListItems()}></slot>
      </Host>
    );
  }
}
