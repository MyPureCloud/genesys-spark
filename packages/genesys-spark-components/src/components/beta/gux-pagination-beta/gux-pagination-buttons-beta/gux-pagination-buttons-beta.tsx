import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import { GuxPaginationLayoutBeta } from '../gux-pagination-beta.types';

import paginationResources from './i18n/en.json';
import { GuxPaginationButtonsService } from './gux-pagination-button-beta.service';
import { afterNextRender } from '@utils/dom/after-next-render';

@Component({
  styleUrl: 'gux-pagination-buttons-beta.less',
  tag: 'gux-pagination-buttons-beta',
  shadow: false
})
export class GuxPaginationButtonsBeta {
  currentElement: HTMLElement;

  @Element()
  private root: HTMLElement;

  private i18n: GetI18nValue;

  @Prop({ mutable: true })
  currentPage: number;

  @Prop()
  totalPages: number;

  @Prop()
  layout: GuxPaginationLayoutBeta = 'advanced';

  @Event({ bubbles: false })
  private internalcurrentpagechange: EventEmitter<number>;

  @Listen('goToPage')
  goToPageHandler(event: CustomEvent<number>) {
    this.currentPage = event.detail;
    this.handlePageChange(this.currentPage);
    afterNextRender(() => {
      this.currentElement.focus();
    });
  }

  private get onFirstPage(): boolean {
    return this.currentPage <= 1;
  }

  private get onLastPage(): boolean {
    return this.currentPage >= this.totalPages;
  }

  private handleClickFirst(): void {
    this.internalcurrentpagechange.emit(1);
  }

  private handleClickPrevious(): void {
    this.internalcurrentpagechange.emit(this.currentPage - 1);
  }

  private handleClickNext(): void {
    this.internalcurrentpagechange.emit(this.currentPage + 1);
  }

  private handleClickLast(): void {
    this.internalcurrentpagechange.emit(this.totalPages);
  }

  private handlePageChange(pageNumber: number): void {
    this.internalcurrentpagechange.emit(pageNumber);
  }

  private getPageListEnteries(
    currentPage: number,
    totalPages: number,
    layout: string
  ): JSX.Element[] {
    return GuxPaginationButtonsService.displayAllPageButtons(
      currentPage,
      totalPages,
      layout
    ).reduce((acc, cv) => {
      if (cv.current) {
        return acc.concat(
          (
            <button
              ref={el => (this.currentElement = el)}
              class="gux-pagination-buttons-list-current"
            >
              {cv.display}
            </button>
          ) as JSX.Element
        );
      }

      if (cv.display == '...') {
        return acc.concat(
          (
            <gux-pagination-ellipsis-button totalPages={this.totalPages} />
          ) as JSX.Element
        );
      }

      return acc.concat(
        (
          <button
            class="gux-pagination-buttons-list-target"
            onClick={() => this.handlePageChange(cv.pageNumber)}
          >
            {cv.display}
          </button>
        ) as JSX.Element
      );
    }, [] as JSX.Element[]);
  }

  private getPageNavigation(): JSX.Element {
    return (
      <div class="gux-pagination-buttons-list-container">
        {this.getPageListEnteries(
          this.currentPage,
          this.totalPages,
          this.layout
        )}
      </div>
    ) as JSX.Element;
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, paginationResources);
  }

  render(): JSX.Element {
    return (
      <div class={`gux-pagination-buttons-container gux-${this.layout}`}>
        <div class="gux-pagination-buttons-group">
          <gux-button-slot-beta accent="ghost">
            <button
              title={this.i18n('first')}
              disabled={this.onFirstPage}
              onClick={this.handleClickFirst.bind(this)}
            >
              <gux-icon decorative icon-name="chevron-double-left"></gux-icon>
            </button>
          </gux-button-slot-beta>
          <gux-button-slot-beta accent="ghost">
            <button
              title={this.i18n('previous')}
              disabled={this.onFirstPage}
              onClick={this.handleClickPrevious.bind(this)}
            >
              <gux-icon decorative icon-name="chevron-small-left"></gux-icon>
            </button>
          </gux-button-slot-beta>
        </div>

        {this.getPageNavigation()}

        <div class="gux-pagination-buttons-group">
          <gux-button-slot-beta accent="ghost">
            <button
              title={this.i18n('next')}
              disabled={this.onLastPage}
              onClick={this.handleClickNext.bind(this)}
            >
              <gux-icon decorative icon-name="chevron-small-right"></gux-icon>
            </button>
          </gux-button-slot-beta>
          <gux-button-slot-beta accent="ghost">
            <button
              title={this.i18n('last')}
              disabled={this.onLastPage}
              onClick={this.handleClickLast.bind(this)}
            >
              <gux-icon decorative icon-name="chevron-double-right"></gux-icon>
            </button>
          </gux-button-slot-beta>
        </div>
      </div>
    ) as JSX.Element;
  }
}
