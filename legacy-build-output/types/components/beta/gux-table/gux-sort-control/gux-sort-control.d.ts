import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
import { GuxTableSortDirection, GuxTableSortState } from '../gux-table.types';
export declare class GuxSortControl {
  private tableHeader;
  private thObserver;
  private i18n;
  root: HTMLElement;
  includeUnsorted: boolean;
  headerContent: string;
  active: boolean;
  sort: GuxTableSortDirection;
  isLeftAlignIcon: boolean;
  guxsortchanged: EventEmitter<GuxTableSortState>;
  componentWillLoad(): Promise<void>;
  disconnectedCallback(): void;
  private onClick;
  private setState;
  private getIconName;
  private getNextSort;
  private getSRText;
  render(): JSX.Element;
}
