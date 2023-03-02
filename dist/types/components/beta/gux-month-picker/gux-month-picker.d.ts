import { JSX } from '../../../stencil-public-runtime';
import { GuxISOYearMonth } from '../../../utils/date/year-month-values';
export declare class GuxMonthPicker {
  private i18n;
  private calendarToggleButtonElement;
  private monthCalendarElement;
  private monthSpinnerElement;
  private yearSpinnerElement;
  private root;
  /**
   * The current selected year and month in ISO8601 format (yyyy-mm)
   */
  value: GuxISOYearMonth;
  /**
   * The min year and month selectable in ISO8601 format (yyyy-mm)
   */
  min: GuxISOYearMonth;
  /**
   * The max year and month selectable in ISO8601 format (yyyy-mm)
   */
  max: GuxISOYearMonth;
  disabled: boolean;
  expanded: boolean;
  locale: string;
  onKeyDown(event: KeyboardEvent): void;
  onValueUpdate(newValue: GuxISOYearMonth): void;
  onClickOutside(): void;
  componentWillLoad(): Promise<void>;
  private isOutOfBounds;
  private isBeforeMin;
  private isAfterMax;
  private toggleCalendar;
  private onMonthCalendarInput;
  private incrementMonth;
  private incrementYear;
  private onSpinnerKeyDown;
  private onSpinnerKeyUp;
  private onSpinnerClick;
  private getSpinnerLabel;
  private getSpinnerValueNow;
  private getSpinnerValueText;
  private renderMonthSpinnerButton;
  private renderYearSpinnerButton;
  private renderSpinnerButtons;
  private renderCalendarToggleButton;
  renderTarget(): JSX.Element;
  private renderPopup;
  render(): JSX.Element;
}
