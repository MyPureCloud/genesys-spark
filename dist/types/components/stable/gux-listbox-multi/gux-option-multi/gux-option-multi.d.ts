import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
/**
 * @slot - text
 */
export declare class GuxOptionMulti {
  private i18n;
  root: HTMLElement;
  value: string;
  active: boolean;
  selected: boolean;
  disabled: boolean;
  filtered: boolean;
  hovered: boolean;
  custom: boolean;
  onmouseenter(): void;
  onMouseleave(): void;
  guxremovecustomoption: EventEmitter<string>;
  internalselectcustomoption: EventEmitter<string>;
  emitRemoveCustomOption(): void;
  componentWillLoad(): Promise<void>;
  renderCustomOptionInstructions(): JSX.Element;
  render(): JSX.Element;
}
