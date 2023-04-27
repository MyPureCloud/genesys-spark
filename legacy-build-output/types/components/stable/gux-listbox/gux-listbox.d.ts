import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { ListboxOptionElement } from './options/option-types';
import { GuxFilterTypes } from '../gux-dropdown/gux-dropdown.types';
/**
 * The listbox component provides keyboard bindings and a11y patterns for selecting
 * from a list of options.
 *
 * @slot - collection of elements conforming to the ListboxOptionElement interface
 */
export declare class GuxListbox {
  private i18n;
  root: HTMLGuxListboxElement;
  value: string;
  filter: string;
  filterType: GuxFilterTypes;
  loading: boolean;
  selectedValues: string[];
  listboxOptions: ListboxOptionElement[];
  allListboxOptionsFiltered: boolean;
  internallistboxoptionsupdated: EventEmitter;
  onFocus(): void;
  onBlur(): void;
  onKeydown(event: KeyboardEvent): void;
  onKeyup(event: KeyboardEvent): void;
  onMousemove(): void;
  onClick(event: MouseEvent): void;
  guxSelectActive(): Promise<void>;
  private setListboxOptions;
  private updateValue;
  componentWillLoad(): Promise<void>;
  componentWillRender(): void;
  renderHiddenSlot(): JSX.Element;
  renderLoading(): JSX.Element;
  renderAllListboxOptionsFiltered(): JSX.Element;
  render(): JSX.Element;
}
