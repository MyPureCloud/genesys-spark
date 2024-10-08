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
import { GuxPaginationLayout } from '../gux-pagination.types';

import paginationResources from './i18n/en.json';
import { GuxPaginationButtonsService } from './gux-pagination-button.service';
import { afterNextRender } from '@utils/dom/after-next-render';

@Component({
  styleUrl: 'gux-pagination-buttons.scss',
  tag: 'gux-pagination-buttons',
  shadow: false
})
export class GuxPaginationButtons {
  currentElement: HTMLElement;

  @Element()
  private root: HTMLElement;

  private i18n: GetI18nValue;

  @Prop({ mutable: true })
  currentPage: number;

  @Prop()
  totalPages: number;

  @Prop()
  layout: GuxPaginationLayout = 'advanced';

  @Prop()
  disabled: boolean = false;

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
            <gux-button-slot accent="ghost">
              <button
                disabled={this.disabled}
                ref={el => (this.currentElement = el)}
                class="gux-pagination-buttons-list-current"
                aria-label={this.i18n('pageSelected', {
                  pageSelected: cv.pageNumber
                })}
              >
                {cv.display}
              </button>
            </gux-button-slot>
          ) as JSX.Element
        );
      }

      if (cv.display == '...') {
        return acc.concat(
          (
            <gux-pagination-ellipsis-button
              disabled={this.disabled}
              totalPages={this.totalPages}
            />
          ) as JSX.Element
        );
      }

      return acc.concat(
        (
          <gux-button-slot accent="ghost">
            <button
              disabled={this.disabled}
              onClick={() => this.handlePageChange(cv.pageNumber)}
              aria-label={this.i18n('pageNumber', {
                pageNumber: cv.pageNumber
              })}
            >
              {cv.display}
            </button>
          </gux-button-slot>
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
          <gux-button-slot accent="ghost" icon-only>
            <button
              title={this.i18n('firstPage')}
              disabled={this.onFirstPage || this.disabled}
              onClick={this.handleClickFirst.bind(this)}
            >
              <gux-icon
                size="small"
                decorative
                icon-name="fa/chevrons-left-regular"
              ></gux-icon>
            </button>
          </gux-button-slot>
          <gux-button-slot accent="ghost" icon-only>
            <button
              title={this.i18n('previousPage')}
              disabled={this.onFirstPage || this.disabled}
              onClick={this.handleClickPrevious.bind(this)}
            >
              <gux-icon
                size="small"
                decorative
                icon-name="custom/chevron-left-small-regular"
              ></gux-icon>
            </button>
          </gux-button-slot>
        </div>

        {this.getPageNavigation()}

        <div class="gux-pagination-buttons-group">
          <gux-button-slot accent="ghost" icon-only>
            <button
              title={this.i18n('nextPage')}
              disabled={this.onLastPage || this.disabled}
              onClick={this.handleClickNext.bind(this)}
            >
              <gux-icon
                size="small"
                decorative
                icon-name="custom/chevron-right-small-regular"
              ></gux-icon>
            </button>
          </gux-button-slot>
          <gux-button-slot accent="ghost" icon-only>
            <button
              title={this.i18n('lastPage')}
              disabled={this.onLastPage || this.disabled}
              onClick={this.handleClickLast.bind(this)}
            >
              <gux-icon
                size="small"
                decorative
                icon-name="fa/chevrons-right-regular"
              ></gux-icon>
            </button>
          </gux-button-slot>
        </div>
      </div>
    ) as JSX.Element;
  }
}
