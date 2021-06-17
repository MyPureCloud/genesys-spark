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
import { randomHTMLId } from '../../../../utils/dom/random-html-id';
import tableResources from '../i18n/en.json';

@Component({
  styleUrl: 'gux-row-select.less',
  tag: 'gux-row-select'
})
export class GuxRowSelect {
  @Element()
  root: HTMLElement;

  private id: string = randomHTMLId('gux-row-select');
  private i18n: GetI18nValue;

  @Prop({ mutable: true })
  selected = false;

  @Event()
  internalrowselectchange: EventEmitter;

  @Listen('input')
  onCheck(event: CustomEvent): void {
    event.stopPropagation();

    const input = event.target as HTMLInputElement;

    this.selected = input.checked;
    this.internalrowselectchange.emit();
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, tableResources);
  }

  render(): JSX.Element {
    return (
      <gux-form-field>
        <input
          slot="input"
          id={this.id}
          type="checkbox"
          checked={this.selected}
        />
        <label slot="label" htmlFor={this.id}>
          &#8203;
          <span class="gux-label-text">{this.i18n('selectTableRow')}</span>
        </label>
      </gux-form-field>
    );
  }
}
