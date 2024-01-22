import {
  Component,
  h,
  Element,
  Event,
  EventEmitter,
  JSX,
  Listen,
  Prop
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import { randomHTMLId } from '@utils/dom/random-html-id';
import tableResources from '../i18n/en.json';

@Component({
  styleUrl: 'gux-row-select.scss',
  tag: 'gux-row-select'
})
export class GuxRowSelect {
  @Element()
  root: HTMLElement;

  private id: string = randomHTMLId('gux-row-select');
  private i18n: GetI18nValue;
  private inputElement: HTMLInputElement;

  @Prop()
  selected: boolean = false;

  @Prop()
  disabled: boolean;

  @Event()
  internalrowselectchange: EventEmitter;

  @Listen('input')
  onCheck(event: CustomEvent): void {
    event.stopPropagation();
    this.internalrowselectchange.emit(this.inputElement.checked);
    console.log('executed');
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(
      this.root,
      tableResources,
      'gux-table'
    );
  }

  render(): JSX.Element {
    return (
      <gux-form-field-checkbox label-position="screenreader">
        <input
          ref={el => (this.inputElement = el)}
          slot="input"
          id={this.id}
          type="checkbox"
          checked={this.selected}
          disabled={this.disabled}
        />
        <label slot="label" htmlFor={this.id}>
          &#8203;
          <span>{this.i18n('selectTableRow')}</span>
        </label>
      </gux-form-field-checkbox>
    ) as JSX.Element;
  }
}
