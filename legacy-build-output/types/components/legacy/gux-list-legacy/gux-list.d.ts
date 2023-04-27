import { EventEmitter, JSX } from '../../../stencil-public-runtime';
export declare class GuxListLegacy {
  root: HTMLElement;
  /**
   * The current selection in the list.
   */
  value: unknown;
  /**
   * The highlight value
   */
  highlight: string;
  /**
   * The currently selected index.
   */
  selectedIndex: number;
  /**
   * Triggered when the list's selection is changed.
   */
  changed: EventEmitter<unknown>;
  /**
   * Using a mutation observer because component loading order is not quite right.
   * In this case we are attempting to update a component that updates a component.
   * What ends up happening is that there is no hook to make sure all components have loaded.
   * When the DOM load order gets fixed we should be able to remove this logic.
   * https://github.com/ionic-team/stencil/issues/1261
   */
  private observer;
  emitChanged(value: unknown): void;
  itemSelected(ev: CustomEvent<unknown>): void;
  valueHandler(newValue: unknown): void;
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
  /**
   * Once the component is loaded
   */
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private onKeyDown;
  private isCommandPaletteList;
  private updateTabIndexes;
  private performHighlight;
  private getFilteredList;
}
