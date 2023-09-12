import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';

import paginationResources from './i18n/en.json';
import { GuxItemsPerPage } from '../gux-pagination.types';

@Component({
  styleUrl: 'gux-pagination-items-per-page.less',
  tag: 'gux-pagination-items-per-page-legacy'
})
export class GuxPaginationItemsPerPageLegacy implements ComponentInterface {
  private i18n: GetI18nValue;
  private dropdownElement: HTMLGuxDropdownElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  itemsPerPage: GuxItemsPerPage = 25;

  @Event({ bubbles: false })
  private internalitemsperpagechange: EventEmitter<number>;

  @Listen('change')
  handleChange(event: CustomEvent) {
    event.stopPropagation();

    const newItemsPerPageValue = parseInt(this.dropdownElement.value, 10);
    this.internalitemsperpagechange.emit(newItemsPerPageValue);
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, paginationResources);
  }

  private getDropdown(): JSX.Element {
    return (
      <gux-dropdown
        ref={el => (this.dropdownElement = el)}
        value={`${this.itemsPerPage}`}
        aria-label={this.i18n('rangeSelected', {
          range: this.itemsPerPage
        })}
      >
        <gux-listbox aria-label={this.i18n('itemsPerPage')}>
          <gux-option value="25">25</gux-option>
          <gux-option value="50">50</gux-option>
          <gux-option value="75">75</gux-option>
          <gux-option value="100">100</gux-option>
        </gux-listbox>
      </gux-dropdown>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <div class="gux-pagination-items-per-page-container">
        <div class="gux-pagination-items-per-page-picker">
          {this.getDropdown()}
        </div>
        <div>{this.i18n('perPage')}</div>
      </div>
    ) as JSX.Element;
  }
}
