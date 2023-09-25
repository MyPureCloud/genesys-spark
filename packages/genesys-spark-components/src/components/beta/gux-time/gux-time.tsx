import { Component, JSX, h, Host, Prop, Element } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import {
  DateTimeFormatter,
  GuxDateTimeFormat
} from '../../../i18n/DateTimeFormatter';
import { getDesiredLocale } from '../../../i18n/index';
import { GuxTimeZoneIdentifier } from '../../../i18n/time-zone/types';
import { getValidTimezone } from '@utils/date/get-valid-timezone';

@Component({
  tag: 'gux-time-beta',
  shadow: true
})
export class GuxTime {
  private formatter: DateTimeFormatter;

  /**
   * Reference to the host element.
   */
  @Element()
  root: HTMLElement;

  /**
   * The ISO string representation of the time to format
   */
  @Prop()
  datetime: string = new Date().toISOString();

  /**
   * Format option type
   */
  @Prop()
  format: GuxDateTimeFormat = 'short';

  /**
   * Format time zone
   */
  /**
   * Time zone identifier
   */
  @Prop()
  timeZone: GuxTimeZoneIdentifier;

  componentWillLoad(): void {
    trackComponent(this.root);
    this.formatter = new DateTimeFormatter(getDesiredLocale(this.root));
  }

  render() {
    return (
      <Host>
        {this.formatter.formatTime(new Date(this.datetime), this.format, {
          timeZone: getValidTimezone(this.timeZone)
        })}
      </Host>
    ) as JSX.Element;
  }
}
