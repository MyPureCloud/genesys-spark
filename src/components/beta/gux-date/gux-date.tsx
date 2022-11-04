import { Component, JSX, h, Host, Prop, Element } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';
import {
  DateTimeFormatter,
  GuxDateTimeFormat
} from '../../../i18n/DateTimeFormatter';
import { getDesiredLocale } from '../../../i18n/index';

@Component({
  tag: 'gux-date-beta',
  shadow: true
})
export class GuxDate {
  private formatter: DateTimeFormatter;

  /**
   * Reference to the host element.
   */
  @Element()
  root: HTMLElement;

  /**
   * The ISO string representation of the date to format
   */
  @Prop()
  datetime: string = new Date().toISOString();

  /**
   * Format option type
   */
  @Prop()
  format: GuxDateTimeFormat = 'short';

  componentWillLoad(): void {
    trackComponent(this.root);
    this.formatter = new DateTimeFormatter(getDesiredLocale(this.root));
  }

  render() {
    return (
      <Host>
        {this.formatter.formatDate(new Date(this.datetime), this.format)}
      </Host>
    ) as JSX.Element;
  }
}
