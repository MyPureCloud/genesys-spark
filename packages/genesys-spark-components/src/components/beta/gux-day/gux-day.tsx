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

@Component({
  styleUrl: 'gux-day.scss',
  tag: 'gux-day',
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
  date: Date;

  /* Watcher to sync the internal date with the day attribute on changes */
  @Watch('day')
  onDateAttrChange(): void {
    this.date = new Date(this.day);
  }

  @Event({ eventName: 'guxdayselected' })
  daySelected: EventEmitter<string>;

  /* Formatter for displaying the numeric day of the month */
  dayFormatter: Intl.DateTimeFormat;

  /* Formatter for screen readers that will read the full date */
  readerFormatter: Intl.DateTimeFormat;

  async connectedCallback(): Promise<void> {
    this.date = new Date(this.day);
    const locale = getDesiredLocale(this.root);
    this.dayFormatter = sparkIntl.dateTimeFormat(locale, { day: 'numeric' });
    this.readerFormatter = sparkIntl.dateTimeFormat(locale);
  }

  render(): JSX.Element {
    return (
      <button onClick={() => this.daySelected.emit(this.day)} type="button">
        <slot>{this.dayFormatter.format(this.date)}</slot>
      </button>
    );
  }
}
