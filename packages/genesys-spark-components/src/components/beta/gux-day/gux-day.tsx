import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State,
  Watch
} from '@stencil/core';
import { getDesiredLocale } from 'i18n';
import * as sparkIntl from '../../../genesys-spark-utils/intl';
import { Temporal } from '@js-temporal/polyfill';
import { formatPlainDate } from '@utils/date/temporal';

/**
 * The gux-day component is how we render a day within an calendar. Custom-styled
 * instances can be slotted in to exiting calendars by users of Spark, but it
 * should not be used stand-alone.
 */
@Component({
  styleUrl: 'gux-day.scss',
  tag: 'gux-day-beta',
  shadow: { delegatesFocus: true }
})
export class GuxDay {
  @Element()
  root: HTMLElement;

  /* The date of the day in ISO format, e.g. 2024-10-22 */
  @Prop()
  day: string;

  /* JS Date object, derived from the `day` attribute */
  @State()
  date: Temporal.PlainDate;

  /* Watcher to sync the internal date with the day attribute on changes */
  @Watch('day')
  onDayPropChange(): void {
    this.readDateFromProp();
  }

  @Event({ eventName: 'guxdayselected' })
  daySelected: EventEmitter<string>;

  /* Formatter for displaying the numeric day of the month */
  dayFormatter: Intl.DateTimeFormat;

  /* Formatter for screen readers that will read the full date */
  readerFormatter: Intl.DateTimeFormat;

  /**
   * Syncs the internal rich `date` from the string `day` prop. Needs
   * to run when connected to the DOM, and when the prop changes.
   */
  readDateFromProp() {
    this.date = Temporal.PlainDate.from(this.day);
  }

  async connectedCallback(): Promise<void> {
    this.readDateFromProp();
    const locale = getDesiredLocale(this.root);
    this.dayFormatter = sparkIntl.dateTimeFormat(locale, { day: 'numeric' });
    this.readerFormatter = sparkIntl.dateTimeFormat(locale);
  }

  render(): JSX.Element {
    return (
      <button onClick={() => this.daySelected.emit(this.day)} type="button">
        <slot>
          <span class="gux-non-sr">
            {formatPlainDate(this.dayFormatter, this.date)}
          </span>
          <span class="gux-sr-only">
            {formatPlainDate(this.readerFormatter, this.date)}
          </span>
        </slot>
      </button>
    );
  }
}
