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
  tag: 'gux-pagination-items-per-page'
})
export class GuxPaginationItemsPerPage implements ComponentInterface {
  @Element()
  private root: HTMLElement;

  private i18n: GetI18nValue;

  @Prop()
  itemsPerPage: GuxItemsPerPage = 25;

  @Event({ bubbles: false })
  private internalitemsperpagechange: EventEmitter<number>;

  @Listen('change') // This is not a native "change" event
  handleChange(event: CustomEvent) {
    event.stopPropagation();

    const newItemsPerPageValue = parseInt(event.detail, 10);
    this.internalitemsperpagechange.emit(newItemsPerPageValue);
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, paginationResources);
  }

  private getDropdown(): JSX.Element {
    return (
      <gux-dropdown value={String(this.itemsPerPage)}>
        <gux-option value="25">25</gux-option>
        <gux-option value="50">50</gux-option>
        <gux-option value="75">75</gux-option>
        <gux-option value="100">100</gux-option>
      </gux-dropdown>
    );
  }

  render(): JSX.Element {
    return (
      <div class="gux-pagination-items-per-page-container">
        <div class="gux-pagination-items-per-page-picker">
          {this.getDropdown()}
        </div>
        <div>{this.i18n('perPage')}</div>
      </div>
    );
  }
}
