import { Component, JSX, h, Host, Prop, Element } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import {
  DateTimeFormatter,
  GuxDateTimeFormat
} from '../../../i18n/DateTimeFormatter';
import * as sparkIntl from '../../../genesys-spark-utils/intl';
import { readRegionalDatesCookie } from '../../../i18n/check-regional-dates-cookie';
import { getDesiredLocale } from '../../../i18n/index';
import { GuxTimeZoneIdentifier } from '../../../i18n/time-zone/types';
import { getValidTimezone } from '@utils/date/get-valid-timezone';

@Component({
  tag: 'gux-time-beta',
  shadow: true
})
export class GuxTime {
  private formatter: DateTimeFormatter;
  private hasRegionalDatesCookie: boolean = false;

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
    if (readRegionalDatesCookie()) {
      this.hasRegionalDatesCookie = true;
    } else {
      this.formatter = new DateTimeFormatter(getDesiredLocale(this.root));
    }
  }

  private renderTime(): JSX.Element {
    if (this.hasRegionalDatesCookie) {
      return sparkIntl
        .dateTimeFormat(sparkIntl.determineDisplayLocale(this.root), {
          timeStyle: this.format,
          timeZone: getValidTimezone(this.timeZone)
        })
        .format(new Date(this.datetime));
    } else {
      return this.formatter.formatTime(new Date(this.datetime), this.format, {
        timeZone: getValidTimezone(this.timeZone)
      });
    }
  }

  render() {
    return (<Host>{this.renderTime()}</Host>) as JSX.Element;
  }
}
