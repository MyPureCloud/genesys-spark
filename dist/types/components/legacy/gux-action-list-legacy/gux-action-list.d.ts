import { JSX } from '../../../stencil-public-runtime';
export declare class GuxActionListLegacy {
  root: HTMLElement;
  /**
   * The currently selected index.
   */
  selectedIndex: number;
  setFocusOnFirstItem(): Promise<void>;
  setFocusOnLastItem(): Promise<void>;
  /**
   * Returns whether the last item in the list is selected.
   */
  isLastItemSelected(): Promise<boolean>;
  /**
   * Returns whether the first item in the list is selected.
   */
  isFirstItemSelected(): Promise<boolean>;
  componentWillLoad(): void;
  render(): JSX.Element;
  onKeyDown(event: KeyboardEvent): void;
  private updateTabIndexes;
  private getFilteredList;
}
