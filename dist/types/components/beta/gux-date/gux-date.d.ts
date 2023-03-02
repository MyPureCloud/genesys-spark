import { JSX } from '../../../stencil-public-runtime';
import { GuxDateTimeFormat } from '../../../i18n/DateTimeFormatter';
export declare class GuxDate {
  private formatter;
  /**
   * Reference to the host element.
   */
  root: HTMLElement;
  /**
   * The ISO string representation of the date to format
   */
  datetime: string;
  /**
   * Format option type
   */
  format: GuxDateTimeFormat;
  componentWillLoad(): void;
  render(): JSX.Element;
}
