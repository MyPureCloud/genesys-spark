import { JSX } from '../../../../../../stencil-public-runtime';
import { GuxISOYearMonth } from '../../../../../../utils/date/year-month-values';
export declare class GuxMonthListItem {
  root: HTMLElement;
  value: GuxISOYearMonth;
  disabled: boolean;
  selected: boolean;
  onMouseup(): void;
  onMouseover(): void;
  private focusParentList;
  render(): JSX.Element;
}
