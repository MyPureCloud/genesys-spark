import { JSX } from '../../../../stencil-public-runtime';
export declare class GuxOptionLegacy {
  root: HTMLElement;
  slotContent: HTMLElement;
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
   * The content of this attribute represents the value to be displayed,
   * If this attribute is omitted, the value is taken from the text content of the slot.
   * This attribute takes precedence over slot value
   */
  text: string;
  selected: boolean;
  updateParentSelection(): void;
  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  shouldFilter(searchInput: string): Promise<boolean>;
  private getParentGuxDropdown;
  componentWillLoad(): void;
  hostData(): {
    tabindex: string;
  };
  render(): JSX.Element;
}
