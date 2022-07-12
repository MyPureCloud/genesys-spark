import { Component, h, JSX, Prop, Element } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';
import { DateTimeFormatter, GuxDateTimeFormat } from '../../../i18n/DateTimeFormatter';

@Component({
  styleUrl: 'gux-date-time.less',
  tag: 'gux-date-time-beta',
  shadow: true
})
export class GuxDateTime {
  private formatter : DateTimeFormatter;

  @Element()
  root: HTMLElement;
  
  @Prop()
  locale: string = 'en';

  @Prop()
  date: number = Date.now();

  @Prop()
  format: GuxDateTimeFormat;

  componentWillLoad(): void {
    trackComponent(this.root);
    this.formatter = new DateTimeFormatter(this.locale);
  }

  render(): JSX.Element {
    return (<div>{ this.formatter.formatDateTime(new Date(this.date), this.format) }</div>) as JSX.Element;
  }
}
