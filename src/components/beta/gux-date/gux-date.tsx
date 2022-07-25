import { Component, h, Host, Prop, Element } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';
import { DateTimeFormatter, GuxDateTimeFormat } from '../../../i18n/DateTimeFormatter';
import { getDesiredLocale } from '../../../i18n/index';

@Component({
  styleUrl: 'gux-date.less',
  tag: 'gux-date-beta',
  shadow: true
})
export class GuxDate {
  private formatter : DateTimeFormatter;

  /**
   * Reference to the host element.
   */
  @Element()
  root: HTMLElement;

  /**
   * The ISO string representation of the date to format 
   */
  @Prop()
  date: string = new Date().toISOString();

  /**
   * Format option type 
   */
  @Prop()
  format: GuxDateTimeFormat = 'full';

  componentWillLoad(): void {
    trackComponent(this.root);
    this.formatter = new DateTimeFormatter(getDesiredLocale(this.root));
  }

  render() {
    return (<Host class="gux-date">{ this.formatter.formatDate(new Date(this.date), this.format) }</Host>);
  }
}
