import { JSX } from '../../../stencil-public-runtime';
import { GuxDateTimeFormat } from '../../../i18n/DateTimeFormatter';
export declare class GuxTime {
  private formatter;
  /**
   * Reference to the host element.
   */
  root: HTMLElement;
  /**
   * The ISO string representation of the time to format
   */
  datetime: string;
  /**
   * Format option type
   */
  format: GuxDateTimeFormat;
  componentWillLoad(): void;
  render(): JSX.Element;
}
