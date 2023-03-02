import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
export declare class GuxDropdownOption {
  root: HTMLElement;
  /**
   * The content of this attribute represents the value to be submitted on 'input' changes,
   * should this option be selected. If this attribute is omitted, the value is taken from
   * the text content of the option element.
   */
  value: string;
  /**
   * If this Boolean attribute is set, this option is not checkable. It won't receive any
   * browsing events, like mouse clicks or focus-related ones.
   */
  disabled: boolean;
  /**
   * If this Boolean attribute is set, the option is not visible to the select control.
   * This does not mean that it clears the selection if it was previously selected.
   *
   * Should only be used by internal users.
   */
  filtered: boolean;
  /**
   * If present, this Boolean attribute indicates that the option is currently selected.
   */
  selected: boolean;
  text: string;
  highlight: string;
  highlightIndex: number;
  /**
   * Occurs when the item has been selected.
   */
  selectedChanged: EventEmitter<string>;
  /**
   * Gets the value rendered by the drop down item.
   */
  getDisplayedValue(): Promise<string>;
  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  shouldFilter(searchInput: string): Promise<boolean>;
  componentDidLoad(): void;
  hostData(): {
    tabindex: string;
  };
  render(): JSX.Element;
  private textWithHighlights;
  private onItemClicked;
}
