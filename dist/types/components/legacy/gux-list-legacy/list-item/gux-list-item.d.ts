import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
import { GuxTextHighlightStrategy } from '../../../stable/gux-text-highlight/gux-text-highlight.types';
export declare class GuxListItemLegacy {
  /**
   * The value to display.
   */
  text: string;
  /**
   * The value associated with this item.
   */
  value: any;
  /**
   * How the item should be highlighted.
   */
  strategy: GuxTextHighlightStrategy;
  /**
   * Emits when the list item is clicked, or enter/space is pressed.
   */
  press: EventEmitter<any>;
  handleClick(): void;
  handleKeyDown(event: KeyboardEvent): void;
  render(): JSX.Element;
  private onItemClicked;
  private emitPress;
}
