import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxFilterTypes } from '../../stable/gux-dropdown/gux-dropdown.types';
/**
 * @slot - collection of gux-option-multi elements
 */
export declare class GuxListboxMulti {
  private i18n;
  private optionCreateElement;
  root: HTMLGuxListboxElement;
  value: string;
  loading: boolean;
  filter: string;
  textInput: string;
  filterType: GuxFilterTypes;
  listboxOptions: HTMLGuxOptionMultiElement[];
  allListboxOptionsFiltered: boolean;
  internallistboxoptionsupdated: EventEmitter;
  hasExactMatch: boolean;
  onFocus(): void;
  onBlur(): void;
  selectNewCustomOption(event: CustomEvent<string>): void;
  onKeydown(event: KeyboardEvent): void;
  onKeyup(event: KeyboardEvent): void;
  onMousemove(): void;
  onClick(event: MouseEvent): void;
  guxSelectActive(): Promise<void>;
  private getHasExactMatch;
  updateOptionMultiCreateValue(): void;
  private getSelectedValues;
  private updateOnSlotChange;
  private getOptionCreateElement;
  private setListboxOptions;
  private updateListboxOptions;
  private updateValue;
  componentWillLoad(): Promise<void>;
  componentWillRender(): void;
  renderHiddenSlot(): JSX.Element;
  renderLoading(): JSX.Element;
  renderAllListboxOptionsFiltered(): JSX.Element;
  renderCreateOptionSlot(): JSX.Element;
  render(): JSX.Element;
}
