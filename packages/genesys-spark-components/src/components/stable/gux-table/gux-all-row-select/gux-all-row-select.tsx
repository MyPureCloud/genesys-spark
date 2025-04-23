import {
  Component,
  h,
  Element,
  Event,
  EventEmitter,
  JSX,
  Listen,
  Prop,
  Method
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import { randomHTMLId } from '@utils/dom/random-html-id';
import tableResources from '../i18n/en.json';

/**
 * @slot label - input label.
 */
@Component({
  styleUrl: 'gux-all-row-select.scss',
  tag: 'gux-all-row-select',
  shadow: true
})
export class GuxAllRowSelect {
  private inputElement: HTMLInputElement;
  private id: string = randomHTMLId('gux-all-row-select');
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  selected: boolean = false;

  @Prop()
  disabled: boolean;

  @Event()
  internalallrowselectchange: EventEmitter;

  @Listen('input')
  onCheck(event: CustomEvent): void {
    event.stopPropagation();
    this.selected = this.inputElement.checked;
    this.internalallrowselectchange.emit(this.selected);
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async setIndeterminate(indeterminate: boolean = true): Promise<void> {
    this.inputElement.indeterminate = indeterminate;
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
          <slot name="label">
            <span>{this.i18n('selectAllTableRows')}</span>
          </slot>
        </label>
      </gux-form-field-checkbox>
    ) as JSX.Element;
  }
}
