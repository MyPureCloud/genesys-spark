import { JSX } from '../../../stencil-public-runtime';
import { GuxDateTimeFormat } from '../../../i18n/DateTimeFormatter';
export declare class GuxDateTime {
  private formatter;
  /**
   * Reference to the host element.
   */
  root: HTMLElement;
  /**
   * The ISO string representation of the datetime to format
   */
  datetime: string;
  /**
   * Format option type
   */
  format: GuxDateTimeFormat;
  componentWillLoad(): void;
  render(): JSX.Element;
}
