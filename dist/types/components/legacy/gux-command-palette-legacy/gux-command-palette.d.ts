export declare class GuxCommandPaletteLegacy {
  root: HTMLElement;
  /**
   * The current search value.
   */
  filterValue: string;
  /**
   * If the command palette is shown.
   */
  visible: boolean;
  private inputElement;
  private i18n;
  componentWillLoad(): Promise<void>;
  render(): any;
  renderLists(): any;
  /**
   * Opens the command palette.
   */
  open(): Promise<void>;
  /**
   * Closes the command palette.
   */
  close(): Promise<void>;
  private handleInput;
  private filterItems;
  private createShortcutItem;
  private createStandardItem;
  private transformCommands;
  private handlePress;
  private createList;
  private onKeyDown;
  private elementIsSearch;
  private getParentGuxList;
  private setFocusOnElement;
  private navigateUp;
  private navigateDown;
}
