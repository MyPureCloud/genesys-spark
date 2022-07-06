import { Component, h, JSX, Prop, Element } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';
import { DateTimeFormatter, FormatOptions } from '../../../i18n/DateTimeFormatter';

@Component({
  styleUrl: 'gux-date.less',
  tag: 'gux-date-beta',
  shadow: true
})
export class GuxDate {
  private formatter : DateTimeFormatter;

  @Element()
  root: HTMLElement;
  
  @Prop()
  locale: string = 'en';

  @Prop()
  date: number = Date.now();

  @Prop()
  format: FormatOptions;

  componentWillLoad(): void {
    trackComponent(this.root);
    this.formatter = new DateTimeFormatter(this.locale);
  }

  render(): JSX.Element {
    return (<div>{ this.formatter.formatDate(new Date(this.date), this.format) }</div>) as JSX.Element;
  }
}
