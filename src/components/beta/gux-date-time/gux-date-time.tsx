import { Component, h, Host, Prop, Element } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';
import { DateTimeFormatter, GuxDateTimeFormat } from '../../../i18n/DateTimeFormatter';
import { getDesiredLocale } from '../../../i18n/index';

@Component({
  styleUrl: 'gux-date-time.less',
  tag: 'gux-date-time-beta',
  shadow: true
})
export class GuxDateTime {
  private formatter : DateTimeFormatter;

  /**
   * Reference to the host element.
   */
  @Element()
  root: HTMLElement;

  /**
   * The ISO string representation of the datetime to format 
   */
  @Prop()
  datetime: string = new Date().toISOString();

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
    return (<Host class="gux-date-time">{ this.formatter.formatDateTime(new Date(this.datetime), this.format) }</Host>);
  }
}
